import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignOutAlt, faUser, faUserCog } from "@fortawesome/free-solid-svg-icons";
import HeaderCartButton from "../../common/HeaderCartButton/HeaderCartButton";
import HeaderSearch from "../../common/HeaderSearch/HeaderSearch";
import { v4 as uuid } from "uuid";

import "./headers.css";

const DefaultHeader = () => {
  const { isAuth } = useTypedSelector((store) => store.auth);
  const {
    user: { image, roles },
  } = useTypedSelector((store) => store.auth);
  const { LogoutUser } = useActions();
  const { clearCartData } = useActions();

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
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
            {isAuth && (
              <li className="nav-item">
                <Link className="nav-link" to="/products/add">
                  Додати продукт
                </Link>
              </li>
            )}

            <li className="ms-3">
              <HeaderSearch />
            </li>
          </ul>
          {isAuth ? (
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item ">
                <HeaderCartButton />
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  id="navbarDropdown"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      image
                        ? `https://vovalohika.tk/images/50_${image}?t=${uuid()}`
                        : `https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png?t=${uuid()}`
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid imgNavbar border border-white"
                  />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <FontAwesomeIcon icon={faUser} size={"1x"} />
                      <span style={{ paddingLeft: "0.4rem" }}>Профіль</span>
                    </Link>
                  </li>
                  {isAuth && roles === "admin" && (
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/adminPanel">
                        <FontAwesomeIcon icon={faUserCog} size={"1x"} />
                        <span style={{ paddingLeft: "0.4rem" }}>
                          Адміністрування
                        </span>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/oredrList">
                      <FontAwesomeIcon icon={faShoppingCart} size={"1x"} />
                      <span style={{ paddingLeft: "0.4rem" }}>
                        Мої замовлення
                      </span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => {
                        LogoutUser();
                        clearCartData();
                      }}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} size={"1x"} />
                      <span style={{ paddingLeft: "0.4rem" }}>Вихід</span>
                    </Link>
                  </li>
                </ul>
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
