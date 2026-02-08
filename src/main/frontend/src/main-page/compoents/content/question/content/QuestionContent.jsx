import "../question.css"
import QuestionCard from "../card/QuestionCard.jsx";
import {useState} from "react";
export default function QuestionContent() {

    const [openId, setOpenId] = useState(null);
    return (

        <>
            <div className="question_content">
                <div className="question_content_item">
                    <QuestionCard
                        question={"На сколько времени дается доступ к курсу? Можно ли продлить?"}
                        answer={"При покупке курса, доступ дается на всю жизнь."}
                        isOpen={openId === 0}
                        onToggle={() => setOpenId(openId === 0 ? null : 0)}
                    ></QuestionCard>
                </div>
                <div className="question_content_item">
                    <QuestionCard
                        question={"На сколько времени дается доступ к курсу? Можно ли продлить?"}
                        answer={"При покупке курса, доступ дается на всю жизнь."}
                        isOpen={openId === 1}
                        onToggle={() => setOpenId(openId === 1 ? null : 1)}
                    ></QuestionCard>
                </div>
                <div className="question_content_item">
                    <QuestionCard
                        question={"На сколько времени дается доступ к курсу? Можно ли продлить?"}
                        answer={"При покупке курса, доступ дается на всю жизнь."}
                        isOpen={openId === 2}
                        onToggle={() => setOpenId(openId === 2 ? null : 2)}
                    ></QuestionCard>
                </div>
                <div className="question_content_item">
                    <QuestionCard
                        question={"На сколько времени дается доступ к курсу? Можно ли продлить?"}
                        answer={"При покупке курса, доступ дается на всю жизнь."}
                        isOpen={openId === 3}
                        onToggle={() => setOpenId(openId === 3 ? null : 3)}
                    ></QuestionCard>
                </div>
            </div>
        </>
    )
}