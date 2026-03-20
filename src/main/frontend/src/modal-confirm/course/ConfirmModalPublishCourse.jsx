import "../сonfirmModal.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import conf from "../resourses/confSave.svg"
import cancel from "../../constructor/resources/images/cancel.svg"

export function ConfirmModalPublishCourse({modalState, changeModalState, onConfirm}) {
    if (modalState !== 28) return null;

    const handleConfirm = async () => {
        await onConfirm();
        changeModalState(0);
    };

    const handleCancel = () => {
        changeModalState(0);
    };

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal-block-back" onClick={e => e.stopPropagation()}>
                <Logo ></Logo>
                <div className="modal-block_title"> Опубликовать данный курс?</div>
                <div className="modal-block_text"> Ваш курс станет доступен для покупки</div>
                <div className="modal-btns">
                    <CommonBtn width={180} height={50} bgColor={"#DFD8D3"} borderColor={"white"} fontColor={"white"} size={20} onClick={handleCancel} leftIcon={<img src={cancel} width={30} height={30} />}>Отменить</CommonBtn>
                    <CommonBtn width={180} height={50} bgColor={"#8A6CFF"} borderColor={"white"} size={20} onClick={handleConfirm} fontColor={"white"} leftIcon={<img src={conf} width={30} height={30} />}>Опубликовать</CommonBtn>
                </div>
            </div>
        </div>
    );
}
