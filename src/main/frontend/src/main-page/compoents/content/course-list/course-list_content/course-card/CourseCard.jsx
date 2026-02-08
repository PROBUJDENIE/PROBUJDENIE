import "./courseCard.css"
import {useNavigate} from "react-router-dom";
import {COURSE_INFO, MAIN_ROUTE} from "../../../../../../utils/constants.jsx";

export default function CourseCard() {
    const navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo(0, 0);
        navigate(COURSE_INFO);
    };
    return (
        <>
            <div className="course-card btnr">
                <button className="course-card_view" onClick={handleClick}>
                    <button className="course-card_price"></button>
                </button>
            </div>
        </>
    )
}
