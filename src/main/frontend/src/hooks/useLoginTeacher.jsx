import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function useLoginTeacher() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const setField = (name) => (e) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
    };



    const submit = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/v1/auth/login/teacher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const response = await res.json();
            if (response.success === true) {
                navigate("/admin-profile");
                localStorage.setItem("token", response.token);
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
