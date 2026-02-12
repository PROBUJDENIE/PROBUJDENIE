import { useEffect, useState } from "react";
import {sectionApi} from "@/api/section.api.js";

export const useSections = (courseId) => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!courseId) return;

        const loadSections = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await sectionApi.getSectionsByCourseId({
                    courseId,
                });

                setSections(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadSections();
    }, [courseId]);

    return { sections, loading, error };
};
