import "./loginOrRegister.css"
import CommonBtn from "../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import Logo from "../../main-page/compoents/prototype/logo/Logo.jsx";
import login from "@/autorisation/resourses/login.svg";
import reg from "@/autorisation/resourses/reg.svg";

export default function LoginOrRegister({modalState, changeModalState}) {

    if (modalState !== 1) return null;

    return (
        <>
            <div className="welcome-overlay" onClick={() => changeModalState(0)}>
                <div className="welcome-block" onClick={e => e.stopPropagation()}>
                    <Logo onClick={() => {
                        changeModalState(0);
                    }}></Logo>

                    <div className="welcome-block_title"> Добро пожаловать!</div>
                    <div className="welcome-block_text"> Войдите или зарегистрируйтесь, чтобы начать обучение</div>

                    <div className="welcome-block_btns">
                        <CommonBtn leftIcon={<img src={login} height={30} width={30}/>} width={300} height={50} fontColor={"white"} bgColor={"#8A6CFF"} size={20} onClick={() => {changeModalState(2);}}>Войти</CommonBtn>

                        <CommonBtn leftIcon={<img src={reg} height={30} width={30}/>} width={300} height={50} bgColor={"#D2FE66"} borderColor={"#8A6CFF"} size={20} onClick={() => {changeModalState(3);}}>Зарегистрироваться</CommonBtn>

                        <div className="welcome-block_btns_line"></div>

                        <CommonBtn width={300} height={50} bgColor={"#DFD8D3"} borderColor={"white"} size={20} onClick={() => {changeModalState(6);}}>Войти как преподаватель</CommonBtn>

                        <CommonBtn width={300} height={50} bgColor={"#DFD8D3"} borderColor={"white"} size={20} onClick={() => {changeModalState(7);}}>Войти как администратор</CommonBtn>
                    </div>
                </div>
            </div>
        </>
    )
}