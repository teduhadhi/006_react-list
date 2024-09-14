import { render, screen, waitFor } from "@testing-library/react";
import * as router from "react-router";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import List from "./List";
import axios from "axios";
import { act } from "react";

describe("List Component", () => {
	const navigate = jest.fn();
	const mockResponse = {
		data: [
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
		],
	};

	beforeEach(() => {
		jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
		jest.spyOn(axios, "get").mockResolvedValue(mockResponse);
	});

	test("Render tag", () => {
		render(<List />);
		const listContainer = screen.getByTestId("container-list");
		expect(listContainer).toBeInTheDocument();
	});

	test("Render category", async () => {
		jest.spyOn(Storage.prototype, "getItem").mockReturnValue("test");

		await act(async () => render(<List />));

		const listItem = screen.getAllByTestId("list-item");
		expect(listItem).toHaveLength(2);
		expect(listItem[0]).toHaveTextContent("test name 1");
	});

	test("Render without token redirect to '/login' endpoint", async () => {
		jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

		await act(async () => render(<List />));

		expect(navigate).toHaveBeenCalledWith("/login");
	});

	test("Redirect to '/login' endpoint after logout", async () => {
		jest.spyOn(Storage.prototype, "getItem").mockReturnValue("test");
    
		await act(async () => render(<List />));

		const listItem = screen.getAllByTestId("list-item");
		expect(listItem[0]).toHaveTextContent("test name 1");

		const logoutButton = screen.getByTestId("logout-button");
		await userEvent.click(logoutButton);
		expect(navigate).toHaveBeenCalledWith("/login");
	});
});
