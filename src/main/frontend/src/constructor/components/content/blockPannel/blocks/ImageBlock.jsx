import { useMemo } from "react";
import "../../constructorContent.css";

export default function ImageBlock({ block, onChange }) {
    const content = block.content;
    const previewUrl = useMemo(() => {
        if (content instanceof File) {
            return URL.createObjectURL(content);
        }
        if (typeof content === "string" && content) {
            return content;
        }
        return null;
    }, [content]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onChange(file);
    };

    return (
        <div className="block block-img">
            {previewUrl ? (
                <div className="image-preview">
                    <img
                        src={previewUrl}
                        alt="Предпросмотр изображения"
                        style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }}
                    />
                </div>
            ) : (
                ""
            )}
            <input
                className="image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            {content && content instanceof File && (
                <small>Выбрано: {content.name} ({(content.size / 1024).toFixed(1)} KB)</small>
            )}
        </div>
    );
}