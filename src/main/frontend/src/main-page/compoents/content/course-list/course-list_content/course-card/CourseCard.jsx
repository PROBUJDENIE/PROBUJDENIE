import "./courseCard.css"
import {useNavigate} from "react-router-dom";

export default function CourseCard({ course }) {
    const navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo(0, 0);
        navigate("/course/${course.id}");
    };
    return (
        <>
            <div className="course-card btnr">
                <button className="course-card_view" onClick={handleClick}>
                    <img src={course.photoUrl} />
                    <h3 className="course-card_title">{course.title}</h3>
                    <h3 className="course-card_subtitle">Нажмите, чтобы узнать больше... </h3>
                    <button className="course-card_price"> {course.price} ₽</button>
                </button>
            </div>
        </>
    )
}
