import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Logout from "./Logout";

function List() {
	const [cattegoryList, setCattegoryList] = useState<any>();
	const [initialValues, setInitialValues] = useState<any>({
		name: "",
		description: "",
		id: "",
	});
	const [isUpdating, setIsUpdating] = useState<any>(false);
	const [isInputing, setIsInputing] = useState<any>(false)

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
				setInitialValues({
					name: "",
					description: "",
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleNewCattegory = async (values: any) => {
		if (!isUpdating) {
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
		} else {
			await axios.put(
				`http://localhost:8080/categories/${initialValues.id}`,
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

			setIsUpdating(false);
		}

		handleCattegory();
	};

	const handleDeleteCattegory = async (id: number) => {
		await axios.delete(`http://localhost:8080/categories/${id}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
		handleCattegory();
	};

	const handleUpdateCattegory = async (item: any) => {
		setIsUpdating(true);
		setInitialValues({
			name: item.name,
			description: item.description,
			id: item.id,
		});
	};

	const loginSchema = Yup.object().shape({
		name: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
	});

	return (
		<div className="flex gap-10 px-6 py-7 rounded-3xl bg-white shadow-lg">
			<Formik
				initialValues={initialValues}
				enableReinitialize={true}
				validationSchema={loginSchema}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					handleNewCattegory(values);
				}}
			>
				<Form className="flex flex-col gap-1 rounded-3xl w-60 ">
					<Logout />
					<button
						className="font-medium bg-slate-400 text-white p-2 mt-2 mb-3 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md "
						type="submit"
					>
						{isInputing ? "Submit" : "Update"}
					</button>
					<label className="text-m text-slate-500 font-medium flex justify-between" htmlFor="name">
						<p>Name</p>
						{isUpdating && <p>Id : {initialValues.id}</p>}
					</label>
					<Field
						className="shadow-md rounded-md p-2 mb-3"
						name="name"
						id="name"
						type="text"
					/>
					<ErrorMessage className="text-red-500" component="div" name="name" />

					<label
						className="text-m text-slate-500 font-medium"
						htmlFor="description"
					>
						Description
					</label>
					<Field
						className="shadow-md rounded-md p-2 mb-3"
						name="description"
						id="description"
						type="text"
					/>
					<ErrorMessage
						className="text-red-500"
						component="div"
						name="description"
					/>

					<button
						className="font-medium bg-slate-400 text-white p-2 mt-2 mb-3 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md "
						type="submit"
					>
						{!isUpdating ? "Submit" : "Update"}
					</button>
				</Form>
			</Formik>
			<ol className="flex flex-col gap-3 w-96 ">
				<h1 className="font-medium text-xl text-slate-500">List</h1>
				{cattegoryList &&
					cattegoryList.map((item: any, index: any) => (
						<li
							className="flex justify-between gap-4 border-t-2 border-solid border-slate-200"
							key={index}
						>
							<div>
								<p className="mt-1 text-sm text-slate-400">Name</p>
								<p className="mb-2">{item.name}</p>

								<p className="text-sm text-slate-400">Description</p>
								<p className="mb-3"> {item.description}</p>
							</div>

							<div className="flex flex-col justify-around">
								<p className="flex justify-end text-sm text-slate-400">Id : {index+1}</p>
								<div className="flex flex-col justify-around gap-1">
								<button
									className="cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition text-sm"
									onClick={() => handleUpdateCattegory(item)}
								>
									UPDATE
								</button>
								<button
									className="cursor-pointer text-red-700 font-medium hover:text-red-500 transition text-sm"
									onClick={() => handleDeleteCattegory(item.id)}
								>
									DELETE
								</button>
								</div>
								
							</div>
						</li>
					))}
			</ol>
		</div>
	);
}

export default List;
