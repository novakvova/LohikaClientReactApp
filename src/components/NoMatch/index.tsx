import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

const NoMatchPage = () => {
    return (
      <>
        <Helmet>
          <title>Нічого не знайдено</title>
        </Helmet>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </>
    );
}

export default NoMatchPage;