import "./courseList.css"
import CourseCardInUserList from "@/user-profile/components/course-list-of-user/course-list_content/course-card/CourseCardInUserList.jsx";
import {useAdminCourses} from "@/api/hooks/useAdminCourses.js";



export default function CourseListOfUser() {
    const { courses } = useAdminCourses();



    return (
        <>
            <div className="course-list" id="course-list">
                <div className="course-list-cards">
                    {courses.map(course => (
                        <CourseCardInUserList key={course.id} course={course} from="public" />
                    ))}
                </div>
            </div>
        </>
    )
}
