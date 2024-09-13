import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListInput from "./ListInput";

describe("Counter Component", () => {
	test("renders with initial count of 0", () => {
		render(<ListInput isInputing={true} />);
		expect(screen.getByText("Name")).toBeInTheDocument();
	});
});
