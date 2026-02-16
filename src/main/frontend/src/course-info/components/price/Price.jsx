import "./price.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "@/main-page/resources/images/book.svg";

export default function Price({course}) {
    return (
        <>
            <div className="price">
                <div className="price_title">
                    Не упусти момент!
                </div>
                <div className="price_text">
                    Полный доступ ко всем модулям и материалам курса. Начните обучение сегодня.
                </div>
                <div className="price_number">
                    {course.price} ₽
                </div>
                <div className="course-content_btn">
                    <CommonBtn
                        width={330}
                        height={56}
                        bgColor="#D2FE66"
                        borderColor="#8A6CFF"
                        fontColor="#000000"
                        size={18}
                        onClick={() => console.log("Кнопка нажата")}
                        leftIcon={<img src={leftIcon} alt="книга" />}
                    >
                        Начать обучение
                    </CommonBtn>
                </div>
            </div>
        </>
    )
}
