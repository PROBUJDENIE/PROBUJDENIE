import { useNavigate } from "react-router-dom";
import { ADMIN_PROFILE_ROUTE } from "@/utils/constants.jsx";

export function useCourseActions({ setField, deleteCourse }) {
    const navigate = useNavigate();

    async function handleDelete() {
        const isDeleted = await deleteCourse();  // лучше async
        if (isDeleted) {
            navigate(ADMIN_PROFILE_ROUTE);
        }
    }

    function handleFile(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setField("photo", reader.result);
        };
        reader.readAsDataURL(file);
    }

    return {
        handleDelete,
        handleFile
    };
}
