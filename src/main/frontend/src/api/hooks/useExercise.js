import { useEffect, useState } from "react";
import {studentApi} from "../student.api.js";
export function useExercise(exerciseId) {
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!exerciseId) return;

        const fetchExercise = async () => {
            try {
                setLoading(true);
                const data = await studentApi.getExercise(exerciseId);
                setExercise(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [exerciseId]);

    return { exercise, loading, error };
}