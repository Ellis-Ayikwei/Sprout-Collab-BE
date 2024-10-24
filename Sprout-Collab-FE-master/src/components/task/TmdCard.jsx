import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import { getInitials } from "../../helpers/Main_Helpers";

const TaskMemberCard = ({ taskMember }) => {
	const { taskMembers, status } = useSelector((state) => state.taskCheckList);
	const [userD, setUserD] = useState(null);
	const { data, error, isLoading } = useSWR(
		`users/${taskMember.user_id}`,
		fetcher
	);

	useEffect(() => {
		if (data) {
			setUserD(data);
			console.log("the user d", userD);
		}
	}, [data]);

	const initials = userD ? getInitials(userD.first_name, userD.last_name) : "?";

	if (error) {
		return (
			<div className="error-message">
				Failed to load member data. Please try again later.
			</div>
		);
	}

	if (isLoading) {
		return <div className="loading-message">Loading member information...</div>;
	}

	return (
		<div className="task-member-done">
			<div className="task-member-done__initial">
				<h3>{initials}</h3>
			</div>
			<div className="task-member-done__name">
				<p>{userD?.first_name + " " + userD?.last_name}</p>
				<p className="email">{userD?.email}</p>
			</div>
			<div className="task-member-link-and-action">
				{/* <div className="action-item">
					<input
						type="checkbox"
						className="approve-checkbox"
					/>
					<label>
						<small className="action">Approve</small>
					</label>
				</div>
				<div className="action-item">
					<small className="approve-checkbox">{taskMember.no_of_approvals}/{taskMembers.length}</small>
					<small className="action"> Approvals</small>
				</div> */}
				<div className="action-item">
					<FontAwesomeIcon
						icon={faLink}
						className="approve-checkbox"
					/>
					<label>
						<small className="action">Link</small>
					</label>
				</div>
			</div>
		</div>
	);
};

export default TaskMemberCard;
