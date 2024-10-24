import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axiosInstance from "../helpers/configEndpoints";
import fetcher from "../helpers/fetcher";

// Sample data for GenericCard and MyGoalCard

const TestPage = () => {
	const [userTasks, setUserTasks] = useState([]);
	const [taskMemberCounts, setTaskMemberCounts] = useState({});
	const currentUserId = localStorage.getItem("userid");

	const {
		data: userTaskData,
		error,
		isLoading,
	} = useSWR(`/tasks/mytasks/${currentUserId}`, fetcher);

	const getTaskMemberCount = async (taskId) => {
		try {
			const response = await axiosInstance.get(`/tasks/${taskId}/task_members`);
			return response.data.length;
		} catch (error) {
			console.error(error);
			return 0;
		}
	};

	useEffect(() => {
		if (userTaskData) {
			setUserTasks(userTaskData);
		}
	}, [userTaskData]);

	useEffect(() => {
		const fetchTaskMemberCounts = async () => {
			const counts = await Promise.all(
				userTasks.map(async (userTask) => ({
					taskId: userTask.task.id,
					count: await getTaskMemberCount(userTask.task.id),
				}))
			);
			setTaskMemberCounts(
				counts.reduce((acc, { taskId, count }) => {
					console.log("the accumulator", acc);
					acc[taskId] = count;
					return acc;
				}, {})
			);
		};

		if (userTasks.length > 0) {
			fetchTaskMemberCounts();
		}
	}, [userTasks]);

	return (
		<div style={{ padding: "5px" }}>
			<h1 className="text-3xl font-bold underline text-red-500">
				Hello world!
			</h1>
		</div>
	);
};

export default TestPage;
