import ProfileHeader from "./components/header/ProfileHeader.jsx";
import UserProfilePreview from "./components/preview/UserProfilePreview.jsx";
import UserProfileCourseList from "./components/course-list/UserProfileCourseList.jsx";
import Header from "../main-page/compoents/content/hero/header/Header.jsx";


export default function UserProfile() {
    return (
        <>
            <div className="profile-wrapper">
                <ProfileHeader></ProfileHeader>
                <UserProfilePreview></UserProfilePreview>
                <UserProfileCourseList></UserProfileCourseList>
            </div>
        </>
    )
}
