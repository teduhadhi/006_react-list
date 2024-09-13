import React from "react";

interface ListDeleteConfirm {
	handleDeleteItem: Function,
  deleteState:Function
}

const ListDeleteConfirm = ({ handleDeleteItem, deleteState}: ListDeleteConfirm) => {
	return (
		<div className="flex h-screen w-screen fixed justify-center items-center top-0 left-0">
			<div className="flex flex-col gap-10 px-20 py-7 rounded-xl bg-white shadow-lg z-10 relative ">
				<div
					className="absolute right-5 top-4 cursor-pointer"
					onClick={() => deleteState(false)}
				>
					&#9932;
				</div>
				<div className="flex flex-col gap-4 items-center">
					<span className="text-7xl mb-3">&#9888;</span>
					<h2 className="font-medium text-2xl text-slate-600">
						Delete the item?
					</h2>
					<p className="text-m text-slate-500 ">
						You will not be able to recover it
					</p>
				</div>
				<div className="flex gap-10 justify-between">
					<button
						className="w-28 box-border font-medium bg-white text-slate-400 p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-white hover:border-slate-200 border border-slate-400 transition hover:shadow-md"
						onClick={() => deleteState(false)}
					>
						Cancel
					</button>
					<button
						className=" w-28 font-medium bg-slate-400 text-white p-2 mt-2 rounded-md hover:bg-slate-200 hover:text-slate-400 transition shadow-md"
						onClick={() => handleDeleteItem()}
					>
						Yes, delete it
					</button>
				</div>
			</div>
			<div className="flex h-screen w-screen fixed bg-black opacity-5 "></div>
		</div>
	);
};

export default ListDeleteConfirm;
