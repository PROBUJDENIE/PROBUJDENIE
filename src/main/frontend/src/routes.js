import {
    CONSTRUCTOR,
    COURSE_INFO,
    MAIN_ROUTE,
    ADMIN_PROFILE_ROUTE,
    USER_PROFILE_ROUTE,
    LectureContent, TEACHER_PROFILE_ROUTE
} from "./utils/constants.jsx";
import AdminProfile from "./admin-profile/AdminProfile.jsx";
import MainPage from "./main-page/MainPage.jsx";
import Constructor from "./constructor/Constructor.jsx";
import CourseInfo from "./course-info/CourseInfo.jsx";
import UserProfile from "./user-profile/UserProfile.jsx";
import Lecture from "@/lecture/Lecture.jsx";
import TeacherProfile from "@/teacher-profile/TeacherProfile.jsx";

export const authRoutes = [
    { path: ADMIN_PROFILE_ROUTE, Component: AdminProfile },
    { path: TEACHER_PROFILE_ROUTE, Component: TeacherProfile },
    { path: USER_PROFILE_ROUTE, Component: UserProfile },
    { path: CONSTRUCTOR, Component: Constructor },
    { path: LectureContent, Component: Lecture },
]

export const publicRoutes = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: COURSE_INFO, Component: CourseInfo },
]