import { useState, useMemo, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {adminApi} from "@/api/admin.api.js";

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

    async function addSection() {
        if (!course?.id) return;

        const newSection = {
            title: "Новая глава",
            orderNumber: course.sections?.length || 0
        };

        const created = await adminApi.createSection(course.id, newSection);

        setCourse(prev => ({
            ...prev,
            sections: [...(prev.sections || []), { ...created, lectures: [] }]
        }));

        setActiveSectionId(created.id);
    }

    async function addLecture() {
        if (!activeSectionId) return;

        const section = course.sections.find(s => s.id === activeSectionId);
        if (!section) return;

        const newLecture = {
            title: "Новая лекция",
            orderNumber: section.lectures?.length || 0
        };

        const created = await adminApi.createLecture(activeSectionId, newLecture);

        setCourse(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === activeSectionId
                    ? {
                        ...s,
                        lectures: [...(s.lectures || []), created]
                    }
                    : s
            )
        }));

        setActiveLectureId(created.id);
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