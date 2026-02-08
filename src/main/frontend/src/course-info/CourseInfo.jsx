import Info from "./components/info/Info.jsx";
import StillThink from "./components/still-think/StillThink.jsx";
import CourseContent from "./components/course-content/CourseContent.jsx";
import HowYourEducationWillLookLike from "./components/how-your-education-will-look-like/HowYourEducationWillLookLike.jsx";
import CompaniesThatUsePlatform from "./components/companies-that-use-platform/CompaniesThatUsePlatform.jsx";
import ExpectationsAfterCompletion from "./components/expectations-after-completion/ExpectationsAfterCompletion.jsx";
import Header from "../main-page/compoents/content/hero/header/Header.jsx";

export default function CourseInfo() {
    return (
        <>
            <div className="course-info">
                <div className="wrapper">
                    <Header />
                    <Info> </Info>
                    <CourseContent></CourseContent>
                    <StillThink></StillThink>
                    <HowYourEducationWillLookLike></HowYourEducationWillLookLike>
                    <CompaniesThatUsePlatform></CompaniesThatUsePlatform>
                    <ExpectationsAfterCompletion></ExpectationsAfterCompletion>
                </div>
            </div>
        </>

    )
}
