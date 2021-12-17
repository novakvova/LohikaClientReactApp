import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { useActions } from "../../../hooks/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

import HeaderCartButton from "../../common/HeaderCartButton/HeaderCartButton";
import HeaderSearch from "../../common/HeaderSearch/HeaderSearch";

const DefaultHeader = () => {
  const { isAuth } = useTypedSelector((store) => store.auth);
  const { LogoutUser } = useActions();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Продаж авто
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="d-flex navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products/add">
                Додати продукт
              </Link>
            </li>
            <li className="ms-3">
              <HeaderSearch />
            </li>
          </ul>
          {isAuth ? (
            <ul className="navbar-nav">
              <li className="nav-item d-flex align-items-center">
                <HeaderCartButton />
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Юзери
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars">
                  Машини
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <FontAwesomeIcon icon={faUser} size={"2x"} className="mx-2" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={LogoutUser}>
                  <FontAwesomeIcon icon={faSignOutAlt} size={"2x"} />
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Реєстрація
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Вхід
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DefaultHeader;
