import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import AddCollabButton from "../components/collabs/AddCollabButton";
import SubNav from "../components/navigations/SubNav";
import Resources from "../components/resources/Resources";
import TaskMembersDone from "../components/task/TMembersDone";
import ChecklistBox from "../components/task/TaskCheckList";
import Tasks1 from "../components/task/TaskList copy";
import fetcher from "../helpers/fetcher";
import { setCollabid } from "../redux/collabSlice";

const ProjectPage = () => {
	const dispatch = useDispatch();
	const { projectId } = useParams();
	const [projectdata, setProjectdata] = useState(null);
	const { data, error, isLoading } = useSWR(`projects/${projectId}`, fetcher);
	useEffect(() => {
		if (data) {
			console.log("the data from the use state", data);
			setProjectdata(data);
		}

		return () => {
			dispatch(setCollabid(""));
		};
	}, []);
	
	return (
		<div>
			<SubNav
				title={projectdata?.name}
				addedComponent={<AddCollabButton />}
			/>
			{/* <TaskList projectID={projectId} /> */}
			<Tasks1 projectID={projectId} />
			<div className="checklist-and-memebersdone">
				<ChecklistBox />
				<p
					style={{
						textAlign: "center",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				>
					Members Done with this task <FontAwesomeIcon icon={faArrowDown} />:
				</p>
				<TaskMembersDone />
			</div>
			<Resources />
		</div>
	);
};

export default ProjectPage;
