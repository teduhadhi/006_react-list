import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authentication(props: any) {
	const navigate = useNavigate();

	useEffect(() => {
    const localToken = localStorage.getItem("token")
		if(localToken){
			sessionStorage.setItem("token",localToken)
		}
		const token = sessionStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);
	return props.children;
}

export default Authentication;
