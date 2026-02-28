import "./task.css"
import { useRef} from "react";
import Editor from "@monaco-editor/react";
import check from "../resourses/check.svg"
import {useSubmission} from "@/api/hooks/useSubmission.js";
import {usePersistedCode} from "@/api/hooks/usePersistedCode.js";

export default function Task({ exerciseData }) {
    const editorRef = useRef(null);
    const {submission, loading, submitSolution} = useSubmission(exerciseData?.id);
    const { code, setCode } = usePersistedCode(exerciseData?.id, exerciseData?.defaultCode);

    const handleSubmit = async () => {
        try {
            await submitSolution(code);
            console.log("Решение отправлено");
        } catch (e) {
            console.error("Ошибка при отправке решения", e);
        }
    };

    const getMonacoLanguage = (programmingLanguage) => {
        switch (programmingLanguage) {
            case 'JAVA':
                return 'java';
            case 'PYTHON':
                return 'python';
            default:
                return 'java';
        }
    };

    return (
        <>
            <div className="task-block">
                <div className="task-block-modules">
                    <div className="task-block_title">
                        <h2>{exerciseData.title || "Задание"}</h2>
                    </div>

                    {exerciseData.description && (
                        <div className="task-block_desc">
                            <p>{exerciseData.description}</p>
                        </div>
                    )}

                    <div className="task-block_solve">
                        <div className="code-editor-container">
                            <Editor
                                height="300px"
                                language={getMonacoLanguage(exerciseData.programmingLanguage)}
                                value={code}
                                theme="vs-light"
                                onChange={(value) => setCode(value ?? "")}
                                onMount={(editor) => (editorRef.current = editor)}
                                options={{
                                    fontSize: 20,
                                    lineHeight: 1.5,
                                    minimap: { enabled: false },
                                    lineNumbers: 'on',
                                    glyphMargin: false,
                                    folding: true,
                                    lineNumbersMinChars: 3,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    fontFamily: "JetBrains Mono, Consolas, monospace",
                                    wordWrap: 'off',
                                    tabSize: 4,
                                    insertSpaces: true,
                                    bracketPairColorization: { enabled: true },
                                    autoClosingBrackets: 'always',
                                    autoIndent: 'full',
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    scrollbar: {vertical: 'visible', horizontal: 'visible'}
                                }}
                            />
                        </div>
                    </div>

                    <div className="task-block-panel">
                        <button className="btnr" onClick={handleSubmit}>
                            <img src={check} alt="submit" />
                        </button>
                        <div className="task-block-panel_status">Статус:</div>
                    </div>
                </div>
            </div>
        </>
    )
}