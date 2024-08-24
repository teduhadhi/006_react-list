import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import List from "./components/List";
import Authentication from "./components/Authentication";

function App() {
	return (
		<BrowserRouter>
			<div className="h-auto w-auto min-h-screen min-w-screen flex justify-center items-center bg-slate-200 py-14">
				<Routes>
          <Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
          <Route path="/list" element={
            <Authentication>
              <List />
            </Authentication>
            } />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
