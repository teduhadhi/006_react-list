import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import RedirectRegister from "../../navigate/RedirectRegister/RedirectRegister";

interface UserValues {
	email: string;
	password: string;
	rememberMe: string;
}

const Login: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string>();

	useEffect((): void => {
		const localToken: string | null = localStorage.getItem("token");
		if (localToken) {
			sessionStorage.setItem("token", localToken);
		}
		const token: string | null = sessionStorage.getItem("token");

		if (token) {
			navigate("/list");
		}
	}, [navigate]);

	const handlelogIn = async ({ email, password, rememberMe }: UserValues) => {
		await axios
			.post(
				"http://localhost:8080/login",
				{
					email: email,
					password: password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(function (response) {
				sessionStorage.setItem("token", response.data.accessToken);
				if (rememberMe) {
					localStorage.setItem("token", response.data.accessToken);
				}
				navigate("/list");
			})
			.catch(function (error) {
				setErrorMessage(
					"Your login attempt has failed. Make sure the email and password are correct"
				);
				console.log(error);
			});
	};

	const loginSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email address").required("Required"),

		password: Yup.string().required("Required"),
	});
	return (
		<div data-testid="container-login">
			<Formik
				initialValues={{ email: "", password: "", rememberMe: "" }}
				validationSchema={loginSchema}
				onSubmit={(values: UserValues, { setSubmitting }) => {
					setSubmitting(false);
					handlelogIn(values);
				}}
			>
				<Form className="w-64 sm:w-72 lg:w-96 flex flex-col gap-1 px-6 py-7 rounded-3xl bg-white shadow-lg">
					{errorMessage !== null && (
						<p
							data-testid="message-error"
							className="text-xs sm:text-sm lg:text-base text-red-500 flex justify-center mb-3"
						>
							{errorMessage}
						</p>
					)}
					<label
						className="text-xs sm:text-sm lg:text-base text-slate-500 font-medium"
						htmlFor="email"
					>
						Email
					</label>
					<Field
						className="text-xs sm:text-sm lg:text-base shadow-md rounded-md p-2 mb-3"
						name="email"
						id="email"
						type="text"
					/>
					<ErrorMessage
						className="text-xs sm:text-sm lg:text-base text-red-500"
						component="div"
						name="email"
					/>

					<label
						className="text-xs sm:text-sm lg:text-base text-slate-500 font-medium"
						htmlFor="password"
					>
						Password
					</label>
					<Field
						className="text-xs sm:text-sm lg:text-base shadow-md rounded-md p-2 mb-3"
						name="password"
						id="password"
						type="password"
					/>
					<ErrorMessage
						className="text-xs sm:text-sm lg:text-base text-red-500"
						component="div"
						name="password"
					/>

					<div className="flex gap-2">
						<Field name="rememberMe" type="checkbox" />
						<label className="text-xs sm:text-sm lg:text-base text-slate-700" htmlFor="rememberMe">
							Remember me
						</label>
					</div>

					<button
						className="text-xs sm:text-sm lg:text-base font-medium bg-slate-400 text-white p-2 mt-2 mb-3 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md "
						type="submit"
					>
						Log in
					</button>
					<RedirectRegister />
				</Form>
			</Formik>
		</div>
	);
};

export default Login;
