import { useModal } from "../hooks/useModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import API from "../api/api";

export const AreYouSure = ({ courtName, courtId, time, dayLabel, userId }) => {
  const { close } = useModal();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
 
  const handleConfirm = async () => {
    setLoading(true);
    try {
      const fullDate = new Date();
      const [hours, minutes] = time.split(":").map(Number);

      fullDate.setHours(hours, minutes, 0, 0);

      // Obtener solo la hora con zona horaria local
      const tzOffsetMinutes = fullDate.getTimezoneOffset();
      const tzHours = Math.floor(Math.abs(tzOffsetMinutes) / 60);
      const tzMinutes = Math.abs(tzOffsetMinutes) % 60;
      const tzSign = tzOffsetMinutes <= 0 ? "+" : "-";
      const tzString = `${tzSign}${String(tzHours).padStart(2, "0")}:${String(tzMinutes).padStart(2, "0")}`;

      // Formatear como "21:00:00+02:00"
      const formatTime = (date) => {
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:00${tzString}`;
      };

      const startTime = formatTime(fullDate);

      const endDate = new Date(fullDate);
      endDate.setMinutes(endDate.getMinutes() + 90);
      const endTime = formatTime(endDate);

      const response = await API.post("/bookings", {
        user_id: userId,
        court_id: courtId,
        start_time: startTime,
        end_time: endTime,
        day: dayLabel,
      },
      );
      if (response) {
        setConfirmed(!!response);
      }      

      setTimeout(() => {
        close();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar tu reserva.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-8 mx-auto text-center"
    >
      {!confirmed ? (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ¿Confirmas esta reserva?
          </h2>

          <p className="text-gray-600 mb-4">
            Estás a punto de reservar la <strong>pista "{courtName}"</strong> el{" "}
            <strong>{dayLabel}</strong> a las <strong>{time}</strong>.
          </p>

          <p className="text-lg font-semibold text-gray-800 mb-6">
            Precio: <span className="text-green-600">20 €</span>
          </p>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className={`px-4 bg-green-500 text-white py-3 rounded-xl transition ${loading ? "opacity-50 cursor-wait" : "hover:bg-green-600"
                }`}
            >
              {loading ? "Procesando..." : "Pagar y reservar"}
            </Button>
            <Button
              onClick={close}
              disabled={loading}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-3 rounded-xl transition"
            >
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">¡Reserva confirmada!</h2>
          <p className="text-gray-600">
            Has reservado la pista <strong>"{courtName}"</strong> el <strong>{dayLabel}</strong> a
            las <strong>{time}</strong>.
          </p>
        </div>
      )}
    </motion.div>
  );
};
