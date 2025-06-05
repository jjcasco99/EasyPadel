import { useEffect, useState } from "react";
import API from "../api/api";

export const useCourts = ({ clubId }) => {
    const [courts, setCourts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourtsByID = async () => {
            try {
                const res = await API.get(`/courts/club/${clubId}`);
                setCourts(res.data);
            } catch (err) {
                setError("Error al cargar los clubes.");
            }
        };

        fetchCourtsByID();
    }, []);

    return { courts, error };

}

export const useCourtsByBookings = ({ bookings }) => {
    const [courts, setCourts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (bookings?.length > 0) {
            Promise.all(
                bookings.map((courtId) => {
                    return API.get(`/bookings/court/${courtId?.court_id}`);
                })
            )
                .then((responses) => {
                    const courtsData = responses.flatMap(res => res.data);
                    setCourts(courtsData);
                })
                .catch((error) => {
                    setError("Error al cargar los clubes.");
                });
        }
    }, [bookings]);

    return { courts, error };
}