import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListInput from "./ListInput";
import "@testing-library/jest-dom";

describe("List Input Component", () => {
	const user = userEvent.setup();
	const handleInput = jest.fn();
	const handleCancelInput = jest.fn();
	const handleNewCategory = jest.fn();
	test("Submit New Category", async () => {
		const initialValues = { name: "", description: "", id: "" };

		render(
			<ListInput
				isUpdating={false}
				isInputing={true}
				initialValues={initialValues}
				handleInput={handleInput}
				handleCancelInput={handleCancelInput}
				handleNewCategory={handleNewCategory}
			/>
		);
		const nameInput = screen.getByTestId("input-name");
		const descriptionInput = screen.getByTestId("input-description");
		const submitButton = screen.getByTestId("button-submit-update");

		await user.type(nameInput, "test submit name");
		await user.type(descriptionInput, "test submit description");
		await user.click(submitButton);

		expect(handleNewCategory).toHaveBeenCalledWith({
			name: "test submit name",
			description: "test submit description",
			id: "",
		});
	});

	test("Update Existing Category by Adding '(updated)' text to each of the existing name and description", async () => {
		const initialValues = {
			name: "test update name",
			description: "test update description",
			id: "7",
		};

		render(
			<ListInput
				isUpdating={true}
				isInputing={true}
				initialValues={initialValues}
				handleInput={handleInput}
				handleCancelInput={handleCancelInput}
				handleNewCategory={handleNewCategory}
			/>
		);
		const nameInput = screen.getByTestId("input-name");
		const descriptionInput = screen.getByTestId("input-description");
		const submitButton = screen.getByTestId("button-submit-update");

		expect(nameInput).toHaveValue("test update name");
		expect(descriptionInput).toHaveValue("test update description");

		await user.type(nameInput, "(updated)");
		await user.type(descriptionInput, "(updated)");
		await user.click(submitButton);

		expect(handleNewCategory).toHaveBeenCalledWith({
			name: "test update name(updated)",
			description: "test update description(updated)",
			id: "7",
		});
	});
});
