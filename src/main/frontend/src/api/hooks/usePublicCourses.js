import {useEffect, useState} from "react";
import {normalizeCourses} from "@/api/hooks/course.mapper.js";
import {publicApi} from "../public.api.js";

export function usePublicCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await publicApi.getCoursePage({ offset: 0, count: 10 });
                setCourses(normalizeCourses(data));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    return { courses, loading, error};
}
