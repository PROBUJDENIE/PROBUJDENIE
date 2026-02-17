import "./courseList.css"

import CourseListHeader from "./course-list_header/CourseListHeader.jsx";
import CourseCard from "./course-list_content/course-card/CourseCard.jsx";
import {useCourses} from "@/api/hooks/useCourses.js";
import LoginOrRegister from "@/autorisation/login-or-register/LoginOrRegister.jsx";
import {useState} from "react";

export default function CourseList() {
    const { courses, loading, error } = useCourses();
    const readyCourses = courses.filter(course => course.status === 'READY');
    const [authState, changeAuthState] = useState(0);
    if (loading) return <div>Загрузка курсов...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (readyCourses.length === 0) return <div>Нет доступных курсов</div>;

    const handleBuy = () => {
        changeAuthState(1);
    };
    return (
        <>
            <div className="course-list" id="course-list">
                <CourseListHeader ></CourseListHeader>
                <div className="course-list-cards">
                    {readyCourses.map(course => (
                        <CourseCard key={course.id} course={course} from="public" onBuyClick={handleBuy}/>
                    ))}
                </div>
                <LoginOrRegister authState={authState} changeAuthState={(arg) => changeAuthState(arg)} />
            </div>
        </>
    )
}
