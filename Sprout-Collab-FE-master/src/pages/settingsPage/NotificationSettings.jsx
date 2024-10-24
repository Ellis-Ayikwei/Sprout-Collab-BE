import React from 'react'
import { SettingsPage } from "react-settings-pane";
import { useSettings } from "../../contexts/SettingsContext";

const NotificationSettings = ({ handler }) => {
    const { settings, setSettings } = useSettings();
  return (
    <SettingsPage handler={ handler }>
							<fieldset className="form-group">
								<label>Receive E-Mail notifications:</label>
								<label className="switch">
									<input
										type="checkbox"
										checked={settings["mysettings.notifications.email"]}
										onChange={(e) =>
											setSettings({
												...settings,
												"mysettings.notifications.email": e.target.checked,
											})
										}
									/>
									<span className="slider round"></span>
								</label>
							</fieldset>
							<fieldset className="form-group">
								<label>Receive Push notifications:</label>
								<label className="switch">
									<input 
										type="checkbox"
										checked={settings["mysettings.notifications.push"]}
										onChange={(e) =>
											setSettings({
												...settings,
												"mysettings.notifications.push": e.target.checked,
											})
										}
									/>
									<span className="slider round"></span>
								</label>
							</fieldset>
						</SettingsPage>
  )
}

export default NotificationSettings
