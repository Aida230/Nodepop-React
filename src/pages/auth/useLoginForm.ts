import { useState, useEffect } from "react";
import { login } from "./service";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
import storage from "../../utils/storage";

//useLoginForms.ts: maneja toda la logica del login y la autenticacion

export function useLoginForm() {
  //estado para almacenar el email, el password y si el usuario quiere recordar contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Obtenemos las funciones de autentificacion desde el contexto
  const { onLogin } = useAuth();
  const navigate = useNavigate(); //Este es el hook de react router para redirigir al usuario


  //Cuando se carga el componente, intentamos recuperar las credenciales guardadas en el almacenamiento
  useEffect(() => {
    const storedEmail = storage.get("email");
    const storedPassword = storage.get("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  //Aqui manejamos el envio del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  //evitamos que la pagina se recargue

    try {
      //enviamos los datos de login a la Api
      const response = await login({ email, password });

      //Si activamos el remember me, guardamos las credenciales en el localStorage
      if (rememberMe) {
        storage.set("email", email);
        storage.set("password", password);
      } else {
        //si no las eliminamos
        storage.remove("email");
        storage.remove("password");
        storage.remove("auth"); //aqui para eliminar el token
      }

      console.log(response);
      onLogin();//Actualizams el estado global de autenticacion
      navigate("/adverts"); //Redirigimos al usuario a la pagina de anuncios
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  //Tenemos que retornar las variables y funciones para que puedan ser usadas en el LoginPage.tsx
  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    handleSubmit,
    error,
  };
}