import qs from 'qs';
import { Link } from 'react-router-dom';

const Pag = () => {

	const length = 2;
	const buttons = [];
	for (var i = 2; i < length; i++) {
    buttons.push(i);
  }
	let currentPage = 2;


	const map = buttons.filter(
    (item) => (currentPage - 3) < item && item < (currentPage + 3))
 
	
	return (
    <ul className="pagination d-flex justify-content-center">
      <li className="page-item m-1">
        <Link className="page-link" to={"?" + qs.stringify({})}>
          &laquo;
        </Link>
      </li>
      <li className="page-item m-1">
        <Link className="page-link" to={"?" + qs.stringify({})}>
          1
        </Link>
      </li>
      {currentPage > 3 && (
        <li className="page-item m-1">
          <Link className="page-link" to={"?" + qs.stringify({})}>
            ...
          </Link>
        </li>
      )}
      {map.map((item, key) => {
        return (
          <li key={key} className="page-item  m-1">
            <Link className="page-link" to={"?" + qs.stringify({})}>
              {item}
            </Link>
          </li>
        );
      })}
      {currentPage < length - 3 && (
        <li className="page-item m-1">
          <Link className="page-link" to={"?" + qs.stringify({})}>
            ...
          </Link>
        </li>
      )}
      {length > 2 && (
        <li className="page-item m-1">
          <Link className="page-link" to={"?" + qs.stringify({})}>
            {length}
          </Link>
        </li>
      )}
      <li className="page-item  m-1">
        <Link className="page-link" to={"?" + qs.stringify({})}>
          &raquo;
        </Link>
      </li>
    </ul>
  );
}

export default Pag

