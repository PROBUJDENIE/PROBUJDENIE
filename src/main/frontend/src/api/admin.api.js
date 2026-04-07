import {API_CONFIG, ADMIN_ENDPOINTS, getUrl, PUBLIC_ENDPOINTS, getAuthHeaders} from "./config";

export const adminApi = {
    getCourses: async ({ offset = 0, count = 10 } = {}) => {
        const url = new URL(API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.GET_COURSES);
        url.searchParams.append("offset", offset);
        url.searchParams.append("count", count);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const result = await response.json();
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
                headers: getAuthHeaders(),
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
                headers: getAuthHeaders(),
                body: JSON.stringify(course),
            }
        );
    },

    deleteCourse: async (id) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_COURSE(id),
            {
                method: "DELETE",
                headers: getAuthHeaders(),
            }
        );
    },

    savePhotoMultipart: async (photoFile) => {
        const form = new FormData();
        form.append("file", photoFile);

        const token = localStorage.getItem('token');
        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPLOAD_FILE,
            {
                method: "POST",
                body: form,
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            }
        );

        const json = await response.json();
        return json.id;
    },

    updateFileMultipart: async (fileId, file) => {
        const form = new FormData();
        form.append("file", file);

        const token = localStorage.getItem('token');
        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.GET_FILE(fileId),
            {
                method: "POST",
                body: form,
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
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
                headers: getAuthHeaders(),
                body: JSON.stringify(section),
            }
        );

        const json = await response.json();
        return json.data;
    },

    updateSection: async ({ id, title, orderNumber }) => {
        const payload = { title, orderNumber };
        await fetch(API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPDATE_SECTION(id), {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
        });
    },

    deleteSection: async (id) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_SECTION(id),
            {
                method: "DELETE",
                headers: getAuthHeaders(),
            }
        );
    },

    createLecture: async (sectionId, lecture) => {
        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.CREATE_LECTURE(sectionId),
            {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(lecture),
            }
        );

        const json = await response.json();
        return json.data;
    },

    updateLecture: async (lecture) => {
        const payload = {
            title: lecture.title,
            orderNumber: lecture.orderNumber,
            contentId: lecture.contentId
        };

        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.UPDATE_LECTURE(lecture.id),
            {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify(payload),
            }
        );
    },

    deleteLecture: async (id) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_LECTURE(id),
            {
                method: "DELETE",
                headers: getAuthHeaders(),
            }
        );
    },

    getExercises: async (courseId) => {
        const response = await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.GET_EXERCISES(courseId),
            {
                method: "GET",
                headers: getAuthHeaders(),
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
                headers: getAuthHeaders(),
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
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            }
        );
    },

    deleteExercise: async (exerciseId) => {
        await fetch(
            API_CONFIG.BASE_URL + ADMIN_ENDPOINTS.DELETE_EXERCISE(exerciseId),
            {
                method: "DELETE",
                headers: getAuthHeaders(),
            }
        );
    },
};