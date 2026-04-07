import ProfileHeader from "./components/header/ProfileHeader.jsx";
import AdminProfileCourseList from "./components/course-list/AdminProfileCourseList.jsx";
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";
import TeacherProfilePreview from "@/teacher-profile/components/preview/TeacherProfilePreview.jsx";

export default function TeacherProfile() {
    return (
        <>
            <div className="profile-wrapper">
                <ProfileHeader></ProfileHeader>
                <TeacherProfilePreview></TeacherProfilePreview>
                <AdminProfileCourseList></AdminProfileCourseList>
                <Bottom></Bottom>
            </div>
        </>
    )
}
