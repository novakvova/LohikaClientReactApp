import { useTypedSelector } from '../../../hooks/useTypedSelector';

const SearchResult = () => {
	const { data:{users, total}, currentPage } = useTypedSelector( store => store.userSearch);

	return (
    <>
      {users && (
        <>
          <table className="table table-hover align-middle table-striped ">
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
              {users.map(({ id, firstName, secondName, phone, email }, idx) => (
                <tr key={id}>
                  <td>{idx + 1 + (currentPage - 1) * 3}</td>
                  <td>{id}</td>
                  <td>{firstName}</td>
                  <td>{secondName}</td>
                  <td>{phone}</td>
                  <td>{email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h6>Всього: {total}</h6>
        </>
      )}
    </>
  );
}

export default SearchResult;