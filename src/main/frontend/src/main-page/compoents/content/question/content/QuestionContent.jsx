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
                        answer={"Доступ к материалам остается у вас навсегда. После прохождения курса вы можете возвращаться к ним в любое время."}
                        isOpen={openId === 0}
                        onToggle={() => setOpenId(openId === 0 ? null : 0)}
                    ></QuestionCard>
                </div>
                <div className="question_content_item">
                    <QuestionCard
                        question={"Подходит ли этот курс для новичков?"}
                        answer={
                            <>
                                Да, программа разработана так, чтобы быть понятной для людей без опыта.
                                <br />
                                Мы начинаем с основ и постепенно углубляемся в тему.
                            </>
                        }
                        isOpen={openId === 1}
                        onToggle={() => setOpenId(openId === 1 ? null : 1)}
                    ></QuestionCard>
                </div>
                <div className="question_content_item">
                    <QuestionCard
                        question={"Почему спринты открываются не сразу, а по неделям?"}
                        answer={
                            <>
                                Чтобы вы не перегружали себя информацией и успевали внедрять знания на практике.
                                <br />
                                Мы специально дозируем материал — так результат закрепляется лучше, а вы не выгораете.
                            </>
                        }
                        isOpen={openId === 2}
                        onToggle={() => setOpenId(openId === 2 ? null : 2)}
                    ></QuestionCard>
                </div>
                <div className="question_content_item">
                    <QuestionCard
                        question={"Если я зайду на курс через месяц, я увижу только первый спринт или все накопившиеся?"}
                        answer={"Вы увидите все спринты, которые вышли за это время. Они откроются автоматически — догонять ничего не придется."}
                        isOpen={openId === 3}
                        onToggle={() => setOpenId(openId === 3 ? null : 3)}
                    ></QuestionCard>
                </div>
                <div className="question_content_item">
                    <QuestionCard
                        question={"Как я могу оплатить курс?"}
                        answer={
                            <>
                                Мы принимаем оплату банковскими картами (Visa, Mastercard, МИР),
                                <br />
                                а также через электронные кошельки. Для юрлиц доступна оплата по счету.
                            </>
                        }
                        isOpen={openId === 4}
                        onToggle={() => setOpenId(openId === 4 ? null : 4)}
                    ></QuestionCard>
                </div>
            </div>
        </>
    )
}