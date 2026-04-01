import "./task.css"
import {useRef, useState} from "react";
import Editor from "@monaco-editor/react";
import check from "../resourses/check.svg"
import {useSubmission} from "@/api/hooks/useSubmission.js";
import {usePersistedCode} from "@/api/hooks/usePersistedCode.js";

export default function Task({ exerciseData }) {
    const editorRef = useRef(null);
    const {submission, loading, submitSolution, refetch} = useSubmission(exerciseData?.id);
    const { code, setCode } = usePersistedCode(exerciseData?.id, exerciseData?.defaultCode);
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = async () => {
        try {
            await submitSolution(code);
            await refetch();
            setSubmitted(true);
            console.log("Решение отправлено");
        } catch (e) {
            console.error("Ошибка при отправке решения", e);
        }
    };

    const getMonacoLanguage = (programmingLanguage) => {
        switch (programmingLanguage?.toUpperCase()) {
            case 'JAVA':
                return 'java';
            case 'PYTHON':
                return 'python';
            case 'JAVASCRIPT':
                return 'javascript';
            case 'CPP':
                return 'cpp';
            case 'CSHARP':
                return 'csharp';
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
                        <div className="task-block-panel_status">Статус: {submission?.data?.status || "Не отправлено"}</div>

                    </div>
                    {submitted && submission && (
                        <div className={`error_desc ${submission.data?.error_desc ? 'error' : 'success'}`}>
                            {submission.data?.error_desc ? (
                                <div className="error-message">
                                    <strong>Ошибка компиляции/выполнения:</strong>
                                    <pre>{submission.data?.error_desc}</pre>
                                </div>
                            ) : (
                                <div className="success-message">
                                    <strong>Решение успешно отправлено!</strong>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}