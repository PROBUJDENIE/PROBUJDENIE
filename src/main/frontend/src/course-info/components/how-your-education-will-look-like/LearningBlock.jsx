import "./howYourEducationWillLookLike.css";

export default function LearningBlock({
                                          imageSrc,
                                          title,
                                          description,
                                          videoComponent
                                      }) {
    return (
        <div className="learning-block">
            <div className="learning-block_content">
                <div className="learning-block_head">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="learning-block_head_img"
                    />
                </div>
                <div className="learning-block_body">
                    <h1 className="learning-block_body_title">{title}</h1>
                    <p className="learning-block_body_desc">{description}</p>
                </div>
            </div>
            <div className="learning-block_video">
                {videoComponent}
            </div>
        </div>
    );
}