import { NavigateFunction, useNavigate } from "react-router-dom";

const RedirectRegister: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const handleRedirectRegister = (): void => {
		navigate("/register");
	};

	return (
		<p className="text-[10px] sm:text-xs lg:text-sm flex justify-center gap-1">
			Don't have an account?
			<span
				className=" cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition"
				onClick={handleRedirectRegister}
			>
				Register here
			</span>
		</p>
	);
};

export default RedirectRegister;
