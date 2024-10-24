import React from "react";
import benefit from "../../images/collab1.jpg";
import GrowthBenefits from "./growth_benefits";

const BenefitSection = () => {
	return (
		<section className="benefits">
			<hr />
			<div className="benefits__content">
				<article>
					At Sprout Collab, we believe that the path to your goals is brighter
					when shared.
					<br />
					Our platform connects you with a vibrant community of goal-getters,
					<br />
					providing the tools, resources, and support you need to turn
					aspiration into achievements.
				</article>

				<p>
					Join 10,000+ individuals who’ve turned their dreams into plans and
					their plans into realities.
				</p>
			</div>
			<div className="benefits_info">
				<img
					src={benefit}
					alt="Sprout Collab Community"
					className="benefits__image"
				/>
				<GrowthBenefits />
			</div>
		</section>
	);
};

export default BenefitSection;
