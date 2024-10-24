// deleteResource.js
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/configEndpoints";

const extractFilePath = (url) => {
	// Define the base URL and bucket name part to remove
	const baseUrl =
		"https://storage.googleapis.com/sprout-collab-65cc2.appspot.com/";

	// Remove the base URL part to get the file path
	const filePath = url.replace(baseUrl, "");

	// Decode any URL-encoded characters (e.g., spaces)
	return decodeURIComponent(filePath);
};

const deleteResource = async ({ id: resourceId, url }) => {
	try {
		console.log("the usyyr", resourceId);
		const filePath = extractFilePath(url);

		const deleRes = await axiosInstance.delete(`/resources/${resourceId}`);

		const { status, message } = await axiosInstance.post(
			"/delete_from_firebase",
			{
				url: filePath,
			}
		);
		if (deleRes.status == 200) {
			toast.success("successfully deleted");
		}
		return { status, message };
	} catch (error) {
		console.error("Failed to delete resource:", error);
		return { status: "failure", message: "Failed to delete resource" };
	}
};

export default deleteResource;
