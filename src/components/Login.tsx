import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import axios from "axios";
import RedirectRegister from "./RedirectRegister";

interface UserValues {
  email : string,
  password : string,
}

const Login = () => {
  const navigate = useNavigate();

  const handlelogIn  = async ({email, password} : UserValues)  => {
    await axios.post('http://localhost:8080/login', {
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
  })
  .then(function (response) {
    console.log(response.data);
    sessionStorage.setItem('token', response.data.accessToken);
    navigate("/test")
  })
  .catch(function (error) {
    console.log(error);
  });;
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),

    password: Yup.string()
      .min(8, 'Your password must be at least 8 characters')
      .max(50, 'Too Long!')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Required'),
  });
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={loginSchema}
			onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          handlelogIn(values)
      }}
		>
			<Form className="flex flex-col gap-1">
				<label htmlFor="email">Email</label>
				<Field name="email" type="text" />
				<ErrorMessage name="email" />

				<label htmlFor="password">Password</label>
				<Field name="password" type="password" />
				<ErrorMessage name="password" />

				<button type="submit">Log in</button>
        <RedirectRegister/>
			</Form>
		</Formik>
	);
};

export default Login;
