import "./index.css"
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter.jsx";
import {AuthProvider} from "@/autorisation/AuthContext.jsx";


export function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthProvider>
    )
}
