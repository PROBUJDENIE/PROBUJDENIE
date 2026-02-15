import "./courseList.css"

import CourseListHeader from "./course-list_header/CourseListHeader.jsx";
import CourseCard from "./course-list_content/course-card/CourseCard.jsx";
import {useCourses} from "@/api/hooks/useCourses.js";

export default function CourseList() {
    const { courses, loading, error } = useCourses();
    const readyCourses = courses.filter(course => course.status === 'READY');

    if (loading) return <div>Загрузка курсов...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (readyCourses.length === 0) return <div>Нет доступных курсов</div>;

    return (
        <>
            <div className="course-list" id="course-list">
                <CourseListHeader ></CourseListHeader>
                <div className="course-list-cards">
                    {readyCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </>
    )
}
