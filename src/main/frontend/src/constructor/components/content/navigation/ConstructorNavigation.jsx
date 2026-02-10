import { useState } from "react";
import ConstructorSectionBtn from "./btn/ConstructorSectionBtn.jsx";
import ConstructorLectureBtn from "./btn/ConstructorLectureBtn.jsx";
import ConstructorCreateSection from "./btn/ConstructorCreateSection.jsx";
import ConstructorCreateLecture from "./btn/ConstructorCreateLecture.jsx";
import lPanelImage from "../../../resources/images/lPanel.svg";
import del from "../../../resources/images/sec_lec_del.svg";
import "./navigation.css";

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
    const [hoveredSectionId, setHoveredSectionId] = useState(null);
    const [hoveredLectureId, setHoveredLectureId] = useState(null);

    if (!open) return null;
    return (
        <div className="overlay" onClick={onClose}>
            <div className="constructor_modal" onClick={(e) => e.stopPropagation()}>
                <button className="btnn" onClick={onClose}>
                    <img alt="меню" src={lPanelImage} />
                </button>
                <div className="constructor_modal_content">
                    {course.sections.map((section) => (
                        <div
                            key={section.id}
                            className="nav-item"
                            onMouseEnter={() => setHoveredSectionId(section.id)}
                            onMouseLeave={() => setHoveredSectionId(null)}
                        >
                            <div className="nav-item-content">
                                {hoveredSectionId === section.id && allowCreate && (
                                    <button
                                        className="btn-delete"
                                        onClick={() => {
                                            setCourse((prev) => ({
                                                ...prev,
                                                sections: prev.sections.filter(
                                                    (s) => s.id !== section.id
                                                )
                                            }));
                                            if (activeSectionId === section.id) setActiveSectionId(null);
                                        }}
                                    >
                                        <img src={del} />
                                    </button>
                                )}

                                <ConstructorSectionBtn
                                    isActive={activeSectionId === section.id}
                                    onSelect={() => setActiveSectionId(section.id)}
                                    onRename={
                                        allowRename
                                            ? (newTitle) =>
                                                setCourse((prev) => ({
                                                    ...prev,
                                                    sections: prev.sections.map((s) =>
                                                        s.id === section.id
                                                            ? { ...s, title: newTitle }
                                                            : s
                                                    )
                                                }))
                                            : undefined
                                    }
                                    title={section.title}
                                />
                            </div>

                            {activeSectionId === section.id &&
                                section.lectures.map((lecture) => (
                                    <div
                                        key={lecture.id}
                                        className="nav-item lecture-item"
                                        onMouseEnter={() => setHoveredLectureId(lecture.id)}
                                        onMouseLeave={() => setHoveredLectureId(null)}
                                    >
                                        <div className="nav-item-content">
                                            {hoveredLectureId === lecture.id && allowCreate && (
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => {
                                                        setCourse((prev) => ({
                                                            ...prev,
                                                            sections: prev.sections.map((section) =>
                                                                section.id !== activeSectionId
                                                                    ? section
                                                                    : {
                                                                        ...section,
                                                                        lectures: section.lectures.filter(
                                                                            (l) => l.id !== lecture.id
                                                                        )
                                                                    }
                                                            )
                                                        }));
                                                        if (activeLectureId === lecture.id)
                                                            setActiveLectureId(null);
                                                    }}
                                                >
                                                    <img src={del} />
                                                </button>
                                            )}

                                            <ConstructorLectureBtn
                                                isActive={activeLectureId === lecture.id}
                                                onSelect={() => setActiveLectureId(lecture.id)}
                                                onRename={
                                                    allowRename
                                                        ? (newTitle) =>
                                                            setCourse((prev) => ({
                                                                ...prev,
                                                                sections: prev.sections.map(
                                                                    (section) =>
                                                                        section.id !== activeSectionId
                                                                            ? section
                                                                            : {
                                                                                ...section,
                                                                                lectures: section.lectures.map(
                                                                                    (lec) =>
                                                                                        lec.id !==
                                                                                        activeLectureId
                                                                                            ? lec
                                                                                            : { ...lec, title: newTitle }
                                                                                )
                                                                            }
                                                                )
                                                            }))
                                                        : undefined
                                                }
                                                title={lecture.title}
                                            />
                                        </div>
                                    </div>
                                ))}

                            {allowCreate && activeSectionId === section.id && (
                                <ConstructorCreateLecture onClick={saveLecture} />
                            )}
                        </div>
                    ))}

                    {allowCreate && <ConstructorCreateSection onClick={saveSection} />}
                </div>
            </div>
        </div>
    );
}
