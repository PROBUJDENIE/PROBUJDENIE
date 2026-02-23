import { useEffect, useState, useCallback } from "react";
import { lectureApi } from "@/api/lecture.api.js";
import { sectionApi } from "@/api/section.api.js";

export const useLectureManager = (courseId) => {
    const [sections, setSections] = useState([]);
    const [lecturesBySection, setLecturesBySection] = useState({});

    const [activeChapter, setActiveChapter] = useState(null);
    const [activeLectureId, setActiveLectureId] = useState("null");
    const [lecture, setLecture] = useState(null);

    const [activeLectureNumber, setActiveLectureNumber] = useState(null);
    const [totalLectures, setTotalLectures] = useState(null);

    const [isLoadingSections, setIsLoadingSections] = useState(false);
    const [isLoadingLecture, setIsLoadingLecture] = useState(false);

    // Загрузка списка секций курса
    useEffect(() => {
        if (!courseId) return;

        const load = async () => {
            setIsLoadingSections(true);
            try {
                const data = await sectionApi.getSectionsByCourseId({
                    courseId,
                    offset: 0,
                    count: 10,
                });
                setSections(data || []);
            } catch (err) {
                console.error("Ошибка загрузки секций:", err);
            } finally {
                setIsLoadingSections(false);
            }
        };

        load();
    }, [courseId]);

    // Загрузка лекций для конкретной секции (только когда она стала активной)
    useEffect(() => {
        if (!activeChapter || !sections.length) return;

        const section = sections[activeChapter - 1];
        if (!section) return;

        const sectionId = section.id;
        if (lecturesBySection[sectionId]) return;

        const load = async () => {
            try {
                const data = await lectureApi.getLecturesBySectionId({
                    sectionId,
                    offset: 0,
                    count: 100,
                });
                setLecturesBySection((prev) => ({
                    ...prev,
                    [sectionId]: data || [],
                }));
            } catch (err) {
                console.error("Ошибка загрузки лекций секции:", err);
            }
        };

        load();
    }, [activeChapter, sections, lecturesBySection]);

    useEffect(() => {
        if (activeLectureId === "null") {
            setLecture(null);
            return;
        }

        const load = async () => {
            setIsLoadingLecture(true);
            try {
                const data = await lectureApi.getLecture({ lectureId: activeLectureId });
                setLecture(data);
            } catch (err) {
                console.error("Ошибка загрузки лекции:", err);
            } finally {
                setIsLoadingLecture(false);
            }
        };

        load();
    }, [activeLectureId]);

    const goToNextLecture = useCallback(() => {
        if (activeLectureId === "null" || !activeChapter || !sections.length) return;

        const currentSectionIndex = activeChapter - 1;
        const currentSection = sections[currentSectionIndex];
        if (!currentSection) return;

        const sectionLectures = lecturesBySection[currentSection.id] || [];
        const currentLecIndex = sectionLectures.findIndex((l) => l.id === activeLectureId);

        // 1. Следующая лекция в текущей секции
        if (currentLecIndex >= 0 && currentLecIndex < sectionLectures.length - 1) {
            const nextLec = sectionLectures[currentLecIndex + 1];
            setActiveLectureId(nextLec.id);
            setActiveLectureNumber(currentLecIndex + 2);
            return;
        }

        // 2. Первая лекция следующей секции
        if (currentSectionIndex < sections.length - 1) {
            const nextSectionIndex = currentSectionIndex + 1;
            const nextSection = sections[nextSectionIndex];
            const nextSectionLectures = lecturesBySection[nextSection.id] || [];

            if (nextSectionLectures.length > 0) {
                const firstLec = nextSectionLectures[0];
                setActiveLectureId(firstLec.id);
                setActiveChapter(nextSectionIndex + 1);
                setActiveLectureNumber(1);
                return;
            }
        }

        alert("Это была последняя лекция курса!");
    }, [
        activeLectureId,
        activeChapter,
        sections,
        lecturesBySection,
        setActiveLectureId,
        setActiveChapter,
        setActiveLectureNumber,
    ]);

    return {
        sections,
        lecturesBySection,
        activeChapter,
        setActiveChapter,
        activeLectureId,
        setActiveLectureId,
        lecture,
        activeLectureNumber,
        setActiveLectureNumber,
        totalLectures,
        setTotalLectures,
        isLoadingSections,
        isLoadingLecture,
        goToNextLecture,
    };
};