import "../question.css"
export default function QuestionHeader() {

    return (
        <>
            <div className="question_header">
                <div className="question_header_title">
                    Возник вопрос? Скорее всего, ответ уже здесь
                </div>
                <div className="question_header_desc">
                    Наша команда собрала всё, что обычно интересует новых студентов, в одном месте. <br/> Это быстро и удобно!
                </div>
                <div className="question_header_content"></div>
            </div>
        </>
    )
}