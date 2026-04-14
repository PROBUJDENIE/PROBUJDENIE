import { teacherApi } from "@/api/teacher.api.js";
import { adminApi } from "@/api/admin.api.js";
import { useAuth } from "@/autorisation/AuthContext.jsx";
import {useCallback} from "react";

const getApiByRole = (role) => {
    return role === "ADMIN" ? adminApi : teacherApi;
};

export function useSaveSectionTitles() {
    const { getRole } = useAuth();

    return useCallback(async (course) => {
        if (!course?.sections) return;
        const api = getApiByRole(getRole());

        for (const section of course.sections) {
            await api.updateSection({
                id: section.id,
                title: section.title,
                orderNumber: section.orderNumber
            });
        }
    }, [getRole]);
}

export function useSaveLectureTitles() {
    const { getRole } = useAuth();

    return useCallback(async (course) => {
        if (!course?.sections) return;

        const api = getApiByRole(getRole());

        for (const section of course.sections) {
            if (!section.lectures) continue;

            for (const lecture of section.lectures) {
                await api.updateLecture({
                    id: lecture.id,
                    title: lecture.title,
                    orderNumber: lecture.orderNumber,
                    contentId: lecture.contentId
                });
            }
        }
    }, [getRole]);
}