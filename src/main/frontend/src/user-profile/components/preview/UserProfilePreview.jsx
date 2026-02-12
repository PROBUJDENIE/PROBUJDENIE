import "./userProfilePreview.css"
import Container from "../../../main-page/compoents/content/Container.jsx";
import Image from "../../../admin-profile/resources/images/profile_preview.png"

export default function UserProfilePreview() {
    return (
        <>
            <Container>
                <div className="profile-preview">
                    <div className="profile-preview-text">
                        <div className="profile-preview-text_title">Добро пожаловать, студент!</div>
                        <div className="profile-preview-text_desc">Твой путь к знаниям начинается здесь.  Не пропусти важное...</div>
                    </div>
                    <img className="profile-preview-img" src={Image} alt={""}></img>
                </div>
                <div className="profile-preview-header">Мои курсы: </div>
            </Container>
        </>
    )
}
