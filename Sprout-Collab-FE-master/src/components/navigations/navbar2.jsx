"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { usePreferences } from "../../contexts/PreferenceContext";
import logo from "../../images/sclogo-alone.png";

import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import {
	ChevronDownIcon,
	PhoneIcon,
	PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const products = [
	{
		name: "Analytics",
		description: "Get a better understanding of your traffic",
		href: "#",
		icon: ChartPieIcon,
	},
	{
		name: "Engagement",
		description: "Speak directly to your customers",
		href: "#",
		icon: CursorArrowRaysIcon,
	},
	{
		name: "Security",
		description: "Your customers’ data will be safe and secure",
		href: "#",
		icon: FingerPrintIcon,
	},
	{
		name: "Integrations",
		description: "Connect with third-party tools",
		href: "#",
		icon: SquaresPlusIcon,
	},
	{
		name: "Automations",
		description: "Build strategic funnels that will convert",
		href: "#",
		icon: ArrowPathIcon,
	},
];
const callsToAction = [
	{ name: "Watch demo", href: "#", icon: PlayCircleIcon },
	{ name: "Contact sales", href: "#", icon: PhoneIcon },
];

const Example = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { showPrefs } = usePreferences();
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

	const NavItems = () => {
		return (
			<div className={`lg:flex lg:flex-1 gap-2 lg:justify-end `}>
				{!isLoggedIn && (
					<NavLink
						to="/register"
						className="btn--outline menu-item rounded-3xl text-"
					>
						Get Started
					</NavLink>
				)}
				{!isLoggedIn && (
					<NavLink
						to="/login"
						className="btn--primary rounded-3xl"
					>
						Login
					</NavLink>
				)}
				{isLoggedIn && (
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-4">
							<p>Ellis</p>
							<img
								className="h-10 w-10 rounded-full shadow border-main border-2"
								src="https://avatars.githubusercontent.com/u/57622665?v=4"
								alt="Atilwind Logo"
							/>
						</div>
						<div>
							<button
								type="button"
								className="btn--primary menu-item rounded-3xl"
							>
								<FontAwesomeIcon icon={faBell} />
							</button>
						</div>
						<NavLink
							to="/logout"
							className="btn--primary menu-item rounded-3xl"
						>
							Logout
						</NavLink>
					</div>
				)}
				{isLoggedIn && (
					<button
						onClick={showPrefs}
						className="btn--primary menu-item rounded-3xl"
					>
						<FontAwesomeIcon icon={faGear} />
					</button>
				)}
			</div>
		);
	};

	return (
		<header className="bg-transparent ">
			<nav
				aria-label="Global"
				className="mx-auto flex w-full items-center justify-between p-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<NavLink
						to="/"
						className="main-logo"
						style={{ textDecoration: "none" }}
					>
						<img
							className="logo"
							src={logo}
							alt="Logo"
						/>
						<p className="logo-text">
							<b>Sprout</b>Collab
						</p>
					</NavLink>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon
							aria-hidden="true"
							className="h-6 w-6"
						/>
					</button>
				</div>
				{/* <PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<Popover className="relative">
						<PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
							Product
							<ChevronDownIcon
								aria-hidden="true"
								className="h-5 w-5 flex-none text-gray-400"
							/>
						</PopoverButton>

						<PopoverPanel
							transition
							className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
						>
							<div className="p-4">
								{products.map((item) => (
									<div
										key={item.name}
										className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
									>
										<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
											<item.icon
												aria-hidden="true"
												className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
											/>
										</div>
										<div className="flex-auto">
											<a
												href={item.href}
												className="block font-semibold text-gray-900"
											>
												{item.name}
												<span className="absolute inset-0" />
											</a>
											<p className="mt-1 text-gray-600">{item.description}</p>
										</div>
									</div>
								))}
							</div>
							<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
								{callsToAction.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
									>
										<item.icon
											aria-hidden="true"
											className="h-5 w-5 flex-none text-gray-400"
										/>
										{item.name}
									</a>
								))}
							</div>
						</PopoverPanel>
					</Popover>

					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Features
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Marketplace
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Company
					</a>
				</PopoverGroup> */}
				<div className="">
					<NavItems />
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className="lg:hidden"
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<NavLink
							to="/"
							className="main-logo"
							style={{ textDecoration: "none" }}
						>
							<img
								className="logo"
								src={logo}
								alt="Logo"
							/>
							<p className="logo-text">
								<b>Sprout</b>Collab
							</p>
						</NavLink>
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon
								aria-hidden="true"
								className="h-6 w-6"
							/>
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<Disclosure
									as="div"
									className="-mx-3"
								>
									<DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
										Product
										<ChevronDownIcon
											aria-hidden="true"
											className="h-5 w-5 flex-none group-data-[open]:rotate-180"
										/>
									</DisclosureButton>
									<DisclosurePanel className="mt-2 space-y-2">
										{[...products, ...callsToAction].map((item) => (
											<DisclosureButton
												key={item.name}
												as="a"
												href={item.href}
												className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
											>
												{item.name}
											</DisclosureButton>
										))}
									</DisclosurePanel>
								</Disclosure>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Features
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Marketplace
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Company
								</a>
							</div>
							<div className="py-6">
								<NavItems />
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};

export default Example;
