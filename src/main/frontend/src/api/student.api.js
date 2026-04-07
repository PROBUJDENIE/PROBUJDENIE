import {API_CONFIG, getAuthHeaders, getUrl, PUBLIC_ENDPOINTS, STUDENT_ENDPOINTS} from './config';

export const studentApi = {
    getMyCourses: async () => {
        try {
            const response = await fetch(getUrl(STUDENT_ENDPOINTS.GET_MY_COURSES), {
                method: 'GET',
                headers: getAuthHeaders()
            });

            if (!response.ok) {throw new Error(`Error: ${response.status}`);}

            const result = await response.json();

            const coursesWithPhotoUrl = result.data?.map(course => ({
                ...course,
                photoUrl: course.photoId ? getUrl(PUBLIC_ENDPOINTS.GET_FILE(course.photoId)) : null})) || [];

            return {...result, data: coursesWithPhotoUrl};
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    buyCourse: async (courseId) => {
        try {
            const response = await fetch(getUrl(STUDENT_ENDPOINTS.BUY_COURSE(courseId)), {
                method: 'POST',
                headers: getAuthHeaders()
            });

            if (!response.ok) {throw new Error(`Error: ${response.status}`);}

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    getExercise: async (exerciseId) => {
        const response = await fetch(API_CONFIG.BASE_URL + STUDENT_ENDPOINTS.GET_EXERCISE(exerciseId),
            {
                method: "GET",
                headers: getAuthHeaders()
            }
        );

        if (!response.ok) {
            throw new Error("Ошибка загрузки задания");
        }

        const json = await response.json();

        return json.data;
    },
    getSubmission: async (exerciseId) => {
        try {
            const response = await fetch(getUrl(STUDENT_ENDPOINTS.GET_SUBMISSION(exerciseId)), {
                method: 'GET',
                headers: getAuthHeaders()
            });

            if (!response.ok && response.status !== 404) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    createSubmission: async (exerciseId, data) => {
        try {
            const response = await fetch(getUrl(STUDENT_ENDPOINTS.CREATE_SUBMISSION(exerciseId)), {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};