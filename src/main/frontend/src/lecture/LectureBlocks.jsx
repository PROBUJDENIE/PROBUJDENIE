import "./lectureBlocks.css"

export default function LectureBlocks({material}) {

    return (
        <>
            <div className="lecture-blocks">
                {material.map((block, index) => {

                    switch (block.type) {
                        case "heading":
                            return (
                                <h2  key={index} className="lecture-headingBlock">
                                    {block.content}
                                </h2>
                            );

                        case "paragraph":
                            return (
                                <p key={index} className="lecture-paragraphBlock">
                                    {block.content}
                                </p>
                            );

                        case "image":
                            { const src = block.imageUrl;

                            return (
                                <div key={index} className="lecture-imageBlock">
                                    <img
                                        src={src}
                                        alt={"Изображение к лекции"}
                                        loading="lazy"
                                    />
                                </div>
                            ); }
                    }
                })}
            </div>
        </>
    )
}
