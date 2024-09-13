import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const ListInput = () => {
  return (
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
  )
}

export default ListInput