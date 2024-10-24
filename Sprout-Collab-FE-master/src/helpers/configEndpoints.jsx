import axios from "axios";
// const apiUrl = 'https://127.0.0.1/sc/api/v1';
const apiUrl = "http://127.0.0.1:5004/sc/api/v1";

const axiosInstance = axios.create({
	baseURL: apiUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
export default axiosInstance;
