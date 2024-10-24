import {
	faDownload,
	faEdit,
	faHeart,
	faShareAlt,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import downloadResource from "./ResourceMenuFunctions.jsx/DownloadResource";
import deleteResource from "./ResourceMenuFunctions.jsx/Deleteresource";
import { useDispatch } from "react-redux";
import { fetchResource } from "../../redux/ResourceSlice";

const ResourceMenu = ({ resource }) => {
	const dispatch = useDispatch();
	const handleResourceAction = (action) => {
		switch (action) {
			case "download":
				downloadResource(resource);
				break;
			case "delete":
				deleteResource(resource)
					.then(() => dispatch(fetchResource(resource.collaboration_id)))
					.catch((error) => console.error(error));
				break;
			case "share":
				// shareResource(resource);
				break;
			case "favorite":
				// toggleFavoriteResource(resource);
				break;
			default:
				break;
		}
	};

	// const shareResource = (resource) => {
	// 	if (navigator.share) {
	// 		navigator
	// 			.share({
	// 				title: resource.name,
	// 				url: resource.shareUrl,
	// 			})
	// 			.then(() => toast.success("Resource shared successfully"))
	// 			.catch((error) => toast.error("Error sharing resource"));
	// 	} else {
	// 		navigator.clipboard
	// 			.writeText(resource.shareUrl)
	// 			.then(() => toast.success("Resource link copied to clipboard"))
	// 			.catch((error) => toast.error("Error copying link to clipboard"));
	// 	}
	// };

	// const toggleFavoriteResource = async (resource) => {
	// 	try {
	// 		const response = await fetch(
	// 			`/api/resources/${resource.id}/favorite`,
	// 			{
	// 				method: "PATCH",
	// 			}
	// 		);
	// 		if (response.ok) {
	// 			toast.success("Favorite status updated");
	// 		} else {
	// 			throw new Error("Failed to update favorite status");
	// 		}
	// 	} catch (error) {
	// 		toast.error(error.message);
	// 	}
	// };

	return (
		<ul className="menu">
			<li onClick={() => handleResourceAction("download")}>
				<FontAwesomeIcon icon={faDownload} /> Save To Device
			</li>
			<li onClick={() => handleResourceAction("edit")}>
				<FontAwesomeIcon icon={faEdit} /> Rename
			</li>
			<li onClick={() => handleResourceAction("share")}>
				<FontAwesomeIcon icon={faShareAlt} /> Share
			</li>
			<li onClick={() => handleResourceAction("favorite")}>
				<FontAwesomeIcon icon={faHeart} /> Favorite
			</li>
			<li onClick={() => handleResourceAction("delete")}>
				<FontAwesomeIcon icon={faTrashAlt} /> Delete
			</li>
		</ul>
	);
};


export default ResourceMenu;
