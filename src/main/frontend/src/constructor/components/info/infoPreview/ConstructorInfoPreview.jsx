import "./constructorInfoPreview.css"
import PriceConstructorPreview
    from "@/constructor/components/info/infoPreview/staticBlocks/price/PriceConstructorPreview.jsx";



export function ConstructorInfoPreview({course}) {
    return (
        <>
            <div className="constructor-info-preview">
                <h2>Предпросмотр страницы</h2>
                <div className="constructor-info-preview_hero">
                    <img src={course.photo ?  URL.createObjectURL(course.photo) : course.photoUrl} alt={""}></img>
                    <div className="constructor-info-preview_hero-content">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <section>
                            <h4>Что вас ждет:</h4>
                            {course.highlights.map((highlight, index) => (
                                <div className="highlight" key={index}>{highlight}</div>
                            ))}
                        </section>
                    </div>
                </div>

                <PriceConstructorPreview course={course} ></PriceConstructorPreview>

            </div>

        </>
    );
}
