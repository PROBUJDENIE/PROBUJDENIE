import { useState, useMemo } from "react";
import { v4 as uuid } from "uuid";

export function useConstructorCourse(course, setCourse, mode = "content") {
    const [activeSectionId, setActiveSectionId] = useState(null);
    const [activeLectureId, setActiveLectureId] = useState(null);

    const activeSection = useMemo(
        () => course.sections?.find(s => s.id === activeSectionId),
        [course.sections, activeSectionId]
    );

    const activeLecture = useMemo(
        () => activeSection?.lectures?.find(l => l.id === activeLectureId),
        [activeSection, activeLectureId]
    );

    const blocks =
        mode === "tasks"
            ? activeLecture?.taskBlocks || []
            : activeLecture?.contentBlocks || [];


    function addBlock(type) {
        if (!activeSectionId || !activeLectureId) return;

        const newBlock = {
            id: uuid(),
            type,
            content: "",
        };

        setCourse(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id !== activeSectionId
                    ? section
                    : {
                        ...section,
                        lectures: section.lectures.map(lecture =>
                            lecture.id !== activeLectureId
                                ? lecture
                                : mode === "tasks"
                                    ? {
                                        ...lecture,
                                        taskBlocks: [...(lecture.taskBlocks || []), newBlock]
                                    }
                                    : {
                                        ...lecture,
                                        contentBlocks: [...(lecture.contentBlocks || []), newBlock]
                                    }
                        )
                    }
            )
        }));
    }

    function updateBlock(id, data) {
        if (!activeSectionId || !activeLectureId) return;

        setCourse(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id !== activeSectionId
                    ? section
                    : {
                        ...section,
                        lectures: section.lectures.map(lecture => {
                            if (lecture.id !== activeLectureId) return lecture;

                            if (mode === "tasks") {
                                return {
                                    ...lecture,
                                    taskBlocks: lecture.taskBlocks.map(b =>
                                        b.id === id ? {
                                            ...b,
                                            content: data // ← обновляем только content
                                        } : b
                                    )
                                };
                            }

                            return {
                                ...lecture,
                                contentBlocks: lecture.contentBlocks.map(b =>
                                    b.id === id ? { ...b, ...data } : b
                                )
                            };
                        })
                    }
            )
        }));
    }

    function addSection() {
        setCourse(prev => ({
            ...prev,
            sections: [
                ...(prev.sections ?? []),
                {
                    id: uuid(),
                    title: "Новая глава",
                    lectures: []
                }
            ]
        }));
    }

    function addLecture() {
        if (!activeSectionId) return;

        setCourse(prev => ({
            ...prev,
            sections: prev.sections.map(section =>
                section.id !== activeSectionId
                    ? section
                    : {
                        ...section,
                        lectures: [
                            ...(section.lectures ?? []),
                            {
                                id: uuid(),
                                title: "Новая лекция",
                                blocks: []
                            }
                        ]
                    }
            )
        }));
    }

    return {
        activeSectionId,
        setActiveSectionId,
        activeLectureId,
        setActiveLectureId,
        activeSection,
        activeLecture,
        blocks,
        addBlock,
        updateBlock,
        addSection,
        addLecture
    };
}