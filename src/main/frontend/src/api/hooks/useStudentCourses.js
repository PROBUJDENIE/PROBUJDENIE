import { useState, useEffect, useCallback } from 'react';
import { studentApi } from '@/api/student.api.js';

export const useStudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await studentApi.getMyCourses();
            setCourses(response.data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const buyCourse = useCallback(async (courseId) => {
        setLoading(true);
        setError(null);
        try {
            const result = await studentApi.buyCourse(courseId);
            if (result.success) {
                await loadCourses();
                return { success: true, data: result };
            } else {
                setError(result.errors?.join(', ') || 'Ошибка при покупке курса');
                return { success: false, errors: result.errors };
            }
        } catch (err) {
            setError(err.message);
            return { success: false, errors: [err.message] };
        } finally {
            setLoading(false);
        }
    }, [loadCourses]);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    return {courses, loading, error, loadCourses, buyCourse};
};