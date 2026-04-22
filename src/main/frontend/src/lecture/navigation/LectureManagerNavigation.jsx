import "./lectureManagerNavigation.css"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import menu from "@/lecture/resourses/menu.svg";
export default function LectureManagerNavigation({isOpen, setIsOpen, sections, lectures, activeChapterIdx, setActiveChapterIdx, activeLectureId, setActiveLectureId,}) {

    const handleClickSection = (index) => {
        setActiveChapterIdx(index);
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
                                    <div key={section.id} className="lectureManagerNavigation_content-section">
                                        <CommonBtn className="nav-section-btn" size={17} width={270} height={60} borderColor={"#8A6CFF"} fontColor={activeChapterIdx === index ? "#fff" : "#333"} bgColor={activeChapterIdx === index ? "#8A6CFF" : "#DFD8D3"} onClick={() => handleClickSection(index)}>{section.title}</CommonBtn>
                                    </div>

                                    {activeChapterIdx === index && (

                                        lectures.map((lec) => (
                                            <div key={lec.id} className="lectureManagerNavigation_content-lecture">
                                                <CommonBtn className="nav-lecture-btn" size={17} width={200} height={60} borderColor={"#8A6CFF"} fontColor={(activeLectureId === String(lec.id)) ? "#ffffff" : "#333333"} bgColor={activeLectureId === String(lec.id) ? "#8A6CFF" : "#DFD8D3"} onClick={() => setActiveLectureId(String(lec.id))}>{lec.title}</CommonBtn>
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