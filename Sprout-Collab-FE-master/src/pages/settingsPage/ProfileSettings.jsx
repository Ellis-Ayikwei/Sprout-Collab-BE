import React from "react";
import { SettingsPage } from "react-settings-pane";
import { useSettings } from "../../contexts/SettingsContext";

const ProfileSettings = ({ handler }) => {
	const { settings, setSettings } = useSettings();

	return (
		<SettingsPage handler={handler}>
			<fieldset className="form-group">
				<label htmlFor="profileFirstname">Firstname: </label>
				<input
					type="text"
					className="form-control"
					name="mysettings.profile.firstname"
					placeholder="Firstname"
					id="profileFirstname"
					onChange={(e) =>
						setSettings({
							...settings,
							"mysettings.profile.firstname": e.target.value,
						})
					}
					value={settings["mysettings.profile.firstname"]}
				/>
			</fieldset>
			<fieldset className="form-group">
				<label htmlFor="profileLastname">Lastname: </label>
				<input
					type="text"
					className="form-control"
					name="mysettings.profile.lastname"
					placeholder="Lastname"
					id="profileLastname"
					onChange={(e) =>
						setSettings({
							...settings,
							"mysettings.profile.lastname": e.target.value,
						})
					}
					value={settings["mysettings.profile.lastname"]}
				/>
			</fieldset>
			<fieldset className="form-group">
				<label htmlFor="profileBiography">Biography: </label>
				<textarea
					className="form-control"
					name="mysettings.profile.biography"
					placeholder="Biography"
					id="profileBiography"
					onChange={(e) =>
						setSettings({
							...settings,
							"mysettings.profile.biography": e.target.value,
						})
					}
					value={settings["mysettings.profile.biography"]}
				/>
			</fieldset>
		</SettingsPage>
	);
};

export default ProfileSettings;
