import { useEffect, useState } from "react";
import {studentApi} from "@/api/student.api.js";

const FINAL_STATUSES = ['APPROVED', 'REJECTED'];
const POLLING_INTERVAL = 5000;

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

    useEffect(() => {
        const status = submission?.data?.status;
        if (!status || FINAL_STATUSES.includes(status)) return;

        const interval = setInterval(() => {
            fetchSubmission();
        }, POLLING_INTERVAL);

        return () => clearInterval(interval);
    }, [submission?.data?.status]);

    const submitSolution = async (answer) => {
        try {
            setLoading(true);
            const data = {
                answer: answer,
                ...(submission?.data?.id && { id: submission.data.id })
            };
            const result = await studentApi.createSubmission(exerciseId, data);
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

    return { submission, loading, error, submitSolution, refetch: fetchSubmission };
}