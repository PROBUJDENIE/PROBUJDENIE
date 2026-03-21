import "../сonfirmModal.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import cancel from "../../constructor/resources/images/cancel.svg"

export function ModalErrorTask({modalState, changeModalState}) {
    if (modalState !== 25) return null;

    const handleCancel = () => {
        changeModalState(0);
    };

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal-block-del" onClick={e => e.stopPropagation()}>
                <Logo ></Logo>
                <div className="modal-block_title"> Невозможно сохранить задание!</div>
                <div className="modal-block_text"> Не все обязательные поля заполнены</div>
                <div className="modal-btns">
                    <CommonBtn width={350} height={50} bgColor={"#EB4760"} borderColor={"white"} fontColor={"white"} size={20} onClick={handleCancel} leftIcon={<img src={cancel} width={30} height={30} />}>Продолжить редактирование</CommonBtn>
                </div>
            </div>
        </div>
    );
}
