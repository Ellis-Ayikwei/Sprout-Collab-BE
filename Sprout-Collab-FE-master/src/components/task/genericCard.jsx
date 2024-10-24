import {
	faClockFour,
	faHandshake,
	faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "@ramonak/react-progress-bar";
import joinCollab from "components/collabs/joinCollab";
import PropTypes from "prop-types";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { GetColor1BasedOnProgress } from "../../utils/getColorBasedOnProgress";
import { useSelector } from "react-redux";

const GenericCard = ({
	onClick,
	title,
	description,
	duration,
	progress,
	progressType = "circular",
	memberCount,
	collaborationCount,
	visibility,
	dateCreated,
	status,
	icon,
	join,
	isMember,
	data,
}) => {
	const color = GetColor1BasedOnProgress(progress);
	const userid = localStorage.getItem("userid");
	const myData = useSelector((state) => state.login.myData);
	console.log("the data", data?.id);
	return (
		<div
			className="generic-card"
			onClick={() => onClick()}
		>
			<div className="generic--details1">
				{icon && (
					<img
						src={icon}
						alt="Handshake"
						className="growth--icon"
					/>
				)}
				<div className="generic-info">
					<div className="generic-info1">
						<h5
							className={`generic-info__name text-sm sm:text-base md:text-lg lg:text-xl xl:text-lg`}
						>
							{title}
						</h5>
						{description && (
							<p
								className={`text-xs sm:text-sm  lg:text-sm xl:text-sm text-gray-400`}
							>
								{description}
							</p>
						)}
					</div>
					{progress != null && progressType === "bar" && (
						<div className="generic--details2 generic-progress-bar w-full mb-1 mt-1">
							<ProgressBar
								completed={progress}
								maxCompleted={100}
								height="10px"
								baseBgColor={color.tintColor}
								bgColor={color.mainColor}
								labelSize="10px"
								className="w-full"
							/>
						</div>
					)}
					<ul className="generic-info2 w-full">
						{dateCreated && (
							<li
								className={`generic-info__created_at text-xs sm:text-sm  lg:text-sm xl:text-sm`}
							>
								{/* {dataType?.created_at.split("T")[0] || '0'} */}
								{dateCreated}
							</li>
						)}
						{visibility && (
							<li
								className={`generic-info__visibility text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}
							>
								{visibility}
							</li>
						)}
						{memberCount && (
							<li>
								<span
									className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-sm`}
								>
									<FontAwesomeIcon icon={faUserGroup} />
									{"  "} {memberCount}
								</span>
							</li>
						)}
						{collaborationCount > 0 && (
							<li>
								<FontAwesomeIcon icon={faHandshake} /> {"  "}
								<span
									className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}
								>
									{collaborationCount}
								</span>
							</li>
						)}
						{duration && (
							<li>
								<FontAwesomeIcon icon={faClockFour} /> {"  "}
								<span
									className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}
								>
									{duration} days
								</span>
							</li>
						)}
						{status && (
							<li
								className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}
							>
								{status}
							</li>
						)}
						{join && !isMember && (
							<button
								onClick={() => joinCollab(myData, data?.id)}
								className="right-0 bg-main !rounded-full text-sm text-white px-4 ml-auto "
							>
								Join
							</button>
						)}
						{/* <li className='generic-info__member-count'>{members.genericMembers.length} Members</li> */}
					</ul>
				</div>
				{progress != null && progressType === "circular" && (
					<div className="generic-progress-circular">
						<CircularProgressbar
							value={progress}
							maxValue={100}
							text={`${progress}%`}
							styles={buildStyles({
								strokeLinecap: "round",
								textSize: "30px",
								pathTransitionDuration: 0.5,
								pathColor: `${color.mainColor}`,
								textColor: `${color.mainColor}`,
								trailColor: `${color.tintColor}`,
							})}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

// Define expected prop types for validation
GenericCard.propTypes = {
	dataProp: PropTypes.object,
	progressProp: PropTypes.number,
	colorFunc: PropTypes.func,
	onClickHandler: PropTypes.func,
	showMiniCircle: PropTypes.bool,
	showValue: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	additionalInfo: PropTypes.arrayOf(PropTypes.string),
	progressType: PropTypes.oneOf(["circular", "bar"]), // Type of progress indicator
};

export default GenericCard;
