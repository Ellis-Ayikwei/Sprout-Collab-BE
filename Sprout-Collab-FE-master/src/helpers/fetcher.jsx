import axiosInstance from './configEndpoints';

/**
 * Asynchronous function that makes a GET request to the server using axiosInstance
 * and returns the response data.
 *
 * @param {string} url - The URL to make the request to.
 * @param {object} [config] - Optional axios request config.
 * @returns {Promise} - A promise that resolves to the response data.
 */
const fetcher = async (url, config = {}) => {
    try {
        if (!url) {
            throw new Error('No URL provided');
        }
        // Make the GET request using axiosInstance
        const response = await axiosInstance.get(url, config);
        console.log(`Fetched data for URL ${url}:`, response.data);
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors here
        console.error(`Error fetching data for URL ${url}:`, error);
        throw error;
    }
}

export default fetcher;
