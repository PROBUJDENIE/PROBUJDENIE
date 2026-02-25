import { useCallback, useEffect, useMemo, useState } from "react";
import { useSections } from "@/api/hooks/useSections.js";
import { useLectures } from "@/api/hooks/useLectures.js";

export const useLectureManager = (courseId) => {
    const { sections, loading: loadingSections, error: sectionsError } = useSections({ courseId });
    const [activeChapterIdx, setActiveChapterIdx] = useState(null);
    const [activeLectureId, setActiveLectureId] = useState(null);

    const activeSection = useMemo(() => {
        if (
            activeChapterIdx === null ||
            activeChapterIdx < 0 ||
            activeChapterIdx >= sections.length
        ) {
            return null;
        }
        return sections[activeChapterIdx];
    }, [sections, activeChapterIdx]);

    const activeSectionId = activeSection?.id ?? null;

    const {lectures, loading: loadingLectures, error: lecturesError, getLecture,} = useLectures(activeSectionId);
    useEffect(() => {
        if (activeChapterIdx === null || !lectures?.length) {
            setActiveLectureId(null);
            return;
        }
        // Если лекция уже выбрана и она принадлежит текущей главе — ничего не делаем
        const currentLectureBelongsToSection = lectures.some(
            l => String(l.id) === String(activeLectureId)
        );

        if (currentLectureBelongsToSection) {
            return;
        }

        // Иначе выбираем первую лекцию новой главы
        setActiveLectureId(String(lectures[0].id));
    }, [activeChapterIdx, lectures, activeLectureId]);

    const [currentLectureContent, setCurrentLectureContent] = useState(null);
    const [loadingContent, setLoadingContent] = useState(false);

    useEffect(() => {
        if (!activeLectureId) {
            setCurrentLectureContent(null);
            return;
        }

        let cancelled = false;

        const load = async () => {
            setLoadingContent(true);
            try {
                const data = await getLecture(activeLectureId);
                if (!cancelled) {
                    setCurrentLectureContent(data);
                }
            } catch (e) {
                console.error("Ошибка загрузки лекции", e);
            } finally {
                if (!cancelled) setLoadingContent(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [activeLectureId, getLecture]);

    const activeLectureMeta = useMemo(() => {
        return lectures.find(
            (l) => String(l.id) === String(activeLectureId)
        ) ?? null;
    }, [lectures, activeLectureId]);

    const activeChapter = activeChapterIdx !== null ? activeChapterIdx + 1 : null;

    const activeLectureNumber = useMemo(() => {
        const idx = lectures.findIndex(
            (l) => String(l.id) === String(activeLectureId)
        );
        return idx >= 0 ? idx + 1 : null;
    }, [lectures, activeLectureId]);

    const totalLectures = lectures.length;

    const goToNextLecture = useCallback(() => {
        if (!lectures.length || activeLectureId === null) return;

        const currentIdx = lectures.findIndex(
            (l) => String(l.id) === String(activeLectureId)
        );
        if (currentIdx < lectures.length - 1) {
            setActiveLectureId(String(lectures[currentIdx + 1].id));
            return;
        }
        if (activeChapterIdx < sections.length - 1) {
            setActiveChapterIdx((prev) => prev + 1);
            return;
        }

        console.log("Конец курса");
    }, [lectures, activeLectureId, activeChapterIdx, sections.length]);

    return {sections, lectures, activeChapter, activeChapterIdx, setActiveChapterIdx, activeLectureId, setActiveLectureId, lecture: currentLectureContent, activeLectureMeta,
        activeLectureNumber, totalLectures, loading: loadingSections || loadingLectures || loadingContent, loadingSections, loadingLectures, loadingContent, goToNextLecture, error: sectionsError || lecturesError,
    };
};