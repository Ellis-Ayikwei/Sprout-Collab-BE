import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../helpers/configEndpoints";
import { fetchtasks } from "../../redux/TaskSlice";
import ReusableModal from "../ReusableModal"; // Adjust the import path as necessary
import ChecklistCloner from "./CheckListsCloner";

const initialdata = {
	name: "",
	description: "",
};
const AddTaskButton = ({ projectID, goalID }) => {
	console.log("the goal id", goalID);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFormDisabled, setIsFormDisabled] = useState(false);
	const dispatch = useDispatch();
	const [taskFormData, setTaskFormData] = useState(initialdata);
	const [checklistData, setChecklistData] = useState();

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTaskFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleChecklistDataChange = (data) => {
		setChecklistData(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsFormDisabled(true);

		try {
			const visibilityValue = taskFormData.visibility === "Public" ? 1 : 0;
			const userId = localStorage.getItem("userid");

			const taskData = {
				...taskFormData,
				is_public: visibilityValue,
				user_id: userId,
				goal_id: goalID,
				project_id: projectID,
				checklists: checklistData,
			};

			await axiosInstance.post(`projects/${projectID}/tasks`, taskData);
			dispatch(fetchtasks(projectID));
			toast.success("Task created successfully");
			setTaskFormData(initialdata);
			closeModal();
		} catch (error) {
			console.error("Error creating task:", error);
		} finally {
			setIsFormDisabled(false);
		}
	};

	return (
		<div className="">
			<button
				onClick={openModal}
				className="bg-main !rounded-full text-xl text-white px-4"
			>
				<FontAwesomeIcon icon={faPlus} />
			</button>

			<ReusableModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Add Task"
			>
				<h2>Add New Task</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Task Name"
						value={taskFormData.name}
						onChange={handleChange}
						required
						maxLength={128}
					/>
					<textarea
						name="description"
						placeholder="Description"
						value={taskFormData.description}
						onChange={handleChange}
						required
					/>
					<ChecklistCloner onChecklistsChange={handleChecklistDataChange} />
					<div className="form-buttons">
						<button
							className="btn--primary"
							type="submit"
						>
							Add Task
						</button>
						<button
							type="button"
							className="btn--outline"
							onClick={closeModal}
							disabled={isFormDisabled}
						>
							Cancel
						</button>
					</div>
				</form>
			</ReusableModal>
		</div>
	);
};

export default AddTaskButton;
