import { API_CONFIG } from "./config";

export const lectureApi = {
    getLecturesBySectionId: async ({ sectionId, offset = 0, count = 20 }) => {
        const url = new URL(`${API_CONFIG.BASE_URL}/lecture/getLecturePage/${sectionId}`);
        
        url.searchParams.set("offset", offset);
        url.searchParams.set("count", count);

        const response = await fetch(url.toString(), {method: 'GET'});

        if (!response.ok) {
            throw new Error("Ошибка загрузки лекций");
        }

        const result = await response.json();
        return result.data;
    },
};
