import "./profileHeader.css"
import Container from "../../../main-page/compoents/content/Container.jsx";
import Logo from "../../../main-page/compoents/prototype/logo/Logo.jsx";
import CircleImgBtn from "../../../main-page/compoents/prototype/btn/CircleImgBtn.jsx";
import {MAIN_ROUTE} from "../../../utils/constants.jsx";
import {useNavigate} from "react-router-dom";


export default function ProfileHeader() {
    const navigate = useNavigate();
    return (
        <>
            <header className="profile-header">
                <Container>
                    <div className="profile-header_content">
                        <Logo onClick={() => navigate(MAIN_ROUTE)}></Logo>
                        <CircleImgBtn
                            size={45}
                            alt={"Личный кабинет"}
                            src={"src/main-page/resources/images/profile.png"}
                        ></CircleImgBtn>
                    </div>

                </Container>

            </header>

        </>
    )
}
