import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/projects" className="nav--link">
        DECISION AID
      </Link>
    </nav>
  );
};

export default Navbar;
