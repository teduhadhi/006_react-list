import { useState } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import RedirectLogin from "./RedirectLogin";


interface UserValues {
	email: string;
	password: string;
}

const Register = () => {
	const [errorMessage, setErrorMessage] = useState<string>();

	const handleRegister = async ({ email, password }: UserValues) => {
		await axios
			.post(
				"http://localhost:8080/register",
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
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
				setErrorMessage("User already exists");
			});
	};

	const loginSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email address").required("Required"),

		password: Yup.string()
			.min(8, "Your password must be at least 8 characters")
			.max(50, "Too Long!")
			.matches(/[0-9]/, "Password requires a number")
			.matches(/[a-z]/, "Password requires a lowercase letter")
			.matches(/[A-Z]/, "Password requires an uppercase letter")
			.matches(/[^\w]/, "Password requires a symbol")
			.required("Required"),

		passwordConfirmation: Yup.string()
			.oneOf([Yup.ref("password")], "Your passwords do not match.")
			.required("Required"),
	});
	return (
		<Formik
			initialValues={{ email: "", password: "", passwordConfirmation: "" }}
			validationSchema={loginSchema}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				handleRegister(values);
			}}
		>
			<Form className="flex flex-col gap-1 w-96 px-6 py-7 rounded-3xl bg-white shadow-lg">
				{errorMessage !== null && <p className="text-red-500 flex justify-center mb-3">{errorMessage}</p>}

				<label className="text-m text-slate-500 font-medium" htmlFor="email">
					Email
				</label>
				<Field
					className="shadow-md rounded-md p-2 mb-3"
					name="email"
					type="text"
				/>
				<ErrorMessage className="text-red-500" component="div" name="email" />

				<label className="text-m text-slate-500 font-medium" htmlFor="password">
					Password
				</label>
				<Field
					className="shadow-md rounded-md p-2 mb-3"
					name="password"
					type="password"
				/>
				<ErrorMessage
					className="text-red-500"
					component="div"
					name="password"
				/>

				<label
					className="text-m text-slate-500 font-medium"
					htmlFor="passwordConfirmation"
				>
					Confrim Password
				</label>
				<Field
					className="shadow-md rounded-md p-2 mb-3"
					name="passwordConfirmation"
					type="password"
				/>
				<ErrorMessage name="passwordConfirmation" />

				<button
					className="font-medium bg-slate-400 text-white p-2 mt-2 mb-3 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md"
					type="submit"
				>
					Submit
				</button>
        <RedirectLogin/>
			</Form>
		</Formik>
	);
};

export default Register;
