import { Link, NavLink } from "react-router-dom";
import reactLogo from "../assets/react.svg";

function NavBar() {
    return (
        <nav
            className="navbar navbar-expand-lg bg-body-tertiary bg-dark mb-3"
            data-bs-theme="dark"
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src={reactLogo}
                        alt="Bootstrap"
                        width="30"
                        height="24"
                    />
                </Link>
                <NavLink className="navbar-brand" to="/">
                    Navbar
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/movies"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/error">
                                Error
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
