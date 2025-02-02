import axios from "axios";

axios.defaults.baseURL = "http://45.138.158.137:92";

// Request interceptor
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log("Response error:", error.response);

		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default axios;
