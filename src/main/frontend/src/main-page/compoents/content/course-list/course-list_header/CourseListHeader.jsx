import "./courseListHeader.css"
import CourseCard from "../course-list_content/course-card/CourseCard.jsx";

export default function CourseListHeader() {

    return (
        <>
            <div className="course-list-header">
                <div className="course-list-header_title">Выбери свой курс</div>
                <div className="course-list-header_desc">Каждая из этих программ — твой шанс освоить новый навык или превратить хобби <br/> в нечто большее. Просто сделай первый шаг.</div>
            </div>
        </>
    )
}
