// services/company.service.ts
import axios from "../lib/axios"; // Default axios o'rniga bizning konfiguratsiya qilingan axios ni import qilamiz

interface ICompanyCreate {
	name: string;
	count: number;
}

interface ICompanyUpdate {
	id: string;
	name: string;
	count: number;
}

export class CompanyService {
	static async getAll(search: string = "") {
		try {
			const response = await axios.get("/api/companies/get-all", {
				params: { search }, // faqat search parametrini yuboramiz
			});
			return response.data; // barcha ma'lumotlarni qaytaramiz
		} catch (error) {
			console.error("Error fetching companies:", error);
			throw error;
		}
	}

	static async getById(id: string) {
		const response = await axios.get(`/api/companies/get/${id}`);
		return response.data;
	}

	static async create(data: ICompanyCreate) {
		console.log("Creating company with data:", data);
		try {
			const response = await axios.post("/api/companies/add", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log("Create response:", response.data);
			return response.data;
		} catch (error) {
			console.error("Create error:", error);
			throw error;
		}
	}

	static async update(data: ICompanyUpdate) {
		console.log("Updating company with data:", data);
		try {
			const response = await axios.put("/api/companies/update", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log("Update response:", response.data);
			return response.data;
		} catch (error) {
			console.error("Update error:", error);
			throw error;
		}
	}

	static async delete(id: string) {
		console.log("Deleting company with id:", id);
		const response = await axios.delete("/api/companies/delete/by-id", {
			headers: {
				"Content-Type": "application/json", // Content type ni aniq ko'rsatamiz
			},
			data: JSON.stringify(id), // ID ni JSON formatda yuboramiz
		});
		console.log("Delete response:", response.data);
		return response.data;
	}
}
