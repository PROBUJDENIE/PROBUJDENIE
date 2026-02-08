import Container from "../../Container.jsx";
import HeroContentImage from "./HeroContentImage.jsx";
import HeroContentInfo from "./HeroContentInfo.jsx";

export default function HeroContent() {
    return (
        <>
            <div>
                <Container>
                      <div className="hero-content">
                          <HeroContentInfo ></HeroContentInfo>
                          <HeroContentImage ></HeroContentImage>
                      </div>
                </Container>
            </div>
        </>
    )
}
