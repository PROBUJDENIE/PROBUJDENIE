import "./courseList.css"

import CourseListHeader from "./course-list_header/CourseListHeader.jsx";
import CourseCard from "./course-list_content/course-card/CourseCard.jsx";

export default function CourseList() {


    return (
        <>
            <div className="course-list" id="course-list">
                <CourseListHeader ></CourseListHeader>
                <div className="course-list-cards">
                    <CourseCard></CourseCard>
                    <CourseCard></CourseCard>
                    <CourseCard></CourseCard>
                    <CourseCard></CourseCard>
                    <CourseCard></CourseCard>
                    <CourseCard></CourseCard>
                    <CourseCard></CourseCard>
                    <CourseCard></CourseCard>
                </div>
            </div>
        </>
    )
}
