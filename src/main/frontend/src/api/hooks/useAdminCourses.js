import {useCallback, useEffect, useState} from "react";
import {denormalizeCourse, normalizeCourses} from "@/api/hooks/course.mapper.js";
import {adminApi} from "@/api/admin.api.js";

export function useAdminCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await adminApi.getCourses({ offset: 0, count: 10 });
                setCourses(normalizeCourses(data.filter(course => course.status !== "DELETED")));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);


    function createEmptyCourse() {
        return {id: null, title: "", description: "", highlights: [], price: 0, photoId: null, photo: null, sections: []};
    }

    const getCourse = useCallback((id) => {
        const data = courses.find(c => String(c.id) === String(id)) ?? null;
        if (!data) return createEmptyCourse();
        return data;
    }, [courses]);

    const addOrUpdateCourse = (course) => {
        setCourses(prev => {
            const exists = prev.some(c => c.id === course.id);
            return exists ? prev.map(c => c.id === course.id ? course : c) : [course, ...prev];
        });
    };


    const createCourse = useCallback(async (courseDraft) => {
        setError(null);
        try {
            const payload = { ...courseDraft };

            if (payload.photo) {
                payload.photoId = await adminApi.savePhotoMultipart(payload.photo);
            } else {
                payload.photoId = null;
            }
            const newId = await adminApi.createCourse(payload);

            const created = { ...payload, id: newId };
            const answer = denormalizeCourse(created);

            setCourses(prev => [answer, ...prev]);

            return created;
        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, []);

    const updateCourse = useCallback(async (courseDraft) => {
        setError(null);
        try {
            const payload = { ...courseDraft };

            if (payload.photo) {
                payload.photoId = await adminApi.savePhotoMultipart(payload.photo);
            }

            const answer = denormalizeCourse(payload);
            await adminApi.updateCourse(answer);

            setCourses(prev =>
                prev.map(c => (c.id === payload.id ? { ...c, ...payload } : c))
            );

            return payload;
        } catch (e) {sections: []
            setError(e.message);
            throw e;
        }
    }, []);

    const saveCourse = useCallback(async (courseDraft) => {
        const hasId = !!courseDraft?.id;
        const exists = hasId && courses.some(c => c.id === courseDraft.id);

        return exists ? updateCourse(courseDraft) : createCourse(courseDraft);
    }, [courses, createCourse, updateCourse]);

    const deleteCourse = useCallback(async (id) => {
        if (!id) return;
        await adminApi.deleteCourse(id);
        setCourses(prev =>
            prev.filter(c => c.id !== id)
        );
    }, []);

    return {getCourse, deleteCourse, courses, loading, error, saveCourse, addOrUpdateCourse};
}
