import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const Header = ({ text }) => {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <div className="container">
        <h1>{text}</h1>
      </div>
      <div className="user">
        {user ? (
          <p>{user.name}</p>
        ) : (
          <Link className="link" to="/login">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
