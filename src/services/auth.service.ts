import axios from "../lib/axios";

interface ISignInDTO {
	login: string;
	password: string;
}

interface ISignUpDTO {
	fullName: string;
	login: string;
	password: string;
}

export class AuthService {
	static async signIn(data: ISignInDTO) {
		const response = await axios.post("/api/auths/sign-in", data);
		console.log("Raw response:", response);

		const token = response.data;
		if (token && typeof token === "string") {
			console.log("Saving token:", token);
			localStorage.setItem("token", token);

			const savedToken = localStorage.getItem("token");
			console.log("Saved token:", savedToken);

			return { token };
		} else {
			console.log("Invalid token format:", token);
			throw new Error("Invalid token received");
		}
	}

	static async signUp(data: ISignUpDTO) {
		const response = await axios.post("/api/auths/sign-up", data);
		return response.data;
	}

	static async getInfo() {
		const token = localStorage.getItem("token");
		console.log("Token in getInfo:", token);

		const response = await axios.get("/api/auths/get-info");
		return response.data;
	}

	static logout() {
		localStorage.removeItem("token");
	}
}
