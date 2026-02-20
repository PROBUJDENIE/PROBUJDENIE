export function normalizeCourses(data) {
    return (data ?? []).map((c) => {
        const desc = c.description ?? "";

        if (!desc.includes("#БЛОК#")) {
            return { ...c, highlights: c.highlights ?? [] };
        }

        const [realDescRaw, afterRaw = ""] = desc.split("#БЛОК#");
        const realDesc = realDescRaw.trim();

        const highlights = afterRaw
            .split("-")
            .map((s) => s.trim())
            .filter(Boolean);

        return {
            ...c,
            description: realDesc,
            highlights,
        };
    });
}

export function denormalizeCourse(course) {
    const desc = (course.description ?? "").trim();


    const block = course.highlights.map(h => `- ${h}`).join("");
    return {
        ...course,
        description: `${desc}#БЛОК#${block}`,
    };
}

