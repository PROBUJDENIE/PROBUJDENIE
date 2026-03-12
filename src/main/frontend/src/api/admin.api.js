import {API_CONFIG, ADMIN_ENDPOINTS, getUrl, PUBLIC_ENDPOINTS} from "./config";

export const adminApi = {
    getCourses: async ({ offset = 0, count = 10 } = {}) => {
        const url = new URL(API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.GET_COURSES);
        url.searchParams.append("offset", offset);
        url.searchParams.append("count", count);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        console.log(result);
        const coursesWithPhotoUrl = result.data.map(course => ({
            ...course,
            photoUrl: course.photoId ? getUrl(PUBLIC_ENDPOINTS.GET_FILE(course.photoId)) : null,
            photo: null
        }));

        return coursesWithPhotoUrl;
    },
    createCourse: async (course) => {
        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.CREATE_COURSE,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(course),
            }
        );

        const json = await response.json();
        return json.id;
    },

    updateCourse: async (course) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPDATE_COURSE(course.id),
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(course),
            }
        );
    },

    deleteCourse: async (id) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_COURSE(id),
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        );
    },

    savePhotoMultipart: async (photoFile) => {
        const form = new FormData();
        form.append("file", photoFile);

        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPLOAD_FILE,
            {
                method: "POST",
                body: form,
            }
        );

        const json = await response.json();
        return json.id;
    },
    createSection: async (courseId, section) => {
        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.CREATE_SECTION(courseId),
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(section),
            }
        );

        const json = await response.json();
        return json.data;
    },
    updateSection: async (section) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPDATE_SECTION(section.id),
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(section),
            }
        );
    },
    deleteSection: async (id) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_SECTION(id),
            {
                method: "DELETE"
            }
        );
    },
    createLecture: async (sectionId, lecture) => {
        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.CREATE_LECTURE(sectionId),
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lecture),
            }
        );

        const json = await response.json();
        return json.data;
    },
    updateLecture: async (lecture) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPDATE_LECTURE(lecture.id),
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lecture),
            }
        );
    },
    deleteLecture: async (id) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_LECTURE(id),
            {
                method: "DELETE"
            }
        );
    },

    getExercises: async (courseId) => {

        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.GET_EXERCISES(courseId),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const json = await response.json();

        return json.data;
    },

    createExercise: async (courseId, exercise) => {

        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.CREATE_EXERCISE(courseId),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(exercise)
            }
        );

        const json = await response.json();

        return json.data;
    },

    updateExercise: async (exerciseId, payload) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPDATE_EXERCISE(exerciseId),
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );
    },

    deleteExercise: async (exerciseId) => {

        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_EXERCISE(exerciseId),
            {
                method: "DELETE"
            }
        );
    },
};