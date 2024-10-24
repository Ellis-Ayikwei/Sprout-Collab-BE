import React, { useEffect, useState } from "react";
import {
	FaBars,
	FaCalendarAlt,
	FaCommentAlt,
	FaHistory,
	FaRoad,
	FaTh,
	FaUserAlt,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import MyCollabs from "../collabs/myCollabs";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	const toggle = () => {
		if (isMobile) {
			setIsOpen(!isOpen);
		}
	};

	const handleResize = () => {
		setIsMobile(window.innerWidth < 768);
		if (window.innerWidth >= 768) {
			setIsOpen(true); // Ensure sidebar is open on larger screens
		} else {
			setIsOpen(false); // Default to closed on smaller screens
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		handleResize(); // Set initial state
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const menuItems = [
		{
			path: "/home",
			name: "Home",
			icon: <FaTh />,
		},
		{
			path: "/goal-catergories",
			name: "Goals",
			icon: <FaUserAlt />,
		},
		{
			path: "/analytics",
			name: "Calender",
			icon: <FaCalendarAlt />,
		},
		{
			path: "/comment",
			name: "Comments",
			icon: <FaCommentAlt />,
		},
		{
			path: "/product",
			name: "Milestones",
			icon: <FaRoad />,
		},
		{
			path: "/productList",
			name: "History",
			icon: <FaHistory />,
		},
	];

	return (
		<div
			className="main--aside "
			style={{
				zIndex: isOpen && isMobile ? "1" : "0",
			}}
		>
			<div
				style={{
					width: isOpen || !isMobile ? "200px" : "50px",
					// zIndex: (isOpen && isMobile) ? "1" : "0",
				}}
				className="sidebar overflow-y-hidden"
			>
				<div className="top-section">
					<p
						style={{ display: isOpen || !isMobile ? "block" : "none" }}
						className="logo"
					>
						<b>Sprout</b>Collab
					</p>
					<div
						style={{
							marginLeft: isOpen || !isMobile ? "30px" : "0px",
							paddingLeft: isOpen || !isMobile ? "40px" : "0px",
							// display: isOpen || !isMobile ? "none" : "block"
						}}
						className="bars"
					>
						<FaBars onClick={toggle} />
					</div>
				</div>
				<div className="nav-section">
					{menuItems.map((item, index) => (
						<NavLink
							to={item.path}
							key={index}
							className="link"
							// activeClassName="active"
						>
							<div className="icondd">{item.icon}</div>
							<div
								style={{ display: isOpen || !isMobile ? "block" : "none" }}
								className="link-text"
							>
								{item.name}
							</div>
						</NavLink>
					))}
				</div>

				<hr />
				<ul
					style={{
						margin: "10px",
						display: isOpen || !isMobile ? "block" : "none",
					}}
					className="h-full bg-black !justify-center !items-center"
				>
					<li
						style={{
							fontSize: "13px",
							display: "flex",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						My Collabs
						<Link to="/benefits">
							<small style={{ fontWeight: "200" }}>veiw more</small>
						</Link>
					</li>

					<MyCollabs />
				</ul>
			</div>
			{/* <div className="version">Sprout Collab 1.0.0</div> */}
		</div>
	);
};

export default Sidebar;
