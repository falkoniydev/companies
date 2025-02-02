export interface ICompany {
	id: string;
	name: string;
	count: number;
}

export interface ICompanyFormValues {
	name: string;
	count: number | string; // Formda string kelishi mumkin, lekin keyinchalik numberga o'giramiz
}

export interface Props {
	open: boolean;
	onClose: () => void;
	company?: {
		id: string;
		name: string;
		count: number;
	} | null;
}
