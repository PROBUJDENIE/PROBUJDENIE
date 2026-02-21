
import "./constructorInfo.css"
import "../constructor.css"

import {ConfirmModal} from "@/constructor/components/info/ConfirmModal.jsx";
import {ConstructorInfoPreview} from "@/constructor/components/info/infoPreview/ConstructorInfoPreview.jsx";
import {useCourseActions} from "@/constructor/components/info/infoPreview/constructorInfoHook.js";
import {constructorInfoConfirmHook} from "@/constructor/components/info/infoPreview/constructorInfoConfirmHook.js";
import {ConstructorInfoSettings} from "@/constructor/components/info/infoSettings/ConstructorInfoSettings.jsx";

export default function ConstructorInfo({course, setField, handleDeleteCourse, handleSave}) {
    const { showConfirm, openConfirm, closeConfirm } = constructorInfoConfirmHook();


    const { handleDelete, handleFile } = useCourseActions({setField, handleDeleteCourse, course});


    return (
        <>
            <div className="constructor-info">
                <ConstructorInfoSettings course={course} openConfirm={openConfirm} handleFile={handleFile} setField={setField} handleSave={handleSave}></ConstructorInfoSettings>
                <ConstructorInfoPreview course={course}></ConstructorInfoPreview>
            </div>

            {showConfirm && (<ConfirmModal onConfirm={() => handleDelete(course.id)} onCancel={closeConfirm}/>)}
        </>
    )
}
