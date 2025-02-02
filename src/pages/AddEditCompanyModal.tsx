import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, message, Space, Button } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { CompanyService } from "../services/company.service";
import { isAxiosError } from "axios";
import { ICompanyFormValues, Props } from "../types/company.types";

const AddEditCompanyModal: React.FC<Props> = ({ open, onClose, company }) => {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	// Kompaniyalarni qo'shish funksiyasi
	const createMutation = useMutation(CompanyService.create, {
		onSuccess: () => {
			message.success("Компания успешно создана");
			queryClient.invalidateQueries(["companies"]);
			onClose();
			form.resetFields();
		},
		onError: (error: unknown) => {
			if (isAxiosError(error)) {
				message.error(
					error.response?.data?.error || "Ошибка при создании компании"
				);
				return;
			}
			console.error("Create error:", error);
		},
	});

	// Kompaniyani o'zgartirish funksiyasi
	const editMutation = useMutation(CompanyService.update, {
		onSuccess: () => {
			message.success("Компания успешно обновлена");
			queryClient.invalidateQueries(["companies"]);
			onClose();
			form.resetFields();
		},
		onError: (error: unknown) => {
			if (isAxiosError(error)) {
				message.error(
					error.response?.data?.error || "Ошибка при обновлении компании"
				);
			}
		},
	});

	// Formani submit qilish funksiyasi
	const handleSubmit = async (values: ICompanyFormValues) => {
		try {
			if (company?.id) {
				editMutation.mutate({
					...values,
					id: company.id,
					count: Number(values.count),
				});
			} else {
				const formattedValues = {
					name: values.name.trim(),
					count: Number(values.count),
				};
				console.log("Creating company with values:", formattedValues);
				createMutation.mutate(formattedValues);
			}
		} catch (error) {
			console.error("Form submission error:", error);
		}
	};

	useEffect(() => {
		if (company) {
			form.setFieldsValue(company);
		} else {
			form.resetFields();
		}
	}, [company, form]);

	return (
		<Modal
			title={company ? "Изменить компания" : "Добавить компания"}
			open={open}
			onCancel={onClose}
			footer={null}
			width={500}
			style={{ marginTop: "200px" }}
		>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				className="pt-4"
			>
				<Form.Item
					name="name"
					label="Названия компании"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите название компании",
						},
					]}
				>
					<Input
						placeholder="Введите название"
						className="rounded"
					/>
				</Form.Item>

				<Form.Item
					name="count"
					label="Количество сотрудников"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите количество сотрудников",
						},
					]}
				>
					<InputNumber
						placeholder="Введите количество"
						className="w-full rounded"
						min={1}
					/>
				</Form.Item>

				<Form.Item className="mb-0 text-right">
					<Space>
						<Button onClick={onClose}>Отмена</Button>
						<Button
							type="primary"
							htmlType="submit"
							loading={createMutation.isLoading || editMutation.isLoading}
						>
							{company ? "Сохранить" : "Добавить компания"}
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddEditCompanyModal;
