import Container from "@/main-page/compoents/content/Container.jsx";
import Header from "@/main-page/compoents/content/hero/header/Header.jsx";
import "./lecture.css"
import LectureBlocks from "@/lecture/LectureBlocks.jsx";
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";
import Jump from "@/main-page/compoents/content/jump/Jump.jsx";
import LectureManagerNavigation from "@/lecture/LectureManagerNavigation.jsx";
import {useEffect, useState} from "react";
import {lectureApi} from "@/api/lecture.api.js";
import {useParams} from "react-router-dom";
import menu from "./resourses/menu.svg"
import emptySt from "./resourses/empty.svg";
import next from "./resourses/next.svg"
export default function Lecture() {
    const {courseId} = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [activeLectureId, setActiveLectureId] = useState("null");
    const [lecture, setLecture] = useState(null);

    const [activeChapter, setActiveChapter] = useState(null);
    const [activeLectureNumber, setActiveLectureNumber] = useState(null);
    const [totalLectures, setTotalLectures] = useState(null);


    useEffect(() => {
        if (activeLectureId === "null") {
            setLecture(null);
            return;
        }
        const loadLecture = async () => {
            try {
                const data = await lectureApi.getLecture({lectureId: activeLectureId});
                setLecture(data);
                console.error(data);
            } catch (e) {
                console.error(e);
            }
        };

        loadLecture();
    }, [activeLectureId]);


    return (
        <>
            <div className="lecture">
                <Header/>
                <Jump></Jump>
                <LectureManagerNavigation isOpen={isOpen} setOpen={() => setIsOpen(false)}
                                          activeLectureId={activeLectureId} setActiveLectureId={setActiveLectureId}
                                          courseId={courseId} setActiveChapter={setActiveChapter}
                                          setActiveLectureNumber={setActiveLectureNumber}
                                          setTotalLectures={setTotalLectures} ></LectureManagerNavigation>
                <Container>
                    <div className="lecture_content">
                        <div className="lecture_content-header">
                            <div className="lecture_content-header_menu">
                                <button className={"btnr"} onClick={() => setIsOpen(true)}><img src={menu} height={70} width={70}/></button>
                                <div className="lecture_content-header_menu_box">
                                    {activeLectureId !== "null" && ( <>
                                            <h2>Глава {activeChapter}</h2>
                                            <img src={next} alt="вправо" width={50} height={50}/>
                                            <h2>
                                                Лекция {activeLectureNumber}/{totalLectures}
                                            </h2>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                        {activeLectureId === "null" ? (
                            <div className="lecture_empty-state">
                                <img src={emptySt}/>
                                <h2> Ты не выбрал лекцию(</h2>
                                <h3> Выбери главу, затем лекцию и приступай к обучению!</h3>
                            </div>
                        ) : (
                            lecture?.content && <LectureBlocks material={lecture.content}/>
                        )}
                    </div>
                </Container>
                <Bottom></Bottom>
            </div>

        </>
    )
}