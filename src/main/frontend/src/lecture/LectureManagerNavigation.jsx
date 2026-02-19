import "./lectureManagerNavigation.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import {useEffect, useState} from "react";
import {sectionApi} from "@/api/section.api.js";
import {lectureApi} from "@/api/lecture.api.js";
export default function LectureManagerNavigation({isOpen, setOpen, courseId , activeLectureId, setActiveLectureId}) {

    const [activeSection, setActiveSection] = useState("");
    const [sections, setSections] = useState([]);
    const [lectures, setLectures] = useState([]);


    useEffect(() => {
        const loadSections = async () => {
            try {
                const data = await sectionApi.getSectionsByCourseId({courseId, offset: 0, count: 10});
                setSections(data);
            } catch (e) {
                console.error(e);
            }
        };

        loadSections();
    }, [courseId]);

    useEffect(() => {
        if (!activeSection) {
            setLectures([]);
            return;
        }
        const loadLectures = async () => {
            try {
                const data = await lectureApi.getLecturesBySectionId({sectionId: activeSection, offset: 0, count: 10});
                setLectures(data);
            } catch (e) {
                console.error(e);
            }
        };

        loadLectures();
    }, [activeSection]);

    const handleClickSection = (sectionId) => {
        setActiveSection(sectionId);
        setActiveLectureId("null");
    }

    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className="login-box-overlay" onClick={setOpen}>
                <div className="lectureManagerNavigation" onClick={e => e.stopPropagation()}>
                    <div className="lectureManagerNavigation_header">
                        <CommonBtn width={55} height={55} borderColor={"black"} onClick={setOpen}>=</CommonBtn>
                    </div>
                    <div className="lectureManagerNavigation_content">
                        {sections.map((section, index) => {
                            return (
                                <>
                                    <div key={index} className="lectureManagerNavigation_content-section">
                                        <CommonBtn width={270} height={40} borderColor={"black"} bgColor={(activeSection === section.id) ? "black" : "#fff"} onClick={() => handleClickSection(section.id)}>{section.title}</CommonBtn>
                                    </div>

                                    {activeSection === section.id && (

                                        lectures.map((lec) => (
                                            <div className="lectureManagerNavigation_content-lecture">
                                                <CommonBtn width={200} height={40} borderColor={"black"} bgColor={activeLectureId === lec.id ? "black" : "#fff"} onClick={() => setActiveLectureId(lec.id)}>{lec.title}</CommonBtn>
                                            </div>
                                        ))
                                    )}

                                </>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}
