import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/landingpage/Footer";
import SecondNav from "../components/navigations/navbar2";
import Sidebar from "../components/navigations/Sidebar";
import AllProviders from "../contexts/allProviders";
import SeTT from "./SettingsPage";

const Layout = () => {
	const location = useLocation();
	const [showAside, setShowAside] = useState(false);
	const [showFooter, setShowFooter] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const load = useSelector((state) => state.loading.load);

	useEffect(() => {
		setShowAside(
			location.pathname !== "/register" &&
				location.pathname !== "/login" &&
				location.pathname !== "/"
		);
		setShowNav(
			location.pathname !== "/register" && location.pathname !== "/login"
		);
		setShowFooter(location.pathname === "/");
	}, [location.pathname]);

	const [isopen, setIsopen] = useState(false);
	const toggle = () => {
		console.log("toggeld");
		setIsopen(!isopen);
	};
	return (
		<>
			<AllProviders>
				{load && <div className="main-loader"></div>}
				{/* {showNav && (
					<Navbar
						toggle={toggle}
						isopen={isopen}
					/>
				)}
				{
					<NavbarOnSm
						toggle={toggle}
						isopen={isopen}
					/>
				} */}

				{showNav && <SecondNav />}
				{showAside && <Sidebar />}
				<div className={showAside ? "Outlet h-full justify-between" : ""}>
					<Outlet />
				</div>
				<Footer />
				<SeTT />
			</AllProviders>
		</>
	);
};

export default Layout;
