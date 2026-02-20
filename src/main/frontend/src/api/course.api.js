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
            }
        });


        const result = await response.json();
        const coursesWithPhotoUrl = result.data.map(course => ({
            ...course,
            photoUrl: course.photoId ? `${API_CONFIG.BASE_URL}/fileSaver/get?id=${course.photoId}` : null,
            photo: null
        }));

        return coursesWithPhotoUrl;
    },
    createCourse: async ({ course }) => {


        const url = `${API_CONFIG.BASE_URL}/course/create`;
        const body = { course };

        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const json = await result.json();

        return json.id;
    },
    updateCourse: async (course) => {
        const url = `${API_CONFIG.BASE_URL}/course/update`;
        const body = course;

        const result = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

    },

    deleteCourse: async (id) => {
        const url = `${API_CONFIG.BASE_URL}/course/delete/${id}`;

        const result = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

    },


    savePhotoMultipart: async (photoFile) => {
        const url = `${API_CONFIG.BASE_URL}/fileSaver/save`;

        const form = new FormData();
        form.append("file", photoFile);

        const res = await fetch(url, {
            method: "POST",
            body: form,
        });

        const json = await res.json();

        return json.id;
    },
};
