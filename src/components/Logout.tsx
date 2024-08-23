import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
	const navigate = useNavigate()

	const handleLogout = () => {
		sessionStorage.clear();
    navigate("/")
	};

	return (
		<p
			className="cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition"
			onClick={handleLogout}
		>
			Logout
		</p>
	);
}

export default Logout;
