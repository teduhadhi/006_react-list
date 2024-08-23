import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Test() {
	const [cattegoryList, setCattegoryList] = useState<any>();
	const [initialValues, setInitialValues] = useState<any>({
		name: "",
		description: "",
	});

	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (!token) {
			navigate("/");
		} else {
			handleCattegory();
		}
	}, [navigate]);

	const handleCattegory = async () => {
		await axios
			.get("http://localhost:8080/categories")
			.then(function (response) {
				setCattegoryList(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleNewCattegory = async (values: any) => {
		await axios.post(
			"http://localhost:8080/categories/",
			{
				name: values.name,
				description: values.description,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			}
		);
	};

	const handleDeleteCattegory = async (id: number) => {
		await axios.delete(`http://localhost:8080/categories/${id}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
	};

	const handleUpdateCattegory = (item: any) => {
    console.log(initialValues)
    setInitialValues({
        name:item.name,
        description:item.description,
    })
	};

  const updateCattegory = async ({ name, description, id }: any) => {
    await axios.put(
      `http://localhost:8080/categories/${id}`,
      {
        name: name,
        description: description,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

	const loginSchema = Yup.object().shape({
		name: Yup.string().required("Required"),

		description: Yup.string().required("Required"),
	});

  const handleChange = (event:any) => {
    console.log(event.target.value)
  }

	return (
		<div className="flex flex-col gap-1">
			<Formik
				initialValues={initialValues}
				validationSchema={loginSchema}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					handleNewCattegory(values);
				}}
			>
        {props=>(
				<Form className="flex flex-col gap-1">
					{/* {errorMessage !== null &&<p>{errorMessage}</p>} */}

					<label htmlFor="name">Name</label>
					<Field name="name" type="text" value={props.values.name} />
					<ErrorMessage name="name" />

					<label htmlFor="description">Description</label>
					<Field name="description" type="description"  />
					<ErrorMessage name="description" />

					<button type="submit">Submit</button>
				</Form>


        )}
			</Formik>

			<ol>
				{cattegoryList &&
					cattegoryList.map((item: any, index: any) => (
						<li className="flex justify-between gap-4" key={index}>
							{item.name} / {item.description}
							<div>
								<button onClick={() => handleUpdateCattegory(item)}>
									UPDATE
								</button>{" "}
								<button onClick={() => handleDeleteCattegory(item.id)}>
									DELETE
								</button>
							</div>
						</li>
					))}
			</ol>
      {initialValues.name}
		</div>
	);
}

export default Test;
