import "./hero-content.css"
import hero from "../../../../resources/gif/hero.gif"
import shadow from "../../../../resources/images/shadow.svg"
export default function HeroContentImage() {
    return (
        <>
            <div className="hero-image-wrapper">
                <div className="hero-image">
                    <img src={hero} alt={"Bob"} className="hero-gif" />
                    <img src={shadow} alt={"shadow"} className="hero-content_img" />
                </div>
            </div>
        </>
    )
}
