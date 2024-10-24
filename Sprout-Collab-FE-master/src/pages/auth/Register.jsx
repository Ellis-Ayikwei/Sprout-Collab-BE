/* eslint-disable no-unused-vars */
import { Facebook, Google } from "@mui/icons-material";
import React, { useState } from "react";
import { eye } from "react-icons-kit/fa/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import DotLoader from "../../components/DotLoader";
import GrowthBenefits from "../../components/landingpage/growth_benefits";
import logo from "../../images/sclogo-alone.png";

import Icon from "react-icons-kit";
import PasswordChecklist from "react-password-checklist";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import CheckedSymbol from "../../components/checkSymbol";
import axiosInstance from "../../helpers/configEndpoints";
import DefaultParams from "./authUtils/dparams";

const RegisterPage = () => {
	const [errorMessage, setErrorMessage] = useState(null);

	const handleGoogleLogin = () => {
		console.log("Google login clicked");
		// Implement Google login logic here
	};

	const handleFacebookLogin = () => {
		console.log("Facebook login clicked");
		// Implement Facebook login logic here
	};

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	// eslint-disable-next-line no-unused-vars
	const [value, setValue] = useState("list");
	const [defaultParams, setDefaultParams] = useState({ ...DefaultParams });

	const [params, setParams] = useState(
		JSON.parse(JSON.stringify(defaultParams))
	);

	const changeValue = (e) => {
		const { value, id } = e.target;
		console.log("value", value);
		setParams({ ...params, [id]: value });
	};

	const [password, setPassword] = useState("");
	const [type, setType] = useState("password");
	const [icon, setIcon] = useState(eyeOff);
	const [isignedUp, setIsignedUp] = useState(false);
	const [showPwdChecklist, setShowPwdChecklist] = useState(false);
	const navigate = useNavigate();

	const handleToggle = () => {
		if (type === "password") {
			setIcon(eye);
			setType("text");
		} else {
			setIcon(eyeOff);
			setType("password");
		}
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const saveNewUser = async () => {
		console.log("params", params);
		if (!params.first_name) {
			setErrorMessage("First Name is required.");
			return true;
		}
		if (!params.email) {
			setErrorMessage("Email is required.");
			return true;
		}
		if (!params.phone) {
			setErrorMessage("Phone is required.");
			return true;
		}
		if (!params.username) {
			setErrorMessage("Username is required.");
			return true;
		}
		if (!params.password) {
			setErrorMessage("Password is required.");
			return true;
		}
		if (!params.password1) {
			setErrorMessage("Confirm Password is required.");
			return true;
		}
		if (params.password !== params.password1) {
			setErrorMessage("Passwords do not match.");
			return true;
		}

		const payload = JSON.stringify({ ...params });
		try {
			setLoading(true);
			const response = await axiosInstance.post("/auth/register", {
				...params,
			});
			if (response.status === 201) {
				setParams(defaultParams);
				setIsignedUp(true);
				setLoading(false);
				alert(response.data);

				setTimeout(() => {
					navigate("/login");
				}, 6000);
			}
		} catch (error) {
			if (error.response && error.response.data) {
				const parser = new DOMParser();
				const errorData = error.response.data;
				const doc = parser.parseFromString(errorData, "text/html");
				const errorMess =
					doc.querySelector("body")?.innerText || "An error occurred";
				const errorMsg = errorMess.split("\n")[1];
				console.error("Error:", errorMsg);
				setErrorMessage(errorMsg);
			}
		} finally {
			// setParams(defaultParams);
			setLoading(false);
		}
	};

	return (
		<div
			className="h-screen flex flex-wrap items-center justify-center
		"
		>
			{/* Register form on the left */}
			<div className="w-full max-w-md rounded-2xl shadow p-10">
				<h3 className="text-2xl font-semibold  pt-2 mb-4">Create an Account</h3>
				{/* Inputs */}
				<div>
					{errorMessage && <p className="text-red-500">{errorMessage}</p>}
				</div>
				<form
					className="flex flex-col"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="flex justify-between gap-1">
						<input
							id="first_name"
							type="text"
							className="p-2 rounded-2xl  lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400 focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
							placeholder="First Name"
							value={params.first_name}
							onChange={(e) => changeValue(e)}
						></input>
						<input
							id="last_name"
							type="text"
							className="p-2 rounded-2xl  lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400 focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
							placeholder="Last Name"
							value={params.last_name}
							onChange={(e) => changeValue(e)}
						></input>
					</div>
					<input
						id="username"
						type="text"
						className="p-2 rounded-2xl  lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400 m-1 focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
						placeholder="username"
						value={params.username}
						onChange={(e) => changeValue(e)}
					></input>
					<input
						id="email"
						type="email"
						className="p-2 rounded-2xl  lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400 m-1 focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
						placeholder="Email"
						value={params.email}
						onChange={(e) => changeValue(e)}
					></input>
					<input
						id="phone"
						type="tel"
						className="p-2 rounded-2xl  lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400 m-1 focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
						placeholder="Phone Number"
						value={params.phone}
						onChange={(e) => changeValue(e)}
					></input>
					<div className="flex justify-between w-full gap-1 items-center">
						<input
							id="password1"
							type={type}
							className="p-2 rounded-2xl lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400  focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
							placeholder="Password"
							value={params.password1}
							onChange={(e) => {
								changeValue(e);
								setShowPwdChecklist(true);
							}}
						></input>
						<input
							id="password2"
							type={type}
							className=" p-2 rounded-2xl lg:-full md:w-full border-[1px] focus:border-[3px] border-green-400  focus:shadow-md focus:border-green-500 focus:outline-none focus:ring-0"
							placeholder="Confirm Password"
							value={params.password2}
							onChange={(e) => {
								changeValue(e);
								setShowPwdChecklist(true);
							}}
						></input>
						<div className="text-right mt-2">
							{" "}
							<span
								className="cursor-pointer text-gray-500 flex items-center justify-end"
								onClick={handleToggle}
							>
								<Icon
									className="ml-1"
									icon={icon}
									size={16}
								/>
							</span>
						</div>
					</div>
					{params.password1 && showPwdChecklist && (
						<PasswordChecklist
							rules={["minLength", "specialChar", "number", "capital", "match"]}
							minLength={8}
							value={params.password1}
							valueAgain={params.password2}
							onChange={(isValid) => {
								if (isValid) {
									setParams({ ...params, password: params.password1 });
									setShowPwdChecklist(false);
								}
							}}
						/>
					)}

					<button
						onClick={saveNewUser}
						className=" flex gap-2 rounded-full justify-center m-2 font-semibold fon w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in"
					>
						{loading && (
							<DotLoader
								width="w-7"
								height="h-7"
							/>
						)}
						{isignedUp && (
							<CheckedSymbol
								width="w-7"
								height="h-7"
							/>
						)}
						Sign Up
					</button>
				</form>
				<div className="flex space-x-2 m-4 items-center justify-center rounded-full border-[3px] border-black-400 hover:border-green-400 p-2">
					<button className="flex gap-2 ">
						<div className="item-center">
							<Google />
						</div>{" "}
						Sign Up With Google
					</button>
				</div>
				<div className="flex space-x-2 m-4 items-center justify-center rounded-full border-[3px] border-black-400 hover:border-green-400 p-2">
					<button className="flex gap-2 ">
						<div className="item-center">
							<Facebook />
						</div>{" "}
						Sign Up With Facebook
					</button>
				</div>

				<div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
				<div className="flex flex-row items-center justify-center text-center !gab-6">
					<p className="  text-sm"> Already have an account?</p>
					<Link
						to="/register"
						className="text-blue-400 ml-1 text-sm font-medium"
					>
						Register
					</Link>
				</div>
			</div>
			<div className="justify-center items-center p-8">
				<div className="flex items-center text-3xl p-8 pb-0">
					<img
						className="w-14 h-14"
						src={logo}
						alt="Logo"
					/>
					<p className="logo-text">
						<b>Sprout</b>Collab
					</p>{" "}
				</div>
				<div className="inline-block border-[1px] justify-center w-20 border-black-600 border-solid"></div>

				<GrowthBenefits />
			</div>
		</div>
	);
};

export default RegisterPage;
