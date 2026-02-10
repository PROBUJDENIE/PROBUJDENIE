import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import "./constructorInfo.css"
import "../constructor.css"
import ExpectationsAfterCompletionMini from "./moneyBlockMini/MoneyBlockMini.jsx";
import fileImage from "../../resources/images/file.svg";
import leftIcon from "../../resources/images/save.svg";
import delIcon from "../../resources/images/del_course.svg";
import {useNavigate} from "react-router-dom";
import {ADMIN_PROFILE_ROUTE} from "@/utils/constants.jsx";
import {useState} from "react";
import {ConfirmModal} from "@/constructor/components/info/ConfirmModal.jsx";

export default function ConstructorInfo({course, setField, saveCourse, deleteCourse}) {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    function handleDeleteClick() {
        setShowConfirm(true);
    }
    function cancelDelete() {
        setShowConfirm(false);
    }
    function handleDelete() {
        const isDeleted = deleteCourse();

        if (isDeleted) {
            navigate(ADMIN_PROFILE_ROUTE);
        }
    }

    function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setField("photo", reader.result);
        };

        reader.readAsDataURL(file);
    }

    const parseSalaryToMoneyBlocks = (salaryText) => {
        if (!salaryText || !salaryText.trim()) return [];

        const lines = salaryText.split('\n').filter(line => line.trim());
        const blocks = [];
        let currentBlock = null;

        lines.forEach((line) => {
            if (line.startsWith('Заголовок:')) {
                if (currentBlock && currentBlock.title) {
                    blocks.push({
                        id: blocks.length + 1,
                        title: currentBlock.title,
                        description: currentBlock.description || ''
                    });
                }
                currentBlock = {
                    title: line.replace('Заголовок:', '').trim(),
                    description: ''
                };
            } else if (line.startsWith('Подпись:')) {
                if (currentBlock) {
                    currentBlock.description = line.replace('Подпись:', '').trim();
                }
            }
        });

        if (currentBlock && currentBlock.title) {
            blocks.push({
                id: blocks.length + 1,
                title: currentBlock.title,
                description: currentBlock.description || ''
            });
        }
        return blocks;
    };


    return (
        <>
            <div className="constructor-info">
                <div className="constructor-info-settings">
                    <h2>Создание курса</h2>
                    <div className="constructor-info-settings_title flex">
                        <label>Название курса *</label>
                        <input value={course.title} onChange={e => setField("title", e.target.value)}
                               placeholder="Например: Git: Полный курс"/>
                    </div>
                    <div className="constructor-info-settings_desc">
                        <label>Описание *</label>
                        <p>До 500 символов</p>
                        <textarea value={course.desc} onChange={e => setField("desc", e.target.value)} maxLength={500}
                                  rows={5}
                                  placeholder="Подробное описание курса..."/>
                    </div>
                    <div className="constructor-info-settings_img" data-cursor-hover>
                        <label>Изображение курса</label>
                        <p>Разрешенные форматы: .png, .jpeg, .jpg; Объем до 5мб. Формат: 4x5.</p>
                        <div className="constructor-info-settings_btn">
                            <div className="custom-file-input">
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleFile}
                                    id="course-image-upload"
                                />
                                <label htmlFor="course-image-upload" className="custom-file-label">
                                    <img className="file-icon" src={fileImage} width={30} height={30}></img>
                                    <span className="file-text">Выбрать изображение</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="constructor-info-settings_advert">
                        <label>Что вас ждет</label>
                        <p>Что ждет студентов во время обучения, каждая сторка-отдельный пункт (до 5 пунктов)</p>
                        <textarea
                            value={course.highlights.join("\n")}
                            onChange={e =>
                                setField(
                                    "highlights",
                                    e.target.value
                                        .split("\n")
                                )
                            }
                            rows={5}
                            placeholder="18 часов практических видеоуроков
45 заданий для закрепления навыков
5 ключевых модулей от основ до CI/CD
Сертификат о завершении курса
Пожизненный доступ к материалам"/>
                    </div>
                    <div className="constructor-info-settings_salary">
                        <label>Зарплата и востребованность</label>
                        <p>Формат: "Заголовок: Название", на следующих строках "Подпись: Текст"</p>
                        <textarea
                            value={course.salary}
                            onChange={e => setField("salary", e.target.value)}
                            rows={6}
                            placeholder="Заголовок: Тренд №1
Подпись: Навык, без которого не берут в топовые IT-компании. Самый быстрорастущий запрос у рекрутеров."/>
                    </div>
                    <CommonBtn
                        width={300}
                        height={58}
                        bgColor="#D9FF6A"
                        borderColor="#8A6CFF"
                        onClick={saveCourse}
                        size={18}
                        leftIcon={<img src={leftIcon} alt="книга" width={25} height={25} />}
                    >
                        Сохранить курс
                    </CommonBtn>
                    <CommonBtn
                        width={300}
                        height={58}
                        bgColor="#EB4760"
                        borderColor="white"
                        fontColor="white"
                        onClick={handleDeleteClick}
                        size={18}
                        leftIcon={<img src={delIcon} width={25} height={25} />}
                    >
                        Удалить курс
                    </CommonBtn>
                </div>
                <div className="constructor-info-preview">
                    <h2>Предпросмотр страницы</h2>
                    <div className="constructor-info-preview_hero">
                        <img className="constructor-info-preview_hero-img" src={course.photo} alt={"logo"}></img>
                        <div className="constructor-info-preview_hero-content">
                            <h3>{course.title}</h3>
                            <p>{course.desc}</p>
                            <section>
                                <h4>Что вас ждет:</h4>
                                <ul>
                                    {(course.highlights ?? []).map((h, i) => <li key={i}>{h}</li>)}
                                </ul>
                            </section>
                        </div>
                    </div>
                    {course.salary && course.salary.trim() && (
                        <div className="constructor-money-block">
                            <ExpectationsAfterCompletionMini
                                data={parseSalaryToMoneyBlocks(course.salary)}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showConfirm && (
                <ConfirmModal
                    onConfirm={handleDelete}
                    onCancel={cancelDelete}
                />
            )}
        </>
    )
}
