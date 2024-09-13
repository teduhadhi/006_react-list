import React, { useContext, useState, createContext } from "react";
import ListDeleteConfirm from "../ListDeleteConfirm/ListDeleteConfirm";
import axios from "axios";
import { ItemProps } from "../../interfaces/list.interface";

interface ListDisplay {
	categoryList: [] | undefined;
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
		<ol className="flex flex-col gap-3 w-96 ">
			{categoryList &&
				categoryList.map((item: ItemProps, index: number) => (
					<li
						className="flex justify-between gap-4 border-t-2 border-solid border-slate-200"
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
									className="cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition pl-4 text-sm"
									onClick={() => handleUpdateCategory(item)}
								>
									EDIT
								</button>
								<button
									className="cursor-pointer text-red-700 font-medium hover:text-red-500 transition text-sm"
									onClick={() => {
										handleDeleteConfirmation(item.id);
									}}
								>
									DELETE
								</button>
							</div>
						</div>
					</li>
				))}
		</ol>
	);
};

export default ListDisplay;
