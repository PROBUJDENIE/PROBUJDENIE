import { useEffect, useState } from 'react';
import { courseApi } from '@/api/course.api.js';

export function useCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await courseApi.getCoursePage({
                    offset: 0,
                    count: 10,
                });
                setCourses(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    return { courses, loading, error };
}
