import "./logo.css"

export default function Logo({onClick}) {

    return (
        <>
            <div>
                <button className="btnr logo" onClick={onClick}>
                    PROBUJDENIE
                </button>
            </div>

        </>
    )
}
