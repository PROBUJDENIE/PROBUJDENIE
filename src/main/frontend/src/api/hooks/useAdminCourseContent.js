import { useEffect } from "react";
import { publicApi } from "@/api/public.api.js";
import {getUrl, PUBLIC_ENDPOINTS} from "@/api/config.js";

export function useAdminCourseContent(courseId, activeSectionId, setActiveSectionId, setCourse) {
    useEffect(() => {
        if (!courseId) return;

        async function loadSections() {
            try {
                const sections = await publicApi.getSectionPage({ courseId, offset: 0, count: 100 });

                setCourse(prev => ({
                    ...prev,
                    sections: sections.map(s => ({ ...s, lectures: [] }))
                }));

            } catch (err) {
                console.error("Ошибка при загрузке секций:", err);
            }
        }

        loadSections();
    }, [courseId, setCourse]);

    useEffect(() => {
        if (!activeSectionId) return;

        async function loadLectures() {
            try {
                const lectures = await publicApi.getLecturePage({ sectionId: activeSectionId, offset: 0, count: 20 });
                const lecturesWithContent = await Promise.all(
                    lectures.map(async (lecture) => {

                        const fullLecture = await publicApi.getLectureAdmin({
                            lectures,
                            lectureId: lecture.id
                        });

                        let blocks = [];

                        if (fullLecture.content) {
                            const parsed = JSON.parse(fullLecture.content);
                            blocks = parsed.map((item, index) => ({
                                id: `${lecture.id}-${index}`,
                                type: (() => {
                                    switch (item.type) {
                                        case "heading": return "title";
                                        case "paragraph": return "text";
                                        case "image": return "image";
                                        case "exercise": return "exercise";
                                        default: return "text";
                                    }
                                })(),
                                content: item.type === "image"
                                    ? {
                                        fileId: item.fileId,
                                        imageUrl: getUrl(PUBLIC_ENDPOINTS.GET_FILE(item.fileId))
                                    }
                                    : item.content
                            }));
                        }

                        return {
                            ...fullLecture,
                            contentBlocks: blocks
                        };
                    })
                );
                setCourse(prev => ({
                    ...prev,
                    sections: prev.sections.map(section =>
                        section.id === activeSectionId
                            ? { ...section, lectures: lecturesWithContent }
                            : section
                    )
                }));

            } catch (err) {
                console.error("Ошибка при загрузке лекций с контентом:", err);
            }
        }

        loadLectures();
    }, [activeSectionId, setCourse]);
}