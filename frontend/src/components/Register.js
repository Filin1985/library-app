import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestPost, setToken } from "../utils/request";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const res = await requestPost("/api/users/register", {
      name,
      email,
      password,
    });
    if (res.result) {
      await setToken(res.token);
      document.location.href = "/api/books";
    }
  };

  return (
    <>
      <div className="modal-container" id="modal">
        <div className="modal">
          <div className="modal-header">
            <h3>Зарегистрироваться</h3>
          </div>
          {message && <p>{message}</p>}
          <div className="modal-content">
            <p>Зарегистрируйтесь в нашем приложении</p>
            <form className="modal-form" onSubmit={registerUser}>
              <div>
                <label htmlFor="name">Имя</label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Введите имя"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Почта</label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  placeholder="Введите почту"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Пароль</label>
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <input
                type="submit"
                value="Регистрация"
                className="btn btn-modal"
              />
            </form>
            <p className="login-submit">
              Если вы уже регистрировались, то вам сюда
              <span>
                <Link className="login-submit-link" to="/authorization/auth">
                  Войти
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
