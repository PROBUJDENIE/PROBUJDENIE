import "./courseCard.css"
import {useNavigate} from "react-router-dom";
import {LectureContent} from "@/utils/constants.jsx";
import defaultImg from "@/constructor/resources/images/default.png";

export default function CourseCardInUserList({ course}) {
    const navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo(0, 0);
        navigate(LectureContent + "/" + course.id);
    };

    return (
        <>
            <div className="course-card btnr">
                <button className="course-card_view" onClick={handleClick}>
                    <img src={course.photoUrl || defaultImg} />
                    <p className="course-card_title">{course.title}</p>
                </button>
            </div>
        </>
    )
}
