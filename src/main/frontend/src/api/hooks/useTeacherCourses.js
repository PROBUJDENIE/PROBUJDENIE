import { useCallback, useEffect, useState } from "react";
import { denormalizeCourse, normalizeCourses } from "@/api/hooks/course.mapper.js";
import { teacherApi } from "@/api/teacher.api.js";
import { adminApi } from "@/api/admin.api.js";
import {useAuth} from "@/autorisation/AuthContext.jsx";

const getApiByRole = (getRole) => {
    return getRole === "ADMIN" ? adminApi : teacherApi;
};

export function useTeacherCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {getRole}=useAuth();
    const api =  getApiByRole(getRole());

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await api.getCourses({ offset: 0, count: 10 });
                setCourses(normalizeCourses(data));
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, [api]);

    function createEmptyCourse() {
        return { id: null, title: "", description: "", highlights: [], price: 0, photoId: null, photo: null, sections: [] };
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
                payload.photoId = await api.savePhotoMultipart(payload.photo);
            } else {
                payload.photoId = null;
            }
            const newId = await api.createCourse(payload);

            const created = { ...payload, id: newId };
            const answer = denormalizeCourse(created);

            setCourses(prev => [answer, ...prev]);

            return created;
        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, [api]);

    const updateCourse = useCallback(async (courseDraft) => {
        setError(null);
        try {
            const payload = { ...courseDraft };

            if (payload.photo) {
                payload.photoId = await api.savePhotoMultipart(payload.photo);
            }

            const answer = denormalizeCourse(payload);
            await api.updateCourse(answer);

            setCourses(prev =>
                prev.map(c => (c.id === payload.id ? { ...c, ...payload } : c))
            );

            return payload;
        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, [api]);

    const saveCourse = useCallback(async (courseDraft) => {
        const hasId = !!courseDraft?.id;
        const exists = hasId && courses.some(c => c.id === courseDraft.id);

        return exists ? updateCourse(courseDraft) : createCourse(courseDraft);
    }, [courses, createCourse, updateCourse]);

    const deleteCourse = useCallback(async (id) => {
        if (!id) return;
        try {
            await api.deleteCourse(id);
            setCourses(prev =>
                prev.filter(c => c.id !== id)
            );
        } catch (e) {
            setError(e.message);
            throw e;
        }
    }, [api]);

    return { getCourse, deleteCourse, courses, loading, error, saveCourse, addOrUpdateCourse };
}