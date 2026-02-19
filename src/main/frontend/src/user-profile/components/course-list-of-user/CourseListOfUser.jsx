import "./courseList.css"
import CourseCardInUserList from "@/user-profile/components/course-list-of-user/course-list_content/course-card/CourseCardInUserList.jsx";

import {useCourses} from "@/api/hooks/useCourses.js";



export default function CourseListOfUser() {
    const { courses } = useCourses();
    const readyCourses = courses.filter(course => course.status === 'READY');



    return (
        <>
            <div className="course-list" id="course-list">
                <div className="course-list-cards">
                    {readyCourses.map(course => (
                        <CourseCardInUserList key={course.id} course={course} from="public" />
                    ))}
                </div>
            </div>
        </>
    )
}
