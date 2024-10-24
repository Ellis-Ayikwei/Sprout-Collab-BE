import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavItems from "./NavbarItems";

const NavbarOnSm = ({ isopen, toggle }) => {
	let opacityClasses = ["NavbarOnSm"];
	if (isopen) {
		opacityClasses.push("opacity-on");
	} else {
		opacityClasses.push("opacity-off");
	}

	const location = useLocation();
	const [isOnLoginPage, setIsOnLoginPage] = useState(false);
	const [buttonText, setButtonText] = useState("Login");

	useEffect(() => {
		const onLoginPage = location.pathname === "/login";
		setIsOnLoginPage(onLoginPage);
		setButtonText(onLoginPage ? "Sign Up" : "Login");
	}, [location.pathname]);

	return (
		<div
			className={opacityClasses.join(" ")}
			isopen={isopen.toString()}
			onClick={toggle}
		>
			<div className="icon">
				<FaTimes
					className="close-icon"
					onClick={toggle}
				/>
			</div>
			<div className="sidebar-wrapper">
				<div className="sidebar-menu">
					<NavItems
						isOnLoginPage={isOnLoginPage}
						buttonText={buttonText}
					/>
				</div>
			</div>
		</div>
	);
};

export default NavbarOnSm;
