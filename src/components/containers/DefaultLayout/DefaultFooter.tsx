import { Link } from "react-router-dom";

import "./footer.css";

const DefaultFooter = () => {
  return (
    <nav
      className="navbar navbar-dark bg-dark"
    >
      <div className="container-fluid">
        <Link to="#" className="navbar-brand">
          LOGO
        </Link>
        <Link to="#" className="navbar-brand">
          LOGO
        </Link>
        <Link to="#" className="navbar-brand">
          LOGO
        </Link>
        <Link to="#" className="navbar-brand">
          LOGO
        </Link>
        <Link to="mailto:admin@gmail.com">Haпишiть нaм</Link>
      </div>
    </nav>
  );
};

export default DefaultFooter;
