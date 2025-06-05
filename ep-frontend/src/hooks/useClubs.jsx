import { useEffect, useState } from "react";
import API from "../api/api";

export const useClubs = () => {
    const [clubs, setClubs] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const res = await API.get("/clubs");
                setClubs(res.data);
            } catch (err) {
                setError("Error al cargar los clubes.");
            }
        };

        fetchClubs();
    }, []);
    
    return { clubs, error };

}

export const useCreateClub = () => {
    const [error, setError] = useState(null);
    
    const createClub = async (clubData) => {
        try {
            const res = await API.post("/clubs/add-club", clubData);
            return res.data;
        } catch (err) {
            setError("Error al crear el club.");
            throw err;
        }
    };

    return { createClub, error };
}

export const useDeleteClub = () => {    
    const [error, setError] = useState(null);
    
    const deleteClub = async (clubId) => {
        try {
            const res = await API.delete(`/clubs/${clubId}`);
            return res.data;
        } catch (err) {
            setError("Error al eliminar el club.");
            throw err;
        }
    };

    return { deleteClub, error };
}