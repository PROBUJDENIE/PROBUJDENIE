import Container from "../../../main-page/compoents/content/Container.jsx";
import "./userProfileCourseList.css"
import noCourse from "../../resourses/images/noCourse.png";
import noCourseHover from "../../resourses/images/noCourseHover.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../../main-page/resources/images/book_white.svg";
import { useState} from "react";
import CourseCardInUserList from "@/user-profile/components/course-list-of-user/course-list_content/course-card/CourseCardInUserList.jsx";
import {useStudentCourses} from "@/api/hooks/useStudentCourses.js";
import add from "../../resourses/images/add_courses.svg"

export default function UserProfileCourseList({ onOpenModal }) {
    const [isHovered, setIsHovered] = useState(false);
    const {courses: purchasedCourses, loading, error} = useStudentCourses();

    const handleChooseCourse = () => {
        onOpenModal();
    };
    if (loading) {return <div>Загрузка курсов...</div>;}

    if (error) {return <div>Ошибка: {error}</div>;}

    return (
        <>
            <div>
                <Container>
                    <div className="profile-course-list">
                        {purchasedCourses.length > 0 ? (
                            <div className="profile-course-list-cards">
                                {purchasedCourses.map(course => (<CourseCardInUserList key={course.id} course={course} from="cabinet"/>))}
                                <button className={"btnr"} onClick={handleChooseCourse}><img src={add}/> </button>
                            </div>
                        ) : (
                            <div className="empty-profile-state" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                <img className={`empty-profile-state_img ${isHovered ? 'hover' : ''}`} src={isHovered ? noCourseHover : noCourse} alt="Нет курсов"/>
                                <div className="empty-profile-state_title">У вас еще нет курсов!</div>
                                <div className="empty-profile-state_text">Ознакомтесь с доступными курсами и выберите подходящий.</div>
                                <CommonBtn width={300} height={50} bgColor={"#8A6CFF"} fontColor={"white"} size={20} leftIcon={<img src={leftIcon} alt="книга" />} onClick={handleChooseCourse}>Выбрать курс</CommonBtn>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </>
    )
}