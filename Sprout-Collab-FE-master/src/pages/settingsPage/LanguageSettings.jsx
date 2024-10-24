import React from "react";
import { SettingsPage } from "react-settings-pane";
import { useSettings } from "../../contexts/SettingsContext";

const LanguageSettings = ({ handler }) => {
	const { settings, setSettings } = useSettings();
	return (
		<SettingsPage handler={handler}>
			<fieldset className="form-group">
				<label htmlFor="languageDefault">Default Language: </label>
				<select
					name="mysettings.language.default"
					id="languageDefault"
					className="form-control"
					value={settings["mysettings.language.default"]}
					onChange={(e) =>
						setSettings({
							...settings,
							"mysettings.language.default": e.target.value,
						})
					}
				>
					<option value="en">English</option>
					<option value="fr">French</option>
					<option value="de">German</option>
					<option value="es">Spanish</option>
				</select>
			</fieldset>
		</SettingsPage>
	);
};

export default LanguageSettings;
