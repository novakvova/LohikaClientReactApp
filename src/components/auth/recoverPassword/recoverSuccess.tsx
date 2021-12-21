import { Link } from 'react-router-dom';


const SendEmail = () => {
	return (
		<>
		<h1 className='text-center mt-4'>Лист з підтвердженням відправлено на пошту</h1>
		<Link to="/">На головну</Link>
		</>
	)
}

export default SendEmail;
