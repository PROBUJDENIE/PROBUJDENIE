import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import {MAIN_ROUTE} from "./utils/constants.jsx";
import MainPage from "./main-page/MainPage.jsx";
import {publicRoutes} from "./routes.js";

const AppRouter = () => {
    return (
        <Routes>

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
