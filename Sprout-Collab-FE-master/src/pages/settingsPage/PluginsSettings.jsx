import React from "react";
import { SettingsPage } from "react-settings-pane";
import { useSettings } from "../../contexts/SettingsContext";

const PluginSettings = ({ handler }) => {
	const { settings, setSettings } = useSettings();
	return (
		<SettingsPage handler={handler}>
			<fieldset className="form-group">
				<label>plugin 1:</label>
				<label className="switch">
					<input
						type="checkbox"
						checked={settings["mysettings.notifications.email"]}
						onChange={(e) => {
							const enabledPlugins = settings["mysettings.plugins.enabled"];
							if (e.target.checked) {
								enabledPlugins.push("plugin1");
							} else {
								const index = enabledPlugins.indexOf("plugin1");
								if (index !== -1) {
									enabledPlugins.splice(index, 1);
								}
							}

							setSettings({
								...settings,
								"mysettings.plugins.enabled": enabledPlugins,
							});
						}}
					/>
					<span className="slider round"></span>
				</label>
			</fieldset>
			<fieldset className="form-group">
				<label>plugin 2:</label>
				<label className="switch">
					<input
						type="checkbox"
						checked={settings["mysettings.notifications.push"]}
						onChange={(e) => {
							const enabledPlugins = settings["mysettings.plugins.enabled"];
							if (e.target.checked) {
								enabledPlugins.push("plugin2");
							} else {
								const index = enabledPlugins.indexOf("plugin2");
								if (index !== -1) {
									enabledPlugins.splice(index, 1);
								}
							}
							setSettings({
								...settings,
								"mysettings.plugins.enabled": enabledPlugins,
							}); 
						}}
					/>
					<span className="slider round"></span>
				</label>
			</fieldset>
		</SettingsPage>
	);
};

export default PluginSettings;
