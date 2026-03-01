import "./courseList.css"
import CourseListHeader from "./course-list_header/CourseListHeader.jsx";
import CourseCard from "./course-list_content/course-card/CourseCard.jsx";
import LoginOrRegister from "@/autorisation/login-or-register/LoginOrRegister.jsx";
import {useState} from "react";
import LoginBox from "@/autorisation/login/LoginBox.jsx";
import {usePublicCourses} from "@/api/hooks/usePublicCourses.js";

export default function CourseList() {
    const { courses } = usePublicCourses();
    const [modalState, changeModalState] = useState(0);

    const handleBuy = () => {
        changeModalState(1);
    };
    return (
        <>
            <div className="course-list" id="course-list">
                <CourseListHeader ></CourseListHeader>
                <div className="course-list-cards">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} from="public" onBuyClick={handleBuy}/>
                    ))}
                </div>
                <LoginOrRegister modalState={modalState} changeModalState={(arg) => changeModalState(arg)} />
                <LoginBox modalState={modalState} changeModalState={(arg) => changeModalState(arg)}/>
            </div>
        </>
    )
}
