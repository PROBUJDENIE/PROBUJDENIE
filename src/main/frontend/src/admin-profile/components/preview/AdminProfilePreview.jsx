import "./adminProfilePreview.css"
import Container from "../../../main-page/compoents/content/Container.jsx";


export default function AdminProfilePreview() {
    return (
        <>
            <Container>
                <div className="profile-preview">
                    <div className="profile-preview-text">
                        <div className="profile-preview-text_title">Добро пожаловать!</div>
                        <div className="profile-preview-text_desc">Вы находитесь в режиме редактирования.</div>
                    </div>
                    <img className="profile-preview-img" src={"src/admin-profile/resources/images/profile_preview.png"} alt={""}></img>
                </div>
                <div className="profile-preview-header">Мои курсы: </div>
            </Container>
        </>
    )
}
