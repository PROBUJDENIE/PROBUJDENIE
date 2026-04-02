import "./task.css"
import {useRef, useState} from "react";
import Editor from "@monaco-editor/react";
import check from "../resourses/check.svg"
import {useSubmission} from "@/api/hooks/useSubmission.js";
import {usePersistedCode} from "@/api/hooks/usePersistedCode.js";
import good from "./resourses/task_good.svg"
import bad from "./resourses/task_bad.svg"
import think from "./resourses/task_think.svg"
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
export default function Task({ exerciseData }) {
    const editorRef = useRef(null);
    const {submission, loading, submitSolution, refetch} = useSubmission(exerciseData?.id);
    const { code, setCode } = usePersistedCode(exerciseData?.id, exerciseData?.defaultCode);
    const [submitted, setSubmitted] = useState(false);
    const isButtonDisabled = loading || submission?.data?.status === 'SUBMITTED' || submission?.data?.status === 'IN_REVIEW';
    const handleSubmit = async () => {
        if (isButtonDisabled) return;
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
                        <CommonBtn fontWeight={800} size={20} leftIcon={!isButtonDisabled ? <img src={check} width={35} height={35}/> : null} width={220} height={45} onClick={handleSubmit} bgColor={isButtonDisabled ? "#CCCCCC" : "#8A6CFF"} fontColor={isButtonDisabled ? "#999999" : "white"} borderColor={isButtonDisabled ? "#999999" : "white"} borderRadius={20}>{loading ? "ОТПРАВКА" : submission?.data?.status === 'SUBMITTED' || submission?.data?.status === 'IN_REVIEW' ? "ПРОВЕРЯЕТСЯ" : "ПРОВЕРИТЬ"}</CommonBtn>
                        <div className={`task-block-panel_status ${!submission?.data?.status ? 'not_submitted' : submission?.data?.status}`}>
                            Статус: {submission?.data?.status || "Не отправлено"}
                        </div>

                    </div>
                    {submitted && submission && (
                        <div className={`error_desc ${submission.data?.error_desc || submission.data?.status === 'REJECTED' ? 'error' : 'success'}`}>
                            {submission.data?.error_desc || submission.data?.status === 'REJECTED' ? (
                                <div className="error-message">
                                    <strong>Ошибка компиляции/выполнения, Боб расстроен, подумай и исправь ошибку</strong>
                                    <img src={bad}/>
                                    <pre>{submission.data?.error_desc}</pre>
                                </div>
                            ) : submission.data?.status === 'APPROVED' ? (
                                <div className="success-message">
                                    <strong>Ура, ты молодец, Боб гордится тобой!</strong>
                                    <img src={good}/>
                                </div>
                            ) : (
                                <div className="success-message">
                                    <strong>Решение успешно отправлено! Пару секунд, Боб проверяет...</strong>
                                    <img src={think}/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}