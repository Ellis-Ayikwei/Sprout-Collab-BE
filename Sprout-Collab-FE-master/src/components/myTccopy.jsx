import { Flat } from "@alptugidin/react-circular-progress-bar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { fetchtaskCheckList, setTaskMData } from "../redux/ChecklistSlice";
import { setTaskData } from "../redux/TaskSlice";
import GetColorBasedOnProgress from "../utils/getColorBasedOnProgress";
import { ToastContainer } from "react-toastify";

const MyTaskCard = ({ taskData }) => {
	const { task, taskMember } = taskData[0];
  console.log("task catda", taskMember)
	const dispatch = useDispatch();
	const [memberData, setMemberData] = useState({});

  const userId = localStorage.getItem("userid");

	const { data, error, isLoading } = useSWR(
		`tasks/${task.id}/task_members`,
		fetcher
	);

	const {
		data: taskMembersData,
		error: taskMembersError,
		isLoading: taskMembersLoading,
	} = useSWR(`tasks/${task.id}/task_members`, fetcher);

	const color = GetColorBasedOnProgress(taskMember.progress || 0);

	const navigate = useNavigate();

	useEffect(() => {
		if (taskMembersData) {
			const taskMemberData = taskMembersData.find(
				(taskMember) => taskMember.user_id === userId
			);
			setMemberData(taskMemberData);
		}
	}, []);

	const handleClick = () => {
    dispatch(fetchtaskCheckList(task.id));
		dispatch(setTaskMData(memberData));
		dispatch(setTaskData(task));
		navigate(`projects/${task.project_id}tasks/`);
	};

	return (
		<div
			className="task-card"
			onClick={handleClick}
		>
			<div className="task-details">
				<div className="task-info">
					<div className="task-info-name">
						<h5>{task.name}</h5>
						<p>{task.description}</p>
					</div>
					<ul className="task-info-details">
						<li>{task.created_at.split("T")[0]}</li>
						<li>{task.status}</li>
						<li>
							{data?.length} Member{data?.length !== 1 ? "s" : ""}
						</li>
					</ul>
				</div>
				<div className="task-progress">
					<Flat
						progress={taskMember.progress}
						range={{ from: 0, to: 100 }}
						showMiniCircle={true}
						showValue={true}
						key={task.id}
						sx={{
							bgColor: { value: "#000000", transparency: "20" },
							textColor: "red",
							strokeColor: color,
							textWeight: "bold",
							bgStrokeColor: "#477405",
							barWidth: 10,
							miniCircleColor: "#ff0000",
							miniCircleSize: 5,
						}}
					/>
				</div>
			</div>
      <ToastContainer />
		</div>
	);
};
export default MyTaskCard;
