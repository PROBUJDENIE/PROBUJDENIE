import { adminApi } from "@/api/admin.api.js";

export async function saveSectionTitles(course) {
    if (!course?.sections) return;

    for (const section of course.sections) {
        await adminApi.updateSection({
            id: section.id,
            title: section.title,
            orderNumber: section.orderNumber
        });
    }
}

export async function saveLectureTitles(course) {
    if (!course?.sections) return;

    for (const section of course.sections) {
        if (!section.lectures) continue;

        for (const lecture of section.lectures) {
            await adminApi.updateLecture({
                id: lecture.id,
                title: lecture.title,
                orderNumber: lecture.orderNumber,
                contentId: lecture.contentId
            });
        }
    }
}