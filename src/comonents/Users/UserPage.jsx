import { useParams } from 'react-router';

const UserDetailPage = () => {
	let { id } = useParams();
	
  return <h2>Userpage</h2>;
};

export default UserDetailPage;