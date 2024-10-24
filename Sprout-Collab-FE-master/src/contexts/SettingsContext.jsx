import React, { useContext, createContext, useState } from "react";

const SettingsContext = createContext();

const useSettings = () => useContext(SettingsContext);

const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState({
		"mysettings.general.name": "Dennis Stücken",
		"mysettings.general.username": "dstuecken",
		"mysettings.general.color-theme": "purple",
		"mysettings.general.email": "dstuecken@react-settings-pane.com",
		"mysettings.general.picture": "earth",
		"mysettings.profile.firstname": "Dennis",
		"mysettings.profile.lastname": "Stücken",
		"mysettings.notifications.email": true,
		"mysettings.notifications.push": true,
		"mysettings.language.default": "en",
		"mysettings.appearance.theme": "light",
		"mysettings.plugins.enabled": ["plugin1", "plugin2"],
		"mysettings.about.version": "1.0.0",
	});

	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};

export { SettingsProvider, useSettings };
