import React from "react";
import { GoalsProvider } from "./GoalsContext";
import { PreferencesProvider } from "./PreferenceContext";
import { ProjectsProvider } from "./ProjectsContext";
import { SettingsProvider } from "./SettingsContext";

const AllProviders = ({ children }) => {
	return (
		<SettingsProvider>
			<PreferencesProvider>
				<GoalsProvider>
					<ProjectsProvider>{children}</ProjectsProvider>
				</GoalsProvider>
			</PreferencesProvider>
		</SettingsProvider>
	);
};

export default AllProviders;
