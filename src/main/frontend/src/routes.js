import {
    CONSTRUCTOR,
    COURSE_INFO,
    MAIN_ROUTE,
    ADMIN_PROFILE_ROUTE,
    USER_PROFILE_ROUTE,
    LOGIN_OR_REGISTER, LectureContent
} from "./utils/constants.jsx";
import AdminProfile from "./admin-profile/AdminProfile.jsx";
import MainPage from "./main-page/MainPage.jsx";
import Constructor from "./constructor/Constructor.jsx";
import CourseInfo from "./course-info/CourseInfo.jsx";
import UserProfile from "./user-profile/UserProfile.jsx";
import LoginOrRegister from "./autorisation/login-or-register/LoginOrRegister.jsx";
import Lecture from "@/lecture/Lecture.jsx";

export const authRoutes = [
    { path: ADMIN_PROFILE_ROUTE, Component: AdminProfile },
    { path: USER_PROFILE_ROUTE, Component: UserProfile },
    { path: CONSTRUCTOR, Component: Constructor },
    { path: LectureContent, Component: Lecture },
]

export const publicRoutes = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: COURSE_INFO, Component: CourseInfo },
    { path: LOGIN_OR_REGISTER, Component: LoginOrRegister },
]