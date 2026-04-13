import ConstructorHeader from "./components/header/ConstructorHeader.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import CommonBtn from "../main-page/compoents/prototype/btn/CommonBtn.jsx";
import ConstructorInfo from "./components/info/ConstructorInfo.jsx";
import Container from "../main-page/compoents/content/Container.jsx";
import {ADMIN_PROFILE_ROUTE, TEACHER_PROFILE_ROUTE, USER_PROFILE_ROUTE} from "../utils/constants.jsx";
import create from "./resources/images/create.svg"
import table from "./resources/images/table.svg"
import back from "./resources/images/back.svg"
import tasks from "./resources/images/const_tasks.svg"
import Bottom from "@/main-page/compoents/content/bottom/Bottom.jsx";
import {useTeacherCourses} from "@/api/hooks/useTeacherCourses.js";
import ConstructorContent from "@/constructor/components/content/ConstructorContent.jsx";
import ConstructorTasks from "@/constructor/components/tasks/ConstructorTasks.jsx";
import {useTeacherExercises} from "@/api/hooks/useTeacherExercises.js";
import {ConfirmModalBackCourse} from "@/modal-confirm/course/ConfirmModalBackCourse.jsx";
import {useAuth} from "@/autorisation/AuthContext.jsx";

export default function Constructor() {
    const { getRole } = useAuth();
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("id");
    const navigate = useNavigate();
    const [activeAd, setAdvert] = useState("info");
    const [modalState, setModalState] = useState(0);

    const {deleteCourse, saveCourse, loading,getCourse, addOrUpdateCourse} = useTeacherCourses();

    const emptyCourse = {id: null, title: "", description: "", highlights: [], price: "", photo: null, photoId: null, sections: []};
    const [course, setCourse] = useState(emptyCourse);
    const { exercises } = useTeacherExercises(course.id);

    useEffect(() => {
        if (!courseId) return;

        const data = getCourse(courseId);
        setCourse(data);
    }, [courseId, getCourse]);

    const setField = useCallback((name, value) => {
        setCourse(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSave = async (updatedCourse) => {
        const courseToSave = updatedCourse ?? course;
        const savedCourse = await saveCourse(courseToSave);
        addOrUpdateCourse(savedCourse);
        setCourse(savedCourse);
    };

    console.log(course);
    if (loading) return <div>Загрузка...</div>;
    return (<>
        <div className="profile-wrapper">
            <ConstructorHeader></ConstructorHeader>
            <Container>
                <div className="constructor">
                    <div className="constructor-btn">
                        <div className="constructor-switch">
                            <CommonBtn width={260} height={50} bgColor={activeAd === 'info' ? "#8A6CFF" : "transparent"} borderColor={"#8A6CFF"} size={20} fontColor={"white"} leftIcon={<img src={create}  />} onClick={() => setAdvert('info')}>Общая информация</CommonBtn>
                            <CommonBtn width={260} height={50} bgColor={activeAd === 'content' ? "#8A6CFF" : "transparent"} borderColor={"#8A6CFF"} size={20} fontColor={"white"} leftIcon={<img src={table}  />} onClick={() => setAdvert('content')}>Содержание курса</CommonBtn>
                            <CommonBtn width={260} height={50} bgColor={activeAd === 'tasks' ? "#8A6CFF" : "transparent"} borderColor={"#8A6CFF"} size={20} fontColor={"white"} leftIcon={<img src={tasks}  />} onClick={() => setAdvert('tasks')}>Задания курса</CommonBtn>
                        </div>
                        <CommonBtn width={298} height={50} bgColor={"#DFD8D3"} borderColor={"#8A6CFF"} fontColor={"white"} size={24} onClick={() => setModalState(22)} leftIcon={<img src={back} />}>Назад к моим курсам</CommonBtn>
                    </div>
                    {!loading  && activeAd === 'info' && (<ConstructorInfo setCourse={setCourse} handleDeleteCourse={deleteCourse} course={course} setField={setField} handleSave={handleSave} modalState={modalState} changeModalState={setModalState}></ConstructorInfo>)}
                    {!loading  && activeAd === 'content' && (<ConstructorContent  course={course} setCourse={setCourse} handleSave={handleSave}></ConstructorContent>)}
                    {!loading  && activeAd === 'tasks' && (<ConstructorTasks  course={course} setCourse={setCourse} handleSave={handleSave} exercises={exercises}></ConstructorTasks>)}
                </div>
            </Container>
            <ConfirmModalBackCourse modalState={modalState} changeModalState={setModalState} onConfirm={() => {
                const role = getRole();
                (role === 'ADMIN') ? navigate(ADMIN_PROFILE_ROUTE) : navigate(TEACHER_PROFILE_ROUTE);}}/>
            <Bottom></Bottom>
        </div>
    </>)
}
