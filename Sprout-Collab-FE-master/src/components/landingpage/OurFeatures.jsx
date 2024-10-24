import React from "react";
import earth from "../../images/earth.png";
import Handshake from "../../images/handshake.png";
import Rocket from "../../images/rocket.png";
import Sprout from "../../images/sprout.png";

const OurFeatures = () => {
	return (
		<div className="feature bg-gray-100 py-16 justify-center w-full">
			<div className="py-8 justify-center">
				<div className="text-center mx-auto pb-8">
					<h4 className="text-primary text-lg ">Our Features And Benefits</h4>
                    <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>

					<h1 className="display-5 mb-4 text-3xl font-bold">
						At Sprout Collab, we believe that the path to your goals is brighter
						when shared. Our platform connects you with a vibrant community of
						goal-getters, providing the tools, resources, and support you need
						to turn aspiration into achievements.
					</h1>
					<p className="mb-0 text-lg">
						Join 10,000+ individuals who’ve turned their dreams into plans and
						their plans into realities.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-10">
					<div
						className="feature-item p-8 rounded-lg shadow-lg bg-white justify-center hover:scale-105 transition duration-300 ease-in-out"
					>
						<div className="feature-icon p-4 mb-4 mx-auto">
							<img
								src={Sprout}
								alt="Sprout"
								className="w-20 h-20 mx-auto"
							/>
						</div>
						<h4 className="text-xl font-bold">Create Projects, Grow Goals</h4>
						<p className="mb-4 text-lg">
							Create projects that are meaningful to you and track your progress
							towards your goals.
						</p>
						<a
							className="btn btn-primary bg-main  rounded-full py-2 px-4"
							href="#"
						>
							Learn More
						</a>
					</div>
					<div
						className="feature-item p-8 rounded-lg shadow-lg bg-white hover:scale-105 transition duration-300 ease-in-out"
					>
						<div className="feature-icon p-4 mb-4">
							<img
								src={Rocket}
								alt="Rocket"
								className="w-20 h-20 mx-auto"
							/>
						</div>
						<h4 className="text-xl font-bold">Collaborate with Like-Minds</h4>
						<p className="mb-4 text-lg">
							Connect with like-minded individuals who share your goals and
							interests.
						</p>
						<a
							className="btn btn-primary  bg-main rounded-full py-2 px-4"
							href="#"
						>
							Learn More
						</a>
					</div>
					<div
						className="feature-item p-8 rounded-lg shadow-lg bg-white hover:scale-105 transition duration-300 ease-in-out"
					>
						<div className="feature-icon p-4 mb-4">
							<img
								src={Handshake}
								alt="Handshake"
								className="w-20 h-20 mx-auto"
							/>
						</div>
						<h4 className="text-xl font-bold">Access Shared Resources</h4>
						<p className="mb-4 text-lg">
							Access a library of resources, including tutorials, e-books, and
							webinars, to help you achieve your goals.
						</p>
						<a
							className="btn btn-primary bg-main rounded-full py-2 px-4"
							href="#"
						>
							Learn More
						</a>
					</div>
					<div
						className="feature-item p-8 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
					>
						<div className="feature-icon p-4 mb-4">
							<img
								src={earth}
								alt="earth"
								className="w-20 h-20 mx-auto"
							/>
						</div>
						<h4 className="text-xl font-bold">
							Be part of a Global Community
						</h4>
						<p className="mb-4 text-lg">
							Join a community of goal-getters from all over the world.
						</p>
						<a
							className="btn btn-primary bg-main rounded-full py-2 px-4"
							href="#"
						>
							Learn More
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OurFeatures;

