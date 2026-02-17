import ProfileHeader from "./components/header/ProfileHeader.jsx";
import UserProfilePreview from "./components/preview/UserProfilePreview.jsx";
import UserProfileCourseList from "./components/course-list/UserProfileCourseList.jsx";
import Header from "../main-page/compoents/content/hero/header/Header.jsx";
import LoginOrRegister from "@/autorisation/login-or-register/LoginOrRegister.jsx";
import ModalAllCourses from "@/user-profile/components/modal-all-courses/ModalAllCourses.jsx";
import {useState} from "react";


export default function UserProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <div className="profile-wrapper">
                <ProfileHeader></ProfileHeader>
                <UserProfilePreview></UserProfilePreview>
                <UserProfileCourseList onOpenModal={openModal}></UserProfileCourseList>
            </div>
            <ModalAllCourses
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    )
}
