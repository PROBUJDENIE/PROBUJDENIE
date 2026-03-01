import Container from "@/main-page/compoents/content/Container.jsx";
import Header from "@/main-page/compoents/content/hero/header/Header.jsx";
import "./lecture.css"
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";
import Jump from "@/main-page/compoents/content/jump/Jump.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import menu from "./resourses/menu.svg"
import emptySt from "./resourses/empty.svg";
import LectureManagerNavigation from "@/lecture/navigation/LectureManagerNavigation.jsx";
import LectureBlocks from "@/lecture/blocks/LectureBlocks.jsx";
import {useLectureManager} from "@/api/hooks/useLectureManager.js";
import next from "./resourses/next.svg"
import LectureProgress from "@/lecture/progress/LectureProgress.jsx";

export default function Lecture() {

    const [isOpen, setIsOpen] = useState(false);
    const {courseId} = useParams();
    const [showBlink, setShowBlink] = useState(true);
    const {sections, lectures, activeChapter, activeChapterIdx, setActiveChapterIdx, activeLectureId, setActiveLectureId,
           lecture, activeLectureNumber, totalLectures, goToNextLecture, goToPrevLecture} = useLectureManager(courseId);

    useEffect(() => {
        const timer = setTimeout(() => setShowBlink(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="lecture">
                <Header/>
                <Jump></Jump>
                <LectureManagerNavigation isOpen={isOpen} setIsOpen={() => setIsOpen(false)} sections={sections} lectures={lectures}
                                          activeChapterIdx={activeChapterIdx} setActiveChapterIdx={setActiveChapterIdx} activeLectureId={activeLectureId} setActiveLectureId={setActiveLectureId}/>
                <Container>
                    <div className="lecture_content">
                        <div className="lecture_content-header">
                            <div className="lecture_content-header_menu">
                                <button className={`btnr ${showBlink && !isOpen ? 'blink' : ''}`} onClick={() => setIsOpen(true)}><img src={menu} height={70} width={70}/></button>
                                <div className="lecture_content-header_menu_box">
                                    {activeLectureId && (<>
                                            <h2>Глава {activeChapter}</h2>
                                            <img src={next} alt="вправо" width={50} height={50}/>
                                            <h2> Лекция {activeLectureNumber}/{totalLectures} </h2>
                                        </>
                                    )}
                                </div>
                            </div>
                            <LectureProgress total={totalLectures} current={activeLectureNumber}/>
                        </div>

                        <div className="lecture_container">
                            {activeLectureId === null ? (
                                <div className="lecture_empty-state">
                                    <img src={emptySt}/>
                                    <h2> Ты не выбрал лекцию(</h2>
                                    <h3> Выбери главу, затем лекцию и приступай к обучению!</h3>
                                </div>
                            ) : (
                                lecture?.content && <LectureBlocks material={lecture.content} onNext={goToNextLecture} onPrev={goToPrevLecture}/>
                            )}
                        </div>

                    </div>
                </Container>
                <Bottom></Bottom>
            </div>
        </>
    )
}