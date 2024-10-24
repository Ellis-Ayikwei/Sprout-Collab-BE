import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/configEndpoints";
import Rocket from "../../images/rocket.png";
import { fetchMyProjects } from "../../redux/myProjectSlice";
import DotLoader from "../DotLoader";
import GenericCard from "../task/genericCard";

const MyProjects = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [projectMemberCount, setProjectMemberCount] = useState({}); // Object for member counts
	const myprojectList = useSelector((state) => state.myprojects.projects);
	const myprojectsStatus = useSelector((state) => state.myprojects.status);
	const myprojectsError = useSelector((state) => state.myprojects.error);

	// Fetch projects periodically
	useEffect(() => {
		if (myprojectsStatus === "idle") {
			dispatch(fetchMyProjects());
		}
	}, [myprojectsStatus, dispatch]);

	// Fetch member count for a specific project
	const getGoalMemberCount = async (projectId) => {
		try {
			const response = await axiosInstance.get(
				`/projects/${projectId}/project_members`
			);
			return response.data.length;
		} catch (error) {
			console.error(error); // Handle errors here (log or set default count)
			return 0;
		}
	};

	// Fetch member counts for all projects
	const fetchGoalMemberCounts = async () => {
		try {
			const counts = await Promise.all(
				myprojectList.map(async (myproject) => ({
					projectId: myproject.project.id, // Consistent naming
					count: await getGoalMemberCount(myproject.project.id),
				}))
			);
			setProjectMemberCount(
				counts.reduce((acc, { projectId, count }) => {
					acc[projectId] = count;
					return acc;
				}, {})
			);
		} catch (error) {
			console.error(error); // Handle errors here (log or display error message)
		}
	};

	// Polling for member counts
	useEffect(() => {
		if (myprojectList.length > 0) {
			fetchGoalMemberCounts();
		}
		// 1 second polling
	}, [myprojectList]); // Re-run when myprojectList changes

	return (
		<div className="list-container">
			<div className="inline-block border-[2px] justify-center w-20 rounded-full border-orange-400 border-solid"></div>

			<h3>My Projects</h3>

			{myprojectsStatus === "loading" && (
				<div className="flex justify-center mx-auto items-center">
					<DotLoader />
				</div>
			)}

			<div className="generic-cards">
				{myprojectList.length === 0 && <p>You Dont have any projects yet</p>}

				{myprojectList.map((project) => (
					<GenericCard
						key={project.project.id}
						progress={project.project_member.progress ?? 0}
						title={project.project.name}
						description={project.project.description}
						icon={Rocket}
						collaborationCount={0}
						memberCount={projectMemberCount[project.project.id] || 0} // Default to 0 if missing
						dateCreated={project.project.created_at.split("T")[0]}
						onClick={() => navigate(`/projects/${project.project.id}/tasks/`)}
					/>
				))}
			</div>
		</div>
	);
};

export default MyProjects;
