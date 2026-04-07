import "./adminProfileCourseCard.css"

export default function AdminProfileCourseCard({ src, onClick, course }) {
    const title = course?.title;

    return (
        <div className="profile-course-card btnr">
            <button className="profile-course-card_view" onClick={onClick} type="button">
                <img src={src} alt={title ?? "plus"}/>
                {title && <span className="profile-course-card_label">{title}</span>}
            </button>
        </div>
    );
}
