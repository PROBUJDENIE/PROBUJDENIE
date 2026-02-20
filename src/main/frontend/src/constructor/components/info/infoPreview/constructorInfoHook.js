import { useNavigate } from "react-router-dom";
import { ADMIN_PROFILE_ROUTE } from "@/utils/constants.jsx";

export function useCourseActions({ setField, handleDeleteCourse, course }) {
    const navigate = useNavigate();

    async function handleDelete() {
        if (!course) return;


        await handleDeleteCourse(course.id);
        navigate(ADMIN_PROFILE_ROUTE);
    }

    function handleFile(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setField("photo", file);
    }

    return {
        handleDelete,
        handleFile
    };
}
