import React, { useState } from "react";
import {
	Table,
	Button,
	Input,
	Space,
	message,
	Menu,
	Dropdown,
	Modal,
	Avatar,
} from "antd";
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	LogoutOutlined,
	MoreOutlined,
	WarningFilled,
	UserOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CompanyService } from "../services/company.service";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import AddEditCompanyModal from "./AddEditCompanyModal";
import { ColumnsType } from "antd/es/table";
import { ICompany } from "../types/company.types";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingCompany, setEditingCompany] = useState<ICompany | null>(null);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [deletingCompany, setDeletingCompany] = useState<ICompany | null>(null);

	// Backenddan barcha ma'lumotlarni olish
	const { data, isLoading } = useQuery<ICompany[]>(
		["companies", search], // faqat companies va search dependency
		() => CompanyService.getAll(search),
		{
			select: (data) => {
				console.log("Raw data from backend:", data);
				return Array.isArray(data) ? data : [];
			},
		}
	);

	// User ma'lumotlarini olish
	const { data: userData } = useQuery(["user-info"], AuthService.getInfo, {
		onError: (error) => {
			console.error("Error fetching user info:", error);
			message.error("Ошибка при получении информации пользователя");
		},
	});

	// Edit va Delete uchun dropdown menu funksiyasi
	const getActionMenu = (record: ICompany) => (
		<Menu>
			<Menu.Item
				key="edit"
				icon={<EditOutlined />}
				onClick={() => handleEdit(record)}
			>
				Изменить
			</Menu.Item>
			<Menu.Item
				key="delete"
				icon={<DeleteOutlined />}
				danger
				onClick={() => handleDelete(record)}
			>
				Удалить
			</Menu.Item>
		</Menu>
	);

	// Qidiruv va pagination uchun ma'lumotlarni filterlash
	const filteredData = React.useMemo(() => {
		return (
			data?.filter((company) =>
				company.name.toLowerCase().includes(search.toLowerCase())
			) || []
		);
	}, [data, search]);

	// Joriy sahifa uchun ma'lumotlarni ajratib olish
	const paginatedData = React.useMemo(() => {
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		return filteredData.slice(startIndex, endIndex);
	}, [filteredData, page, pageSize]);

	// Pagination hook
	const handlePaginationChange = (newPage: number, newPageSize?: number) => {
		if (newPageSize && newPageSize !== pageSize) {
			setPage(1);
			setPageSize(newPageSize);
		} else {
			setPage(newPage);
		}
	};

	// Delete mutatsiyasi
	const deleteMutation = useMutation(CompanyService.delete, {
		onSuccess: () => {
			message.success("Компания успешно удалена");
			queryClient.invalidateQueries(["companies"]);
		},
		onError: (error: Error) => {
			console.error("Delete error:", error);
			message.error("Ошибка при удалении компании");
		},
	});

	// Delete boshqaruvi uchun funksiya
	const handleDelete = (company: ICompany) => {
		setDeletingCompany(company);
		setDeleteModalVisible(true);
	};

	// Edit boshqaruvi uchun funksiya
	const handleEdit = (record: ICompany) => {
		console.log("Editing company:", record);
		setEditingCompany(record);
		setIsModalOpen(true);
	};

	//Logout uchun funksiya
	const handleLogout = () => {
		AuthService.logout();
		navigate("/login");
	};

	// Qidiruvni boshqarish
	const handleSearch = (value: string) => {
		setSearch(value);
		setPage(1);
	};

	// Table uchun ustunlar
	const columns: ColumnsType<ICompany> = [
		{
			title: "№",
			key: "index",
			width: 60,
			render: (_text, _record, index) => {
				return (page - 1) * pageSize + index + 1;
			},
		},
		{
			title: "Название компании",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Количество сотрудников",
			dataIndex: "count",
			key: "count",
		},
		{
			title: "Действия",
			key: "actions",
			width: 60,
			render: (_text: string, record: ICompany) => (
				<Dropdown
					overlay={getActionMenu(record)}
					trigger={["click"]}
					placement="bottomRight"
				>
					<Button
						type="text"
						icon={<MoreOutlined />}
					/>
				</Dropdown>
			),
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mx-auto">
				<div className="bg-white rounded-lg shadow p-6">
					<div
						className="bg-black fixed w-full z-50"
						style={{
							padding: "20px",
						}}
					>
						<div className="container flex justify-between items-center">
							<div>
								<h1 className="text-2xl font-bold text-white">Компании</h1>
							</div>

							<Space>
								<Button
									icon={<LogoutOutlined />}
									onClick={handleLogout}
								>
									Выйти
								</Button>
								<Button
									type="primary"
									icon={<PlusOutlined />}
									onClick={() => {
										setEditingCompany(null);
										setIsModalOpen(true);
									}}
									style={{ backgroundColor: "green" }}
								>
									Добавить компанию
								</Button>
							</Space>
						</div>
					</div>

					<div style={{ paddingTop: "100px" }}>
						<div className="mb-4 flex items-center justify-between container">
							<Input.Search
								placeholder="Поиск компаний..."
								onSearch={handleSearch}
								className="max-w-md"
							/>

							<span className="text-sm">
								{userData && (
									<Space>
										<span>Добро пожаловать, {userData.fullName}</span>
										<Avatar icon={<UserOutlined />} />
									</Space>
								)}
							</span>
						</div>

						<Table
							columns={columns}
							dataSource={paginatedData}
							loading={isLoading}
							rowKey="id"
							className="container"
							pagination={{
								current: page,
								pageSize: pageSize,
								total: filteredData.length,
								showSizeChanger: true,
								pageSizeOptions: ["10", "20", "50"],
								onChange: handlePaginationChange,
								showTotal: (total) => `Всего: ${total} компаний`,
							}}
						/>
					</div>
				</div>
			</div>

			<AddEditCompanyModal
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setEditingCompany(null);
				}}
				company={editingCompany}
			/>

			<Modal
				title={
					<Space>
						<WarningFilled style={{ color: "#faad14" }} />
						Вы хотите удалить?
					</Space>
				}
				open={deleteModalVisible}
				onCancel={() => setDeleteModalVisible(false)}
				footer={[
					<Button
						key="cancel"
						onClick={() => setDeleteModalVisible(false)}
					>
						Нет
					</Button>,
					<Button
						key="submit"
						type="primary"
						danger
						onClick={() => {
							if (deletingCompany) {
								deleteMutation.mutate(deletingCompany.id);
								setDeleteModalVisible(false);
							}
						}}
					>
						Да
					</Button>,
				]}
				width={400}
				centered
			>
				<p>Вы действительно хотите удалить эту компанию?</p>
			</Modal>
		</div>
	);
};

export default Dashboard;
