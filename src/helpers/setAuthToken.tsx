import http from '../http_common';


 const setAuthToken = (token:string) => {

	if (token) {
		http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		console.log("work");

	}
	else {
		delete http.defaults.headers.common["Authorization"];
	}
}

export default setAuthToken;