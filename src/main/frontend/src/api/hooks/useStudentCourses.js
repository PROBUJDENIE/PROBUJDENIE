import {useState, useCallback, useEffect} from 'react';
import { studentApi } from '@/api/student.api.js';
import {useAuth} from "@/autorisation/AuthContext.jsx";

export const useStudentCourses = () => {
    const { isAuthenticated } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCourses = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        setError(null);
        try {
            const response = await studentApi.getMyCourses();
            console.log("getMyCourses response:", response);
            setCourses(response.data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const getPromoCodes = useCallback(async () => {
        try {
            const result = await studentApi.getPromoCodes();
            return result.data || [];
        } catch (err) {
            console.error('Error:', err);
            return [];
        }
    }, []);

    const buyCourse = useCallback(async (courseId, promoCodeId = null) => {
        setLoading(true);
        setError(null);
        try {
            const result = await studentApi.buyCourse(courseId, promoCodeId);
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
    }, [loadCourses, isAuthenticated]);

    return { courses, loading, error, loadCourses, buyCourse, getPromoCodes };
};