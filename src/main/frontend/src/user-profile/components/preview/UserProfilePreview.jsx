import "./userProfilePreview.css"
import Container from "../../../main-page/compoents/content/Container.jsx";


export default function UserProfilePreview() {
    return (
        <>
            <Container>
                <div className="profile-preview">
                    <div className="profile-preview-text">
                        <div className="profile-preview-text_title">Добро пожаловать, студент!</div>
                        <div className="profile-preview-text_desc">Твой путь к знаниям начинается здесь.  Не пропусти важное...</div>
                    </div>
                    <img className="profile-preview-img" src={"src/admin-profile/resources/images/profile_preview.png"} alt={""}></img>
                </div>
                <div className="profile-preview-header">Мои курсы: </div>
            </Container>
        </>
    )
}
