import React from "react";
import { useNavigate } from "react-router-dom";

function RedirectLogin() {
	const navigate = useNavigate();
	const handleRedirectLogin = () => {
		navigate("/login");
	};

	return (
			<span
				className="text-sm cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition flex justify-center"
				onClick={handleRedirectLogin}
			>
				Log in
			</span>
	);
}

export default RedirectLogin;
