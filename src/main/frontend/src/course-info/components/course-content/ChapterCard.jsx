import "./courseContent.css";
import tapImage from "../../resourses/img.png";
export default function ChapterCard({ chapter, isOpen, onToggle, lectures, loading }) {
    return (
        <div className={`chapter-card-wrapper ${isOpen ? "chapter-open" : ""}`}>
            <button
                type="button"
                className="chapter-card btn"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <div className="chapter-card-header">
                    <div className="chapter-number">
                        Глава {chapter.order + 1}
                    </div>
                    <div className="chapter-title">
                        {chapter.title}
                    </div>
                </div>

                <div className="chapter-card-info">
                    <img
                        className={`chapter-arrow ${isOpen ? "arrow-up" : ""}`}
                        src={tapImage}
                        alt=""
                    />
                </div>
            </button>

            {isOpen && (
                <div className="mobile-lessons">
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : (
                        <ul>
                            {lectures.map((lecture, index) => (
                                <li key={lecture.id}>
                                    Урок {index + 1}: {lecture.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}