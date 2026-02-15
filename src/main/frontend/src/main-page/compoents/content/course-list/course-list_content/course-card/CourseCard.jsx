import "./courseCard.css"
import {useNavigate} from "react-router-dom";

export default function CourseCard({ course }) {
    const navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo(0, 0);
        navigate(`/course/${course.id}`);
    };
    return (
        <>
            <div className="course-card btnr">
                <button className="course-card_view" onClick={handleClick}>
                    <img src={course.photoUrl} />
                    <p className="course-card_title">{course.title}</p>
                    <p className="course-card_subtitle">Нажмите, чтобы узнать больше... </p>
                    <button className="course-card_price"> {course.price} ₽</button>
                </button>
            </div>
        </>
    )
}
