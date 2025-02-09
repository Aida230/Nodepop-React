import styles from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm";
import { useLoginForm } from "./useLoginForm";

//LoginPage.tsx: estructuramos la pagina y usamos los otros 2 componentes

function LoginPage() {
  //Usamos nuestro hook personalizado para manejar el estado del formulario
  const { email, setEmail, password, setPassword, rememberMe, setRememberMe, handleSubmit, error } = useLoginForm();

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Log in to Nodepop</h1>

        {/* Renderizamos el formulario, pasándole los valores y funciones necesarias */}
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          handleSubmit={handleSubmit}
          error={error}
        />
      </div>
    </div>
  );
}

export default LoginPage;