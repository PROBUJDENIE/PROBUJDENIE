import "./payModal.css";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../resourses/images/pay.svg";
import back from "../../resourses/images/pay-back.svg";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import hero from "../../resourses/images/hero_pay.svg"
export default function PayModal({ modalState, changeModalState, course }) {
     if (modalState !== 4) return null;

    return (
        <div className="modal-overlay" onClick={() => changeModalState(0)}>
            <div className="modal-pay" onClick={e => e.stopPropagation()}>
                <div className="modal-pay-container">
                    <div className="modal-pay-content">
                        <Logo></Logo>
                        <div className="modal-pay_title">Вы на шаг от цели!</div>
                        <div className="modal-pay_text">Осталось только подтвердить покупку курса</div>
                        <div className="modal-pay_desc">название курса: </div>
                        <div className="modal-pay_desc_info"> {course.title} </div>
                        <div className="modal-pay_desc">стоимость: </div>
                        <div className="modal-pay_desc_info"> {course.price} ₽ </div>
                        <div className="modal-pay_textt">Осталось только подтвердить покупку курса</div>
                        <div className="modal-pay_btns">
                            <CommonBtn
                                width={220}
                                height={56}
                                bgColor="#D2FE66"
                                borderColor="#8A6CFF"
                                fontColor="#000000"
                                size={18}
                                leftIcon={<img src={leftIcon} width={30} height={30} alt="книга" />}
                            >
                                Оплатить
                            </CommonBtn>
                            <CommonBtn
                                onClick={() => {
                                    changeModalState(0);
                                }}
                                width={220}
                                height={56}
                                borderColor="white"
                                fontColor="#000000"
                                size={18}
                                leftIcon={<img src={back} width={30} height={30} alt="книга" />}
                            >
                                Отменить
                            </CommonBtn>
                        </div>
                    </div>
                    <div className="modal-pay-image">
                        <img src={hero} height={600}  alt="Картинка" />
                    </div>
                </div>
            </div>
        </div>
    );
}