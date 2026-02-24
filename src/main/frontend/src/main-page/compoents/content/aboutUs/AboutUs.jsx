import AboutUsContent from "./content/AboutUsContent.jsx";
import AboutUsBottom from "./bottom/AboutUsBottom.jsx";

export default function AboutUs() {

    return (
        <>
            <div className="aboutUs" id={"aboutUs"}>
                <AboutUsContent></AboutUsContent>
                <AboutUsBottom></AboutUsBottom>
            </div>
        </>
    )
}