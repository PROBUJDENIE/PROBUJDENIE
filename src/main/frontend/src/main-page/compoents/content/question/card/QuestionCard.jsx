import "../question.css"
export default function QuestionCard({isOpen, onToggle, question, answer}) {

    return (
        <>
            <div className={`question_card_wrap ${isOpen ? "is-open" : ""}`}>
                <button type="button" className="question_card btn" onClick={onToggle}>
                        <div className="question_card_text">{question}</div>
                        <img className="question_card_img" src={"src/main-page/resources/images/question_img.png"} alt={""}></img>
                </button>
                <div className="question_card_answer" aria-hidden={!isOpen}>
                    {answer}
                </div>
            </div>
        </>
    )
}