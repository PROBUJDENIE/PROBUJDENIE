import "../aboutUs.css"
import Container from "../../Container.jsx";
export default function AboutUsBottom() {

    return (
        <>
            <div style={{width:'100%'}}>
                <Container>
                    <div className="aboutUs_bottom">
                        <ul className="aboutUs_bottom_list">
                            <li className="aboutUs_bottom_list_item">
                                <div className="aboutUs_bottom_list_item_point"></div>
                                <div className="aboutUs_bottom_list_item_num">100+</div>
                                <div className="aboutUs_bottom_list_item_text">довольных студентов</div>
                            </li>
                            <li className="aboutUs_bottom_list_item">
                                <div className="aboutUs_bottom_list_item_point"></div>
                                <div className="aboutUs_bottom_list_item_num">5</div>
                                <div className="aboutUs_bottom_list_item_text">cредняя оценка</div>
                            </li>
                            <li className="aboutUs_bottom_list_item">
                                <div className="aboutUs_bottom_list_item_point"></div>
                                <div className="aboutUs_bottom_list_item_num">6</div>
                                <div className="aboutUs_bottom_list_item_text">уникальных курсов</div>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
        </>
    )
}