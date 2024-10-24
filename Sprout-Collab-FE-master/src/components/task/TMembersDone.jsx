import React from "react";
import { useSelector } from "react-redux";
import TaskMemberCard from "./TmdCard";

const TaskMembersDone = () => {
	const { taskMembers, status } = useSelector((state) => state.taskCheckList);

	const completedTaskMembers = taskMembers.filter(
		(member) =>
			member.is_done || member.user_id !== localStorage.getItem("userid")
	);


	return (
	<div>
		{ completedTaskMembers && <div className="task-member-done-container">
			{completedTaskMembers === 0 && (
				<p>No task member done with this task yet</p>
			)}
			{completedTaskMembers.map((member) => (
				<TaskMemberCard
					key={member.id}
					taskMember={member}
				/>
			))}
			</div>
			}
	</div>
);
};

export default TaskMembersDone;
