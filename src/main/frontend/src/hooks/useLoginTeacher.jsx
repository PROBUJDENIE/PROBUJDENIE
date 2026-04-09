import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/autorisation/AuthContext.jsx";

export function useLoginTeacher() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", password: "", role:"TEACHER" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const setField = (name) => (e) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
    };
    const {login} = useAuth();
    const submit = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/v1/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const response = await res.json();
            if (response.success === true) {
                login("TEACHER",response.token);
                navigate("/teacher-profile");
            }else {
                setError("Не удалось войти. Проверьте данные.");
            }
        }catch (e){
            setError("Не удалось войти. Проверьте данные.");
        }
        finally {
            setLoading(false);
        }
    };

    return { values, setField, submit, loading, error };
}
