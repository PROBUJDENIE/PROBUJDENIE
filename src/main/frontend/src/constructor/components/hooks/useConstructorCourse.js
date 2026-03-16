import { useState, useMemo, useEffect } from "react";
import { v4 as uuid } from "uuid";

export function useConstructorCourse(course, setCourse) {
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

    const [localBlocks, setLocalBlocks] = useState([]);

    useEffect(() => {setLocalBlocks(activeLecture?.contentBlocks || []);}, [activeLectureId, activeLecture?.contentBlocks]);

    const blocks = localBlocks;
    useEffect(() => {
        if (!activeSectionId || !activeLectureId) return;

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
                                : {
                                    ...lecture,
                                    contentBlocks: localBlocks
                                }
                        )
                    }
            )
        }));

    }, [localBlocks]);

    function addBlock(type) {
        if (!activeSectionId || !activeLectureId) return;

        const newBlock = { id: uuid(), type, content: "" };
        setLocalBlocks(prev => [...prev, newBlock]);
    }

    function updateBlock(id, data) {
        setLocalBlocks(prev => prev.map(b => (b.id === id ? { ...b, ...data } : b)));
    }

    function deleteBlock(id) {
        setLocalBlocks(prev => prev.filter(b => b.id !== id));
    }

    function resetLocalBlocks() {
        setLocalBlocks(activeLecture?.contentBlocks || []);
    }

    function addSection() {
        setCourse(prev => ({
            ...prev,
            sections: [
                ...(prev.sections ?? []),
                { id: uuid(), title: "Новая глава", lectures: [] }
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
                            { id: uuid(), title: "Новая лекция", contentBlocks: [] }
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
        setLocalBlocks,
        resetLocalBlocks,
        addBlock,
        updateBlock,
        deleteBlock,
        addSection,
        addLecture
    };
}