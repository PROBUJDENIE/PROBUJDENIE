import "./priceConstructorPreview.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "@/main-page/resources/images/book.svg";

export default function PriceConstructorPreview({course}) {

    return (
        <>
            <div className="priceConstructorPreview">
                <h1>
                    Не упусти момент!
                </h1>
                <h2>
                    Полный доступ ко всем модулям и материалам курса. Начните обучение сегодня.
                </h2>
                <h3>
                    500 ₽
                </h3>
                <CommonBtn width={300} height={50} bgColor="#D2FE66" borderColor="#8A6CFF" fontColor="#000000" size={16} leftIcon={<img src={leftIcon} alt="книга" />}>Начать обучение</CommonBtn>

            </div>
        </>
    )
}
