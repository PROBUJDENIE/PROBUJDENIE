import { useEffect, useState } from "react";
import {studentApi} from "@/api/student.api.js";

export function useSubmission(exerciseId) {
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSubmission = async () => {
        try {
            setLoading(true);
            const result = await studentApi.getSubmission(exerciseId);
            setSubmission(result);
        } catch (e) {
            if (e.message.includes("404")) {
                setSubmission(null);
            } else {
                setError(e);
            }
        } finally {
            setLoading(false);
        }
    };

    const submitSolution = async (answer) => {
        try {
            setLoading(true);
            const result = await studentApi.createSubmission(exerciseId, answer);
            setSubmission(result);
            return result;
        } catch (e) {
            setError(e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (exerciseId) {
            fetchSubmission();
        }
    }, [exerciseId]);

    return {submission, loading, error, submitSolution, refetch: fetchSubmission};
}