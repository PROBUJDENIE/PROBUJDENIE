import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {useCourses} from "@/api/hooks/useCourses.js";

export function useCourseStorage(courseId) {
    const { courses } = useCourses();

    const [course, setCourse] = useState(null);

    function createEmptyCourse() {
        return {
            id: uuidv4(),
            title: "",
            description: "",
            photoUrl: ""
        };
    }

    // загрузка / создание
    useEffect(() => {

        if (courseId) {
            const existing = courses.find(c => c.id === courseId);
            if (existing) {
                setCourse(existing);
                return;
            }
        }

        setCourse(createEmptyCourse());
    }, [courseId]);







    function setField(name, value) {
        setCourse(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return { course, setCourse, setField};
}
