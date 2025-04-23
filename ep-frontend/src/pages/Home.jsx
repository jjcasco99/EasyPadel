import { useEffect, useState } from "react";
import API from "../api/api";
import { logout } from "../auth";
import { NavBar } from "../components/NavBar";

export default function Home() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await API.get("/clubs");
        setClubs(res.data);
      } catch (err) {
        console.error("Error al obtener clubs", err);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  );
}
