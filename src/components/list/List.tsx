import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import axios from "axios";
import Logout from "../user/Logout";
import ListDisplay from "./ListDisplay";
import ListInput from "./ListInput";

interface ItemProps {
	name: string;
	description: string;
	id: string;
}

const List: React.FC = () => {
	const [categoryList, setCategoryList] = useState<[]>();
	const [initialValues, setInitialValues] = useState<ItemProps>({
		name: "",
		description: "",
		id: "",
	});
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [isInputing, setIsInputing] = useState<boolean>(false);

	const navigate: NavigateFunction = useNavigate();

	useEffect((): void => {
		const localToken: string | null = localStorage.getItem("token");
		if (localToken) {
			sessionStorage.setItem("token", localToken);
		}
		const token: string | null = sessionStorage.getItem("token");
		if (!token) {
			navigate("/login");
		} else {
			handleCategory();
		}
	}, [navigate]);

	const handleCategory = async (): Promise<void> => {
		await axios
			.get("http://localhost:8080/categories")
			.then(function (response) {
				setCategoryList(response.data);
				setInitialValues({
					name: "",
					description: "",
					id: "",
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleNewCategory = async (values: ItemProps): Promise<void> => {
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
		handleCategory();
	};

	const handleInput = (): void => {
		setIsInputing(true);
	};

	const handleUpdateCategory = async (item: ItemProps): Promise<void> => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
		setIsInputing(true);
		setIsUpdating(true);
		setInitialValues({
			name: item.name,
			description: item.description,
			id: item.id,
		});
	};

	const handleCancelInput = (): void => {
		setIsInputing(false);
		setIsUpdating(false);
		setInitialValues({
			name: "",
			description: "",
			id: "",
		});
	};

	return (
		<div className="flex gap-10 px-6 py-7 rounded-3xl bg-white shadow-lg">
			<ListInput
				isUpdating={isUpdating}
				isInputing={isInputing}
				initialValues={initialValues}
				handleInput={handleInput}
				handleCancelInput={handleCancelInput}
				handleNewCategory={(value: ItemProps) => handleNewCategory(value)}
			/>
			<div className="flex flex-col">
			<div className="flex justify-between">
				<h1 className="font-medium text-xl text-slate-500">List</h1>
				<Logout />
			</div>
			<ListDisplay
				categoryList={categoryList}
				handleCategory={() => {
					handleCategory();
				}}
				handleUpdateCategory={(value: ItemProps) => handleUpdateCategory(value)}
			/>
			</div>
			
		</div>
	);
};

export default List;
