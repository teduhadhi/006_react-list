import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
	const navigate = useNavigate()

	const handleLogout = () => {
		sessionStorage.clear();
    localStorage.clear();
    navigate("/login")
	};

	return (
		<p
			className="cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition px-1"
			onClick={handleLogout}
		>
			Logout
		</p>
	);
}

export default Logout;
