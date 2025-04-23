import { useEffect, useState } from "react";
import API from "../api/api";
import { NavBar } from "../components/NavBar";
import { Link } from "react-router-dom";
import { getUser } from "../auth";

export const Home = () =>  {

  return (
    <div>
      <NavBar />
      <MainContent />
    </div>
  );
}

const MainContent = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState("");
  const user = getUser();

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

  return (
    <div className="min-h-screen bg-[#F9F9F9] px-6 py-8">
      <h1 className="text-2xl font-bold text-[#2F80ED] mb-6">¡Bienvenido a EasyPadel {user?.name}!</h1>
      <p className="text-[#4F4F4F] mb-8">
        Encuentra tu club favorito y reserva tu pista al instante.
      </p>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-[#E0E0E0]"
          >
            <h2 className="text-xl font-semibold text-[#2F80ED] mb-2">{club.name}</h2>
            <p className="text-[#828282] mb-4">{club.location}</p>
            <Link
              to={`/clubs/${club.id}`}
              className="inline-block bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}