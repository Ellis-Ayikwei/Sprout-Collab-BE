import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import GrowthBenefits from "../../components/landingpage/growth_benefits";

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		setFirstName("");
		setLastName("");
		setUsername("");
		setEmail("");
		setPhoneNumber("");
		setPassword("");
		setConfirmPassword("");
	};

	const handleGoogleLogin = () => {
		console.log("Google login clicked");
		// Implement Google login logic here
	};

	const handleFacebookLogin = () => {
		console.log("Facebook login clicked");
		// Implement Facebook login logic here
	};

	return (
		<div className="register-page">
			{/* Register form on the left */}
			<form
				className="register-form"
				onSubmit={handleSubmit}
			>
				<h2>Register To Get Started</h2>
				<div className="fullName">
					<input
						type="text"
						id="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						placeholder="FirstName"
					/>
					<input
						type="text"
						id="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						placeholder="LastName"
					/>
				</div>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					placeholder="Username"
				/>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder="Email"
				/>
				<input
					type="tel"
					id="phoneNumber"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					required
					placeholder="Phone Number"
				/>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Password"
				/>
				<input
					type="password"
					id="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					placeholder="Confirm Password"
				/>
				<button
					className="btn--secondary"
					type="submit"
				>
					Register
				</button>
				<p>Or SignUp With</p>
				<div className="social-login">
					<button
						type="button"
						className="btn--secondary"
						onClick={handleGoogleLogin}
					>
						Google
					</button>
					<button
						type="button"
						className="btn--secondary"
						onClick={handleFacebookLogin}
					>
						Facebook
					</button>
					<p>
						Already have an account? <NavLink to="/login">Login</NavLink>
					</p>
				</div>
			</form>

			<GrowthBenefits />
		</div>
	);
};

export default RegisterPage;
