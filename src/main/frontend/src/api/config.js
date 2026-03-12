export const API_CONFIG = {
    BASE_URL: 'http://localhost:8080'
};

export const PUBLIC_ENDPOINTS = {
    GET_COURSE_PAGE: '/api/v1/courses',
    GET_SECTION_PAGE: function(courseId) { return '/api/v1/courses/' + courseId + '/sections'; },
    GET_LECTURE_PAGE: function(sectionId) { return '/api/v1/sections/' + sectionId + '/lectures'; },
    GET_FILE: function(fileId) { return '/api/v1/files/' + fileId; }
};

export const STUDENT_ENDPOINTS = {
    GET_MY_COURSES: '/student-secure/api/v1/courses/my-courses',
    BUY_COURSE: function(courseId) { return '/student-secure/api/v1/courses/' + courseId + '/buy'; },
    GET_EXERCISE: function(exerciseId) { return '/student-secure/api/v1/exercises/' + exerciseId; },
    GET_SUBMISSION: function(exerciseId) { return '/student-secure/api/v1/exercises/' + exerciseId + '/submissions';  },
    CREATE_SUBMISSION: function(exerciseId) { return '/student-secure/api/v1/exercises/' + exerciseId + '/submissions';  },
};

export const ADMIN_ENDPOINTS = {
    GET_COURSES: '/admin-secure/api/v1/courses',
    GET_COURSE: function(id) { return '/admin-secure/api/v1/courses/' + id; },
    CREATE_COURSE: '/admin-secure/api/v1/courses',
    UPDATE_COURSE: function(id) { return '/admin-secure/api/v1/courses/' + id; },
    DELETE_COURSE: function(id) { return '/admin-secure/api/v1/courses/' + id; },

    UPLOAD_FILE: '/admin-secure/api/v1/files',
    GET_FILE: function(fileId) { return '/admin-secure/api/v1/files/' + fileId; },

    GET_COURSE_SECTIONS: function(courseId) { return '/admin-secure/api/v1/courses/' + courseId + '/sections'; },
    GET_SECTION: function(sectionId) { return '/admin-secure/api/v1/sections/' + sectionId; },
    CREATE_SECTION: function(courseId) { return '/admin-secure/api/v1/courses/' + courseId + '/sections'; },
    UPDATE_SECTION: function(sectionId) { return '/admin-secure/api/v1/sections/' + sectionId; },
    DELETE_SECTION: function(sectionId) { return '/admin-secure/api/v1/sections/' + sectionId; },

    GET_SECTION_LECTURES: function(sectionId) { return '/admin-secure/api/v1/sections/' + sectionId + '/lectures'; },
    GET_LECTURE: function(lectureId) { return '/admin-secure/api/v1/lectures/' + lectureId; },
    CREATE_LECTURE: function(sectionId) { return '/admin-secure/api/v1/sections/' + sectionId + '/lectures'; },
    UPDATE_LECTURE: function(lectureId) { return '/admin-secure/api/v1/lectures/' + lectureId; },
    DELETE_LECTURE: function(lectureId) { return '/admin-secure/api/v1/lectures/' + lectureId; },

    GET_EXERCISES: (courseId) => `/admin-secure/api/v1/courses/${courseId}/exercises`,
    CREATE_EXERCISE: (courseId) => `/admin-secure/api/v1/courses/${courseId}/exercises`,
    UPDATE_EXERCISE: (exerciseId) => `/admin-secure/api/v1/exercises/${exerciseId}`,
    DELETE_EXERCISE: (exerciseId) => `/admin-secure/api/v1/exercises/${exerciseId}`,
};

export function getUrl(base, replacements = {}) {
    let url = base;
    for (const [key, value] of Object.entries(replacements)) {
        url = url.replace('{' + key + '}', value);
    }
    return API_CONFIG.BASE_URL + url;
}