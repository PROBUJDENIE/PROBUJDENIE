import "../../../admin-profile/components/preview/adminProfilePreview.css"
import Container from "../../../main-page/compoents/content/Container.jsx";
import Image from "../../resources/images/profile_preview.png";

export default function TeacherProfilePreview() {
    return (
        <>
            <Container>
                <div className="profile-preview">
                    <div className="profile-preview-text">
                        <div className="profile-preview-text_title">Добро пожаловать, преподаватель!</div>
                        <div className="profile-preview-text_desc">Вы находитесь в режиме редактирования.</div>
                    </div>
                    <img className="profile-preview-img" src={Image} alt={""}></img>
                </div>
                <div className="profile-preview-header">Мои курсы: </div>
            </Container>
        </>
    )
}
