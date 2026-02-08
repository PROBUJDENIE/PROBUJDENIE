import "../../constructorContent.css"
export default function TitleBlock({ block, onChange }) {
    const value = block.content ?? "";

    return (
        <div className="block block-title">
            <input
                placeholder="Введите заголовок"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}