import "./payModal.css";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../resourses/images/pay.svg";
import back from "../../resourses/images/pay-back.svg";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import hero from "../../resourses/images/hero_pay.svg";
import { useState } from "react";
import {useStudentCourses} from "@/api/hooks/useStudentCourses.js";


export function PayModal({modalState, changeModalState, course, onPaymentSuccess}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const {buyCourse} = useStudentCourses();

    if (modalState !== 4 || !course) return null;

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await buyCourse(course.id);

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    changeModalState(0);
                    if (onPaymentSuccess) {
                        onPaymentSuccess();
                    }
                }, 1800);
            } else {
                const errorMsg = result.errors?.join(', ') || 'Не удалось приобрести курс';
                setError(errorMsg);
            }
        } catch (err) {
            console.error("Ошибка при покупке:", err);
            setError(err.message || 'Произошла непредвиденная ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={() => changeModalState(0)}>
            <div className="modal-pay" onClick={e => e.stopPropagation()}>
                <div className="modal-pay-container">
                    <div className="modal-pay-content">
                        <Logo/>

                        {success ? (
                            <>
                                <div className="modal-pay_title">Поздравляем! 🎉</div>
                                <div className="modal-pay_text">Курс успешно приобретен!</div>
                                <div className="modal-pay_desc_info">Обновите страницу и приступайте к обучению</div>
                            </>
                        ) : (
                            <>
                                <div className="modal-pay_title">Вы на шаг от цели!</div>
                                <div className="modal-pay_text">Осталось только подтвердить покупку курса</div>

                                <div className="modal-pay_desc">Название курса:</div>
                                <div className="modal-pay_desc_info">{course?.title}</div>

                                <div className="modal-pay_desc">Стоимость:</div>
                                <div className="modal-pay_desc_info">{course?.price} ₽</div>

                                <div className="modal-pay_btns">
                                    <CommonBtn width={220} height={56} bgColor="#D2FE66" borderColor="#8A6CFF" fontColor="#000000" size={18} leftIcon={<img src={leftIcon} width={30} height={30} alt="оплатить"/>} onClick={handlePayment} disabled={loading}>{loading ? 'Обработка...' : 'Оплатить'}</CommonBtn>
                                    <CommonBtn onClick={() => {changeModalState(5);setError(null);}} width={220} height={56} borderColor="white" fontColor="#000000" size={18} leftIcon={<img src={back} width={30} height={30} alt="назад"/>} disabled={loading}>Отменить</CommonBtn>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-pay-image">
                        <img src={hero} height={600} alt="Картинка"/>
                    </div>
                </div>
            </div>
        </div>
    );
}