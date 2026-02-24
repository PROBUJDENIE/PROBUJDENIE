import Info from "./components/info/Info.jsx";
import StillThink from "./components/still-think/StillThink.jsx";
import CourseContent from "./components/course-content/CourseContent.jsx";
import HowYourEducationWillLookLike from "./components/how-your-education-will-look-like/HowYourEducationWillLookLike.jsx";
import CompaniesThatUsePlatform from "./components/companies-that-use-platform/CompaniesThatUsePlatform.jsx";
import ExpectationsAfterCompletion from "./components/expectations-after-completion/ExpectationsAfterCompletion.jsx";
import Header from "../main-page/compoents/content/hero/header/Header.jsx";
import {useLocation, useParams} from "react-router-dom";
import Jump from "@/main-page/compoents/content/jump/Jump.jsx";
import Price from "@/course-info/components/price/Price.jsx";
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";
import {useCourses} from "@/api/hooks/useCourses.js";

export default function CourseInfo() {
    const { id } = useParams();
    const location = useLocation();
    const from = location.state?.from ?? "public";

    console.log(id);

    const {getCourse} = useCourses();

    const course = getCourse(id);

    console.log(course);

    if (!course) return <div>Загрузка...</div>;
    return (
        <>
            <div className="course-info">
                <div className="wrapper">
                    <Header />
                    <Jump/>
                    <Info course={course}></Info>
                    <Price course={course} from={from}></Price>
                    <CourseContent course={course}></CourseContent>
                    <StillThink></StillThink>
                    <HowYourEducationWillLookLike></HowYourEducationWillLookLike>
                    <CompaniesThatUsePlatform></CompaniesThatUsePlatform>
                    <ExpectationsAfterCompletion></ExpectationsAfterCompletion>
                    <Bottom></Bottom>
                </div>
            </div>
        </>

    )
}
