import "./loginOrRegister.css"
import CommonBtn from "../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import {MAIN_ROUTE} from "../../utils/constants.jsx";
import Logo from "../../main-page/compoents/prototype/logo/Logo.jsx";
import {useNavigate} from "react-router-dom";

export default function LoginOrRegister({isOpen, onClose}) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <>
            <div className="welcome-overlay" onClick={onClose}>
                <div className="welcome-block" onClick={e => e.stopPropagation()}>
                    <Logo onClick={() => {
                        navigate(MAIN_ROUTE);
                        onClose();
                    }}></Logo>

                    <div className="welcome-block_title"> Добро пожаловать!</div>
                    <div className="welcome-block_text"> Войдите или зарегистрируйтесь, чтобы начать обучение</div>

                    <div className="welcome-block_btns">
                        <CommonBtn
                            width={300}
                            height={50}
                            fontColor={"white"}
                            bgColor={"#8A6CFF"}
                            size={20}
                            onClick={() => {
                                navigate("/user-profile");
                                onClose();
                            }}
                        >Войти</CommonBtn>

                        <CommonBtn
                            width={300}
                            height={50}
                            bgColor={"#D2FE66"}
                            borderColor={"#8A6CFF"}
                            size={20}
                            onClick={() => {
                                navigate("/user-profile");
                                onClose();
                            }}
                        >Зарегистрироваться</CommonBtn>

                        <div className="welcome-block_btns_line"></div>

                        <CommonBtn
                            width={300}
                            height={50}
                            bgColor={"#DFD8D3"}
                            borderColor={"white"}
                            size={20}
                            onClick={() => {
                                navigate("/admin-profile");
                                onClose();
                            }}
                        >Войти как преподаватель</CommonBtn>

                        <CommonBtn
                            width={300}
                            height={50}
                            bgColor={"#DFD8D3"}
                            borderColor={"white"}
                            size={20}
                            onClick={() => {
                                navigate("/admin-profile");
                                onClose();
                            }}
                        >Войти как администратор</CommonBtn>
                    </div>
                </div>
            </div>
        </>
    )
}