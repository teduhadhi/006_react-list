import React, { useContext, useState, createContext } from "react";
import ListDeleteConfirm from "../ListDeleteConfirm/ListDeleteConfirm";
import axios from "axios";
import { ItemProps } from "../../../interfaces/list.interface";

interface ListDisplay {
	categoryList: ItemProps[] | undefined;
	handleCategory: Function;
	handleUpdateCategory: Function;
}

const ListDisplay = ({
	handleCategory,
	categoryList,
	handleUpdateCategory,
}: ListDisplay) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>();

	const handleDeleteCategory = async (): Promise<void> => {
		await axios.delete(`http://localhost:8080/categories/${deleteId}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
		setIsDeleting(false);
		handleCategory();
	};

	const handleDeleteConfirmation = (id: string): void => {
		setDeleteId(id);
		setIsDeleting(true);
	};

	return (
		<ol
			data-testid="ordered-list-display"
			className="flex flex-col gap-3 w-72 lg:w-96 "
		>
			{categoryList &&
				categoryList.map((item: ItemProps, index: number) => (
					<li
						data-testid="list-item"
						className="flex flex-col justify-between gap-4 border-t-2 border-solid border-slate-200"
						key={index}
					>
						{isDeleting && (
							<ListDeleteConfirm
								handleDeleteItem={handleDeleteCategory}
								deleteState={(value: boolean) => {
									setIsDeleting(value);
								}}
							/>
						)}
						<div className="">
							<div className="mt-1 flex justify-between">
								<p className="text-xs lg:text-sm text-slate-400 ">Name</p>
								<p className="text-xs lg:text-sm text-slate-400">
									Id : {item.id}
								</p>
							</div>
							<p className="mb-2 text-xs lg:text-sm">{item.name}</p>

							<p className="text-xs lg:text-sm text-slate-400">Description</p>
							<p className="text-justify mb-3 text-xs lg:text-sm">
								{item.description}
							</p>
						</div>

							<div className="flex justify-end gap-5">
								<button
									data-testid="button-edit-item"
									className="text-xs lg:text-sm cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition pl-4"
									onClick={() => handleUpdateCategory(item)}
								>
									EDIT
								</button>
								<button
									data-testid="button-delete-item"
									className="text-xs lg:text-sm cursor-pointer text-red-700 font-medium hover:text-red-500 transition"
									onClick={() => {
										handleDeleteConfirmation(item.id);
									}}
								>
									DELETE
								</button>
							</div>
					</li>
				))}
		</ol>
	);
};

export default ListDisplay;
