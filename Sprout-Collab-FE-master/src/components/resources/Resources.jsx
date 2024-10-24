// Resources.jsx
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { setCollabid } from "../../redux/collabSlice";
import { fetchResource } from "../../redux/ResourceSlice";
import DotLoader from "../DotLoader";
import AddResourceButton from "./AddeResourceButton";
import ResourceItem from "./ResourceItem";

const Resources = ({ goal }) => {
	const parentRef = useRef(null);
	const dispatch = useDispatch();
	const collabid = useSelector((state) => state.collaborations.collabid);
	const resources = useSelector((state) => state.resources.resourceList);
	const error = useSelector((state) => state.resources.error);
	const isLoading = useSelector(
		(state) => state.resources.status === "loading"
	);

	useEffect(() => {
		if (collabid) {
			dispatch(fetchResource(collabid));
		}
	}, [dispatch, collabid]);

	useEffect(() => {
		return () => {
			dispatch(setCollabid(""));
		};
	}, []);

	return (
		<div
			className=" list-container"
			ref={parentRef}
		>
			<div
				style={{
					display: "flex",
					alignContent: "center",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "10px",
				}}
			>
				<h2>Resources</h2>
				{collabid && (
					<AddResourceButton
						goalId={goal?.id}
						collabId={collabid}
					/>
				)}
			</div>
			{resources.length > 0 && (
				<p>Here are some resources that you can use to grow your community.</p>
			)}
			<div
				style={{
					display: "flex",
					alignContent: "center",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				{isLoading === "loading" && (
					<div className="flex justify-center mx-auto items-center">
						<DotLoader />
					</div>
				)}
			</div>
			<ul className="resource-list">
				{!isLoading && !collabid && (
					<p>Please select a collaboration to view its resources.</p>
				)}
				{!isLoading && collabid != "" && resources.length === 0 && (
					<p>No resources available for the selected collaboration.</p>
				)}
				{!isLoading && error && <p>Error: {error.message}</p>}
				{collabid &&
					resources.map((resource) => (
						<ResourceItem
							key={resource.id}
							resource={resource}
							parentRef={parentRef}
						/>
					))}
			</ul>
		</div>
	);
};

const ResourcesList = React.memo(Resources);

export default ResourcesList;
