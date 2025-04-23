import { useNavigate } from "react-router-dom";
import { logout } from "../auth"
import { Button } from "./Button"

export const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
      <nav className="bg-white border-b border-[#BDBDBD] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-[#2F80ED]">
            <span className="text-green-600">Easy</span>Padel
          </a>
  
          <ul className="flex space-x-6 items-center text-sm font-medium">
            <li>
              <a
                href="/home"
                className="text-[#333333] hover:text-[#2F80ED] transition"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="text-[#333333] hover:text-[#2F80ED] transition"
              >
                Perfil
              </a>
            </li>
            <li>
              <Button
                className="p-2 bg-[#2F80ED] text-white rounded-lg hover:bg-blue-600 transition"
                onClick={handleLogout}
                text="Cerrar sesión"
                />
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  