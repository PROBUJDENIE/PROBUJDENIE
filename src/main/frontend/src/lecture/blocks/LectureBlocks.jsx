import "./lectureBlocks.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import next from "../resourses/next_lect.svg"
import prev from "../resourses/prev_lect.svg"
import like from "../resourses/like.svg"
import dont from "../resourses/dont.svg"
import LectureTaskLoader from "@/lecture/task/task-loader/LectureTaskLoader.jsx";
import {getUrl, PUBLIC_ENDPOINTS} from "@/api/config.js";
export default function LectureBlocks({material, onNext, onPrev}) {

    return (
        <>
            <div className="lecture-blocks">
                {material.map((block, index) => {

                    switch (block.type) {
                        case "heading":
                            return (
                                <h2  key={index} className="lecture-headingBlock">{block.content}</h2>
                            );

                        case "paragraph":
                            return (
                                <p key={index} className="lecture-paragraphBlock">{block.content}</p>
                            );

                        case "image":
                            { const src = block.fileId ? getUrl(PUBLIC_ENDPOINTS.GET_FILE(block.fileId)) : null;

                            return (
                                <div key={index} className="lecture-imageBlock">
                                    <img src={src} alt={"Изображение к лекции"} loading="lazy"/>
                                </div>
                            ); }
                        case "exercise":
                            return ( <LectureTaskLoader key={index} exerciseId={block.exerciseId}/>);
                    }
                })}
            </div>
            <div className="lecture-blocks-btns">
                <div className="lecture-btn-navig">
                    <CommonBtn onClick={onPrev} width={420} height={80} borderRadius={30} size={32} fontColor={"white"} bgColor={"#8A6CFF"} leftIcon={<img src={prev} width={60}/>}> К предыдущему уроку</CommonBtn>
                    <CommonBtn onClick={onNext} width={420} height={80} borderRadius={30} size={32} fontColor={"white"} bgColor={"#8A6CFF"} rightIcon={<img src={next} width={60}/>}> К следующему уроку</CommonBtn>
                </div>
                <div className="lecture-btn-like">
                    <h2> Как Вам урок? </h2>
                    <div className="like-buttons">
                        <button className="btnr" onClick={() => {}}>
                            <img src={like} alt="like" />
                        </button>
                        <button className="btnr" onClick={() => {}}>
                            <img src={dont} alt="dislike" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
