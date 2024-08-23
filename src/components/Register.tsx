import { useState } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";


interface UserValues {
  email : string,
  password : string,
}

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleRegister  = async ({email, password} : UserValues)  => {
    await axios.post('http://localhost:8080/register', {
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error)
    setErrorMessage("User already exist")
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

    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
    .required("Required")
  });
	return (
		<Formik
			initialValues={{ email: "", password: "", passwordConfirmation:"" }}
			validationSchema={loginSchema}
			onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          handleRegister(values)
      }}
		>
			<Form className="flex flex-col gap-1">
        {errorMessage !== null &&<p>{errorMessage}</p>}

				<label htmlFor="email">Email</label>
				<Field name="email" type="text" />
				<ErrorMessage name="email" />

				<label htmlFor="password">Password</label>
				<Field name="password" type="password" />
				<ErrorMessage name="password" />

        <label htmlFor="passwordConfirmation">Confrim Password</label>
				<Field name="passwordConfirmation" type="password" />
				<ErrorMessage name="passwordConfirmation" />

				<button type="submit">Submit</button>
			</Form>
		</Formik>
	);
};

export default Register;
