import AboutUsHeader from "./header/AboutUsHeader.jsx";
import AboutUsContent from "./content/AboutUsContent.jsx";
import AboutUsBottom from "./bottom/AboutUsBottom.jsx";

export default function AboutUs() {

    return (
        <>
            <div className="aboutUs" id={"aboutUs"}>
                <AboutUsHeader></AboutUsHeader>
                <AboutUsContent></AboutUsContent>
                <AboutUsBottom></AboutUsBottom>
            </div>
        </>
    )
}