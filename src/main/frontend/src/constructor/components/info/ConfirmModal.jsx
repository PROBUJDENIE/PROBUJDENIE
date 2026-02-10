import "./сonfirmModal.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import del from "../../resources/images/del_course.svg"
import cancel from "../../resources/images/cancel.svg"

export function ConfirmModal({onConfirm, onCancel, onClose}) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-block" onClick={e => e.stopPropagation()}>
                <Logo ></Logo>
                <div className="modal-block_title"> Удалить курс?</div>
                <div className="modal-block_text"> Это действие нельзя отменить</div>
                <div className="modal-btns">
                    <CommonBtn
                        width={180}
                        height={50}
                        bgColor={"#EB4760"}
                        borderColor={"white"}
                        fontColor={"white"}
                        size={20}
                        onClick={onCancel}
                        leftIcon={<img src={cancel} width={30} height={30} />}
                    >Отменить</CommonBtn>
                    <CommonBtn
                        width={180}
                        height={50}
                        bgColor={"#DFD8D3"}
                        borderColor={"white"}
                        size={20}
                        onClick={onConfirm}
                        fontColor={"white"}
                        leftIcon={<img src={del} width={30} height={30} />}
                    >Удалить</CommonBtn>
                </div>
            </div>
        </div>
    );
}
