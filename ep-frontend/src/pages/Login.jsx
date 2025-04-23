import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { getToken } from "../auth";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) navigate("/home");
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res?.data?.token);
      navigate("/home");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
            <h2 className="text-2xl font-bold text-[#2F80ED] mb-6 text-center">
                <span className="text-green-400">Easy</span>Padel
            </h2>

            {error && (
                <p className="bg-[#FDEAEA] text-[#EB5757] px-4 py-2 rounded mb-4 text-sm">
                    {error}
                </p>
            )}

            <Input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={form?.email}
                onChange={handleChange}
                className="w-full mb-4 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]"
            />

            <Input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={form?.password}
                onChange={handleChange}
                className="w-full mb-6 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]"
            />

            <Button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                text="Iniciar sesión"
            />

            <p className="text-sm mt-4 text-center">
                ¿No tienes cuenta?{" "}
                <span
                    onClick={() => navigate("/register")}
                    className="text-[#2F80ED] hover:underline cursor-pointer"
                >
                    Regístrate
                </span>
            </p>
        </form>
    </div>
);
}
