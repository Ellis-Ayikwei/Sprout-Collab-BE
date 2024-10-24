import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Rocket from "../../images/rocket.png";
import { fetchGoals } from "../../redux/goalsSlice";
import { fetchGoalTypes } from "../../redux/goalTypeSlice";
import Loader from "../Loader";
import SubNav from "../navigations/SubNav";
import GenericCard from "../task/genericCard";
import AddGoalButton from "./addGoalbutton";

import axiosInstance from "../../helpers/configEndpoints";

const useFetchAllCollaborations = (goalIds) => {
	const [collaborations, setCollaborations] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCollaborationData = async () => {
			try {
				const promises = goalIds.map((goalId) =>
					axiosInstance.get(`goals/${goalId}/collaborations`)
				);
				const results = await Promise.all(promises);
				const collabData = results.reduce((acc, res, index) => {
					acc[goalIds[index]] = res.data;
					return acc;
				}, {});
				setCollaborations(collabData);
			} catch (err) {
				setError(err);
			}
		};

		if (goalIds.length > 0) {
			fetchCollaborationData();
		}
	}, [goalIds]);

	return { collaborations, error };
};

const Goals = () => {
	const navigate = useNavigate();
	const { typeId } = useParams();
	const dispatch = useDispatch();

	const goalsList = useSelector((state) => state.goals.goalsList);
	const goalsStatus = useSelector((state) => state.goals.status);
	const goalsError = useSelector((state) => state.goals.error);

	const typesList = useSelector((state) => state.goalTypes.typesList);
	const typesStatus = useSelector((state) => state.goalTypes.status);

	useEffect(() => {
		if (goalsStatus === "idle") {
			dispatch(fetchGoals());
		}
		if (typesStatus === "idle") {
			dispatch(fetchGoalTypes());
		}
	}, [dispatch, goalsStatus, typesStatus]);

	const filteredGoals = goalsList.filter((goal) => goal.type === typeId);
	const type = typesList.find((t) => t.id === typeId);

	const goalIds = filteredGoals.map((goal) => goal.id);
	const { collaborations, error } = useFetchAllCollaborations(goalIds);

	return (
		<div className="goals-page">
			<SubNav
				title={`goals in the ${type?.name} catergory`}
				addedComponent={<AddGoalButton TypeData={type} />}
			/>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
					gap: "0.6rem",
					justifyContent: "flex-start",
					alignContent: "flex-start",
					height: "60vh",
				}}
				className="goal-cards"
			>
				{goalsStatus === "loading" && <Loader />}
				{filteredGoals.map((goal) => {
					const collaborationCount = collaborations[goal.id]?.length || 0;
					return (
						<GenericCard
							key={goal.id}
							title={goal.name}
							description={goal.description}
							icon={Rocket}
							duration={goal.duration}
							collaborationCount={collaborationCount}
							dateCreated={goal.created_at.split("T")[0]}
							onClick={() => navigate(`/goal-details/${goal.id}`)}
							
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Goals;
