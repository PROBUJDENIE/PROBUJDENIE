import Container from "../../../main-page/compoents/content/Container.jsx";
import "./userProfileCourseList.css"
import noCourse from "../../resourses/images/noCourse.png";
import noCourseHover from "../../resourses/images/noCourseHover.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../../main-page/resources/images/book_white.svg";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../../utils/constants.jsx";

export default function UserProfileCourseList({ onOpenModal }) {
    const hasCourses = false;
    const [isHovered, setIsHovered] = useState(false);

    const handleChooseCourse = () => {
        onOpenModal();
    };
    return (
        <>
            <div>
                <Container>
                    <div className="profile-course-list">
                        {hasCourses ? (
                            <div className="profile-course-list-cards">

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
                                    Ознакомтесь с доступными курсами и выберите подходящий.
                                </div>
                                <CommonBtn
                                    width={300}
                                    height={50}
                                    bgColor={"#8A6CFF"}
                                    fontColor={"white"}
                                    size={20}
                                    leftIcon={<img src={leftIcon} alt="книга" />}
                                    onClick={handleChooseCourse}
                                >Выбрать курс</CommonBtn>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </>
    )
}