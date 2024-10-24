"use client";

import {
	faFacebookF,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import image4 from "../../images/collab4.jpg";
import image5 from "../../images/collab5.jpg";
import logo1 from "../../images/sclogo-alone.png";

const navigation = [
	{ name: "Product", href: "#" },
	{ name: "Features", href: "#" },
	{ name: "Marketplace", href: "#" },
	{ name: "Company", href: "#" },
];

export default function Example() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="bg-body">
			<div className="relative isolate px-6 pt-14 lg:px-8 flex">
				<div
					aria-hidden="true"
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					/>
				</div>
				<div className="mx-auto max-w-2xl py-10 sm:py-48 lg:py-5">
					<div className="text-center">
						<img
							src={logo1}
							alt="Hero-logo"
							className="hero-logo w-24 h-24 mx-auto"
						/>
						<h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Your Goals,
							<br /> Our Community, <br />
							Endless Possibilities.
						</h1>
						<p className="mt-6 text-xl font-medium leading-8 text-gray-600">
							Experience the power of shared goals towards your dreams with like
							minded individuals
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6 ">
							<NavLink
								to="/register"
								className="btn--outline rounded-full animate-bounce"
							>
								Plant Your Goals Today
							</NavLink>
							<a
								href="#"
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Learn more <span aria-hidden="true">→</span>
							</a>
						</div>
						<div className="mt-10 flex items-center justify-center gap-x-6 w-full opacity-90">
							<div className="flex  flex-wrap flex-shrink-0 lg:flex-nowrap items-center justify-center grid-cols-2 md:grid-cols-3 gap-4 w-full ">
								<img
									src={image4}
									alt="Hero3"
									className="w-auto w-full h-auto max-w-[500px] rounded-lg border-4 border-main"
								/>{" "}
								<img
									src={image5}
									alt="Hero4"
									className="w-auto w-full  h-auto max-w-[500px] rounded-lg border-4 border-main"
								/>
							</div>
						</div>
						<div className="mt-10 flex items-center justify-center gap-x-6">
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
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					/>
				</div>
			</div>
		</div>
	);
}
