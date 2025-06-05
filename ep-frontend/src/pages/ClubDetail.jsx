import { useParams } from "react-router-dom";
import { useClub } from "../hooks/useClub";
import { useUser } from "../hooks/useUser";
import { useCourts } from "../hooks/useCourts";
import { useModal } from "../hooks/useModal";
import { Login } from "./Login";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../components/Button";
import { AreYouSure } from "../components/AreYouSure";
import { useBookings } from "../hooks/useBookings";

export const ClubDetail = () => {
  const { id } = useParams();
  const { club } = useClub({ clubId: id });
  const { courts } = useCourts({ clubId: id });
  const { bookings } = useBookings({ clubId: id });
  const { user } = useUser();
  const { open } = useModal();

  const [dayIndex, setDayIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalDays = 4;

  if (!club) {
    return <p className="text-center mt-10">Cargando club...</p>;
  }

  const handlePickTime = (courtName, time, dayLabel, courtId) => {
    if (!user) {
      open(<Login booking={true} />);
    } else {
      open(
        <AreYouSure
          courtName={courtName}
          courtId={courtId}
          time={time}
          dayLabel={dayLabel}
          userId={user.id}
        />
      );
    }
  };


  const handleDayChange = (newIndex) => {
    if (newIndex === dayIndex) return;
    setDirection(newIndex > dayIndex ? 1 : -1);
    setDayIndex(newIndex);
  };

  const getDayLabel = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).replace(/^\w/, (c) => c.toUpperCase());
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <div className="bg-gray-50 py-18">
      <div className="max-w-5xl mx-auto px-4">
        <img
          className="w-full h-64 rounded-xl bg-cover bg-center shadow-lg"
          style={{ backgroundImage: `url(${club.background})` }}
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">{club.name}</h1>
          <p className="text-sm text-gray-500">
            {club.city} · {club.address}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Horario: {club.open_time?.slice(0, 5)} - {club.close_time?.slice(0, 5)} de lunes a domingos
          </p>

          <div className="mt-4 text-gray-700 leading-relaxed">
            {club.description}
          </div>
        </div>
      </div>

      <div className="mt-24 max-w-7xl mx-auto px-4 relative min-h-[700px]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Horario disponible por pista y día
        </h2>

        <div className="flex items-center justify-between mb-6 mt-12">
          <button
            onClick={() => handleDayChange(dayIndex - 1)}
            disabled={dayIndex === 0}
            className="px-4 py-2 text-xl font-bold bg-[#2F80ED] disabled:text-gray-800 rounded-full flex items-center justify-center text-white disabled:bg-gray-300"
          >
            &lt;
          </button>
          <h3 className="text-xl text-gray-500">{getDayLabel(dayIndex)}</h3>
          <button
            onClick={() => handleDayChange(dayIndex + 1)}
            disabled={dayIndex === totalDays - 1}
            className="px-4 py-2 text-xl font-bold bg-[#2F80ED] disabled:text-gray-800 rounded-full flex items-center justify-center text-white disabled:bg-gray-300"
          >
            &gt;
          </button>
        </div>

        <div className="relative overflow-hidden min-h-[600px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={dayIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 gap-8">
                {[0, 1].map((row) => (
                  <div key={row} className="grid grid-cols-3 gap-4">
                    {courts.slice(row * 3, row * 3 + 3).map((court) => (
                      <div
                        key={court.id}
                        className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
                      >
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          {court.name}
                        </h4>
                        {console.log(bookings?.find(b => b.court_id === court.id))}
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
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
