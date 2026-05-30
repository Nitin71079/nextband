import {
  Link
} from "react-router-dom";

export default function MobileNav() {
  return (
    <div
      style={{
        position: "fixed",

        bottom: 0,

        left: 0,

        width: "100%",

        background: "white",

        display: "flex",

        justifyContent:
          "space-around",

        padding: "14px 10px",

        boxShadow:
          "0 -4px 20px rgba(0,0,0,0.08)",

        zIndex: 999
      }}
    >
      <Link to="/">
        Home
      </Link>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/planner">
        Planner
      </Link>

      <Link to="/community">
        Community
      </Link>

      <Link to="/profile">
        Profile
      </Link>
    </div>
  );
}