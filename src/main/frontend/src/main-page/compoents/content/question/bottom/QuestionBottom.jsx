import "../question.css"
import CommonBtn from "../../../prototype/btn/CommonBtn.jsx";
import leftIcon from "../../../../resources/images/quest.svg";

export default function QuestionBottom() {

    return (
        <>
            <div className="question-bottom">
                <div className="question-bottom-text">Не нашли интересующее?</div>
                <CommonBtn leftIcon={<img src={leftIcon} alt="книга" />} width={340} height={66} size={22} bgColor={"#8A6CFF"} fontColor={"white"} onClick={() => window.open("https://web.telegram.org/a/#1133165164", "_blank")}>Задать вопрос</CommonBtn>
            </div>
        </>
    )
}