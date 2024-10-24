import React, { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import Loader from "../Loader";
import MyTaskCard from "./myTaskCard";

const MyTaskList = () => {
	const [taskList, setTaskList] = useState([]);
	const userId = localStorage.getItem("userid");

	const { data, error, isLoading } = useSWR(
		`/tasks/mytasks/${userId}`,
		fetcher
	);

	useEffect(() => {
		if (data) {
			setTaskList(data);
			console.log("tasklsit", taskList);
		}
	}, [data]);

	return (
		<div className="project-list">
			<h3>My Tasks</h3>
			<div className="project-cards">
				{isLoading && <Loader />}
				{taskList.map((task) => (
					<MyTaskCard
						key={task.task_member.id}
						taskdata={task}
					/>
				))}
			</div>
		</div>
	);
};

export default MyTaskList;
