import "./lectureManagerNavigation.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import {useEffect, useState} from "react";
import {sectionApi} from "@/api/section.api.js";
import {lectureApi} from "@/api/lecture.api.js";
import menu from "@/lecture/resourses/menu.svg";
export default function LectureManagerNavigation({isOpen, setOpen, courseId , activeLectureId, setActiveLectureId, setTotalLectures, setActiveLectureNumber, setActiveChapter}) {

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

        setActiveChapter(null);
        setActiveLectureNumber(null);
        setTotalLectures(null);
    };


    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className="login-box-overlay" onClick={setOpen}>
                <div className="lectureManagerNavigation" onClick={e => e.stopPropagation()}>
                    <div className="lectureManagerNavigation_header">
                        <button  className={"btnr"} onClick={setOpen}><img src={menu} height={70} width={70} /></button>
                    </div>
                    <div className="lectureManagerNavigation_content">
                        {sections.map((section, index) => {
                            return (
                                <>
                                    <div key={index} className="lectureManagerNavigation_content-section">
                                        <CommonBtn size={17} width={270} height={60} borderColor={"#8A6CFF"} fontColor={(activeSection === section.id) ? "#ffffff" : "#333333"} bgColor={(activeSection === section.id) ? "#8A6CFF" : "#DFD8D3"} onClick={() => handleClickSection(section.id)}>{section.title}</CommonBtn>
                                    </div>

                                    {activeSection === section.id && (

                                        lectures.map((lec, lectureIndex) => (
                                            <div key={lec.id} className="lectureManagerNavigation_content-lecture">
                                                <CommonBtn size={17} width={200} height={60} borderColor={"#8A6CFF"} fontColor={(activeLectureId === lec.id) ? "#ffffff" : "#333333"} bgColor={activeLectureId === lec.id ? "#8A6CFF" : "#DFD8D3"} onClick={() => {
                                                    setActiveLectureId(lec.id);
                                                    setActiveChapter(index + 1);
                                                    setActiveLectureNumber(lectureIndex + 1);
                                                    setTotalLectures(lectures.length);
                                                }}>{lec.title}</CommonBtn>
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
