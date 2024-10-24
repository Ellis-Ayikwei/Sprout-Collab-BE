import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { CollabsProvider } from "../../contexts/CollabContext";
import fetcher from "../../helpers/fetcher";
import { setCollabid } from "../../redux/collabSlice";
import CollabList from "../collabs/collabs";
import SubNav from "../navigations/SubNav";
import ProjectList from "../projects/ProjectList";
import Resources from "../resources/Resources";

const filterProjects = (projectsData, goalId) => {
	return projectsData.filter((project) => project.goal_id === goalId);
};

const filterTasks = (tasksData, goalId) => {
	return tasksData.filter((task) => task.goal_id === goalId);
};

const GoalDetails = () => {
	const { goalId } = useParams();
	const [goal, setGoal] = useState({
		goalData: null,
		goalMembers: null,
		collaborations: null,
		projects: null,
		tasks: null,
	});

	const dispatch = useDispatch();
	const { data: goalData, error } = useSWR(`/goals/${goalId}`, fetcher);
	const { data: goalMembers } = useSWR(
		`/goals/${goalId}/goal_members`,
		fetcher
	);
	const { data: collaborations } = useSWR(
		`/goals/${goalId}/collaborations`,
		fetcher
	);
	const { data: projectsData } = useSWR(`/projects`, fetcher);
	const { data: tasksData } = useSWR(`/tasks`, fetcher);

	useEffect(() => {
		if (
			goalData &&
			collaborations &&
			goalMembers &&
			projectsData &&
			tasksData !== undefined
		) {
			const projects = filterProjects(projectsData, goalId);
			const tasks = filterTasks(tasksData, goalId);
			setGoal({ goalData, goalMembers, collaborations, projects, tasks });
		}

		console.log(
			"the goal ddata",
			goalData,
			"the colsss",
			collaborations,
			" the projs",
			projectsData,
			"the task",
			tasksData,
			"the goal members",
			goalMembers
		);
	}, [goalData, collaborations, goalMembers, projectsData, tasksData]);

	useEffect(() => {
		return () => {
			dispatch(setCollabid(""));
		};
	}, []);

	const memoizedGoalName = useMemo(
		() => goal.goalData?.name || "Loading...",
		[goal.goalData]
	);
	const memoizedMemberCount = useMemo(
		() => goal.goalMembers?.length || 0,
		[goal.goalMembers]
	);
	const memoizedCollaborationCount = useMemo(
		() => goal.collaborations?.length || 0,
		[goal.collaborations]
	);
	const memoizedProjectCount = useMemo(
		() => goal.projects?.length || 0,
		[goal.projects]
	);
	const memoizedTaskCount = useMemo(
		() => goal.tasks?.length || 0,
		[goal.tasks]
	);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="goal-details-container">
			<SubNav
				title={memoizedGoalName}
				members={memoizedMemberCount}
				collabs={memoizedCollaborationCount}
				projects={memoizedProjectCount}
				tasks={memoizedTaskCount}
			/>
			<header
				className="goal-description"
				style={{
					padding: "15px",
					alignItems: "centre",
					height: "auto",
					fontsize: "20px",
					fontWeight: "bold",
				}}
			>
				{goalData?.description}
			</header>
			<div className="goal-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<CollabsProvider>
					<CollabList goal={goalData} />
					<ProjectList goal={goalData} />
					<Resources goal={goalData} />
				</CollabsProvider>
			</div>
		</div>
	);
};

export default GoalDetails;
