import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import {MAIN_ROUTE} from "./utils/constants.jsx";
import MainPage from "./main-page/MainPage.jsx";
import {publicRoutes} from "./routes.js";
import CourseInfo from "@/course-info/CourseInfo.jsx";
import Lecture from "@/lecture/Lecture.jsx";

const AppRouter = () => {
    return (
        <Routes>

            {publicRoutes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={<Component />}
                />
            ))}

            <Route path="/course/:id" element={<CourseInfo />} />
            <Route path="/lecture/:courseId" element={<Lecture/>} />
        </Routes>
    );
};

export default AppRouter;
