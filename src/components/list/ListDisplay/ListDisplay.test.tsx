import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListDisplay from "./ListDisplay";
import "@testing-library/jest-dom";

describe("List Display Component", () => {
	const user = userEvent.setup();
	const categoryList = [
		{
			name: "test name 1",
			description: "test desc 1",
			id: "1",
		},
		{
			name: "test name 2",
			description: "test desc 2",
			id: "2",
		},
	];
	const handleCategory = jest.fn();
	const handleUpdateCategory = jest.fn();

	test("Render tag", () => {
		render(
			<ListDisplay
				categoryList={categoryList}
				handleCategory={handleCategory}
				handleUpdateCategory={handleUpdateCategory}
			/>
		);

		const orderedListDisplay = screen.getByTestId("ordered-list-display");
		expect(orderedListDisplay).toBeInTheDocument();
	});

	test("Pop up delete confirmation modal", async () => {
		render(
			<ListDisplay
				categoryList={categoryList}
				handleCategory={handleCategory}
				handleUpdateCategory={handleUpdateCategory}
			/>
		);

		const deleteButton = screen.getAllByTestId("button-delete-item");
		await user.click(deleteButton[0]);

		const deleteConfrimModal = screen.getAllByTestId("modal-delete-confirm");
		expect(deleteConfrimModal[0]).toBeInTheDocument();
	});
});
