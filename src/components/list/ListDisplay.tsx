import React from "react";

const ListDisplay = () => {
	return (
		<ol className="flex flex-col gap-3 w-96 ">
			{cattegoryList &&
				cattegoryList.map((item: ItemProps, index: number) => (
					<li
						className="flex justify-between gap-4 border-t-2 border-solid border-slate-200"
						key={index}
					>
						{isDeleting && (
							<div className="flex h-screen w-screen fixed justify-center items-center top-0 left-0">
								<div className="flex flex-col gap-10 px-20 py-7 rounded-xl bg-white shadow-lg z-10 relative ">
									<div
										className="absolute right-5 top-4 cursor-pointer"
										onClick={() => setIsDeleting(false)}
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
											onClick={() => setIsDeleting(false)}
										>
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
								<div className="flex h-screen w-screen fixed bg-black opacity-5 "></div>
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
									className="cursor-pointer text-slate-500 font-medium hover:text-slate-400 transition pl-4 text-sm"
									onClick={() => handleUpdateCattegory(item)}
								>
									EDIT
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
	);
};

export default ListDisplay;
