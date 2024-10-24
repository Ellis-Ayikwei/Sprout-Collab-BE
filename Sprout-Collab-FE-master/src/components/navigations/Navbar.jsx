import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../images/sclogo-alone.png";
import NavItems from "./NavbarItems";

const Navbar = ({ toggle }) => {
	const location = useLocation();
	const [isOnLoginPage, setIsOnLoginPage] = useState(false);
	const [buttonText, setButtonText] = useState("Login");

	useEffect(() => {
		const onLoginPage = location.pathname === "/login";
		setIsOnLoginPage(onLoginPage);
		setButtonText(onLoginPage ? "Sign Up" : "Login");
	}, [location.pathname]);

	return (
		<nav style={{ zIndex: "1" }}>
			<NavLink
				to="/"
				className="main-logo"
				style={{ textDecoration: "none" }}
			>
				<img
					className="logo"
					src={logo}
					alt="Logo"
				/>
				<p className="logo-text">
					<b>Sprout</b>Collab
				</p>
			</NavLink>
		
			<NavItems
				isOnLoginPage={isOnLoginPage}
				buttonText={buttonText}
			/>
			<div className="icons">
				<div className="mobile-menu-icon">
					<FaBars onClick={toggle} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
