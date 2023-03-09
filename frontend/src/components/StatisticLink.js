import { Assessment } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const StatisticLink = () => {
  return (
    <div className="statistic-link">
      <Link to="/statistic" style={{ textDecoration: "none" }}>
        <Assessment fontSize="large" />
      </Link>
    </div>
  );
};

export default StatisticLink;
