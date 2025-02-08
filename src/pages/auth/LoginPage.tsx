import styles from "./LoginPage.module.css";
import Button from "../../components/Button";
import { useState } from "react";
import { login } from "./service";
import { useAuth } from "./context";

function LoginPage() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login({
        //username: event.target.username.value,
        //password: event.target.password.value,
        email: email,
        password: password,
      });
      console.log(response);
      onLogin();
    } catch (error) {
      console.error(error);
    }
  };

  const handlerUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlerPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(event.target.value);
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
              onChange={handlerUserChange}
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
