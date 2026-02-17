import "./loginOrRegister.css"
import CommonBtn from "../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import Logo from "../../main-page/compoents/prototype/logo/Logo.jsx";
import {useNavigate} from "react-router-dom";

export default function LoginOrRegister({authState, changeAuthState}) {
    const navigate = useNavigate();

    if (authState !== 1) return null;

    return (
        <>
            <div className="welcome-overlay" onClick={() => changeAuthState(0)}>
                <div className="welcome-block" onClick={e => e.stopPropagation()}>
                    <Logo onClick={() => {
                        changeAuthState(0);
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
                                changeAuthState(2);
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
                                changeAuthState(0);
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
                                changeAuthState(0);
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
                                changeAuthState(0);
                            }}
                        >Войти как администратор</CommonBtn>
                    </div>
                </div>
            </div>
        </>
    )
}