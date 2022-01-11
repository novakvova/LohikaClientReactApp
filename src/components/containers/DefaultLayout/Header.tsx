import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import HeaderCartButton from '../../common/HeaderCartButton/HeaderCartButton';
import HeaderSearch from '../../common/HeaderSearch/HeaderSearch';
import { v4 as uuid } from 'uuid';

import './headers.css';

const DefaultHeader = () => {
  const { isAuth } = useTypedSelector((store) => store.auth);
  const {
    user: { image },
  } = useTypedSelector((store) => store.auth);
  const { LogoutUser } = useActions();
  const {clearCartData} = useActions()

  return (
    <nav className="navbar navbar-default fixed-top navbar-expand navbar-dark bg-dark">
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
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item ">
                <HeaderCartButton />
              </li>
  
              
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" to="/users">
                  Юзери
                </Link>
              </li>

              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" to="/cars">
                  Машини
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminPanel">
                  Адмінка
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <img
                    src={
                      !image.endsWith("image/")
                        ? `https://vovalohika.tk${image}?t=${uuid()}`
                        : `https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png?t=${uuid()}`
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid imgNavbar"
                  />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" to="/" onClick={()=> {LogoutUser(); clearCartData()}}>
                  <FontAwesomeIcon icon={faSignOutAlt} size={'2x'} />
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
