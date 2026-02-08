import "../storyContent.css"
import story_content_img from "@/main-page/resources/images/story-content_img.png";
export default function StoryContentImage() {
    return (
        <>
            <img src={story_content_img} alt={"Bob"} className="story-content_image" />
        </>
    )
}
