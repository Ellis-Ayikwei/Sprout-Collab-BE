import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const ChecklistCloner = ({ onChecklistsChange }) => {
	const [checklists, setChecklists] = useState([]);
	const [newChecklistName, setNewChecklistName] = useState("");
	const [newChecklistDescription, setNewChecklistDescription] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleAddChecklist = (event) => {
		event.preventDefault();
		if (!newChecklistName) {
			setErrorMessage("Please enter a checklist name");
			return;
		}

		if (checklists.some((checklist) => checklist.name === newChecklistName)) {
			setErrorMessage("Checklist already exists");
			return;
		}

		setChecklists([
			...checklists,
			{ name: newChecklistName, description: newChecklistDescription },
		]);
		setNewChecklistName("");
		setNewChecklistDescription("");
		setErrorMessage("");
	};

	// const handleDescriptionChange = (index, value) => {
	// 	const updatedChecklists = checklists.map((checklist, i) =>
	// 		i === index ? { ...checklist, description: value } : checklist
	// 	);
	// 	setChecklists(updatedChecklists);
	// };

	const handleDeleteChecklist = (nameToDelete) => {
		const updatedChecklists = checklists.filter(
			(checklist) => checklist.name !== nameToDelete
		);
		setChecklists(updatedChecklists);
	};

	useEffect(() => {
		onChecklistsChange(checklists);
	}, [checklists, onChecklistsChange]);

	return (
		<div className="clone-items-container">
			<p>Add Task Checklists</p>
			<div className="new-item">
			
					<input
						type="text"
						value={newChecklistName}
						placeholder="Check List Name"
						onChange={(e) => setNewChecklistName(e.target.value)}
					/>
					<input
						value={newChecklistDescription}
						placeholder="Check List Description"
						rows={2}
						onChange={(e) => setNewChecklistDescription(e.target.value)}
					/>
			
				<button
					className="btn--outline"
					onClick={handleAddChecklist}
				>
					Add Checklist
				</button>
			</div>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			<ul>
				{checklists.map((checklist, index) => (
					<li key={index}>
						<div className="checklist-name-and-desc">
							<p className="checklist-name">{checklist.name}</p>
							<small
								className="checklist-desc"
							>
								{checklist.description
									.split(" ")
									.slice(0, 5)
									.join(" ")
									.concat("...")}
							</small>
						</div>
						{/* <textarea
							value={checklist.description}
							onChange={(e) => handleDescriptionChange(index, e.target.value)}
						/> */}
						<button
							className="delete-btn"
							onClick={() => handleDeleteChecklist(checklist.name)}
						>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ChecklistCloner;
