import {
	faFileUpload,
	faTrashAlt,
	faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import validator from "validator";
import axiosInstance from "../../helpers/configEndpoints";
import { load } from "../../redux/mainLoaderSlice";
import { fetchResource } from "../../redux/ResourceSlice";
import Loader1 from "../Loader1";
import ReusableModal from "../ReusableModal"; // Adjust the import path as necessary
import { allowedTypes } from "./allowedTypes";

const initialdata = {
	name: "",
	description: "",
	visibility: "Public",
	start_date: "",
	end_date: "",
	file: null,
	file_type: "",
	url: "",
};

const AddResourceButton = ({ goalId, collabId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialdata);
	const [loading, setLoading] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === "file" && files.length > 0) {
			const file = files[0];
			if (file.size > 1 * 1024 * 1024) {
				toast.error("File too big. File size must be less than 20mb");
				return;
			}

			if (!allowedTypes.includes(file?.type)) {
				toast.error("Unsupported file type. Please upload a valid file.");
				return;
			}

			formData.type = file.type;
		}

		setFormData({
			...formData,
			[name]: files ? files[0] : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisabled(true);
		dispatch(load(false));
		setLoading(true);

		try {
			const isPublic = formData.visibility === "Public";
			const visibilityValue = isPublic ? 1 : 0;

			const resourceData = {
				...formData,
				is_public: visibilityValue,
				uploader: localStorage.getItem("userid"),
				goal_id: goalId,
				collab_id: collabId,
			};

			// Handle file upload to Flask API
			if (formData?.file && formData?.file_type === "file") {
				const formDataForUpload = new FormData();
				formDataForUpload.append("file", formData.file);

				const response = await axiosInstance.post(
					"/upload",
					formDataForUpload,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);

				resourceData.url = response.data.fileURL;
			} else if (
				formData.file_type === "url" &&
				!validator.isUrl(formData.url)
			) {
				toast.error("Invalid URL. Please enter a valid URL.");
				return;
			}

			await axiosInstance.post(
				`collaborations/${collabId}/resources`,
				resourceData
			);
			dispatch(fetchResource(collabId));
			toast.success("resource uploaded successfully");
			setFormData(initialdata);
		} catch (error) {
			console.error("Error adding Resource:", error);
			toast.error("Error adding Resource");
		} finally {
			setDisabled(false);
		}

		closeModal();
		dispatch(load(false));
		setLoading(false);
	};

	return (
		<div className="">
			<button
				onClick={openModal}
				className="bg-main !rounded-full text-xl text-white px-4 py-1"
			>
				<b>
					<FontAwesomeIcon icon={faUpload} />
				</b>
			</button>

			<ReusableModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Add Collab"
			>
				<h2>Add A Resource</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Resource Name"
						value={formData.name}
						onChange={handleChange}
						required
						maxLength={128}
					/>
					<textarea
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="visibility"
						placeholder="Visibility"
						value={formData.visibility}
						onChange={handleChange}
						list="visibility-options"
						required
					/>

					<select
						name="file_type"
						value={formData.file_type}
						onChange={handleChange}
						required
					>
						<option
							disabled
							selected
							value=""
						>
							upload type
						</option>
						<option value="file">File</option>
						<option value="url">Link</option>
					</select>
					<div
						style={{
							display: "flex",
							alignContent: "center",
							alignItems: "center",
							gap: "20px",
							justifyContent: "left",
							textAlign: "left",
							marginLeft: "0",
						}}
					>
						{formData.file_type === "file" && (
							<label className="custom-file-upload btn--outline">
								<input
									type="file"
									name="file"
									onChange={handleChange}
									className="addFile"
									required
									style={{
										display: "none",
									}}
								/>
								{!formData && (
									<FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon>
								)}
								{formData.file ? formData.file.name : " Upload File"}
							</label>
						)}
						{formData.file && (
							<FontAwesomeIcon
								className="btn--primary"
								icon={faTrashAlt}
								onClick={() =>
									setFormData({
										...formData,
										file: null,
									})
								}
							/>
						)}
					</div>

					{formData.file_type === "url" && (
						<input
							type="text"
							name="url"
							placeholder="File URL"
							value={formData.url}
							onChange={handleChange}
							required
						/>
					)}

					<datalist id="visibility-options">
						<option value="Public" />
						<option value="Private" />
					</datalist>

					<div className="form-buttons">
						<button
							className="btn--primary"
							type="submit"
							disabled={disabled}
						>
							{!loading ? "Add Resource" : <Loader1 />}
						</button>
						<button
							type="button"
							className="btn--outline"
							onClick={closeModal}
							disabled={disabled}
						>
							Cancel
						</button>
					</div>
				</form>
			</ReusableModal>
		</div>
	);
};
AddResourceButton.propTypes = {
	goalId: PropTypes.string.isRequired,
	collabId: PropTypes.string.isRequired,
};

export default AddResourceButton;
