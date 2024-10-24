import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { submitLink } from "../../redux/ChecklistSlice"; // Import your action for link submission

const ChecklistBox = ({ task }) => {
	const dispatch = useDispatch();
	const checklist = useSelector((state) => state.taskCheckList.checkList);
	const checklistStatus = useSelector((state) => state.taskCheckList.status);
	const checklistError = useSelector((state) => state.taskCheckList.error);
	const taskMetadata = useSelector((state) => state.taskCheckList.taskMData);
	const taskData = useSelector((state) => state.tasks.taskData);

	const [checkedItems, setCheckedItems] = useState([]);
	const [link, setLink] = useState(""); // State for the input link

	useEffect(() => {
		if (checklistStatus === "succeeded") {
			setCheckedItems(
				checklist.map((item) => ({
					id: item.id,
					completed: item.completed,
				}))
			);
		}
	}, [checklist, checklistStatus]);

	const handleToggle = (itemId) => {
		setCheckedItems(
			checkedItems.map((item) =>
				item.id === itemId ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const handleLinkChange = (e) => {
		setLink(e.target.value); // Update the link state
	};

	const handleLinkSubmit = () => {
		if (link) {
			dispatch(submitLink({ taskId: task.id, link }));
			setLink("");
		} else {
			toast.info("Please enter a link.");
		}
	};

	return (
		<div className="checklist-box">
			<h2>{taskData?.name} - Checklists </h2>
			{checklistStatus === "loading" && <p>Loading checklist...</p>}
			{checklistStatus === "idle" && (
				<p>Please select a Task to show its check lists</p>
			)}
			{checklistStatus === "succeeded" && checklist.length === 0 && (
				<p>No Check list available for the selected task</p>
			)}
			{checklistStatus === "succeeded" && checklist.length > 0 && (
				<div>
					<ul>
						{checklist.map((item) => (
							<li key={item.id}>
								<input
									type="checkbox"
									id={item.id}
									checked={
										checkedItems.find((i) => i.id === item.id)?.completed ||
										taskMetadata?.status === "done"
									}
									onChange={() => handleToggle(item.id)}
								/>
								<label htmlFor={item.id}>{item.name}</label>
							</li>
						))}
					</ul>

					<div className="status">
						<div className="status-item">
							<input
								type="checkbox"
								id="started"
								checked={taskMetadata?.status === "started"}
								readOnly
							/>
							<label htmlFor="started">Started</label>
						</div>
						<div className="status-item">
							<input
								type="checkbox"
								id="paused"
								checked={taskMetadata?.status === "paused"}
								readOnly
							/>
							<label htmlFor="paused">Paused</label>
						</div>
						<div className="status-item">
							<input
								type="checkbox"
								id="done"
								checked={taskMetadata?.status === "done"}
								readOnly
							/>
							<label htmlFor="done">Done</label>
						</div>
					</div>
					<div className="task-metadata">
						<b className="due-date">Due date: {taskMetadata?.end_date}</b>
					</div>
					<div className="task-actions">
						{taskMetadata?.status === "done" && (
							<>
								<input
									type="text"
									id="url"
									placeholder="Link :"
									className="input-url"
									value={link}
									onChange={handleLinkChange}
								/>
								<button
									className="btn btn-primary"
									onClick={handleLinkSubmit}
								>
									Submit
								</button>
							</>
						)}
					</div>
				</div>
			)}
			{checklistStatus === "failed" && <p>Error: {checklistError}</p>}
			<ToastContainer />
		</div>
	);
};

export default ChecklistBox;
