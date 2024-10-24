import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/configEndpoints";
import Rocket from "../../images/rocket.png";
import { fetchMyGoals } from "../../redux/myGoalSlice";
import DotLoader from "../DotLoader";
import GenericCard from "../task/genericCard";

const MyGoals = () => {
	const userId = localStorage.getItem("userid");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [goalMemberCount, setGoalMemberCount] = useState({}); // Object for member counts
	const mygoalsList = useSelector((state) => state.mygoals.mygoalsList);
	const mygoalsStatus = useSelector((state) => state.mygoals.status);
	const mygoalsError = useSelector((state) => state.mygoals.error);

	// Fetch goals periodically
	useEffect(() => {
		if (mygoalsStatus === "idle") {
			dispatch(fetchMyGoals());
		}
		console.log("the goals", mygoalsList);
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchMyGoals());
	}, [dispatch]);

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
		if (mygoalsList.length > 0) {
			fetchGoalMemberCounts();
		}
	}, [mygoalsList]);

	return (
		<div className="list-container justify-center items-center">
			<div className="inline-block rounded-full border-[2px] justify-center w-20 border-blue-400 border-solid"></div>

			<h3>My Goals</h3>
			{mygoalsStatus === "loading" && (
				<div className="flex justify-center mx-auto items-center">
					<DotLoader />
				</div>
			)}
			<div className="generic-cards">
				{mygoalsStatus === "loading" && mygoalsList.length === 0 && (
					<p>You Dont have any goals yet</p>
				)}
				{mygoalsList.map((goal, index) => (
					<GenericCard
						key={`${index} - ${goal.goal.id}`}
						progress={goal.goal_member.progress ?? 0}
						title={goal.goal.name}
						description={goal.goal.description}
						icon={Rocket}
						collaborationCount={0}
						progressType="bar"
						memberCount={goalMemberCount[goal.goal.id] || 0} // Default to 0 if missing
						dateCreated={goal.goal.created_at.split("T")[0]}
						onClick={() => navigate(`/goal-details/${goal.goal.id}`)}
					/>
				))}
			</div>
		</div>
	);
};

export default MyGoals;
