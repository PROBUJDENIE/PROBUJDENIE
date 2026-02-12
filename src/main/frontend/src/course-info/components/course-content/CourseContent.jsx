import "./courseContent.css";
import ChapterCard from "./ChapterCard.jsx";
import { useState } from "react";
import Container from "../../../main-page/compoents/content/Container.jsx";
import lookImage from "../../resourses/look.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import { useSections } from "@/api/hooks/useSections.js";
import { useLectures } from "@/api/hooks/useLectures.js";
import leftIcon from "@/main-page/resources/images/book.svg";

export default function CourseContent({ course }) {
    const [openSectionId, setOpenSectionId] = useState(null);

    const {
        sections,
        loading: sectionsLoading,
        error: sectionsError,
    } = useSections(course.id);

    const {
        lectures,
        loading: lecturesLoading,
    } = useLectures(openSectionId);

    if (sectionsLoading) return <p>Загрузка программы курса...</p>;
    if (sectionsError) return <p>{sectionsError}</p>;

    return (
        <Container>
            <div className="course-content">
                <h2 className="course-content-title">Программа курса:</h2>
                <div className="course-content-grid">
                    <div className="chapters-list">
                        {sections.map((section, index) => (
                            <ChapterCard
                                key={section.id}
                                chapter={{
                                    id: section.id,
                                    title: section.title,
                                    order: index,
                                }}
                                isOpen={openSectionId === section.id}
                                onToggle={() =>
                                    setOpenSectionId(
                                        openSectionId === section.id ? null : section.id
                                    )
                                }
                            />
                        ))}
                    </div>
                    <div className="chapter-details">
                        {openSectionId ? (
                            lecturesLoading ? (
                                <p>Загрузка лекций...</p>
                            ) : (
                                <ul className="lessons-list">
                                    {lectures.map((lecture, index) => (
                                        <li key={lecture.id} className="lesson-item">
                                            <span className="lesson-number">
                                                Урок {index + 1}:
                                            </span>
                                            <span className="lesson-title">
                                                {lecture.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )
                        ) : (
                            <div className="empty-state">
                                <div className="empty-img">
                                    <img src={lookImage} />
                                </div>
                                <h3>Выберите главу</h3>
                                <p>
                                    Нажмите на любую главу слева, чтобы увидеть её содержание
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="course-content_btn">
                <CommonBtn
                    width={330}
                    height={56}
                    bgColor="#D2FE66"
                    borderColor="#8A6CFF"
                    fontColor="#000000"
                    size={18}
                    onClick={() => console.log("Кнопка нажата")}
                    leftIcon={<img src={leftIcon} alt="книга" />}
                >
                    Начать обучение
                </CommonBtn>
            </div>
        </Container>
    );
}
