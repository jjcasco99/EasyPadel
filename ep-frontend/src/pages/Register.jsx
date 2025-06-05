import { useState } from "react";
import API from "../api/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import useValidations from "../hooks/useValidations";
import { FormErrors } from "../components/FormErrors";
import { useModal } from "../hooks/useModal";
import { Login } from "./Login";

export const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const { open: openLogin, close } = useModal();

  const { errors, validateRegister } = useValidations();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const isValid = validateRegister(form);
    if (!isValid) {
      return;
    }

    try {
      await API.post("/users/register", form);
      close();
      openLogin(<Login />);
    } catch (err) {
      setError("Error al registrar. Verifica los datos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#2F80ED] mb-6 text-center">
          <span className="text-green-500">Crear</span> cuenta
        </h2>

        {(error || Object.keys(errors).length > 0) && (
            <FormErrors errors={{ error, ...errors }} />
        )}

        <Input
          name="name"
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          error={errors?.name}
        />

        <Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          error={errors?.email}
        />

        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          showText={true}
          error={errors?.password}
        />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Repetir contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          showText={true}
          error={errors?.confirmPassword}
        />  

        <Button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Crear cuenta
        </Button>

      </form>
        <p className="text-sm mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <Button 
            className="text-[#2F80ED] hover:underline"
            onClick={() => {
              close()
              openLogin(<Login />)
            }}
          >
            Iniciar sesión
          </Button>
        </p>
    </div>
  );
}
