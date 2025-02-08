import styles from "./LoginPage.module.css";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { login } from "./service";
import { useAuth } from "./context";
import storage from "../../utils/storage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { onLogin } = useAuth();

  useEffect(() => {
    // Verificamos si ya hay un token almacenado en el localStorage
    const storedEmail = storage.get("email");
    const storedPassword = storage.get("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login({ email, password });

      // Si el checkbox está marcado, guardamos las credenciales
      if (rememberMe) {
        storage.set("email", email);
        storage.set("password", password);
      } else {
        storage.remove("email");
        storage.remove("password");
      }

      console.log(response);
      onLogin();
    } catch (error) {
      console.error(error);
    }
  };

  const handlerEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlerPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handlerRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const isDisabled = !email || !password;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Log in to Nodepop</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={email}
              onChange={handlerEmailChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlerPasswordChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handlerRememberMeChange}
            />
            Remember me
          </label>
          <div className={styles.buttonContainer}>
            <Button type="submit" disabled={isDisabled}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
