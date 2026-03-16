import { adminApi } from "@/api/admin.api.js";

export function useSaveCourseContent(course) {

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
        return Promise.all(
            blocks.map(async (block) => {

                if (block.type === "image" && block.content?.file) {

                    const fileId = await adminApi.savePhotoMultipart(block.content.file);

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

        for (const section of course.sections) {

            for (const lecture of section.lectures) {

                if (!lecture.contentBlocks) continue;

                const updatedBlocks = await uploadImages(lecture.contentBlocks);

                const file = blocksToFile(updatedBlocks);

                let contentId = lecture.contentId;

                if (!contentId) {
                    contentId = await adminApi.savePhotoMultipart(file);
                } else {
                    await adminApi.updateFileMultipart(contentId, file);
                }

                await adminApi.updateLecture({
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