
import "./constructorInfo.css"
import "../constructor.css"

import {ConfirmModal} from "@/constructor/components/info/ConfirmModal.jsx";
import {ConstructorInfoPreview} from "@/constructor/components/info/infoPreview/ConstructorInfoPreview.jsx";
import {useCourseActions} from "@/constructor/components/info/infoPreview/constructorInfoHook.js";
import {constructorInfoConfirmHook} from "@/constructor/components/info/infoPreview/constructorInfoConfirmHook.js";
import {ConstructorInfoSettings} from "@/constructor/components/info/infoSettings/ConstructorInfoSettings.jsx";

export default function ConstructorInfo({course, setField, deleteCourse}) {
    const { showConfirm, openConfirm, closeConfirm } = constructorInfoConfirmHook();


    const { handleDelete, handleFile } = useCourseActions({setField, deleteCourse});


    return (
        <>
            <div className="constructor-info">
                <ConstructorInfoSettings course={course} openConfirm={openConfirm} handleFile={handleFile} setField={setField}></ConstructorInfoSettings>
                <ConstructorInfoPreview course={course}></ConstructorInfoPreview>
            </div>

            {showConfirm && (<ConfirmModal onConfirm={handleDelete} onCancel={closeConfirm}/>)}
        </>
    )
}
