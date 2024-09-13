import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListDisplay from "./ListDisplay";
import "@testing-library/jest-dom";

describe("List Display Component", () => {
	test("renders with initial count of 0", async () => {
		const user = userEvent.setup();
		const handleCategory = jest.fn();
		const handleUpdateCategory = jest.fn();
    const handleDeleteConfirmation = jest.fn()

    const categoryList = [{
      name: "test name 1",
      description: "test desc 1",
      id: "1",
    },
    {
      name: "test name 2",
      description: "test desc 2",
      id: "2",
    }]

		render(
			<ListDisplay
				categoryList={categoryList}
				handleCategory={handleCategory}
				handleUpdateCategory={handleUpdateCategory}
			/>
		);

    const deleteButton = screen.getAllByTestId("button-delete-item")
    await user.click(deleteButton[0])
    
    const deleteButtonConfirmed = screen.getAllByTestId("button-delete-item-confirmed")
    await user.click(deleteButtonConfirmed[0])

    screen.debug()




	});
});
