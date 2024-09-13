import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import List from "./List";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("List", () => {
  
	beforeEach(() => {
		mockedAxios.get.mockResolvedValue({
			data: [{ description: "desc", id: 1, name: "name" }],
		});
	});

	test("renders List components", async () => {
		render(<List />);

		await waitFor(() => {
			expect(screen.getByText("List")).toBeInTheDocument();
		});
	});
});
