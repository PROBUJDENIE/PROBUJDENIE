import { useEffect, useState } from 'react';
import { courseApi } from '@/api/course.api.js';

export function useCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await courseApi.getCoursePage({ offset: 0, count: 10 });

                const normalized = (data ?? []).map((c) => {
                    const desc = c.description ?? "";

                    if (!desc.includes("#БЛОК#")) {
                        return { ...c, highlights: c.highlights ?? [] };
                    }

                    const [realDescRaw, afterRaw = ""] = desc.split("#БЛОК#");
                    const realDesc = realDescRaw.trim();

                    // highlights: берём строки после блока, режем по строкам и по "- "
                    const highlights = afterRaw
                        .split("-")
                        .map((s) => s.trim())
                        .filter(Boolean)

                    return {
                        ...c,
                        description: realDesc,
                        highlights,
                    };
                });

                setCourses(normalized);
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
