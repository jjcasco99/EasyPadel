import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      navigate("/");
    } catch (err) {
      setError("Error al registrar. Verifica los datos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#2F80ED] mb-6 text-center">
          <span className="text-green-500">Crear</span> cuenta
        </h2>

        {error && (
          <p className="bg-[#FDEAEA] text-[#EB5757] px-4 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <Input
          name="name"
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]"
        />

        <Input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]"
        />

        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]"
        />

        <Button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          text="Registrarse"
        />

        <p className="text-sm mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/" className="text-[#2F80ED] hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
