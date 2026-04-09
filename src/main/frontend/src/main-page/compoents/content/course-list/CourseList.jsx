import "./courseList.css"
import CourseListHeader from "./course-list_header/CourseListHeader.jsx";
import CourseCard from "./course-list_content/course-card/CourseCard.jsx";
import LoginOrRegister from "@/autorisation/login-or-register/LoginOrRegister.jsx";
import {useState} from "react";
import LoginBox from "@/autorisation/login/LoginBox.jsx";
import {usePublicCourses} from "@/api/hooks/usePublicCourses.js";
import RegisterBox from "@/autorisation/register/RegisterBox.jsx";
import {PayModal} from "@/user-profile/components/pay-modal/PayModal.jsx";
import {useAuth} from "@/autorisation/AuthContext.jsx";


export default function CourseList() {
    const { courses } = usePublicCourses();
    const [modalState, changeModalState] = useState(0);
    const { isAuthenticated } = useAuth();
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleBuy = (course) => {
        if (!isAuthenticated) {
            changeModalState(1);
        } else {
            setSelectedCourse(course);
            changeModalState(4);
        }
    };
    const handlePaymentSuccess = () => {
        changeModalState(0);
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
                <RegisterBox modalState={modalState} changeModalState={(arg) => changeModalState(arg)}/>
                {isAuthenticated && <PayModal course={selectedCourse} modalState={modalState} changeModalState={changeModalState} onPaymentSuccess={handlePaymentSuccess}/>}
            </div>
        </>
    )
}
