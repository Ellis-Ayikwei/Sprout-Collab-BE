import React from "react";
import GenericCard from "./path/to/GenericCard";

const GoalCard = () => {
	const handleGoalClick = (data) => {
		console.log("Goal clicked:", data);
	};

	return (
		<GenericCard
			dataType="goal"
			fetchUrl="/api/goals/456"
			progressProp={85}
			colorFunc={(progress) => (progress > 75 ? "blue" : "orange")}
			onClickHandler={handleGoalClick}
			title="Goal Title"
			description="This is a description of the goal."
			additionalInfo={["Deadline: 2024-08-01", "Priority: High"]}
			progressType="bar"
		/>
	);
};

export default GoalCard;
