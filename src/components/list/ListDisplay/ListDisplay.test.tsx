import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListDisplay from "./ListDisplay";
import "@testing-library/jest-dom";

describe("List Input Component", () => {
	test("renders with initial count of 0", async () => {
		const user = userEvent.setup();
		const handleInput = jest.fn();
		const handleCategory = jest.fn();
		const handleUpdateCategory = jest.fn();

		render(
			<ListDisplay
				categoryList={[]}
				handleCategory={handleCategory}
				handleUpdateCategory={handleUpdateCategory}
			/>
		);
		// const inputContainer = screen.getByTestId("input-container")
		// expect(inputContainer).toHaveTextContent("Name");
    // screen.debug()
    // expect(screen.getByText("DELETE")).toBeInTheDocument()

		// const inputButton = screen.getByTestId("input-button");
		// await user.click(inputButton);
		// expect(handleInput).toHaveBeenCalledWith();
	});
});
