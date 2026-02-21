import "./howYourEducationWillLookLike.css";
import Container from "../../../main-page/compoents/content/Container.jsx";
import firstImage from "../../resourses/first.png";
import secondImage from "../../resourses/second.png";
import thirdImage from "../../resourses/third.png";
import LearningBlock from "./LearningBlock.jsx";
import gif1 from "../../resourses/gif/gif1.gif";
import gif2 from "../../resourses/gif/gif2.gif";
export default function HowYourEducationWillLookLike() {
    return (
        <Container>
            <div className="learning">
                <div className="learning-title">Как будет выглядеть твое обучение:</div>

                <div className="learning-blocks-wrapper">
                    <LearningBlock
                        imageSrc={firstImage}
                        title="Освоите теорию в интерактивном учебнике"
                        description="Начнёте с нуля и последовательно изучите всё, что нужно в профессии. Теория подаётся через практику: читаете урок и сразу применяете знания."
                        videoComponent={<img src={gif1}  className="video_component" /> }
                    />

                    <LearningBlock
                        imageSrc={secondImage}
                        title="Практика на реальных проектах"
                        description="С первого модуля работаете над коммерческими задачами. К концу курса у вас будет 3–5 сильных проектов в портфолио."
                        videoComponent={<img src={gif2}  className="video_component" />}
                    />

                    <LearningBlock
                        imageSrc={thirdImage}
                        title="Поддержка и трудоустройство"
                        description="Менторы проверяют каждую работу + помогаем с резюме, сопроводительными письмами и подготовкой к собеседованиям."
                        videoComponent={<img src={gif2}  className="video_component" />}
                    />
                </div>
            </div>
        </Container>
    );
}