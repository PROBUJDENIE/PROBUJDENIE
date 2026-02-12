import "../question.css"
import questImage from "../../../../resources/images/question_img.png"
export default function QuestionCard({isOpen, onToggle, question, answer}) {

    return (
        <>
            <div className={`question_card_wrap ${isOpen ? "is-open" : ""}`}>
                <button type="button" className="question_card btn" onClick={onToggle}>
                        <div className="question_card_text">{question}</div>
                        <img className="question_card_img" src={questImage} ></img>
                </button>
                <div className="question_card_answer" aria-hidden={!isOpen}>
                    {answer}
                </div>
            </div>
        </>
    )
}