import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {useCourses} from "@/api/hooks/useCourses.js";

export function useCourseStorage(courseId) {

    const { courses, loading } = useCourses();
    const [course, setCourse] = useState(null);

    function createEmptyCourse() {
        return {id: uuidv4(), title: "", description: "", photoUrl: ""};
    }

    useEffect(() => {
        if (loading) return;
        console.log("по идее иду в базу");
        if (courseId) {
            const existing = courses.find(c => c.id === courseId);
            console.log("по идее нашел курсы");
            console.log(courses);
            if (existing) {
                setCourse(existing);
                return;
            }
        }

        setCourse(createEmptyCourse());
    }, [courseId, courses, loading]);







    function setField(name, value) {
        setCourse(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return { course, setCourse, setField, loading};
}
