import Container from "@/main-page/compoents/content/Container.jsx";
import Header from "@/main-page/compoents/content/hero/header/Header.jsx";
import "./lecture.css"
import LectureBlocks from "@/lecture/LectureBlocks.jsx";
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import Jump from "@/main-page/compoents/content/jump/Jump.jsx";
import LectureManagerNavigation from "@/lecture/LectureManagerNavigation.jsx";
import {useEffect, useState} from "react";
import {lectureApi} from "@/api/lecture.api.js";
import {useParams} from "react-router-dom";

export default function Lecture() {
    const { courseId } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [activeLectureId, setActiveLectureId] = useState("null");
    const [lecture, setLecture] = useState(null);

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
                <Header />
                <Jump></Jump>
                <LectureManagerNavigation isOpen={isOpen} setOpen={() => setIsOpen(false)} activeLectureId={activeLectureId} setActiveLectureId={setActiveLectureId} courseId={courseId}></LectureManagerNavigation>
                <Container>
                    <div className="lecture_content">
                        <div className="lecture_content-header">
                            <CommonBtn width={55} height={55} borderColor={"black"} onClick={() => setIsOpen(true)}>=</CommonBtn>
                        </div>
                        {lecture?.content && (<LectureBlocks material={lecture.content}></LectureBlocks>)}
                    </div>
                </Container>
                <Bottom></Bottom>
            </div>

        </>
    )
}