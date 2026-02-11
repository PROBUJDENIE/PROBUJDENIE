export const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api/v1',
};

export const COURSE_ENDPOINTS = {
    GET_PAGE: '/course/getCoursePage',
    CREATE: '/course/create',
    UPDATE: '/course/update',
    DELETE: '/course/delete',
};

export const SECTION_ENDPOINTS = {
    GET_PAGE: '/section/getSectionPage',
    CREATE: '/section/create',
    UPDATE: '/section/update',
    DELETE: '/section/delete',
};

export const LECTURE_ENDPOINTS = {
    GET_PAGE: '/lecture/getLecturePage',
    GET_ONE: '/lecture/getLecture',
    CREATE: '/lecture/create',
    UPDATE: '/lecture/update',
    DELETE: '/lecture/delete',
};

export const EXERCISE_ENDPOINTS = {
    GET_ALL: '/exercise/getAll',
    CREATE: '/exercise/create',
    UPDATE: '/exercise/update',
    DELETE: '/exercise/delete',
};

export const FILE_ENDPOINTS = {
    SAVE: '/fileSaver/save',
    GET: '/fileSaver/get',
};

export const VERIFICATION_RULE_ENDPOINTS = {
    GET_ALL: '/verificationRule/getAll',
    CREATE: '/verificationRule/create',
    UPDATE: '/verificationRule/update',
    DELETE: '/verificationRule/delete',
};
