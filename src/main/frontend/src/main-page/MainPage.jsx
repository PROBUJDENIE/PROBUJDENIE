import Jump from "./compoents/content/jump/Jump.jsx";
import Header from "./compoents/content/hero/header/Header.jsx";
import HeroContent from "./compoents/content/hero/hero-content/HeroContent.jsx";
import HeroBottom from "./compoents/content/hero/hero-bottom/HeroBottom.jsx";
import StoryHeader from "./compoents/content/story/story-header/StoryHeader.jsx";
import StoryContent from "./compoents/content/story/story-content/StoryContent.jsx";
import TryNow from "./compoents/content/tryNow/TryNow.jsx";
import CourseList from "./compoents/content/course-list/CourseList.jsx";
import AboutUs from "./compoents/content/aboutUs/AboutUs.jsx";
import Cta from "./compoents/content/cta/Cta.jsx";
import Question from "./compoents/content/question/Question.jsx";
import Bottom from "./compoents/content/bottom/Bottom.jsx";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function MainPage() {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            <div className="wrapper">
                <Header></Header>
                <Jump></Jump>
                <div className="ff">
                    <HeroContent/>
                    <HeroBottom></HeroBottom>
                </div>
                <StoryHeader></StoryHeader>
                <StoryContent></StoryContent>
                <TryNow></TryNow>
                <CourseList></CourseList>
                <AboutUs></AboutUs>
                <Cta></Cta>
                <Question/>
                <Bottom></Bottom>
            </div>
        </>
    )
}
