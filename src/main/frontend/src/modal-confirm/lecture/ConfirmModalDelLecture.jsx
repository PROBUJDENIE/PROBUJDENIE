import "../сonfirmModal.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import del from "../../constructor/resources/images/del_course.svg"
import cancel from "../../constructor/resources/images/cancel.svg"

export function ConfirmModalDelLecture({modalState, changeModalState, onConfirm, courseId}) {
    if (modalState !== 26) return null;

    const handleConfirm = async () => {
        await onConfirm(courseId);
        changeModalState(0);
    };

    const handleCancel = () => {
        changeModalState(0);
    };

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal-block-del" onClick={e => e.stopPropagation()}>
                <Logo ></Logo>
                <div className="modal-block_title"> Удалить лекцию?</div>
                <div className="modal-block_text"> Это действие нельзя отменить</div>
                <div className="modal-btns">
                    <CommonBtn width={180} height={50} bgColor={"#EB4760"} borderColor={"white"} fontColor={"white"} size={20} onClick={handleCancel} leftIcon={<img src={cancel} width={30} height={30} />}>Отменить</CommonBtn>
                    <CommonBtn width={180} height={50} bgColor={"#DFD8D3"} borderColor={"white"} size={20} onClick={handleConfirm} fontColor={"white"} leftIcon={<img src={del} width={30} height={30} />}>Удалить</CommonBtn>
                </div>
            </div>
        </div>
    );
}
