import "./courseContent.css";
import tapImage from "../../resourses/img.png";
export default function ChapterCard({ chapter, isOpen, onToggle }) {
    return (
        <div className={`chapter-card-wrapper ${isOpen ? "chapter-open" : ""}`}>
            <button
                type="button"
                className="chapter-card btn"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <div className="chapter-card-header">
                    <div className="chapter-number">Глава {chapter.id + 1}</div>
                    <div className="chapter-title">{chapter.title.split(":")[1]?.trim() || chapter.title}</div>
                </div>
                <div className="chapter-card-info">
                    <span className="lessons-count-badge">
                        {chapter.lessons.length} уроков
                    </span>
                    <img
                        className={`chapter-arrow ${isOpen ? "arrow-up" : "arrow-down"}`}
                        src={tapImage}
                        alt={isOpen ? "Свернуть" : "Развернуть"}
                    />
                </div>
            </button>
        </div>
    );
}