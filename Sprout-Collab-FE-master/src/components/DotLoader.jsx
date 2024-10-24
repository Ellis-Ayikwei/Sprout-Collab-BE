import React from "react";

const DotLoader = ({ width , height}) => {
	return (
		<div className={`dot-spinner ${width} ${height}`}>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
			<div className="dot-spinner__dot"></div>
		</div>
	);
};

export default DotLoader;
