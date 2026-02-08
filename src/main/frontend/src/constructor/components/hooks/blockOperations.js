export const moveUp = (course, activeSectionId, activeLectureId, blockId, mode) => {
    return {
        ...course,
        sections: course.sections.map(section => {
            if (section.id !== activeSectionId) return section;

            return {
                ...section,
                lectures: section.lectures.map(lecture => {
                    if (lecture.id !== activeLectureId) return lecture;

                    const blocks = mode === 'tasks'
                        ? lecture.taskBlocks || []
                        : lecture.contentBlocks || [];

                    const index = blocks.findIndex(b => b.id === blockId);
                    if (index <= 0) return lecture;

                    const newBlocks = [...blocks];
                    [newBlocks[index - 1], newBlocks[index]] =
                        [newBlocks[index], newBlocks[index - 1]];

                    return mode === 'tasks'
                        ? { ...lecture, taskBlocks: newBlocks }
                        : { ...lecture, contentBlocks: newBlocks };
                })
            };
        })
    };
};

export const moveDown = (course, activeSectionId, activeLectureId, blockId, mode) => {
    return {
        ...course,
        sections: course.sections.map(section => {
            if (section.id !== activeSectionId) return section;

            return {
                ...section,
                lectures: section.lectures.map(lecture => {
                    if (lecture.id !== activeLectureId) return lecture;

                    const blocks = mode === 'tasks'
                        ? lecture.taskBlocks || []
                        : lecture.contentBlocks || [];

                    const index = blocks.findIndex(b => b.id === blockId);
                    if (index === -1 || index >= blocks.length - 1) return lecture;

                    const newBlocks = [...blocks];
                    [newBlocks[index], newBlocks[index + 1]] =
                        [newBlocks[index + 1], newBlocks[index]];

                    return mode === 'tasks'
                        ? { ...lecture, taskBlocks: newBlocks }
                        : { ...lecture, contentBlocks: newBlocks };
                })
            };
        })
    };
};

export const moveDelete = (course, activeSectionId, activeLectureId, blockId, mode) => {
    return {
        ...course,
        sections: course.sections.map(section => {
            if (section.id !== activeSectionId) return section;

            return {
                ...section,
                lectures: section.lectures.map(lecture => {
                    if (lecture.id !== activeLectureId) return lecture;

                    const blocks = mode === 'tasks'
                        ? lecture.taskBlocks || []
                        : lecture.contentBlocks || [];

                    const newBlocks = blocks.filter(b => b.id !== blockId);

                    return mode === 'tasks'
                        ? { ...lecture, taskBlocks: newBlocks }
                        : { ...lecture, contentBlocks: newBlocks };
                })
            };
        })
    };
};