import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import RedirectRegister from "./RedirectRegister";

interface UserValues {
	email: string;
	password: string;
	rememberMe: string;
}

const Login = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string>();

	useEffect(() => {
		const localToken = localStorage.getItem("token");
		if (localToken) {
			sessionStorage.setItem("token", localToken);
		}
		const token = sessionStorage.getItem("token");

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
		<div>
			<Formik
				initialValues={{ email: "", password: "", rememberMe: "" }}
				validationSchema={loginSchema}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					handlelogIn(values);
				}}
			>
				<Form className="flex flex-col gap-1 w-96 px-6 py-7 rounded-3xl bg-white shadow-lg">
					{errorMessage !== null && (
						<p className="text-red-500 flex justify-center mb-3">
							{errorMessage}
						</p>
					)}
					<label className="text-m text-slate-500 font-medium" htmlFor="email">
						Email
					</label>
					<Field
						className="shadow-md rounded-md p-2 mb-3"
						name="email"
						id="email"
						type="text"
					/>
					<ErrorMessage
						className=" text-red-500"
						component="div"
						name="email"
					/>

					<label
						className="text-m text-slate-500 font-medium"
						htmlFor="password"
					>
						Password
					</label>
					<Field
						className="shadow-md rounded-md p-2 mb-3"
						name="password"
						id="password"
						type="password"
					/>
					<ErrorMessage
						className="text-red-500"
						component="div"
						name="password"
					/>

					<div className="flex gap-2">
						<Field name="rememberMe" type="checkbox" />
						<label className="text-m text-slate-700" htmlFor="rememberMe">
							Remember me
						</label>
					</div>

					<button
						className="font-medium bg-slate-400 text-white p-2 mt-2 mb-3 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md "
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
