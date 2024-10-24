import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import taskImg from "../../images/task.png";
import { fetchtaskCheckList } from "../../redux/ChecklistSlice";
import { fetchtasks, setTaskData } from "../../redux/TaskSlice";
import Loader from "../Loader";
import AddTaskButton from "./addTaskbutton";
import GenericCard from "./genericCard";

const Tasks1 = ({ projectID }) => {
	const dispatch = useDispatch();
	const taskList = useSelector((state) => state.tasks.taskList);
	const status = useSelector((state) => state.tasks.status);
	const error = useSelector((state) => state.tasks.error);
	const { data: project } = useSWR(`/projects/${projectID}`, fetcher);
	const handleTaskClick = (task) => {
		dispatch(fetchtaskCheckList(task.id));
		dispatch(setTaskData(task));
	};

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
				<div
					style={{
						display: "flex",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "10px",
					}}
				>
					<h2>Tasks</h2>
					<AddTaskButton
						projectID={projectID}
						goalID={project?.goal_id}
					/>
				</div>
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
						// <TaskCard
						// 	key={task.id}
						// 	task={task}
						// />

						<GenericCard
							icon={taskImg}
							title={task.name}
							description={task.description}
							status={task.status}
							dateCreated={task?.created_at.split("T")[0]}
							duration={6}
							onClick={() => handleTaskClick(task)}
						/>
					))}
			</div>
		</div>
	);
};

export default Tasks1;
