import React from "react";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Test from "./components/Test";
import Authentication from "./components/Authentication";

function App() {
	return (
		<BrowserRouter>
			<div className="h-screen w-screen flex justify-center items-center bg-slate-200">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
          <Route path="/test" element={
            <Authentication>
              <Test />
            </Authentication>
            } />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
