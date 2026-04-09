import "./price.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "@/main-page/resources/images/book.svg";
import {useState} from "react";
import LoginOrRegister from "@/autorisation/login-or-register/LoginOrRegister.jsx";
import {PayModal} from "@/user-profile/components/pay-modal/PayModal.jsx";
import LoginBox from "@/autorisation/login/LoginBox.jsx";
import {useAuth} from "@/autorisation/AuthContext.jsx";

export default function Price({course}) {
    const [modalState, changeModalState] = useState(0);
    const { isAuthenticated } = useAuth();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const handleStart = (course) => {
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
            <div className="price">
                <div className="price_title">
                    Не упусти момент!
                </div>
                <div className="price_text">
                    Полный доступ ко всем модулям и материалам курса. Начните обучение сегодня.
                </div>
                <div className="price_number">
                    {course.price} ₽
                </div>
                <div className="course-content_btn">
                    <CommonBtn width={330} height={56} bgColor="#D2FE66" borderColor="#8A6CFF" fontColor="#000000" size={18} onClick={() => handleStart(course)} leftIcon={<img src={leftIcon} alt="книга" />}>Начать обучение</CommonBtn>
                </div>
            </div>
            <LoginOrRegister modalState={modalState} changeModalState={(arg) => changeModalState(arg)} />
            {isAuthenticated && <PayModal course={selectedCourse} modalState={modalState} changeModalState={changeModalState} onPaymentSuccess={handlePaymentSuccess} />}
            <LoginBox modalState={modalState} changeModalState={(arg) => changeModalState(arg)}/>
        </>
    )
}
