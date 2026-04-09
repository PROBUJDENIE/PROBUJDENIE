import { useState, useEffect } from 'react';
import {getAuthHeaders} from "@/api/config.js";

export function useUserData(token) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/student-secure/api/v1/users', {
                    method: 'GET',
                    headers: getAuthHeaders()
                });

                if (!response.ok) {
                    throw new Error(`Ошибка`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error('Ошибка загрузки пользователя:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    return { userData, loading, error };
}