const { default: axiosInstance } = require("helpers/configEndpoints");

const joinCollab = async (userData, collabid) => {
	try {
		const response = await axiosInstance.post(
			`collaborations/${collabid}/members`,
			JSON.stringify(userData)
		);
		console.log("Successfully joined collaboration:", response.data);
	} catch (error) {
		console.error("Error joining collaboration:", error);
	}
};

export default joinCollab;
