import { useEffect, useState } from "react";
import API from "../api/api";

export const useClub = ({ clubId }) => {
    const [club, setClub] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClub = async () => {
        try {
            const res = await API.get(`/clubs/${clubId}`);
            setClub(res.data);
        } catch (err) {
            console.log(err)
            setError("Error al cargar el club.");
        }
        };
    
        fetchClub();
    }, [clubId]);
    
    return { club, error };
}