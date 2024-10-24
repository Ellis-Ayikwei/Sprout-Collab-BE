import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import ResourceMenu from "./ResourceMenu";
import { getIcon } from "./getIcon";

const ResourceItem = ({ resource, parentRef }) => {
	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useRef(null);
	const res_menu = useRef(null);

	const handleToggleMenu = () => {
		setShowMenu((prev) => !prev);
	};

	// useEffect(() => {
	// 	if (showMenu) {
	// 		const menu = res_menu.current;
	// 		const menuContainer = parentRef?.current;

	// 		if (menu && menuContainer) {
	// 			const menuRect = menu.getBoundingClientRect();
	// 			const parentRect = menuContainer.getBoundingClientRect();

	// 			if (menuRect.right > parentRect.right) {
	// 				menu.style.left = "auto";
	// 				menu.style.right = "0";
	// 			}

	// 			if (menuRect.bottom > parentRect.bottom) {
	// 				menu.style.top = "auto";
	// 				menu.style.bottom = "100%";
	// 			} else {
	// 				menu.style.top = "100%";
	// 				menu.style.bottom = "auto";
	// 			}
	// 		}
	// 	}
	// }, [showMenu, parentRef]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<li
			className="resource-item"
			key={resource.id}
			ref={menuRef}
		>
			<div className="r-menu-icon">
				<FontAwesomeIcon
					icon={faEllipsisVertical}
					onClick={handleToggleMenu}
				/>
			</div>
			<div className="resource-icon">
				<FontAwesomeIcon icon={getIcon(resource.type)} />
			</div>
			<div className="resource-name">
				<p>{resource.name}</p>
			</div>
			{showMenu && (
				<div
					className="resource-menu"
					ref={res_menu}
				>
					<ResourceMenu resource={resource} />
				</div>
			)}
		</li>
	);
};

export default ResourceItem;
