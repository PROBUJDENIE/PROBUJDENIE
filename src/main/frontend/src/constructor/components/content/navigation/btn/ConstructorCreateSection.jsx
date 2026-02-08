import CommonBtn from "../../../../../main-page/compoents/prototype/btn/CommonBtn.jsx";

export default function ConstructorCreateSection({onClick}) {


    return (
        <>
            <div className={"constructor-create-section-btn"}>
                <CommonBtn width={250} height={50} borderColor={"#8A6CFF"} onClick={onClick} size={30}>+</CommonBtn>
            </div>
        </>
    )
}
