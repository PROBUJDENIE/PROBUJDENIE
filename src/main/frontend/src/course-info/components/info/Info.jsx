import Container from "../../../main-page/compoents/content/Container.jsx";
import "./info.css"
import gitImage from "../../resourses/git.png";
import pointerImage from "../../resourses/pointer.png";

export default function Info() {
    return (
        <>
            <Container>
                <div className="info-grid">
                    <div className="info-image">
                        <img
                            src={gitImage}
                            className="course-main-image"
                        />
                    </div>

                    <div className="info-content">
                        <h1 className="course-title">
                            Git: полный курс
                        </h1>
                        <p className="course-description">
                            Освойте систему контроля версий, которая используется 99% разработчиков worldwide. Научитесь
                            работать с ветками, решать конфликты и эффективно управлять кодом в команде.
                        </p>
                        <div className="course-features">
                            <div className="course-features-text">
                                <h4 className="features-title">Что вас ждет:</h4>
                                <div className="features-grid">
                                    <div className="feature">
                                        <span className="feature-bullet">•</span>
                                        <span>18 часов практических видеоуроков</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-bullet">•</span>
                                        <span>45 заданий для закрепления навыков</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-bullet">•</span>
                                        <span>5 ключевых модулей от основ до CI/CD</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-bullet">•</span>
                                        <span>Сертификат о завершении курса</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-bullet">•</span>
                                        <span>Пожизненный доступ к материалам</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info-pointer">
                    <div className="info-pointer-image">
                        <img
                            alt="Стрелка"
                            src={pointerImage}
                            className="course-pointer-image"
                        />
                    </div>
                    <h1 className="info-pointer-text">
                        Читай подробнее и приступай к обучению
                    </h1>
                </div>
            </Container>
        </>
    )
}