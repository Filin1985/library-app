import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { requestPost, setToken } from "../utils/request";
import { AuthContext } from "../App";

const Login = () => {
  const { updateCurrentUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await requestPost("/api/users/login", {
      email,
      password,
    });

    if (res.result) {
      await setToken(res.token);
      await updateCurrentUser();
      document.location.href = `/api/books`;
    }
  };

  return (
    <>
      <div className="modal-container" id="modal">
        <div className="modal">
          <div className="modal-header">
            <h3>Войти</h3>
          </div>
          {message && <p>{message}</p>}
          <div className="modal-content">
            <p>Войдите, чтобы пользоваться библиотекой</p>
            <form className="modal-form" onSubmit={loginUser}>
              <div>
                <label for="email">Почта</label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label for="password">Пароль</label>
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
              <input type="submit" value="Войти" className="btn btn-modal" />
            </form>
            <p className="login-submit">
              Если нет аккаунта, вам сюда
              <span>
                <Link className="login-submit-link" to="/register">
                  Регистрация
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
