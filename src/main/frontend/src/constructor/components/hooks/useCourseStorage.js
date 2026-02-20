import { useEffect, useState, useCallback } from "react";
import { useCourses } from "@/api/hooks/useCourses.js";

export function useCourseStorage(id) {
    const {
        courses,
        loading,
        saveCourse,
        deleteCourse
    } = useCourses({ id });

    const [course, setCourse] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    function createEmptyCourse() {
        return {id: null, title: "", description: "", price: 0, photoId: null, photo: null};
    }

    useEffect(() => {
        if (loading) return;

        if (id) {
            const existing = courses.find(c => c.id === id);
            if (existing) {
                setCourse({ ...existing });
                return;
            }
        }

        setCourse(createEmptyCourse());
    }, [id, courses, loading]);

    const setField = useCallback((name, value) => {
        setCourse(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSave = useCallback(async (draft = course) => {
        if (!draft) return;

        setSaving(true);
        setError(null);

        try {
            const saved = await saveCourse(draft);
            setCourse(saved);
            return saved;
        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setSaving(false);
        }
    }, [course, saveCourse]);

    const handleDeleteCourse = useCallback(async (id) => {
        await deleteCourse(id);
    },[]);


    return {course, handleDeleteCourse, setField,setCourse , handleSave, loading, saving, error};
}
