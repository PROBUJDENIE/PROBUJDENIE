import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, authRoutes } from "./routes.js";
import { LOGIN_OR_REGISTER } from "./utils/constants.jsx";
import CourseInfo from "@/course-info/CourseInfo.jsx";
import Lecture from "@/lecture/Lecture.jsx";

const isAuthenticated = () => !!localStorage.getItem("token");

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path}
                    element={isAuthenticated() ? <Component /> : <Navigate to={LOGIN_OR_REGISTER} replace />}
                />
            ))}

            <Route path="/course/:id" element={<CourseInfo />} />
            <Route path="/lecture/:courseId" element={<Lecture />} />
        </Routes>
    );
};

export default AppRouter;