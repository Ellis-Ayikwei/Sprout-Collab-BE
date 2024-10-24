import React from 'react'
import { SettingsPage } from "react-settings-pane";
import { useSettings } from "../../contexts/SettingsContext";

const AboutSettings = ({ handler }) => {
    const { settings, setSettings } = useSettings();
  return (
    <SettingsPage handler={ handler }>
    <fieldset className="form-group">
        <label>Version:</label>
        <input
            type="text"
            className="form-control"
            name="mysettings.about.version"
            placeholder="Version"
            onChange={(e) =>
                setSettings({
                    ...settings,
                    "mysettings.about.version": e.target.value,
                })
            }
            value={settings["mysettings.about.version"]}
        />
    </fieldset>
</SettingsPage>
  )
}

export default AboutSettings
