import Container from "@/main-page/compoents/content/Container.jsx";
import Header from "@/main-page/compoents/content/hero/header/Header.jsx";
import "./lecture.css"
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";
import Jump from "@/main-page/compoents/content/jump/Jump.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import menu from "./resourses/menu.svg"
import emptySt from "./resourses/empty.svg";
import {useLectures} from "@/api/hooks/useLectures.js";
import {useSections} from "@/api/hooks/useSections.js";
import LectureManagerNavigation from "@/lecture/navigation/LectureManagerNavigation.jsx";
import LectureBlocks from "@/lecture/blocks/LectureBlocks.jsx";

export default function Lecture() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeLectureId, setActiveLectureId] = useState(null);
    const [lecture, setLecture] = useState(null);
    const [activeSectionId, setActiveSectionId] = useState(null);

    const {courseId} = useParams();
    const {lectures, getLecture} = useLectures(activeSectionId);

    const {sections} = useSections({courseId: courseId});


    useEffect(() => {
        if (activeLectureId === null) {
            setLecture(null);
            return;
        }
        const loadLecture = async () => {
            try {
                const data = await getLecture(activeLectureId);
                setLecture(data);
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
                <LectureManagerNavigation isOpen={isOpen} setIsOpen={() => setIsOpen(false)}
                                          activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId}
                                          activeLectureId={activeLectureId} setActiveLectureId={setActiveLectureId}
                                          courseId={courseId}
                                          lectures={lectures}
                                          sections={sections}

                ></LectureManagerNavigation>
                <Container>
                    <div className="lecture_content">
                        <div className="lecture_content-header">
                            <div className="lecture_content-header_menu">
                                <button className={"btnr"} onClick={() => setIsOpen(true)}><img src={menu} height={70} width={70}/></button>
                            </div>
                        </div>
                        {activeLectureId === null ? (
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