import "./lectureProgress.css";

export default function LectureProgress({ total, current }) {
    if (!total) return null;

    return (
        <div className="lecture-progress">
            {Array.from({ length: total }).map((_, idx) => (
                <div key={idx} className={`lecture-progress_item ${idx < current ? "active" : ""}`}/>
            ))}
        </div>
    );
}