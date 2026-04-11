import "./profileHeader.css"
import Container from "../../../main-page/compoents/content/Container.jsx";
import Logo from "../../../main-page/compoents/prototype/logo/Logo.jsx";
import CircleImgBtn from "../../../main-page/compoents/prototype/btn/CircleImgBtn.jsx";
import {MAIN_ROUTE} from "@/utils/constants.jsx";
import {useNavigate} from "react-router-dom";
import profImage from "../../../main-page/resources/images/profileNew.png"
import {ProfileExit} from "@/modal-confirm/profile/ProfileExit.jsx";
import {useState} from "react";
import {MyProfileAdmin} from "@/modal-confirm/profile/MyProfileAdmin.jsx";
import {useAuth} from "@/autorisation/AuthContext.jsx";

export default function ProfileHeader() {
    const navigate = useNavigate();
    const [modalState, changeModalState] = useState(0);
    const {logout} = useAuth();
    return (
        <>
            <header className="profile-header">
                <Container>
                    <div className="profile-header_content">
                        <Logo onClick={() => navigate(MAIN_ROUTE)}></Logo>
                        <CircleImgBtn
                            size={45}
                            alt={"Личный кабинет"}
                            src={profImage}
                            backGround={115}
                            onClick={() => changeModalState(32)}
                        ></CircleImgBtn>
                    </div>
                </Container>
            </header>
            <ProfileExit onConfirm={logout} modalState={modalState} changeModalState={(arg) => changeModalState(arg)} />
            <MyProfileAdmin modalState={modalState} changeModalState={(arg) => changeModalState(arg)} />
        </>
    )
}
