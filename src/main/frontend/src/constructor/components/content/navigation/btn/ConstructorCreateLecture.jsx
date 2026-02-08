import CommonBtn from "../../../../../main-page/compoents/prototype/btn/CommonBtn.jsx";

export default function ConstructorCreateLecture({onClick}) {


    return (
        <>
            <div className={"constructor-create-lecture-btn"}>
                <CommonBtn width={200} height={50} borderColor={"#8A6CFF"} onClick={onClick} size={30}>+</CommonBtn>
            </div>
        </>
    )
}
