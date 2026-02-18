import "./header.css"
import Logo from "../../../prototype/logo/Logo.jsx";
import profileImg from "@/main-page/resources/images/profileNew.png";
import Container from "../../Container.jsx";
import CircleImgBtn from "../../../prototype/btn/CircleImgBtn.jsx";
import NavigationHedear from "./NavigationHedear.jsx";
import { useNavigate } from "react-router-dom";
import {MAIN_ROUTE} from "@/utils/constants.jsx";
import LoginOrRegister from "../../../../../autorisation/login-or-register/LoginOrRegister.jsx";
import {useHeaderVisibility} from "@/hooks/useHeaderVisibility.jsx";
import {useState} from "react";
import LoginBox from "@/autorisation/login/LoginBox.jsx";
import LoginBoxTeacher from "@/autorisation/login-teacher/LoginBoxTeacher.jsx";

export default function Header() {
    const navigate = useNavigate();
    const [modalState, changeModalState] = useState(0);

    const { isHeaderVisible } = useHeaderVisibility();
    return (
        <>
            <header className={`header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
                <Container>
                    <div className="header_content" id={"header"}>
                        <Logo onClick={() => navigate(MAIN_ROUTE)}></Logo>
                        <NavigationHedear></NavigationHedear>
                        <CircleImgBtn
                            size={45}
                            alt={"Личный кабинет"}
                            src={profileImg}
                            onClick={() => changeModalState(1)}
                            backGround={115}
                        ></CircleImgBtn>
                    </div>
                </Container>
            </header>

            <LoginOrRegister modalState={modalState} changeModalState={(arg) => changeModalState(arg)}/>

            <LoginBox modalState={modalState} changeModalState={(arg) => changeModalState(arg)}/>

            <LoginBoxTeacher modalState={modalState} changeModalState={(arg) => changeModalState(arg)} />
        </>
    )
}