import "./modalAllCourses.css"
import CourseCard from "@/main-page/compoents/content/course-list/course-list_content/course-card/CourseCard.jsx";
import {MAIN_ROUTE} from "@/utils/constants.jsx";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import {PayModal} from "@/user-profile/components/pay-modal/PayModal.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useStudentCourses} from "@/api/hooks/useStudentCourses.js";
import {usePublicCourses} from "@/api/hooks/usePublicCourses.js";

export default function ModalAllCourses({modalState, changeModalState}) {
    const navigate = useNavigate();
    const { courses, loading, error } = usePublicCourses();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const {courses: boughtCourses, loading: boughtLoading} = useStudentCourses();

    const boughtCourseIds = new Set(boughtCourses?.map(course => course.id) || []);

    const availableCourses = courses?.filter(course => !boughtCourseIds.has(course.id)) || [];
    const handleBuy = (course) => {
        setSelectedCourse(course);
        changeModalState(4);
    }
    const handlePaymentSuccess = () => {
        changeModalState(0);
    };

    return (
        <>
            <PayModal course={selectedCourse} modalState={modalState} changeModalState={changeModalState} onPaymentSuccess={handlePaymentSuccess} />

            {modalState === 5 && (
                <div className="modal-overlay" onClick={() => changeModalState(0)}>
                    <div className="modal-block-courses" onClick={e => e.stopPropagation()}>
                        <Logo onClick={() => {navigate(MAIN_ROUTE);changeModalState(0);}} />
                        <div className="modal-block-courses_title"> Выбери свой курс!</div>
                        <div className="modal-block-courses_text"> Твой путь к новым знаниям начинается здесь</div>

                        {loading && <div>Загрузка курсов...</div>}
                        {error && <div>Ошибка: {error}</div>}
                        {!loading && !error && availableCourses.length === 0 && <div>Нет доступных курсов</div>}

                        {!loading && !error && availableCourses.length > 0 && (
                            <div className="course-list-cards-profile">
                                {availableCourses.map(course => (<CourseCard key={course.id} course={course} from="cabinet" onBuyClick={handleBuy}/>))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}