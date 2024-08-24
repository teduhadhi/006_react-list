import { NavigateFunction, useNavigate } from "react-router-dom";

const RedirectLogin: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const handleRedirectLogin = (): void => {
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
