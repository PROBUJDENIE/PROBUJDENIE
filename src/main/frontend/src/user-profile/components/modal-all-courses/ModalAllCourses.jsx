import "./modalAllCourses.css"
import CourseCard from "@/main-page/compoents/content/course-list/course-list_content/course-card/CourseCard.jsx";
import {MAIN_ROUTE} from "@/utils/constants.jsx";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import PayModal from "@/user-profile/components/pay-modal/PayModal.jsx";
import {useState} from "react";
import {useCourses} from "@/api/hooks/useCourses.js";
import {useNavigate} from "react-router-dom";

export default function ModalAllCourses({modalState, changeModalState}) {
    const navigate = useNavigate();
    const {courses, loading, error} = useCourses();
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleBuy = (course) => {
        setSelectedCourse(course);
        changeModalState(4);
    };

    return (
        <>
            <PayModal course={selectedCourse} modalState={modalState} changeModalState={changeModalState} />

            {modalState === 5 && (
                <div className="modal-overlay" onClick={() => changeModalState(0)}>
                    <div className="modal-block-courses" onClick={e => e.stopPropagation()}>
                        <Logo onClick={() => {
                            navigate(MAIN_ROUTE);
                            changeModalState(0);
                        }} />
                        <div className="modal-block-courses_title"> Выбери свой курс!</div>
                        <div className="modal-block-courses_text"> Твой путь к новым знаниям начинается здесь</div>

                        {loading && <div>Загрузка курсов...</div>}
                        {error && <div>Ошибка: {error}</div>}
                        {!loading && !error && courses.length === 0 && <div>Нет доступных курсов</div>}

                        {!loading && !error && courses.length > 0 && (
                            <div className="course-list-cards">
                                {courses.map(course => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        from="cabinet"
                                        onBuyClick={handleBuy}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}