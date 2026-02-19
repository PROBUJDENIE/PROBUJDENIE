import "./courseCard.css"
import {useNavigate} from "react-router-dom";
import {LectureContent} from "@/utils/constants.jsx";

export default function CourseCardInUserList({ course, from}) {
    const navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo(0, 0);
        navigate(LectureContent + "/" + course.id);
    };

    return (
        <>
            <div className="course-card btnr">
                <button className="course-card_view" onClick={handleClick}>
                    <img src={course.photoUrl} />
                    <p className="course-card_title">{course.title}</p>
                </button>
            </div>
        </>
    )
}
