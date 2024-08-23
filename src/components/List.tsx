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
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [isInputing, setIsInputing] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		const localToken = localStorage.getItem("token");
		if (localToken) {
			sessionStorage.setItem("token", localToken);
		}

		const token = sessionStorage.getItem("token");
		if (!token) {
			navigate("/login");
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

	const handleInput = () => {
		setIsInputing(true);
	};

	const handleDeleteCattegory = async (id: number) => {
		await axios.delete(`http://localhost:8080/categories/${id}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
		setIsDeleting(false);
		handleCattegory();
	};

	const handleDeleteConfirmation = () => {
		setIsDeleting(true);
	};

	const handleUpdateCattegory = async (item: any) => {
		setIsInputing(true);
		setIsUpdating(true);
		setInitialValues({
			name: item.name,
			description: item.description,
			id: item.id,
		});
	};

	const handleCancelInput = () => {
		setIsInputing(false);
		setIsUpdating(false);
		setInitialValues({
			name: "",
			description: "",
		});
	};

	const listSchema = Yup.object().shape({
		name: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
	});

	return (
		<div className="flex gap-10 px-6 py-7 rounded-3xl bg-white shadow-lg">
			<div className="flex flex-col gap-1 rounded-3xl w-60 ">
				{isInputing ? (
					<Formik
						initialValues={initialValues}
						enableReinitialize={true}
						validationSchema={listSchema}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(false);
							handleNewCattegory(values);
						}}
					>
						<Form className="flex flex-col gap-1 w-full ">
							<label
								className="text-m text-slate-500 font-medium flex justify-between"
								htmlFor="name"
							>
								<p>Name</p>
								{isUpdating && <p>Id : {initialValues.id}</p>}
							</label>
							<Field
								className="shadow-md rounded-md p-2 mb-3"
								name="name"
								id="name"
								type="text"
							/>
							<ErrorMessage
								className="text-red-500"
								component="div"
								name="name"
							/>

							<label
								className="text-m text-slate-500 font-medium"
								htmlFor="description"
							>
								Description
							</label>

							<Field
								className="shadow-md rounded-md p-2 mb-3 resize-none"
								as="textarea"
								resize="none"
								rows={9}
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
							{isInputing ? (
								<span
									className="text-sm cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition flex justify-center"
									onClick={handleCancelInput}
								>
									Cancel
								</span>
							) : null}
						</Form>
					</Formik>
				) : (
					<button
						className="font-medium bg-slate-400 text-white p-2 mt-2 mb-3 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md "
						onClick={handleInput}
					>
						Input Data
					</button>
				)}
			</div>

			<ol className="flex flex-col gap-3 w-96 ">
				<div className="flex justify-between">
					<h1 className="font-medium text-xl text-slate-500">List</h1>
					<Logout />
				</div>

				{cattegoryList &&
					cattegoryList.map((item: any, index: any) => (
						<li
							className="flex justify-between gap-4 border-t-2 border-solid border-slate-200"
							key={index}
						>
							{isDeleting && (
								<div className="flex h-screen w-screen fixed justify-center items-center top-0 left-0">
									<div className="flex flex-col gap-10 px-20 py-7 rounded-xl bg-white shadow-lg z-10 relative ">
										<div className="absolute right-5 top-4 cursor-pointer" onClick={() => (setIsDeleting(false))}>&#9932;</div>
										<div className="flex flex-col gap-4 items-center">
											<span className="text-7xl mb-3" >&#9888;</span>
											<h2 className="font-medium text-2xl text-slate-600">
												Delete the item?
											</h2>
											<p className="text-m text-slate-500 ">
												You will not be able to recover it
											</p>
										</div>
										<div className="flex gap-10 justify-between">
											<button className="w-28 box-border font-medium bg-white text-slate-400 p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-white hover:border-slate-200 border border-slate-400 transition hover:shadow-md" onClick={() => (setIsDeleting(false))}>
												Cancel
											</button>
											<button
												className=" w-28 font-medium bg-slate-400 text-white p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md"
												onClick={() => handleDeleteCattegory(item.id)}
											>
												Yes, delete it
											</button>
										</div>
									</div>
									<div className="flex h-screen w-screen fixed bg-black opacity-25 "></div>
								</div>
							)}
							<div>
								<p className="mt-1 text-sm text-slate-400 ">Name</p>
								<p className="mb-2">{item.name}</p>

								<p className="text-sm text-slate-400">Description</p>
								<p className="mb-3"> {item.description}</p>
							</div>

							<div className="flex flex-col justify-between mt-2 mb-3">
								<p className="flex justify-end text-sm text-slate-400">
									Id : {item.id}
								</p>
								<div className="flex flex-col justify-around gap-1">
									<button
										className="cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition text-sm"
										onClick={() => handleUpdateCattegory(item)}
									>
										UPDATE
									</button>
									<button
										className="cursor-pointer text-red-700 font-medium hover:text-red-500 transition text-sm"
										onClick={handleDeleteConfirmation}
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
