import { Button } from "./Button";


export const CourtSchedule = ({ courts, dayIndex, handlePickTime, bookings, getDayLabel }) => {
    return (
        <div className="grid grid-cols-1 gap-8">
            {
                [0, 1].map((row) => (
                    <div key={row} className="grid grid-cols-3 gap-4">
                        {courts.slice(row * 3, row * 3 + 3).map((court) => (
                            <div
                                key={court.id}
                                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
                            >
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                    {court.name}
                                </h4>

                                <div className="grid grid-cols-4 gap-4">
                                    {Array.from({ length: 10 }, (_, i) => {
                                        const startHour = 8 + i * 1.5;
                                        const hours = Math.floor(startHour);
                                        const minutes = (startHour % 1) * 60;
                                        const time = `${hours.toString().padStart(2, "0")}:${minutes
                                            .toString()
                                            .padStart(2, "0")}`;

                                        const selectedDate = new Date();
                                        selectedDate.setDate(selectedDate.getDate() + dayIndex);
                                        selectedDate.setHours(0, 0, 0, 0);

                                        const isReserved = bookings?.some((b) => {
                                            const [timePart] = b.start_time.split("+");
                                            const [bookingHours, bookingMinute] = timePart.split(":").map(Number);

                                            // Crear una fecha con la fecha seleccionada y la hora de la reserva
                                            const bookingDate = new Date(selectedDate);
                                            bookingDate.setHours(bookingHours, bookingMinute, 0, 0);

                                            const sameCourt = b.court_id === court.id && b.day === getDayLabel(dayIndex);

                                            const sameDay =
                                                bookingDate?.getDate() === selectedDate.getDate() &&
                                                bookingDate?.getMonth() === selectedDate.getMonth() &&
                                                bookingDate?.getFullYear() === selectedDate.getFullYear();

                                            const bookingHour = bookingDate.getHours();
                                            const bookingMinutes = bookingDate.getMinutes();

                                            const [btnHour, btnMinutes] = time.split(":").map(Number);
                                            const sameHour = bookingHour === btnHour && bookingMinutes === btnMinutes;

                                            return sameCourt && sameDay && sameHour;
                                        });


                                        const now = new Date();
                                        const isToday = dayIndex === 0;
                                        const isDisabled =
                                            isToday &&
                                            (now.getHours() > hours ||
                                                (now.getHours() === hours &&
                                                    now.getMinutes() > minutes));

                                        return (
                                            <Button
                                                key={i}
                                                className={`p-4 rounded-lg shadow-sm text-center transition-colors duration-200 ${isDisabled
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : isReserved
                                                        ? "bg-red-500 text-white cursor-not-allowed"
                                                        : !isReserved && !isDisabled
                                                            ? "bg-green-600 text-white hover:bg-blue-600"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                id={`court-${court.id}`}
                                                tooltip={isReserved ? "Pista reservada" : isDisabled ? "Hora no disponible" : null}
                                                disabled={isDisabled || isReserved}
                                                onClick={() => !isDisabled && handlePickTime(court.name, time, getDayLabel(dayIndex), court.id)}
                                            >
                                                {time}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}