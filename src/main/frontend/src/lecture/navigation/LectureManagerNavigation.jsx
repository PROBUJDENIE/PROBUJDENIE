import "./lectureManagerNavigation.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import menu from "@/lecture/resourses/menu.svg";
export default function LectureManagerNavigation({isOpen, setIsOpen, activeSectionId, setActiveSectionId , sections, lectures, activeLectureId, setActiveLectureId}) {

    const handleClickSection = (sectionId) => {
        setActiveSectionId(sectionId);
    };


    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className="login-box-overlay" onClick={setIsOpen}>
                <div className="lectureManagerNavigation" onClick={e => e.stopPropagation()}>
                    <div className="lectureManagerNavigation_header">
                        <button  className={"btnr"} onClick={setIsOpen}><img src={menu} height={70} width={70} /></button>
                    </div>
                    <div className="lectureManagerNavigation_content">
                        {sections.map((section, index) => {
                            return (
                                <>
                                    <div key={index} className="lectureManagerNavigation_content-section">
                                        <CommonBtn size={17} width={270} height={60} borderColor={"#8A6CFF"} fontColor={(activeSectionId === section.id) ? "#ffffff" : "#333333"} bgColor={(activeSectionId === section.id) ? "#8A6CFF" : "#DFD8D3"} onClick={() => handleClickSection(section.id)}>{section.title}</CommonBtn>
                                    </div>

                                    {activeSectionId === section.id && (

                                        lectures.map((lec) => (
                                            <div key={lec.id} className="lectureManagerNavigation_content-lecture">
                                                <CommonBtn size={17} width={200} height={60} borderColor={"#8A6CFF"} fontColor={(activeLectureId === lec.id) ? "#ffffff" : "#333333"} bgColor={activeLectureId === lec.id ? "#8A6CFF" : "#DFD8D3"} onClick={() => setActiveLectureId(lec.id)}>{lec.title}</CommonBtn>
                                            </div>
                                        ))
                                    )}

                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}