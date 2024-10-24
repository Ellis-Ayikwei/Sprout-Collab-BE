import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import axiosInstance from "../../helpers/configEndpoints";
import { addGoal } from "../../redux/goalsSlice";
import Loader from "../Loader"; // Import your loader component
import ReusableModal from "../ReusableModal";

const AddGoalButton = ({ TypeData }) => {
	const forminitState = {
		name: "",
		description: "",
		duration: "",
		visibility: "Public",
		type: "",
	};

	const [isModalOpen, setModalOpen] = useState(false);
	const [formData, setFormData] = useState(forminitState);
	const [types, setTypes] = useState([]);
	const [typeMap, setTypeMap] = useState({});
	const [loading, setLoading] = useState(false); // Loading state

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const response = await axiosInstance.get("goal_types");
				setTypes(response.data);
				const map = {};
				response.data.forEach((type) => {
					map[type.name] = type.id;
				});
				setTypeMap(map);
			} catch (error) {
				console.error("Error fetching goal types:", error);
			}
		};

		fetchTypes();
	}, []);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "type") {
			setFormData({
				...formData,
				[name]: value,
				typeId: typeMap[value] || "",
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading
		try {
			const isPublic = formData.visibility === "Public" ? 1 : 0;

			const dataToSend = {
				...formData,
				type: TypeData ? `${TypeData.id}` : formData.typeId,
				is_public: isPublic,
			};

			delete dataToSend.typeId;

			await dispatch(addGoal(dataToSend));
			setFormData(forminitState);
			toast.success("Goal added successfully!");
			closeModal();
		} catch (error) {
			console.error("Error adding goal:", error);
			toast.error("Failed to add goal"); // Show error toast
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<div className="">
			<button
				onClick={openModal}
				className="bg-main !rounded-full text-xl text-white px-4 py-1"
			>
				<b>+</b> New Goal
			</button>
			<ReusableModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Add Goal"
			>
				{loading ? (
					<Loader /> // Show loader when loading
				) : (
					<>
						<h2>Add New Goal</h2>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								name="name"
								placeholder="Goal Name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
							<textarea
								name="description"
								placeholder="Description"
								value={formData.description}
								onChange={handleChange}
								required
							/>
							<input
								type="number"
								name="duration"
								placeholder="Duration In Days"
								value={formData.duration}
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
							<input
								type="text"
								name="type"
								placeholder="Type"
								list="type-options"
								onChange={handleChange}
								value={TypeData ? TypeData.name : formData.type}
								readOnly={TypeData ? true : false}
								required
							/>
							<datalist id="type-options">
								{types.map(({ name }) => (
									<option
										key={name}
										value={name}
									/>
								))}
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
								>
									Cancel
								</button>
							</div>
						</form>
					</>
				)}
			</ReusableModal>
			<ToastContainer />
		</div>
	);
};

export default AddGoalButton;
