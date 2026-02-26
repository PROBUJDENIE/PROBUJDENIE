import ProfileHeader from "./components/header/ProfileHeader.jsx";
import UserProfilePreview from "./components/preview/UserProfilePreview.jsx";
import UserProfileCourseList from "./components/course-list/UserProfileCourseList.jsx";
import ModalAllCourses from "@/user-profile/components/modal-all-courses/ModalAllCourses.jsx";
import {useState} from "react";
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";

export default function UserProfile() {
    const openModal = () => changeModalState(5);
    const [modalState, changeModalState] = useState(0);

    return (
        <>
            <div className="profile-wrapper">
                <ProfileHeader></ProfileHeader>
                <UserProfilePreview></UserProfilePreview>
                <UserProfileCourseList onOpenModal={openModal}></UserProfileCourseList>
                <Bottom></Bottom>
            </div>
            <ModalAllCourses modalState={modalState} changeModalState={(arg) => changeModalState(arg)} />
        </>
    )

}
