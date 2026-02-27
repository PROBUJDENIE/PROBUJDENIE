import { useEffect, useState } from "react";

export function usePersistedCode(exerciseId, defaultCode = "") {
    const [code, setCode] = useState("");

    useEffect(() => {
        if (!exerciseId) return;

        const key = `exercise_code_${exerciseId}`;
        const savedCode = localStorage.getItem(key);

        if (savedCode !== null) {
            setCode(savedCode);
        } else {
            setCode(defaultCode);
        }
    }, [exerciseId, defaultCode]);

    useEffect(() => {
        if (!exerciseId || code === "") return;

        const key = `exercise_code_${exerciseId}`;
        localStorage.setItem(key, code);
    }, [code, exerciseId]);

    return { code, setCode };
}