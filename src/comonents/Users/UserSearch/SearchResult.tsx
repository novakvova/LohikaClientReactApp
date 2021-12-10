import { useTypedSelector } from '../../../hooks/useTypedSelector';

const SearchResult = () => {
	const {users, pages, total} = useTypedSelector( store => store.userSearch);
	const pageCount = new Array(pages-1);
	
	return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Id</th>
              <th scope="col">Імя</th>
              <th scope="col">Прізвище</th>
              <th scope="col">Телефон</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, firstName, secondName, phone, email }) => (
              <tr key={id}>
                <td>№</td>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{secondName}</td>
                <td>{phone}</td>
                <td>{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-center">
        <ul className="pagination">
			{

			}
          <li className="page-item active">
            <button className="page-link"></button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SearchResult;