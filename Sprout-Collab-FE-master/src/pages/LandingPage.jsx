import OurFeatures from "components/landingpage/OurFeatures";
import Ourteams from "components/landingpage/Ourteams";
import Example from "components/landingpage/taiwidn";
import React from "react";

const LandingPage = () => {
	return (
		<div className="App">
			<Example />
			{/* <Hero /> */}
			<OurFeatures />

			<Ourteams />
		</div>
	);
};

export default LandingPage;
