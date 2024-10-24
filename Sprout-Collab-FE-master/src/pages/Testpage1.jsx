import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import GenericCard from "../components/task/genericCard";
import axiosInstance from "../helpers/configEndpoints";
import Rocket from "../images/rocket.png";
import { fetchMyGoals } from "../redux/myGoalSlice";

const TestPage1 = () => {
	const dispatch = useDispatch();
	const [goalMemberCount, setGoalMemberCount] = useState({}); // Object for member counts
	const mygoalsList = useSelector((state) => state.mygoals.mygoalsList);
	const mygoalsStatus = useSelector((state) => state.mygoals.status);
	const mygoalsError = useSelector((state) => state.mygoals.error);

	// Fetch goals periodically
	useEffect(() => {
        if(mygoalsStatus === 'idle'){
            dispatch(fetchMyGoals());
        }
	}, [mygoalsStatus, dispatch]);

	// Fetch member count for a specific goal
	const getGoalMemberCount = async (goalId) => {
		try {
			const response = await axiosInstance.get(`/goals/${goalId}/goal_members`);
			return response.data.length;
		} catch (error) {
			console.error(error); // Handle errors here (log or set default count)
			return 0;
		}
	};

	// Fetch member counts for all goals
	const fetchGoalMemberCounts = async () => {
		try {
			const counts = await Promise.all(
				mygoalsList.map(async (mygoal) => ({
					goalId: mygoal.goal.id, // Consistent naming
					count: await getGoalMemberCount(mygoal.goal.id),
				}))
			);
			setGoalMemberCount(
				counts.reduce((acc, { goalId, count }) => {
					acc[goalId] = count;
					return acc;
				}, {})
			);
		} catch (error) {
			console.error(error); // Handle errors here (log or display error message)
		}
	};

	// Polling for member counts
	useEffect(() => {
		const intervalId = setInterval(async () => {
			if (mygoalsList.length > 0) {
				await fetchGoalMemberCounts();
			}
		}, 1000); // 1 second polling

		return () => clearInterval(intervalId);
	}, [mygoalsList]); // Re-run when mygoalsList changes

	return (
		<div style={{ padding: "20px" }}>
			<h1>Test Page</h1>
			{mygoalsStatus === "loading" && <Loader />}
			{mygoalsList.map((goal) => (
				<GenericCard
					key={goal.goal.id}
					progress={goal.goal_member.progress ?? 0}
					title={goal.goal.name}
					description={goal.goal.description}
					icon={Rocket}
					collaborationCount={0}
					memberCount={goalMemberCount[goal.goal.id] || 0} // Default to 0 if missing
					dateCreated={goal.goal.created_at.split("T")[0]}
					onClickHandler={() => console.log("Task Card Clicked:", goal)}
				/>
			))}
		</div>
	);
};

export default TestPage1;
