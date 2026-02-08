import "./moneyBlockMini.css";
import {useState} from "react";
import leftArrow from "../../../../course-info/resourses/left.png";
import rightArrow from "../../../../course-info/resourses/right.png";
import icon from "../../../../course-info/resourses/icon.png";

export default function MoneyBlockMini({data = []}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const blocks = data && data.length > 0 ? data : [{
        id: 1,
        image: icon,
        title: "Добавьте информацию о зарплате",
        description: "Введите данные в формате 'Заголовок: текст' и 'Подпись: текст'",
    },];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % blocks.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + blocks.length) % blocks.length);
    };

    return (
        <div className="money-block-mini">
            <div className="block-mini">
                <div className="money-image-mini">
                    <img src={icon} alt="Иконка"/>
                </div>

                <div className="money-content-mini">
                    <h3 className="money-title-mini">
                        {blocks[currentSlide].title}
                    </h3>
                    <p className="money-description-mini">
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
            <div className="money-dots-mini">
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