import {useCallback, useEffect, useState} from "react";
import { courseApi } from "@/api/course.api.js";
import {denormalizeCourse, normalizeCourses} from "@/api/hooks/course.mapper.js";

export function useCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await courseApi.getCoursePageByStudent({ offset: 0, count: 10 });
                setCourses(normalizeCourses(data));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);


    function createEmptyCourse() {
        return {id: null, title: "", description: "", highlights: [], price: 0, photoId: null, photo: null};
    }

    const getCourse = useCallback((id) => {
        const data = courses.find(c => String(c.id) === String(id)) ?? null;
        if (!data) return createEmptyCourse();
        return data;
    }, [courses]);



    const createCourse = useCallback(async (courseDraft) => {
        setError(null);
        try {
            const payload = { ...courseDraft };

            if (payload.photo) {
                payload.photoId = await courseApi.savePhotoMultipart(payload.photo);
            }

            const newId = await courseApi.createCourse(courseDraft);
            const created = { ...payload, id: newId };


            const answer = denormalizeCourse(created);

            setCourses((prev) => [answer, ...prev]);


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
                payload.photoId = await courseApi.savePhotoMultipart(payload.photo);
            }

            setCourses((prev) =>
                prev.map((c) => (c.id === payload.id ? { ...c, ...payload } : c))
            );
            const answer = denormalizeCourse(courseDraft);
            await courseApi.updateCourse(answer);


        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, []);

    const saveCourse = useCallback(async (courseDraft) => {
        const hasId = !!courseDraft?.id;
        const exists = hasId && courses.some((c) => c.id === courseDraft.id);

        return exists ? updateCourse(courseDraft) : createCourse(courseDraft);
    }, [courses, createCourse, updateCourse]);

    const deleteCourse = useCallback(async (id) => {
        if (!id) return;
        await courseApi.deleteCourse(id);
        setCourses(prev =>
            prev.filter(c => c.id !== id)
        );
    }, []);

    return {getCourse, deleteCourse, courses, loading, error, saveCourse};
}
