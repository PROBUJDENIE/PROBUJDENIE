import { useEffect, useState } from "react";
import { lectureApi } from "@/api/lecture.api";

export const useLectures = (sectionId) => {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sectionId) return;

        const loadLectures = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await lectureApi.getLecturesBySectionId({
                    sectionId,
                });

                setLectures(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadLectures();
    }, [sectionId]);

    return { lectures, loading, error };
};
