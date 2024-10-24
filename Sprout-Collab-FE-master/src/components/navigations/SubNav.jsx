import {
	faArrowLeft,
	faFileSignature,
	faHandshake,
	faProjectDiagram,
	faTasks,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as React } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../../contexts/PreferenceContext";

const SubNav = ({
	title,
	addedComponent,
	collabs,
	members,
	tasks,
	projects,
	isAdmin,
}) => {
	let navigate = useNavigate();
	const { showPrefs } = usePreferences();

	function goBack() {
		navigate(-1);
	}

	return (
		<nav className="second-nav">
			<div className="menu-filter">
				<button
					onClick={goBack}
					className="bg-main !rounded-full text-xl text-white px-4 py-1"
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
			</div>
			<div className="Goalname">{title}</div>
			<div className="details">
				{collabs !== undefined && (
					<div className="detail-item">
						<FontAwesomeIcon icon={faHandshake} /> {collabs}
					</div>
				)}
				{members !== undefined && (
					<div className="detail-item">
						<FontAwesomeIcon icon={faUsers} /> {members}
					</div>
				)}
				{projects !== undefined && (
					<div className="detail-item">
						<FontAwesomeIcon icon={faProjectDiagram} /> {projects}
					</div>
				)}
				{tasks !== undefined && (
					<div className="detail-item">
						<FontAwesomeIcon icon={faTasks} /> {tasks}
					</div>
				)}
				{isAdmin && (
					<div className="admin-info">
						<FontAwesomeIcon icon={faFileSignature} /> <em>Admin</em>
					</div>
				)}
			</div>
			{addedComponent && <div>{addedComponent}</div>}
		</nav>
	);
};

export default SubNav;
