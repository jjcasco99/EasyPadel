import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useModal } from "../hooks/useModal";
import { useUser } from "../hooks/useUser";
import { Login } from "../pages/Login";
import { User } from "lucide-react";
import { useState } from "react";
import { useEffect, useRef } from "react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openLoginModal } = useModal();
  const { user, logout } = useUser();

  const handleClickUser = () => {
    setIsOpen(!isOpen);
  }

  const userMenuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white border-b border-[#BDBDBD] shadow-sm" ref={userMenuRef}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#2F80ED]">
          <span className="text-green-600">Easy</span>Padel
        </Link>

        <ul className="flex space-x-6 items-center text-sm font-medium">
          <li>
            {user ? (
              <div className="flex items-center space-x-6">
                <p className="font-semibold text-gray-800 hover:text-[#2F80ED] cursor-default">
                  {user?.name} {user?.surname ? user.surname : ''}
                </p>
                <div className="relative h-12 w-12 rounded-full bg-gray-200 hover:bg-[#2F80ED] hover:text-white flex items-center justify-center cursor-pointer"
                  onClick={handleClickUser}
                >
                  <User />
                  {isOpen && (
                    <div className="absolute right-4 top-14 bg-white shadow-lg rounded-lg p-4 z-100 min-w-[200px]">
                      <ul className="space-y-2">
                        <li>
                          <Link to="/bookings" className="block hover:text-[#2F80ED] text-black">
                            Mis reservas
                          </Link>
                        </li>
                        {user?.admin && (
                          <li>
                            <Link to="/clubs-management" className="block hover:text-[#2F80ED] text-yellow-500">
                              Gestión de clubes*
                            </Link>
                          </li>
                        )}
                        <li>
                          <Button
                            className="text-red-500 hover:text-red-600"
                            onClick={logout}
                          >
                            Cerrar sesión
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Button
                className="p-2 bg-[#2F80ED] text-white rounded-lg hover:bg-blue-600"
                onClick={() => openLoginModal(<Login />)}
              >
                Iniciar sesión
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
