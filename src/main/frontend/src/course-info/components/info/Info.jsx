import Container from "../../../main-page/compoents/content/Container.jsx";
import "./info.css"
import pointerImage from "../../resourses/pointer.png";

export default function Info({ course }) {
    return (
        <>
            <Container>
                <div className="info-grid">
                    <div className="info-image">
                        <img
                            src={course.photoUrl}
                            className="course-main-image"
                        />
                    </div>

                    <div className="info-content">
                        <h1 className="course-title">
                            {course.title}
                        </h1>
                        <p className="course-description">
                            {course.description}
                        </p>
                        <div className="course-features">
                            <div className="course-features-text">
                                <h4 className="features-title">Что вас ждет:</h4>
                                <div className="features-grid">
                                    {course.highlights?.map((item, i) => (
                                        <div className="feature" key={i}>
                                            <span className="feature-bullet">•</span>
                                            <span>{item}</span>
                                        </div>
                                    ))}
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