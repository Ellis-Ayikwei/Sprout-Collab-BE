import { Flat } from "@alptugidin/react-circular-progress-bar";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import { fetchtaskCheckList, setTaskMData } from "../../redux/ChecklistSlice";
import { setTaskData } from "../../redux/TaskSlice";
import GetColorBasedOnProgress from "../../utils/getColorBasedOnProgress";

const TaskCard = ({ task }) => {
	const dispatch = useDispatch();
	const [taskMembers, setTaskMembers] = useState([]);
	const [memberData, setMemberData] = useState({});
	const [randomNumber, setRandomNumber] = useState(null);
	const userId = localStorage.getItem("userid");

	const {
		data: taskMembersData,
		error: taskMembersError,
		isLoading: taskMembersLoading,
	} = useSWR(`tasks/${task.id}/task_members`, fetcher);

	// Generate a random number between 1 and 100 for the progress
	const getRandomNumber = () => {
		setRandomNumber(Math.floor(Math.random() * 100) + 1);
	};

	useEffect(() => {
		getRandomNumber();

		if (taskMembersData) {
			const taskMemberData = taskMembersData.find(
				(taskMember) => taskMember.user_id === userId
			);
			setMemberData(taskMemberData);
		}
	}, [taskMembersData, userId]);

	const progress = randomNumber;
	const color = GetColorBasedOnProgress(memberData?.progress);

	// Handle task card click event
	const handleTaskClick = () => {
		dispatch(fetchtaskCheckList(task.id));
		dispatch(setTaskMData(memberData));
		dispatch(setTaskData(task));
	};

	return (
		<div
			className="task-card"
			onClick={handleTaskClick}
		>
			<div className="task--details1">
				<div className="task-info">
					<div className="task-info1">
						<h5 className="task-info__name">{task.name}</h5>
						<p className="task-info__description">{task.description}</p>
					</div>
					<ul className="task-info2">
						<li className="task-info__created_at">
							{task.created_at.split("T")[0]}
						</li>
						<li className="task-info__visibility">
							{task.is_public ? "Public" : "Private"}
						</li>
						<li className="task-info__member-count">
							{taskMembers.length} Members
						</li>
					</ul>
				</div>
				<div className="task-progress">
					<Flat
						progress={memberData?.progress}
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
		</div>
	);
};

export default TaskCard;
