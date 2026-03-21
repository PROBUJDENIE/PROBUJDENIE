import "./constructorInfoSettings.css"
import {CONSTRUCTOR_PLACEHOLDERS} from "@/constructor/components/info/infoPreview/constructorPlaceholders.js";
import fileImage from "@/constructor/resources/images/file.svg";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "@/constructor/resources/images/save.svg";
import delIcon from "@/constructor/resources/images/del_course.svg";
import {useEffect, useState} from "react";
import {ConfirmModalPublishCourse} from "@/modal-confirm/course/ConfirmModalPublishCourse.jsx";
import {ConfirmModalNotPublishCourse} from "@/modal-confirm/course/ConfirmModalNotPublishCourse.jsx";

export function ConstructorInfoSettings({course, openConfirm, handleFile, setField, openSaveConfirm, changeModalState, modalState, handleSave}) {
    const [highlightsDraft, setHighlightsDraft] = useState((course.highlights ?? []).join("\n"));
    useEffect(() => {setHighlightsDraft((course.highlights ?? []).join("\n"));}, [course.highlights]);
    const activePub = course.status === "READY" ? "publish" : "not";
    const handleSaveCourse = async (updatedFields) => {
        const updatedCourse = { ...course, ...updatedFields };
        await handleSave(updatedCourse);
    };
    return (
        <>
            <div className="constructor-info-settings">
                <h2>Создание курса</h2>
                <div className="constructor-info-settings_title flex">
                    <label>Название курса *</label>
                    <input value={course.title} onChange={e => setField("title", e.target.value)} placeholder={CONSTRUCTOR_PLACEHOLDERS.TITLE}/>
                </div>
                <div className="constructor-info-settings_desc">
                    <label>Описание *</label>
                    <p>До 500 символов</p>
                    <textarea value={course.description} onChange={e => setField("description", e.target.value)} maxLength={500} rows={5} placeholder={CONSTRUCTOR_PLACEHOLDERS.DESCRIPTION}/>
                </div>
                <div className="constructor-info-settings_img" data-cursor-hover>
                    <label>Изображение курса</label>
                    <p>Разрешенные форматы: .png, .jpeg, .jpg; Объем до 5мб. Формат: 4x5.</p>
                    <div className="constructor-info-settings_btn">
                        <div className="custom-file-input">
                            <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFile} id="course-image-upload"/>
                            <label htmlFor="course-image-upload" className="custom-file-label">
                                <img className="file-icon" src={fileImage} width={30} height={30}></img>
                                <p className="file-text">Выбрать изображение</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="constructor-info-settings_advert">
                    <label>Что вас ждет</label>
                    <p>Что ждет студентов во время обучения, каждая сторка-отдельный пункт</p>
                    <textarea value={highlightsDraft} onChange={(e) => setHighlightsDraft(e.target.value)}/>
                    <CommonBtn width={100} height={50} borderColor={"#8A6CFF"}  onClick={() => {setField("highlights", highlightsDraft.split("\n").map(s => s.trim()).filter(Boolean));}}>Применить</CommonBtn>
                </div>
                <div className="constructor-info-settings_price">
                    <label>Цена</label>
                    <input value={course.price} onChange={e => setField("price", e.target.value)} placeholder={"500"}/>
                </div>
                <div className="publish_btns">
                    <CommonBtn width={200} height={40} borderRadius={10} bgColor={activePub === 'publish' ? "#8A6CFF" : "transparent"} borderColor={"#8A6CFF"} size={17} fontColor={"white"} onClick={() => changeModalState(28)}> Опубликовано</CommonBtn>
                    <CommonBtn width={200} height={40} borderRadius={10} bgColor={activePub === 'not' ? "#8A6CFF" : "transparent"} borderColor={"#8A6CFF"} size={17} fontColor={"white"}  onClick={() => changeModalState(29)}> Не опубликовано</CommonBtn>
                </div>
                <div className="edit_btns">
                    <CommonBtn onClick={openSaveConfirm} width={220} height={58} bgColor="#D9FF6A" borderColor="#8A6CFF" size={18} leftIcon={<img src={leftIcon} alt="книга" width={25} height={25} /> }>Сохранить курс</CommonBtn>
                    <CommonBtn width={220} height={58} bgColor="#EB4760" borderColor="white" fontColor="white" onClick={openConfirm} size={18} leftIcon={<img src={delIcon} width={25} height={25} />}>Удалить курс</CommonBtn>
                </div>
            </div>
            <ConfirmModalPublishCourse modalState={modalState} changeModalState={changeModalState} onConfirm={() => handleSaveCourse({ status: "READY" })}/>
            <ConfirmModalNotPublishCourse modalState={modalState} changeModalState={changeModalState} onConfirm={() => handleSaveCourse({ status: "CREATED" })}/>
        </>
    );
}
