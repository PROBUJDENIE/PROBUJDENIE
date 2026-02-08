import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useCourseStorage(courseId) {
    const [course, setCourse] = useState(null);

    function createEmptyCourse() {
        return {
            id: uuidv4(),
            title: "",
            desc: "",
            photo: "",
            highlights: [],
            sections: []
        };
    }

    // загрузка / создание
    useEffect(() => {
        const courses = JSON.parse(localStorage.getItem("courses")) || [];

        if (courseId) {
            const existing = courses.find(c => c.id === courseId);
            if (existing) {
                setCourse(existing);
                return;
            }
        }

        setCourse(createEmptyCourse());
    }, [courseId]);

    // автосохранение
    useEffect(() => {
        if (!course) return;

        const courses = JSON.parse(localStorage.getItem("courses")) || [];
        const index = courses.findIndex(c => c.id === course.id);

        if (index !== -1) {
            courses[index] = course;
        } else {
            courses.push(course);
        }

        localStorage.setItem("courses", JSON.stringify(courses));
    }, [course]);

    function saveCourse() {
        const courses = JSON.parse(localStorage.getItem("courses")) || [];

        const index = courses.findIndex(c => c.id === course.id);

        if (index !== -1) {
            courses[index] = course; // update
        } else {
            courses.push(course); // create
        }

        localStorage.setItem("courses", JSON.stringify(courses));
    }



    function setField(name, value) {
        setCourse(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return { course, setCourse, saveCourse, setField };
}
