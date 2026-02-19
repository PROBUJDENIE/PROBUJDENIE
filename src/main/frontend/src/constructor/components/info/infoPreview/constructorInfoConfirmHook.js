import { useState } from "react";

export function constructorInfoConfirmHook() {
    const [showConfirm, setShowConfirm] = useState(false);

    const openConfirm = () => setShowConfirm(true);
    const closeConfirm = () => setShowConfirm(false);

    return {
        showConfirm,
        openConfirm,
        closeConfirm
    };
}
