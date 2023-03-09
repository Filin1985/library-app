import React from "react";
import { Link } from "react-router-dom";

const Statistic = () => {
  return (
    <div className="statistic">
      <p>
        <Link to="/" style={{ textDecoration: "none" }}>
          Вернуться на базовую страницу
        </Link>
      </p>
    </div>
  );
};

export default Statistic;
