import "./expectationsAfterCompletion.css";
import {useState} from "react";
import leftArrow from "../../resourses/left.png";
import rightArrow from "../../resourses/right.png";
import icon from "../../resourses/icon.png";

export default function MoneyBlock() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const blocks = [{
        id: 1,
        image: icon,
        title: "Тренд №1",
        description: "Навык, без которого не берут в топовые IT-компании. Самый быстрорастущий запрос у рекрутеров.",
    }, {
        id: 2,
        image: icon,
        title: "Ваш первый миллион",
        description: "Не за год, а за месяц. Стартовые зарплаты в профессии начинаются от 1 000 000 ₽ в год.",
    }, {
        id: 3,
        image: icon,
        title: "Потолка нет",
        description: "С опытом ваш доход может вырасти в 3-5 раз. Реальные истории выпускников — тому доказательство.",
    }];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % blocks.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + blocks.length) % blocks.length);
    };

    return (
            <div className="money-block-wrapper">
                <div className="money-block">
                    <div className="money-image">
                        <img src={icon} alt="Иконка"/>
                    </div>

                    <div className="money-content">
                        <h3 className="money-title">
                            {blocks[currentSlide].title}
                        </h3>
                        <p className="money-description">
                            {blocks[currentSlide].description}
                        </p>
                    </div>

                    <button className="money-arrow money-arrow-left" onClick={prevSlide}>
                        <img src={leftArrow} alt="Предыдущий"/>
                    </button>
                    <button className="money-arrow money-arrow-right" onClick={nextSlide}>
                        <img src={rightArrow} alt="Следующий"/>
                    </button>
                </div>
                <div className="money-dots">
                    {blocks.map((_, index) => (<button
                            key={index}
                            className={`money-dot ${currentSlide === index ? "active" : ""}`}
                            onClick={() => setCurrentSlide(index)}
                        />))}
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>

    );
}