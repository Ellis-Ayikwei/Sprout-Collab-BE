import {
	faFacebookF,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import image1 from "../../images/collab1.jpg";

const Ourteams = () => {
	return (
		<div className="pb-16 bg-gray-100 justify-center items-center">
			<div className=" mx-auto px-4 md:px-6">
				<div className="text-center max-w-2xl mx-auto">
					<h4 className="text-lg text-primary font-semibold mb-2">Our Team</h4>
					<h1 className="text-3xl font-bold mb-4">About Us</h1>
					<p className="text-lg text-gray-600 mb-8">
						We are a diverse group of developers who are passionate about
						building scalable and secure applications. Our team consists of
						experienced software developers who have worked on various projects
						ranging from e-commerce platforms to AI-powered chatbots. We are
						part of the ALX community and continue to learn and grow as
						developers.
					</p>
				</div>
				<div className="flex grid-cols-1 justify-center md:grid-cols-2 gap-6 items-center mx-auto">
					<div className="bg-body lg:col-span-1 lg:col rounded-lg shadow-lg p-6 justify-center items-center ">
						<div className="team-item justify-center items-center">
							<div className="team-img justify-center items-center">
								<img
									src={image1}
									className="rounded-full w-60 h-50 justify-center mx-auto"
									alt=""
								/>
							</div>
							<div className=" mb-5 mt-5">
								<h4 className="text-lg font-semibold">Ellis Armah Ayikwei</h4>
								<p className="text-sm text-gray-600">
									Lead Fullstack Developer
								</p>
								<em className="text-lg text-gray-600">
									Alx Software Engineer Graduate
								</em>
							</div>
							<div className="team-icon flex items-center justify-center space-x-4">
								<a
									className="bg-main hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
									href=""
								>
									<FontAwesomeIcon icon={faFacebookF} />
								</a>
								<a
									className="bg-main hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
									href=""
								>
									<FontAwesomeIcon icon={faTwitter} />
								</a>
								<a
									className="bg-main hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
									href=""
								>
									<FontAwesomeIcon icon={faLinkedin} />
								</a>
								<a
									className="bg-main hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
									href=""
								>
									<FontAwesomeIcon icon={faInstagram} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ourteams;
