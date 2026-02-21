import { useEffect, useState, useCallback } from "react";

export function useCourseStorage({id, getCourse}) {


    const [course, setCourse] = useState(null);

    function createEmptyCourse() {
        return {id: null, title: "", description: "", price: 0, photoId: null, photo: null};
    }

    useEffect(() => {
        const temp = getCourse(id);
        if (temp) {
            setCourse(temp);
            return;
        }
        setCourse(createEmptyCourse());
    }, [id, getCourse]);

    const setField = useCallback((name, value) => {
        setCourse(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);



    return {course, setField};
}
