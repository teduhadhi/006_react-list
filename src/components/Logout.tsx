import { NavigateFunction, useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
	const navigate:NavigateFunction = useNavigate()

	const handleLogout = (): void => {
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
