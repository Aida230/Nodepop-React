import styles from "../pages/auth/LoginPage.module.css";
import Button from "./Button";

//LoginForm.ts: Muestra la interfaz del formulario y maneja entradas del usuario

//Definimos las propiedades que espera recibir mi componente
interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error?: string | null;
}

//Componente del formulario Login
const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  handleSubmit,
  error,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Si hay un error, lo mostramos */}
      {error && <p className={styles.error}>{error}</p>}

      <label>
        Email:
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>

      <div className={styles.buttonContainer}>
        <Button type="submit" disabled={!email || !password}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
