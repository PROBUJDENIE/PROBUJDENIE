import "./heroBottom.css"
import Container from "../../Container.jsx";

export default function HeroBottom() {
    return (
        <>
            <div>
                <Container>
                    <div className="hero-bottom" >
                        <ul className="hero-bottom_list">
                            <li className="hero-bottom_list__item">
                                Формат: Онлайн - обучение
                            </li>
                            <li className="hero-bottom_list__item">
                                Качество: Автопроверка заданий
                            </li>
                            <li className="hero-bottom_list__item">
                                Инструмент: Конструктор курсов
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
        </>
    )
}
