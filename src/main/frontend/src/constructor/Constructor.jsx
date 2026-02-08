import ConstructorHeader from "./components/header/ConstructorHeader.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCourseStorage} from "./components/hooks/useCourseStorage.js";
import {useState} from "react";
import CommonBtn from "../main-page/compoents/prototype/btn/CommonBtn.jsx";
import ConstructorInfo from "./components/info/ConstructorInfo.jsx";
import ConstructorContent from "./components/content/ConstructorContent.jsx";
import Container from "../main-page/compoents/content/Container.jsx";
import {MAIN_ROUTE, ADMIN_PROFILE_ROUTE} from "../utils/constants.jsx";
import create from "./resources/images/create.svg"
import table from "./resources/images/table.svg"
import back from "./resources/images/back.svg"
import tasks from "./resources/images/const_tasks.svg"
import ConstructorTasks from "./components/tasks/ConstructorTasks.jsx";

export default function Constructor() {

    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("id");
    const navigate = useNavigate();

    const {course, setCourse, saveCourse, setField} = useCourseStorage(courseId);

    const [activeAd, setAdvert] = useState("info");

    if (!course) {
        return <div>Загрузка...</div>;
    }

    return (<>
        <div className="profile-wrapper">
            <ConstructorHeader></ConstructorHeader>
            <Container>
                <div className="constructor">
                    <div className="constructor-btn">
                        <div className="constructor-switch">
                            <CommonBtn width={260} height={50} bgColor={activeAd === 'info' ? "#8A6CFF" : "transparent"}
                                       borderColor={"#8A6CFF"} size={20} fontColor={"white"} leftIcon={<img src={create}  />}
                                       onClick={() => setAdvert('info')}>Общая информация</CommonBtn>
                            <CommonBtn width={260} height={50} bgColor={activeAd === 'content' ? "#8A6CFF" : "transparent"}
                                       borderColor={"#8A6CFF"} size={20} fontColor={"white"} leftIcon={<img src={table}  />}
                                       onClick={() => setAdvert('content')}>Содержание курса</CommonBtn>
                            <CommonBtn width={260} height={50} bgColor={activeAd === 'tasks' ? "#8A6CFF" : "transparent"}
                                       borderColor={"#8A6CFF"} size={20} fontColor={"white"} leftIcon={<img src={tasks}  />}
                                       onClick={() => setAdvert('tasks')}>Задания курса</CommonBtn>
                        </div>
                        <CommonBtn
                            width={298}
                            height={50}
                            bgColor={"#DFD8D3"}
                            borderColor={"#8A6CFF"}
                            fontColor={"white"}
                            size={24}
                            onClick={() => navigate(ADMIN_PROFILE_ROUTE)}
                            leftIcon={<img src={back}  />}
                            >
                            Назад к моим курсам
                        </CommonBtn>
                    </div>
                    {activeAd === 'info' && (<ConstructorInfo course={course} setField={setField}
                                                   saveCourse={saveCourse}></ConstructorInfo>)}
                    {activeAd === 'content' && (<ConstructorContent course={course} setCourse={setCourse}></ConstructorContent>)}
                    {activeAd === 'tasks' && (<ConstructorTasks course={course} setCourse={setCourse}></ConstructorTasks>)}
                </div>
            </Container>
        </div>

    </>)
}
