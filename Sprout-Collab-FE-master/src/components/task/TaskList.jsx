import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchtasks } from "../../redux/TaskSlice";
import Loader from "../Loader";
import TaskCard from "./Taskcard";

const Tasks = ({ projectID }) => {
	const dispatch = useDispatch();
	const taskList = useSelector((state) => state.tasks.taskList);
	const status = useSelector((state) => state.tasks.status);
	const error = useSelector((state) => state.tasks.error);

	useEffect(() => {
		
			dispatch(fetchtasks(projectID));
		
	}, []);

	useEffect(() => {
		console.log("taskList from the useEffect", taskList);
		console.log("status from the useEffect", status);
		console.log("error from the useEffect", error);
	}, [status]);

	return (
		<div className="task-list">
			<div className="task-header">
				<h2>Tasks</h2>
			</div>
			<div className="task-cards">
				{status === "loading" && <Loader />}
				{status === "failed" && (
					<div className="error-message">{error.message}</div>
				)}
				{status === "succeeded" && taskList.length === 0 && (
					<p>No tasks found.</p>
				)}
				{status === "succeeded" &&
					taskList.length > 0 &&
					taskList.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
						/>
					))}
			</div>
		</div>
	);
};

export default Tasks;
