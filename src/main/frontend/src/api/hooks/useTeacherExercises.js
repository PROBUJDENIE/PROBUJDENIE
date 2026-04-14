import { useCallback, useEffect, useState } from "react";
import { teacherApi } from "@/api/teacher.api.js";
import { adminApi } from "@/api/admin.api.js";
import {useAuth} from "@/autorisation/AuthContext.jsx";

const getApiByRole = (role) => {
    return role === "ADMIN" ? adminApi : teacherApi;
};

export function useTeacherExercises(courseId) {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {getRole}=useAuth();
    const fetchExercises = useCallback(async () => {
        if (!courseId) return;

        setLoading(true);
        setError(null);

        try {
            const api = getApiByRole(getRole());
            const data = await api.getExercises(courseId);
            setExercises(data || []);
        } catch (err) {
            console.error("Ошибка загрузки заданий:", err);
            setError("Не удалось загрузить задания");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchExercises();
    }, [fetchExercises]);

    const createExercise = useCallback(async (exerciseData) => {
        if (!courseId) throw new Error("Нет ID курса");

        try {
            const api = getApiByRole(getRole());
            const created = await api.createExercise(courseId, {
                title: exerciseData.title,
                description: exerciseData.description,
                programmingLanguage: exerciseData.programmingLanguage,
                inputData: exerciseData.inputData,
                outputData: exerciseData.outputData,
                defaultCode: exerciseData.defaultCode,
                timeLimit: exerciseData.timeLimit,
                memoryLimit: exerciseData.memoryLimit
            });

            setExercises(prev => [...prev, created]);
            return created;
        } catch (err) {
            console.error("Ошибка создания задания:", err);
            throw err;
        }
    }, [courseId]);

    const deleteExercise = useCallback(async (exerciseId) => {
        try {
            const api = getApiByRole(getRole());
            await api.deleteExercise(exerciseId);
            setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
        } catch (err) {
            console.error("Ошибка удаления задания:", err);
            throw err;
        }
    }, []);

    const updateExercise = useCallback(
        async (exercise) => {
            if (!exercise?.id) throw new Error("Нет ID задания");

            const payload = {
                title: exercise.title,
                description: exercise.description,
                programmingLanguage: exercise.programmingLanguage,
                status: exercise.status ?? "READY",
                inputData: exercise.inputData,
                outputData: exercise.outputData,
                defaultCode: exercise.defaultCode
            };

            try {
                const api = getApiByRole(getRole());
                await api.updateExercise(exercise.id, payload);
                setExercises(prev =>
                    prev.map(ex => (ex.id === exercise.id ? { ...ex, ...payload } : ex))
                );
            } catch (err) {
                console.error("Ошибка обновления задания:", err);
                throw err;
            }
        },
        []
    );

    const updateExerciseLocal = (exercise) => {
        setExercises(prev =>
            prev.map(ex => ex.id === exercise.id ? exercise : ex)
        );
    };

    return {
        exercises,
        loading,
        error,
        createExercise,
        deleteExercise,
        updateExercise,
        refreshExercises: fetchExercises,
        updateExerciseLocal
    };
}