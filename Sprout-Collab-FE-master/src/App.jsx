import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import GoalCatergories from "./components/goals/GoalCatergory";
import GoalDetails from "./components/goals/goalDetailPage";
import Goals from "./components/goals/Goals";
import LoginPage from "./pages/auth/Login";
import Login2 from "./pages/auth/Login2";
import RegisterPage from "./pages/auth/Register";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import ProjectPage from "./pages/ProjectPage";
import SeTT from "./pages/SettingsPage";
import TestPage1 from "./pages/Testpage1";
import store, { persistor } from "./redux/store";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Layout />}
		>
			<Route
				index
				element={<LandingPage />}
			/>
			<Route
				path="login"
				element={<LoginPage />}
			/>
			<Route
				path="register"
				element={<RegisterPage />}
			/>
			<Route
				path="home"
				element={<HomeLoggedIn />}
			/>
			<Route
				path="sett"
				element={<SeTT />}
			/>

			<Route
				path="goal-details/:goalId"
				element={<GoalDetails />}
			/>
			<Route
				path="goals/:typeId"
				element={<Goals />}
			/>
			<Route
				path="/projects/:projectId/tasks"
				element={<ProjectPage />}
			/>
			<Route
				path="/goal-catergories"
				element={<GoalCatergories />}
			/>

			<Route
				path="/comment"
				element={<TestPage1 />}
			/>
			<Route
				path="/testlogin"
				element={<Login2 />}
			/>

			<Route
				path="*"
				element={<NoPage />}
			/>
		</Route>
	)
);
const App = () => {
	return (
		<div className="App h-full">
			<ThemeProvider>
				<Provider store={store}>
					<PersistGate
						loading={null}
						persistor={persistor}
					>
						<RouterProvider router={router} />
						<ToastContainer />
					</PersistGate>
				</Provider>
			</ThemeProvider>
		</div>
	);
};

export default App;
