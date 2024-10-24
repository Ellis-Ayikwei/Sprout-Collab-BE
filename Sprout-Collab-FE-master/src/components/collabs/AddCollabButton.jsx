import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../helpers/configEndpoints";
import { fetchCollaborations } from "../../redux/collabSlice";
import { load } from "../../redux/mainLoaderSlice";
import ReusableModal from "../ReusableModal"; // Adjust the import path as necessary

const initialdata = {
	name: "",
	description: "",
	visibility: "Public",
	type: "",
};
const AddCollabButton = ({ goalId }) => {
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

			const collaborationData = {
				...formData,
				is_public: visibilityValue,
				user_id: localStorage.getItem("userid"),
				goal_id: goalId,
			};
			closeModal();
			await axiosInstance.post(
				`goals/${goalId}/collaborations`,
				collaborationData
			);
			dispatch(fetchCollaborations(goalId));
			toast.success("Collaboration created successfully");
			setFormData(initialdata);
			dispatch(load(false));
		} catch (error) {
			console.error("Error creating collaboration:", error);
		} finally {
			setDisabled(false);
		}
	};

	return (
		<div className="">
			<button
				onClick={openModal}
				className="bg-main !rounded-full text-3xl text-white px-4 "
			>
				+
			</button>

			<ReusableModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Add Collab"
			>
				<h2>Add New Collab</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Collaboration Name"
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
					<datalist id="visibility-options">
						<option value="Public" />
						<option value="Private" />
					</datalist>

					<div className="form-buttons">
						<button
							className="btn--primary"
							type="submit"
						>
							Add Goal
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

export default AddCollabButton;
