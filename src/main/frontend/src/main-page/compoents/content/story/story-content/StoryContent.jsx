import Container from "../../Container.jsx";
import StoryContentImage from "./image/StoryContentImage.jsx";
import StoryContentText from "./content/StoryContentText.jsx";


export default function StoryContent() {
    return (
        <>
            <div>
                <Container>
                    <div className="story-content">
                        <StoryContentImage></StoryContentImage>
                        <StoryContentText></StoryContentText>
                    </div>
                </Container>
            </div>

        </>
    )
}
