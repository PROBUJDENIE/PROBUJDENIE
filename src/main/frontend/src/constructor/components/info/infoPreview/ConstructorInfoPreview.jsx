import "./constructorInfoPreview.css"


export function ConstructorInfoPreview({course}) {
    return (
        <>
            <div className="constructor-info-preview">
                <h2>Предпросмотр страницы</h2>
                <div className="constructor-info-preview_hero">
                    <img src={course.photoUrl} alt={""}></img>
                    <div className="constructor-info-preview_hero-content">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <section>
                            <h4>Что вас ждет:</h4>

                        </section>
                    </div>
                </div>
            </div>

        </>
    );
}
