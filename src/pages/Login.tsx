import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useMutation } from "react-query";
import { AuthService } from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const { mutate: login, isLoading } = useMutation(AuthService.signIn, {
		onSuccess: (data) => {
			console.log("Login successful, data:", data);
			message.success("Успешный вход");
			setTimeout(() => {
				navigate("/dashboard");
			}, 100);
		},
		onError: (error: unknown) => {
			console.log("Login error:", error);
			if (isAxiosError(error)) {
				message.error(
					error.response?.data?.message || "Неправильный логин или пароль"
				);
			}
		},
	});

	const onFinish = (values: { login: string; password: string }) => {
		login(values);
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
			<div className="absolute inset-0 bg-[url('./bg.jpg')] bg-no-repeat bg-cover bg-bottom opacity-[0.4] login"></div>
			<div className="relative z-10 w-full max-w-md">
				<Card className="w-full">
					<h2
						className="text-3xl font-extrabold text-gray-900 mb-8"
						style={{
							marginBottom: "20px",
						}}
					>
						Вход
					</h2>
					<Form
						form={form}
						name="login"
						onFinish={onFinish}
						layout="vertical"
						autoComplete="off"
					>
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
							rules={[
								{ required: true, message: "Пожалуйста, введите пароль" },
							]}
						>
							<Input.Password size="large" />
						</Form.Item>

						<div className="mt-4">
							<Link
								to="/register"
								className="text-blue-600 hover:text-blue-800"
							>
								Регистрация
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
									Войти
								</Button>
							</div>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default Login;
