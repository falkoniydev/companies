import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useMutation } from "react-query";
import { AuthService } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const Register: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const { mutate: register, isLoading } = useMutation(AuthService.signUp, {
		onSuccess: () => {
			message.success("Успешная регистрация");
			navigate("/login");
		},
		onError: (error: unknown) => {
			if (isAxiosError(error)) {
				message.error(error.response?.data?.message || "Ошибка валидации");
				return;
			}
		},
	});

	const onFinish = (values: {
		fullName: string;
		login: string;
		password: string;
	}) => {
		register(values);
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
			<div className="absolute inset-0 bg-[url('./bg.jpg')] bg-no-repeat bg-cover bg-bottom opacity-[0.4] register"></div>
			<Card className="relative z-10 w-full max-w-md">
				<h2
					className="text-3xl font-extrabold text-gray-900 mb-8"
					style={{
						marginBottom: "20px",
					}}
				>
					Регистрация
				</h2>
				<Form
					form={form}
					name="register"
					onFinish={onFinish}
					layout="vertical"
					autoComplete="off"
				>
					<Form.Item
						name="fullName"
						label="ФИО"
						rules={[{ required: true, message: "Пожалуйста, введите ФИО" }]}
					>
						<Input size="large" />
					</Form.Item>

					<Form.Item
						name="login"
						label="Логин"
						rules={[{ required: true, message: "Пожалуйста, введите логин" }]}
					>
						<Input size="large" />
					</Form.Item>

					<Form.Item
						name="password"
						label="Пароль"
						rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
					>
						<Input.Password size="large" />
					</Form.Item>

					<div className="my-4">
						<Link
							to="/login"
							className="text-blue-600 hover:text-blue-800"
						>
							Вход
						</Link>
					</div>

					<Form.Item>
						<div className="flex items-center justify-center mx-auto">
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								loading={isLoading}
								style={{ backgroundColor: "green" }}
							>
								Зарегистрироваться
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Register;
