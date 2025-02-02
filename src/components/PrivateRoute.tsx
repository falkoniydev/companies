import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const [isChecking, setIsChecking] = useState(true);
	const location = useLocation();
	const token = localStorage.getItem("token");

	useEffect(() => {
		setIsChecking(false);
	}, [token]);

	if (isChecking) {
		return <div>Loading...</div>;
	}

	if (!token) {
		console.log("No token found, redirecting to login");
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}

	return <>{children}</>;
};

export default PrivateRoute;
