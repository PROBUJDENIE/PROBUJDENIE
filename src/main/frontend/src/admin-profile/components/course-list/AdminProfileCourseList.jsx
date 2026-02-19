import "./adminProfileCourseList.css"
import "./adminProfileCourseCard.css"
import Container from "../../../main-page/compoents/content/Container.jsx";
import noCourse from "../../../user-profile/resourses/images/noCourse.png";
import noCourseHover from "../../../user-profile/resourses/images/noCourseHover.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../../main-page/resources/images/book_white.svg";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {CONSTRUCTOR} from "@/utils/constants.jsx";
import AdminProfileCourseCard from "./AdminProfileCourseCard.jsx";
import AdminCourseCardAdd from "./add/AdminCourseCardAdd.jsx";
import Image from "../../resources/images/plus.png"
import {courseApi} from "@/api/course.api.js";
import {useCourses} from "@/api/hooks/useCourses.js";

export default function AdminProfileCourseList() {
    const { courses } = useCourses();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <Container>
                <div className="profile-course-list">
                    {courses.length > 0 ? (
                        <div className="profile-course-list-cards">
                            {courses.map((course, index) => (
                                <AdminProfileCourseCard key={index} src={course.photoUrl} course={course} onClick={() => navigate(`${CONSTRUCTOR}?id=${course.id}`)}></AdminProfileCourseCard>

                            ))}
                            <AdminCourseCardAdd src={Image} onClick={() => navigate(CONSTRUCTOR)}></AdminCourseCardAdd>
                        </div>
                    ) : (
                        <div
                            className="empty-profile-state"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <img
                                className={`empty-profile-state_img ${isHovered ? 'hover' : ''}`}
                                src={isHovered ? noCourseHover : noCourse}
                                alt="Нет курсов"
                            />
                            <div className="empty-profile-state_title">У вас еще нет курсов!</div>
                            <div className="empty-profile-state_text">
                                Создайте свой первый курс, чтобы начать обучение студентов.
                            </div>
                            <CommonBtn width={300} height={50} bgColor={"#8A6CFF"} fontColor={"white"} size={20} onClick={() => navigate(CONSTRUCTOR)} leftIcon={<img src={leftIcon} alt="книга" />}>Создать курс</CommonBtn>
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}