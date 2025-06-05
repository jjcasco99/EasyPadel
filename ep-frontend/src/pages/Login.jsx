import { useState } from "react";
import API from "../api/api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import useValidations from "../hooks/useValidations";
import { FormErrors } from "../components/FormErrors";
import { useModal } from "../hooks/useModal"
import { Register } from "../pages/Register";
import { useUser } from "../hooks/useUser";
import { motion } from "framer-motion";

export const Login = ({ booking }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { errors, validateLogin } = useValidations();
  const { open: openRegister, close } = useModal();
  const { login } = useUser();
  

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    const isValid = validateLogin(form);
    if (!isValid) {
        return;
    }

    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      login(res?.data?.user);
      close();
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl "
    >
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
        >
            <h2 className="text-2xl font-bold text-[#2F80ED] mb-6 text-center">
                <span className="text-green-400">Easy</span>Padel
            </h2>

            {(error || Object.keys(errors).length > 0) && (
                <FormErrors errors={{ error, ...errors }} />
            )}

            <h3 className="font-semibold text-gray-800 mb-4 text-center">
                {booking && "Debes iniciar sesión o registrarte para reservar pistas"}
            </h3>

            <Input
                name="email"
                type="text"
                placeholder="Correo electrónico"
                value={form?.email}
                onChange={handleChange}
                error={errors?.email}
            />

            <Input
                name="password"
                type="password"
                placeholder="Contraseña"
                showText={true}
                value={form?.password}
                error={errors?.password}
                onChange={handleChange}
                className="w-full mb-6 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]"
            />

            <Button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
                Iniciar sesión
            </Button>

        </form>
            <p className="text-sm mt-4 text-center">
                ¿No tienes cuenta?{" "}
                <Button 
                    className="text-[#2F80ED] hover:underline"
                    onClick={() => {
                        close()
                        openRegister(<Register />)
                    } }
                >
                    Regístrate
                </Button>
            </p>
    </motion.div>
);
}
