import {useCallback, useEffect, useMemo, useState} from "react";
import { courseApi } from "@/api/course.api.js";
import {denormalizeCourse, normalizeCourses} from "@/api/hooks/course.mapper.js";

export function useCourses({ id } = {}) {
    const [courses, setCourses] = useState([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await courseApi.getCoursePage({ offset: 0, count: 10 });
                setCourses(normalizeCourses(data));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);


    const course = useMemo(() => {
        if (!id) return null;
        return courses.find((c) => c.id === id) ?? null;
    }, [id, courses]);



    const createCourse = useCallback(async (courseDraft) => {
        setSaving(true);
        setError(null);
        try {
            const payload = { ...courseDraft };

            if (payload.photo) {
                payload.photoId = await courseApi.savePhotoMultipart(payload.photo);
            }

            const newId = await courseApi.createCourse({ payload });

            const created = { ...payload, id: newId };
            setCourses((prev) => [created, ...prev]);

        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setSaving(false);
        }
    }, []);

    const updateCourse = useCallback(async (courseDraft) => {
        setSaving(true);
        setError(null);
        try {
            const payload = { ...courseDraft };
            if (payload.photo) {
                payload.photoId = await courseApi.savePhotoMultipart(payload.photo);
            }

            await courseApi.updateCourse(payload);

            setCourses((prev) =>
                prev.map((c) => (c.id === payload.id ? { ...c, ...payload } : c))
            );

        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setSaving(false);
        }
    }, []);

    const saveCourse = useCallback(async (courseDraft) => {
        const payload = denormalizeCourse(courseDraft);
        const hasId = !!payload?.id;
        const exists = hasId && courses.some((c) => c.id === payload.id);

        return exists ? updateCourse(payload) : createCourse(payload);
    }, [courses, createCourse, updateCourse]);

    const deleteCourse = useCallback(async (id) => {
        if (!id) return;
        await courseApi.deleteCourse(id);
        setCourses(prev =>
            prev.filter(c => c.id !== id)
        );
    }, []);

    return {course, deleteCourse, courses, loading, saving, error, saveCourse};
}
