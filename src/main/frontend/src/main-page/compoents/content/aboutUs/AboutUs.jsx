import AboutUsContent from "./content/AboutUsContent.jsx";
import AboutUsBottom from "./bottom/AboutUsBottom.jsx";
import AboutUsHeader from "@/main-page/compoents/content/aboutUs/header/AboutUsHeader.jsx";

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