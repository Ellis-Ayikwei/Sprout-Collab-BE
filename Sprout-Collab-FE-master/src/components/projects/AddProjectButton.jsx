import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../helpers/configEndpoints";
import { load } from "../../redux/mainLoaderSlice";
import { fetchProjects } from "../../redux/ProjectsSlice";
import ReusableModal from "../ReusableModal"; // Adjust the import path as necessary

const initialdata = {
	name: "",
	description: "",
	visibility: "Public",
	start_date: "",
	end_date: "",
	type: "",
};
const AddProjectButton = ({ goalId, collabId }) => {
	console.log("the gdd1 from projects", goalId, collabId);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialdata);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		dispatch(load(true));
		e.preventDefault();

		setDisabled(true);

		try {
			const isPublic = formData.visibility === "Public";
			const visibilityValue = isPublic ? 1 : 0;

			const projectData = {
				...formData,
				is_public: visibilityValue,
				user_id: localStorage.getItem("userid"),
				goal_id: goalId,
				collab_id: collabId,
			};
			
			await axiosInstance.post(
				`collaborations/${collabId}/projects`,
				projectData
			);
			dispatch(fetchProjects(collabId));
			toast.success("Collaboration created successfully");
			setFormData(initialdata);
            closeModal();
			dispatch(load(false));
            
		} catch (error) {
			console.error("Error creating project:", error);
		} finally {
			setDisabled(false);
		}
	};

	return (
		<div className="">
			<button
				onClick={openModal}
				className="bg-main !rounded-full text-3xl text-white px-4"
			>
				+
			</button>

			<ReusableModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Add Collab"
			>
				<h2>Add New Project</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Project Name"
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
					<input
						type="Date"
						name="start_date"
						placeholder="Start Date"
						value={formData.start_date}
						onChange={handleChange}
						required
					/>
					<input
						type="Date"
						name="end_date"
						placeholder="End Date"
						value={formData.end_date}
						onChange={handleChange}
						required
					/>
					<datalist id="visibility-options">
						<option value="Public" />
						<option value="Private" />
					</datalist>

					<div className="form-buttons">
						<button
							className="btn--primary"
							type="submit"
						>
							Add Project
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

export default AddProjectButton;
