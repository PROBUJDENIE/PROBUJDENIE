import {API_CONFIG, getUrl, PUBLIC_ENDPOINTS} from './config';

export const publicApi = {
    getCoursePage: async ({offset = 0, count = 10}) => {
        const url = new URL(getUrl(PUBLIC_ENDPOINTS.GET_COURSE_PAGE));

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
            photoUrl: course.photoId ? getUrl(PUBLIC_ENDPOINTS.GET_FILE(course.photoId)) : null,
            photo: null
        }));

        return coursesWithPhotoUrl;
    },

    getSectionPage: async ({ courseId, offset = 0, count = 5}) => {
        const url = new URL(getUrl(PUBLIC_ENDPOINTS.GET_SECTION_PAGE(courseId)));

        url.searchParams.set('offset', offset);
        url.searchParams.set('count', count);

        const response = await fetch(url.toString(), {method: 'GET'});

        const result = await response.json();
        return result.data;
    },

    getLecturePage: async ({ sectionId, offset = 0, count = 20 }) => {
        const url = new URL(getUrl(PUBLIC_ENDPOINTS.GET_LECTURE_PAGE(sectionId)));

        url.searchParams.set("offset", offset);
        url.searchParams.set("count", count);

        const response = await fetch(url.toString(), {method: 'GET'});

        const result = await response.json();
        return result.data;
    },

    getLecture: async ({lectures, lectureId }) => {
        const lecture = lectures.find(lecture => String(lecture.id) === String(lectureId));

        let contentString = null;
        if (lecture.contentId) {
            const fileResponse = await fetch(
                getUrl(PUBLIC_ENDPOINTS.GET_FILE(lecture.contentId)),
            );

            contentString = await fileResponse.json();
        }

        return {
            ...lecture,
            content: contentString
        };
    }
};
