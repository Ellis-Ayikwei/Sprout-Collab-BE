import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Card from "../card";
import fetcher from "../../helpers/fetcher";
import Loader from "../Loader";

const GoalCatergories = () => {
	const [goalTypes, setGoalTypes] = useState([]);

	const { data, isLoading} = useSWR(`/goal_types`, fetcher);
	useEffect(() => {
		if (data) {
			setGoalTypes(data);
		}
	}, [data]);

	return (
		<div className="goal-types">
			{isLoading && <Loader />}
			{goalTypes.length === 0 && <p>You Dont have any Goal Types yet</p>}

			{goalTypes.map((goal_T) => (
				
					<Card
						key={goal_T.id}
						title={goal_T.name}
						description={goal_T.description}
						imageUrl={goal_T.image_url}
						link={`/goals/${goal_T.id}`}
					/>
			
			))}
		</div>
	);
};

export default GoalCatergories;
