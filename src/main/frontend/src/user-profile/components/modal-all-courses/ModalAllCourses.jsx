import "./modalAllCourses.css"
import {useNavigate} from "react-router-dom";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import {MAIN_ROUTE} from "@/utils/constants.jsx";
import CourseCard from "@/main-page/compoents/content/course-list/course-list_content/course-card/CourseCard.jsx";
import {useCourses} from "@/api/hooks/useCourses.js";

export default function ModalAllCourses({isOpen, onClose}) {
    const navigate = useNavigate();
    const { courses, loading, error } = useCourses();
    const readyCourses = courses.filter(course => course.status === 'READY');

    if (loading) return <div>Загрузка курсов...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (readyCourses.length === 0) return <div>Нет доступных курсов</div>;
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-block-courses" onClick={e => e.stopPropagation()}>
                    <Logo onClick={() => {
                        navigate(MAIN_ROUTE);
                        onClose();

                    }}></Logo>
                    <div className="modal-block-courses_title"> Выбери свой курс!</div>
                    <div className="modal-block-courses_text"> Твой путь к новым знаниям начинается здесь </div>
                    <div className="course-list-cards">
                        {readyCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
