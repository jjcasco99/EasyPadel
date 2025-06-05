import { useState, useEffect } from 'react';
import API from '../api/api';

export const useBookings = ({ clubId }) => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await API.get(`/bookings/courts/${clubId}`);
                setBookings(res.data);
            } catch (err) {
                setError("Error al cargar las reservas.");
            }
        };

            fetchBookings();
    }, [clubId]);

    return { bookings, error };
}

export const useBookingsByUser = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await API.get(`/bookings/user/${userId}`);
                setBookings(res.data);
            } catch (err) {
                setError("Error al cargar las reservas del usuario.");
            }
        };
        if (userId) {
            fetchBookings();
        }
    }, [userId]);

    return { bookings, error };
};

export const useCancelBooking = () => {
    const cancelBooking = async (bookingId) => {
        try {
            const res = await API.delete(`/bookings/cancel/${bookingId}`);
            return res.data;
        } catch (err) {
            throw new Error("Error al cancelar la reserva.");
        }
    };

    return { cancelBooking };
}