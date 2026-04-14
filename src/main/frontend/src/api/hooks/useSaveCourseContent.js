import { teacherApi } from "@/api/teacher.api.js";
import { adminApi } from "@/api/admin.api.js";
import {useAuth} from "@/autorisation/AuthContext.jsx";

const getApiByRole = (role) => {
    return role === "ADMIN" ? adminApi : teacherApi;
};

export function useSaveCourseContent(course) {
    const {getRole}=useAuth();
    function blocksToFile(blocks) {
        const json = JSON.stringify(
            blocks.map(b => {
                switch (b.type) {
                    case "title":
                        return { type: "heading", content: b.content };

                    case "text":
                        return { type: "paragraph", content: b.content };

                    case "image":
                        return { type: "image", fileId: b.content?.fileId || b.fileId };

                    case "exercise":
                        return { type: "exercise", exerciseId: b.content?.taskId || b.exerciseId };

                    default:
                        return b;
                }
            })
        );

        const blob = new Blob([json], { type: "application/json" });
        return new File([blob], "content.json", { type: "application/json" });
    }

    async function uploadImages(blocks) {
        const api = getApiByRole(getRole());

        return Promise.all(
            blocks.map(async (block) => {

                if (block.type === "image" && block.content?.file) {

                    const fileId = await api.savePhotoMultipart(block.content.file);

                    return {
                        ...block,
                        content: {
                            fileId,
                            imageUrl: block.content.imageUrl
                        }
                    };
                }

                return block;
            })
        );
    }

    async function saveLectures() {
        const api = getApiByRole(getRole());

        for (const section of course.sections) {

            for (const lecture of section.lectures) {

                if (!lecture.contentBlocks) continue;

                const updatedBlocks = await uploadImages(lecture.contentBlocks);

                const file = blocksToFile(updatedBlocks);

                let contentId = lecture.contentId;

                if (!contentId) {
                    contentId = await api.savePhotoMultipart(file);
                } else {
                    await api.updateFileMultipart(contentId, file);
                }

                await api.updateLecture({
                    id: lecture.id,
                    title: lecture.title,
                    orderNumber: lecture.orderNumber,
                    contentId
                });
            }
        }
    }

    return { saveLectures };
}