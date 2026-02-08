import "./question.css"
import QuestionHeader from "./header/QuestionHeader.jsx";
import QuestionContent from "./content/QuestionContent.jsx";
import QuestionBottom from "./bottom/QuestionBottom.jsx";
export default function Question() {

    return (
        <>
            <div className="question" id={"question"}>
                <QuestionHeader></QuestionHeader>
                <QuestionContent></QuestionContent>
                <QuestionBottom></QuestionBottom>
            </div>
        </>
    )
}