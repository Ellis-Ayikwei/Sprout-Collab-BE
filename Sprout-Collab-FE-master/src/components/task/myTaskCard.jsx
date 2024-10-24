import { Flat } from "@alptugidin/react-circular-progress-bar";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import { fetchtaskCheckList, setTaskMData } from "../../redux/ChecklistSlice";
import { setTaskData } from "../../redux/TaskSlice";
import GetColorBasedOnProgress from "../../utils/getColorBasedOnProgress";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const MyTaskCard = ({ taskdata }) => {
	const { task, task_member } = taskdata;
	const dispatch = useDispatch();

	const userId = localStorage.getItem("userid");

	const { data, error, isLoading } = useSWR(
		`tasks/${task.id}/task_members`,
		fetcher
	);

	console.log("tssssdfgh", task_member)


	const {
		data: taskMembersData,
		error: taskMembersError,
		isLoading: taskMembersLoading,
	} = useSWR(`tasks/${task.id}/task_members`, fetcher);

	const color = GetColorBasedOnProgress(task_member?.progress);

	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(fetchtaskCheckList(task.id));
		dispatch(setTaskMData(task_member));
		dispatch(setTaskData(task));
		navigate(`/projects/${task.project_id}/tasks/`);
	};
	return (
		<div
			className="project-card"
			onClick={handleClick}
		>
			<div className="project--details1">
				<div className="project-info">
					<div className="project-info1">
						<h5 className="project-info__name">{task.name}</h5>
						<p className="project-info__description">{task.description}</p>
					</div>
					<ul className="project-info2">
						<li className="project-info__created_at">
							{task.created_at.split("T")[0]}
						</li>
						<li className="project-info__visibility">{task.status}</li>
						<li className="project-info__member-count">
							{data?.length} Members
						</li>
					</ul>
				</div>

				<div className="project-progress">
					<CircularProgressbar
						value={task_member?.progress}
						text={`${task_member?.progress}%`}
						styles={buildStyles({
							strokeLinecap: "round",

							textSize: "30px",

							pathTransitionDuration: 0.5,

							pathColor: `${color}`,
							textColor: "green",
							trailColor: "#EBFBD3",
						})}
					/>
					
				</div>
				{/* <div className="project-progress">
					<Flat
						progress={task_member?.progress}
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
				</div> */}
			</div>
			<ToastContainer />
		</div>
	);
};
export default MyTaskCard;
