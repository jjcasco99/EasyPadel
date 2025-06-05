import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useModal } from "../hooks/useModal";
import { useUser } from "../hooks/useUser";
import { Login } from "../pages/Login";

export const NavBar = () => {
  const { open: openLoginModal } = useModal();
  const { user, logout } = useUser();

  return (
    <nav className="bg-white border-b border-[#BDBDBD] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#2F80ED]">
          <span className="text-green-600">Easy</span>Padel
        </Link>

        <ul className="flex space-x-6 items-center text-sm font-medium">
          <li>
            {user ? (
              <div className="flex items-center space-x-6">
                <Link to="/bookings" className="hover:text-[#2F80ED]">
                 <span>Mis reservas</span>
                </Link>
                {user?.admin && <Link to="/clubs-management" className="hover:text-[#2F80ED] text-yellow-500">
                  <span>Gestión de clubes*</span>
                </Link>}
                <Button
                  className="p-2 bg-[#2F80ED] text-white rounded-lg hover:bg-blue-600"
                  onClick={logout}
                >
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button
                className="p-2 bg-[#2F80ED] text-white rounded-lg hover:bg-blue-600"
                onClick={() => openLoginModal(<Login />)}
              >
                Iniciar sesión / Regístrate
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
