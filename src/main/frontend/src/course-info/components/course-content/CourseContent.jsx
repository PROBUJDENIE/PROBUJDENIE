import "./courseContent.css";
import ChapterCard from "./ChapterCard.jsx";
import { useState } from "react";
import Container from "../../../main-page/compoents/content/Container.jsx";
import lookImage from "../../resourses/look.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";

export default function CourseContent() {
    const [openChapterId, setOpenChapterId] = useState(null);

    const chapters = [
        {
            id: 0,
            title: "Глава 1: Основы Git",
            lessons: [
                "Введение в систему контроля версий",
                "Установка и настройка Git",
                "Установка и настройка Git",
                "Первые коммиты: add, commit, status",
                "Работа с историей коммитов: log, diff"
            ]
        },
        {
            id: 1,
            title: "Глава 2: Ветвление и слияние",
            lessons: [
                "Создание и переключение веток",
                "Слияние веток: merge",
                "Разрешение конфликтов",
                "Перебазирование: rebase"
            ]
        },
        {
            id: 2,
            title: "Глава 3: Работа с удаленными репозиториями",
            lessons: [
                "GitHub, GitLab, Bitbucket",
                "Клонирование и форки",
                "Клонирование и форки",
                "Pull Request и Code Review",
                "Синхронизация: push, pull, fetch"
            ]
        },
        {
            id: 3,
            title: "Глава 4: Продвинутые техники",
            lessons: [
                "Интерактивное перебазирование",
                "Cherry-pick: выборочное копирование",
                "Stash: временное сохранение изменений",
                "Git Hooks: автоматизация"
            ]
        },
        {
            id: 4,
            title: "Глава 5: CI/CD с Git",
            lessons: [
                "GitHub Actions",
                "GitLab CI/CD",
                "Автоматическое тестирование",
                "Деплой из веток"
            ]
        }
    ];

    return (
            <Container>
                <div className="course-content">
                    <h2 className="course-content-title">Программа курса:</h2>
                    <div className="course-content-grid">
                        <div className="chapters-list">
                            {chapters.map((chapter) => (
                                <ChapterCard
                                    key={chapter.id}
                                    chapter={chapter}
                                    isOpen={openChapterId === chapter.id}
                                    onToggle={() => setOpenChapterId(
                                        openChapterId === chapter.id ? null : chapter.id
                                    )}
                                />
                            ))}
                        </div>

                        <div className="chapter-details">
                            {openChapterId !== null ? (
                                <div className="selected-chapter">
                                    <h3 className="selected-chapter-title">
                                        {chapters[openChapterId].title}
                                    </h3>
                                    <div className="lessons-count">
                                        {chapters[openChapterId].lessons.length} уроков
                                    </div>
                                    <ul className="lessons-list">
                                        {chapters[openChapterId].lessons.map((lesson, index) => (
                                            <li key={index} className="lesson-item">
                                                <span className="lesson-number">Урок {index + 1}:</span>
                                                <span className="lesson-title">{lesson}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-img">
                                        <img src={lookImage}/>
                                    </div>
                                    <h3>Выберите главу</h3>
                                    <p>Нажмите на любую главу слева, чтобы увидеть её содержание</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="course-content_btn">
                    <CommonBtn width={330}
                               height={56}
                               bgColor="#D2FE66"
                               borderColor="#8A6CFF"
                               fontColor="#000000"
                               size={18}
                               onClick={() => console.log("Кнопка нажата")}>
                        Начать обучение</CommonBtn>
                </div>
            </Container>
    );
}