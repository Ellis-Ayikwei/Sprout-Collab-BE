const GetColorBasedOnProgress = (progress) => {
	if (progress <= 33) {
		return "red"; // Red for low progress
	} else if (progress <= 66) {
		return "orange"; // Orange for medium progress
	} else {
		return "green"; // Green for high progress
	}
};

export default GetColorBasedOnProgress;

/**
 * Function to get the main color and tint color based on the progress.
 * The main color is chosen based on the progress range and the tint color
 * is calculated by blending the main color with white.
 *
 * @param {number} progress - The progress value.
 * @returns {Object} An object containing the main color and tint color.
 */
export const GetColor1BasedOnProgress = (progress) => {
	/**
	 * Function to blend a color with white to create a lighter tint.
	 *
	 * @param {string} color - The color to blend with white.
	 * @param {number} tint - The blend ratio from 0 to 1.
	 * @returns {string} The blended color.
	 */
	// Function to blend a color with white
	const blendWithWhite = (color, amount) => {
		// Extract RGB values from the color
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);

		// Calculate the new color values by blending with white
		const newR = Math.round(r + (255 - r) * amount);
		const newG = Math.round(g + (255 - g) * amount);
		const newB = Math.round(b + (255 - b) * amount);

		// Convert new RGB values to hex format
		return `#${((1 << 24) | (newR << 16) | (newG << 8) | newB)
			.toString(16)
			.slice(1)}`;
	};

	// Example usage

	// Choose the base color based on the progress
	let color;
	if (progress <= 10) {
		color = "d73027"; // Red
	} else if (progress <= 20) {
		color = "f46d43"; // Orange Red
	} else if (progress <= 30) {
		color = "fdae61"; // Light Orange
	} else if (progress <= 40) {
		color = "fee08b"; // Light Yellow
	} else if (progress <= 50) {
		color = "d9ef8b"; // Light Green
	} else if (progress <= 60) {
		color = "91cf60"; // Medium Green
	} else if (progress <= 70) {
		color = "1a9850"; // Darker Green
	} else if (progress <= 80) {
		color = "006837"; // Even Darker Green
	} else if (progress <= 90) {
		color = "004529"; // Very Dark Green
	} else {
		color = "003b19"; // Almost Black Green
	}

	// Calculate a lighter tint based on progress
	// The tint amount increases as progress goes from 0 to 100
	const mainColor = `#${color}`;
	const tintColor = blendWithWhite(mainColor, 0.83);

	return {
		mainColor,
		tintColor,
	};
};
