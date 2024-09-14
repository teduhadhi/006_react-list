import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import "@testing-library/jest-dom";
import axios from "axios";
import * as router from "react-router";
import { act } from "react";

describe("Login Component", () => {
	const navigate = jest.fn();
	beforeEach(() => {
		jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
	});

	test("Renders Login Page", () => {
		render(<Login/>);
		const loginContainer = screen.getByTestId("container-login")
		expect(loginContainer).toBeInTheDocument();
	})

	test("Login failed error message", async () => {
		jest.spyOn(axios, "post").mockImplementation(() => {
			throw new Error();
		});
		await act(async () => render(<Login />));
		const errorMessage = screen.getByTestId("message-error");
		expect(errorMessage).toBeInTheDocument();
	});
});
