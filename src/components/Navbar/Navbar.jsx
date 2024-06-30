import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import classes from "./style.module.css";
export default function Navbar() {
  return (
    <>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li className={classes.item}>
            <Link to="/" className={classes.link}>
              Dashboard
            </Link>
          </li>
          <li className={classes.item}>
            <Link to="/AI" className={classes.link}>
              AI Chat
            </Link>
          </li>
          <li className={classes.item}>
            <Link to="/login-register" className={classes.link}>
              Login/Register
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
