import React, { useCallback, useRef } from "react";
import {
	SettingsContent,
	SettingsMenu,
	SettingsPane,
} from "react-settings-pane";
import { usePreferences } from "../contexts/PreferenceContext";
import { useSettings } from "../contexts/SettingsContext";
import AboutSettings from "./settingsPage/AboutSettings";
import AppearanceSettings from "./settingsPage/AppearanceSettings";
import General from "./settingsPage/general";
import LanguageSettings from "./settingsPage/LanguageSettings";
import NotificationSettings from "./settingsPage/NotificationSettings";
import PluginsSettings from "./settingsPage/PluginsSettings";
import PrivacySettings from "./settingsPage/PrivacySettings";
import ProfileSettings from "./settingsPage/ProfileSettings";

const SeTT = () => {
	const { settings, setSettings } = useSettings();

	const overlayRef = useRef(null);
	const prefsRef = useRef(null);

	const { isPreferencesVisible, hidePrefs } = usePreferences();

	const leavePaneHandler = useCallback(
		(wasSaved, newSettings, oldSettings) => {
			if (wasSaved && newSettings !== oldSettings) {
				setSettings(newSettings);
			}
			hidePrefs();
		},
		[hidePrefs, setSettings]
	);

	const menu = [
		{ title: "General", url: "/settings/general" },
		{ title: "Profile", url: "/settings/profile" },
		{ title: "Notifications", url: "/settings/notifications" },
		{ title: "Language", url: "/settings/language" },
		{ title: "Appearance", url: "/settings/appearance" },
		{ title: "Plugins", url: "/settings/plugins" },
		{ title: "About", url: "/settings/about" },
		{ title: "Privacy", url: "/settings/privacy" },
	];

	return (
		<div>
			<div
				ref={overlayRef}
				className={`overlay ${isPreferencesVisible ? "visible" : ""}`}
			/>
			<div
				ref={prefsRef}
				className={`md-modal ${isPreferencesVisible ? "show" : ""}`}
			>
				<SettingsPane
					items={menu}
					index="/settings/general"
					settings={settings}
					onChange={() => {}}
					onPaneLeave={leavePaneHandler}
				>
					{/* General Settings Page */}
					<SettingsMenu headline="General Settings" />
					<SettingsContent header>
				

						<General handler="/settings/general" />

						{/* Profile Settings Page */}
						<ProfileSettings handler="/settings/profile" />

						{/* Notifications Settings Page */}
						<NotificationSettings handler="/settings/notifications" />

						{/* Language Settings Page */}
						<LanguageSettings handler="/settings/language" />

						{/* Appearance Settings Page */}
						<AppearanceSettings handler="/settings/appearance" />

						{/* Plugins Settings Page */}
						<PluginsSettings handler="/settings/plugins" />

						{/* About Settings Page */}
						<AboutSettings handler="/settings/about" />
						{/* Privacy Settings Page */}
						<PrivacySettings handler="/settings/privacy" />
					</SettingsContent>
				</SettingsPane>
			</div>
		</div>
	);
};

export default SeTT;
