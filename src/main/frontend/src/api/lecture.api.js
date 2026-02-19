import {API_CONFIG} from "./config";

export const lectureApi = {
    getLecturesBySectionId: async ({ sectionId, offset = 0, count = 20 }) => {
        const url = new URL(`${API_CONFIG.BASE_URL}/lecture/getLecturePage/${sectionId}`);
        
        url.searchParams.set("offset", offset);
        url.searchParams.set("count", count);

        const response = await fetch(url.toString(), {method: 'GET'});

        const result = await response.json();
        return result.data;
    },
    getLecture: async ({ lectureId }) => {
        const url = new URL(`${API_CONFIG.BASE_URL}/lecture/getLecture/${lectureId}`);

        const response = await fetch(url.toString(), {method: 'GET'});

        const lecture = await response.json();
        let contentString = null;
        if (lecture.contentId) {
            const fileResponse = await fetch(
                `${API_CONFIG.BASE_URL}/fileSaver/get?id=${lecture.contentId}`
            );

            contentString = await fileResponse.json();
        }

        return {
            ...lecture,
            content: contentString
        };
    }
};
