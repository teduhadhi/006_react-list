import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Authentication: React.FC<any> = ({ children }) => {
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		const localToken: string | null = localStorage.getItem("token");
		if (localToken) {
			sessionStorage.setItem("token", localToken);
		}
		const token: string | null = sessionStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);
	return children;
};

export default Authentication;
