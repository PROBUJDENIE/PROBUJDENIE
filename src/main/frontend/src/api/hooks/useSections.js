import {useCallback, useEffect, useState} from "react";
import {publicApi} from "@/api/public.api.js";

export function useSections({courseId}) {

    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSections = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await publicApi.getSectionPage({courseId:courseId, offset: 0, count: 10 });
                setSections(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadSections();
    }, [courseId]);


    function createEmptySection() {
        return {id: null, title: "", description: ""};
    }

    const getSection = useCallback((id) => {
        const data = sections.find(c => String(c.id) === String(id)) ?? null;
        if (!data) return createEmptySection();
        return data;
    }, [sections]);

    return {getSection, sections, loading, error};
}
