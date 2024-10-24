import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { usePreferences } from "../../contexts/PreferenceContext";

const NavItems = ({ isOnLoginPage, buttonText }) => {
	const location = useLocation();
	const { showPrefs } = usePreferences();

	return (
		<div className="menu-items gap-3">
			{location.pathname === "/" && (
				<NavLink
					to="/register"
					className="btn--outline menu-item rounded-3xl"
				>
					Get Started
				</NavLink>
			)}
			<NavLink
				to={isOnLoginPage ? "/register" : "/login"}
				className="btn--primary menu-item rounded-3xl"
			>
				{buttonText}
			</NavLink>
			<button
				onClick={showPrefs}
				className="btn--primary menu-item rounded-3xl"
			>
				<FontAwesomeIcon icon={faGear} />
			</button>
		</div>
	);
};

export default NavItems;
