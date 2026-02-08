import ConstructorSectionBtn from "./btn/ConstructorSectionBtn.jsx";
import ConstructorLectureBtn from "./btn/ConstructorLectureBtn.jsx";
import ConstructorCreateSection from "./btn/ConstructorCreateSection.jsx";
import "./navigation.css"
import ConstructorCreateLecture from "./btn/ConstructorCreateLecture.jsx";

export default function ConstructorNavigation({
                                                  course,
                                                  open,
                                                  activeSectionId,
                                                  setActiveSectionId,
                                                  activeLectureId,
                                                  setActiveLectureId,
                                                  onClose,
                                                  saveSection,
                                                  setCourse,
                                                  saveLecture,
                                                  allowCreate = true,
                                                  allowRename = true
                                              }) {

    if (!open) return null;
    return (
        <>
            <div className="overlay" onClick={onClose}>
                <div className="constructor_modal" onClick={(e) => e.stopPropagation()}>
                    <button className={"btnn"} onClick={() => onClose()}>
                        <img alt={""} src={"src/constructor/resources/images/lPanel.svg"}/>
                    </button>
                    <div className="constructor_modal_content">
                        {course.sections.map(section => (
                            <div key={section.id}>
                                <ConstructorSectionBtn
                                    isActive={activeSectionId === section.id}
                                    onSelect={() => setActiveSectionId(section.id)}
                                    onRename={allowRename ? (newTitle) =>
                                            setCourse(prev => ({
                                                ...prev,
                                                sections: prev.sections.map(s =>
                                                    s.id === section.id ? {...s, title: newTitle} : s
                                                )
                                            }))
                                        : undefined}
                                    title={section.title}

                                ></ConstructorSectionBtn>

                                {activeSectionId === section.id &&
                                    section.lectures.map(lecture => (
                                        <div key={lecture.id}>
                                            <ConstructorLectureBtn
                                                isActive={activeLectureId === lecture.id}
                                                onSelect={() => setActiveLectureId(lecture.id)}
                                                onRename={allowRename ? (newTitle) =>
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
                                                                                : {...lecture, title: newTitle}
                                                                        )
                                                                    }
                                                            )
                                                        }))
                                                    : undefined}
                                                title={lecture.title}

                                            ></ConstructorLectureBtn>
                                        </div>
                                    ))}

                                {allowCreate && activeSectionId === section.id && (
                                    <ConstructorCreateLecture onClick={saveLecture}/>
                                )}

                            </div>
                        ))}
                        {allowCreate && (
                            <ConstructorCreateSection onClick={saveSection}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
