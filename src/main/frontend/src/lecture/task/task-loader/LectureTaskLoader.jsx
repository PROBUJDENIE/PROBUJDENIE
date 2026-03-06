import { useEffect, useState } from "react";
import Task from "@/lecture/task/Task.jsx";
import {studentApi} from "@/api/student.api.js";

export default function LectureTaskLoader({ exerciseId }) {

    const [exerciseData, setExerciseData] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await studentApi.getExercise(exerciseId);
                setExerciseData(data);
            } catch (e) {
                console.error(e);
            }
        };

        if (exerciseId) {
            load();
        }
    }, [exerciseId]);

    if (!exerciseData) {
        return <div>Загрузка задания...</div>;
    }

    return <Task exerciseData={exerciseData} />;
}