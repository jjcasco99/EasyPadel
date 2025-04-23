import { useState } from "react";

const useValidations = () => {
    const [errors, setErrors] = useState({});

    const validateLogin = (values) => {
        const newErrors = {};

        if (!values.email) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "El correo electrónico no es válido.";
        }

        if (!values.password) {
            newErrors.password = "La contraseña es obligatoria.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateRegister = (values) => {
        const newErrors = {};

        if (!values.name) {
            newErrors.name = "El nombre es obligatorio.";
        }

        if (!values.email) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = "El correo electrónico no es válido.";
        }

        if (!values.password) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (values.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return { errors, validateLogin, validateRegister };
};

export default useValidations;