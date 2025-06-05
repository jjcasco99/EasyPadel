import { X } from "lucide-react";
import { Button } from "../components/Button";
import { useBookingsByUser, useCancelBooking } from "../hooks/useBookings";
import { useCourtsByBookings } from "../hooks/useCourts";
import { useUser } from "../hooks/useUser";

export const MyBookings = () => {
    const { user } = useUser();
    const { bookings, error } = useBookingsByUser({ userId: user?.id });
    const { courts, error: courtErr } = useCourtsByBookings({ bookings });
    const { cancelBooking } = useCancelBooking();

    if (error) {
        return <p className="text-red-500 text-center mt-10">{error || courtErr}</p>;
    }



    const handleCancelBooking = (bookingId) => async () => {
        try {
            await cancelBooking(bookingId);
            window.location.reload();
        } catch (err) {
            console.error("Error al cancelar la reserva:", err);
        }
    }
    // Obtener la fecha actual en formato: lunes, 3 de junio
    const todayFormated = new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
    });

    const filteredCourts = courts
        ?.filter((court) => {
            const match = court?.day?.match(/\d+/);
            const courtDate = match?.[0];
            return todayFormated <= courtDate
        })

    if (!filteredCourts.length) {
        return (
            <div className="flex items-center justify-center h-[60vh] bg-gray-50">
            <p className="text-center text-xl font-bold text-gray-500">No tienes reservas.</p>
            </div>
        );
    }

    return (
        <div className="w-full py-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4 max-w-7xl mx-auto">Mis Reservas</h1>
            <ul className="space-y-4 max-w-7xl mx-auto">
                {
                    filteredCourts?.map((court) => {
                        const time = court?.start_time?.slice(0, 5);
                        return (
                            <li key={court.id} className="border p-4 rounded-lg shadow-sm flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Club {court?.club_name} - {court?.name}</h2>
                                    <p>{court?.day} - {time}</p>
                                </div>
                                <Button
                                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-2xl"
                                    onClick={handleCancelBooking(court?.id)}
                                >
                                    <p>Cancelar Reserva</p>
                                </Button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
