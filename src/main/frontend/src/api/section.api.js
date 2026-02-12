import {API_CONFIG} from './config';

export const sectionApi = {
    getSectionsByCourseId: async ({ courseId, offset = 0, count = 5}) => {
        const url = new URL(`${API_CONFIG.BASE_URL}/section/getSectionPage/${courseId}`);

        url.searchParams.set('offset', offset);
        url.searchParams.set('count', count);

        const response = await fetch(url.toString(), {method: 'GET'});

        if (!response.ok) {
            throw new Error('Ошибка загрузки секций');
        }

        const result = await response.json();
        return result.data;
    },
};
