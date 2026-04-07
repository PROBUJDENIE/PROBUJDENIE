import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRegister() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ firstName: "", lastName: "", email: "", password: "", role:"STUDENT" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setField = (name) => (e) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
    };

    const submit = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/v1/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const response = await res.json();

            if (response.success === true) {
                return true;
            } else {
                setError(response.message ?? "Не удалось зарегистрироваться.");
                return false;
            }
        } catch (e) {
            setError("Ошибка сети. Попробуйте позже.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { values, setField, submit, loading, error };
}