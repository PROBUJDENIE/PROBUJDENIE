import {useCallback, useEffect, useState} from "react";
import {publicApi} from "@/api/public.api.js";

export const useLectures = (sectionId) => {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sectionId === null) {
            setLectures([]);
            return;
        }
        const loadSections = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await publicApi.getLecturePage({sectionId:sectionId, offset: 0, count: 10 });
                setLectures(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadSections();
    }, [sectionId]);

    const getLecture = useCallback(async (lectureId) => {
        if (!lectureId) return null;

        try {
            const lecture = await publicApi.getLecture({ lectures: lectures, lectureId: lectureId });
            return lecture;
        } catch (err) {
            console.error("Ошибка при загрузке лекции:", err);
        }
    }, [lectures]);

    return {getLecture, lectures, loading, error};
};
