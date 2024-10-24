import axios from "axios";
import { toast } from "react-toastify";

const downloadResource = async (resource) => {
  const url = resource.url;
  const name = resource.name || 'downloaded-file';

  console.log("Attempting to download resource:", name, url);

  if (!url) {
    console.error('Resource URL is missing.');
    toast.error('Resource URL is missing.');
    return;
  }

  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      // If the server response was not ok (e.g., 404 or 500 error), throw an error
      throw new Error(`Failed to fetch resource: ${response.statusText}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = name;
    document.body.appendChild(link); // Append to document for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
    window.URL.revokeObjectURL(downloadUrl); // Free up resources
    toast.success("Resource downloaded successfully");
  } catch (error) {
    console.error('Download error:', error);
    toast.error(`An error occurred while downloading the resource: ${error.message}`);
  }
};

export default downloadResource;

  

// const handleDownload = () => {
//     const url = resource.url
//     const fileName = resource.name
//   fetch(url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const url = window.URL.createObjectURL(new Blob([blob]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "downloaded-file";
//       document.body.appendChild(link);

//       link.click();

//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     })
//     .catch((error) => {
//       console.error("Error fetching the file:", error);
//     });
// };

// const shareResource = (resource) => {
//     if (navigator.share) {
//         navigator.share({
//             title: resource.name,
//             url: resource.shareUrl, // Adjust based on your backend URL
//         })
//         .then(() => toast.success("Resource shared successfully"))
//         .catch((error) => toast.error("Error sharing resource"));
//     } else {
//         navigator.clipboard.writeText(resource.shareUrl)
//         .then(() => toast.success("Resource link copied to clipboard"))
//         .catch((error) => toast.error("Error copying link to clipboard"));
//     }
// };

// const toggleFavoriteResource = async (resource) => {
//     try {
//         // API call to toggle favorite status
//         const response = await fetch(`/api/resources/${resource.id}/favorite`, {
//             method: "PATCH",
//         });
//         if (response.ok) {
//             toast.success("Favorite status updated");
//         } else {
//             throw new Error("Failed to update favorite status");
//         }
//     } catch (error) {
//         toast.error(error.message);
//     }
// };

// const deleteResource = async (resource) => {
//     try {
//         // API call to delete resource
//         const response = await fetch(`/api/resources/${resource.id}`, {
//             method: "DELETE",
//         });
//         if (response.ok) {
//             toast.success("Resource deleted");
//         } else {
//             throw new Error("Failed to delete resource");
//         }
//     } catch (error) {
//         toast.error(error.message);
//     }
// };
