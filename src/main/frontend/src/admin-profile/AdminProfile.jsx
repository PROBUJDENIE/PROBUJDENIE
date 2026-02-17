import ProfileHeader from "./components/header/ProfileHeader.jsx";
import AdminProfilePreview from "./components/preview/AdminProfilePreview.jsx";
import AdminProfileCourseList from "./components/course-list/AdminProfileCourseList.jsx";
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";


export default function AdminProfile() {
    return (
        <>
            <div className="profile-wrapper">
                <ProfileHeader></ProfileHeader>
                <AdminProfilePreview></AdminProfilePreview>
                <AdminProfileCourseList></AdminProfileCourseList>
                <Bottom></Bottom>
            </div>
        </>
    )
}
