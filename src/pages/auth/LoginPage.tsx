import styles from "./LoginPage.module.css";
import Button from "../../components/Button";
import { login } from "./service";


interface Props {
  onLogin: () => void;
}


function LoginPage({ onLogin }: Props) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login({
        username: event.target.username.value,
        password: event.target.password.value,
      });
      console.log(response);
      onLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Log in to Nodepop</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <div className={styles.buttonContainer}>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
