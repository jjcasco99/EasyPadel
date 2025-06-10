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
import { CourtSchedule } from "../components/CourtSchedule";

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
                <CourtSchedule
                  courts={courts}
                  dayIndex={dayIndex}
                  bookings={bookings}
                  handlePickTime={handlePickTime}
                  getDayLabel={getDayLabel}
                />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
