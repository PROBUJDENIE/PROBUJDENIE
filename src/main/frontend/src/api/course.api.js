import {API_CONFIG, COURSE_ENDPOINTS} from './config';

export const courseApi = {
    getCoursePage: async ({offset = 0, count = 10}) => {
        const url = new URL(`${API_CONFIG.BASE_URL}${COURSE_ENDPOINTS.GET_PAGE}`);
        url.searchParams.set('offset', offset);
        url.searchParams.set('count', count);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при загрузке курсов');
        }

        const result = await response.json();
        const coursesWithPhotoUrl = result.data.map(course => ({
            ...course,
            photoUrl: course.photoId
                ? `${API_CONFIG.BASE_URL}/fileSaver/get?id=${course.photoId}`
                : null
        }));

        return coursesWithPhotoUrl;
    },
    getCourseById: async (id) => {
        const url = new URL(`${API_CONFIG.BASE_URL}${COURSE_ENDPOINTS.GET_PAGE}`);
        url.searchParams.set('offset', '0');
        url.searchParams.set('count', '20');

        const response = await fetch(url.toString());

        const result = await response.json();

        const course = result.data.find(c => c.id === id);

        return {
            ...course,
            photoUrl: course.photoId
                ? `${API_CONFIG.BASE_URL}/fileSaver/get?id=${course.photoId}`
                : null,
        };
    }
};
