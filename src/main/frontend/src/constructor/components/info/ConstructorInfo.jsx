import "./constructorInfo.css"
import "../constructor.css"

import {ConfirmModalDelCourse} from "@/modal-confirm/course/ConfirmModalDelCourse.jsx";
import {ConstructorInfoPreview} from "@/constructor/components/info/infoPreview/ConstructorInfoPreview.jsx";
import {useCourseActions} from "@/constructor/components/info/infoPreview/constructorInfoHook.js";
import {ConstructorInfoSettings} from "@/constructor/components/info/infoSettings/ConstructorInfoSettings.jsx";
import {ConfirmModalSaveCourse} from "@/modal-confirm/course/ConfirmModalSaveCourse.jsx";

export default function ConstructorInfo({course, setField, handleDeleteCourse, handleSave, modalState, changeModalState}) {
    const { handleDelete, handleFile } = useCourseActions({setField, handleDeleteCourse, course});


    return (
        <>
            <div className="constructor-info">
                <ConstructorInfoSettings courseId={course?.id} modalState={modalState} changeModalState={changeModalState} onConfirm={handleSave} course={course} openConfirm={() => changeModalState(20)} openSaveConfirm={() => changeModalState(21)} handleFile={handleFile} setField={setField} handleSave={handleSave}></ConstructorInfoSettings>
                <ConstructorInfoPreview course={course}></ConstructorInfoPreview>
            </div>
            <ConfirmModalDelCourse modalState={modalState} changeModalState={changeModalState} onConfirm={handleDelete} courseId={course?.id}/>
            <ConfirmModalSaveCourse modalState={modalState} changeModalState={changeModalState} courseId={course?.id} onConfirm={handleSave}/>
        </>
    )
}
