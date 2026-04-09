import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, authRoutes } from "./routes.js";
import { MAIN_ROUTE} from "./utils/constants.jsx";
import CourseInfo from "@/course-info/CourseInfo.jsx";
import Lecture from "@/lecture/Lecture.jsx";
import {useAuth} from "@/autorisation/AuthContext.jsx";

const AppRouter = () => {
    const {isAuthenticated} = useAuth();
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={isAuthenticated ? <Component /> : <Navigate to={MAIN_ROUTE} replace />}/>
            ))}
            <Route path="/course/:id" element={<CourseInfo />} />
            <Route path="/lecture/:courseId" element={<Lecture />} />
        </Routes>
    );
};

export default AppRouter;