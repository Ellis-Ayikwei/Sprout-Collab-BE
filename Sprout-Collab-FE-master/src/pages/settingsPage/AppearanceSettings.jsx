import React from 'react'
import { SettingsPage } from "react-settings-pane";
import { useSettings } from "../../contexts/SettingsContext";

const AppearanceSettings = ({ handler }) => {
    const { settings, setSettings } = useSettings();
  return (
    <SettingsPage handler={handler}>
    <fieldset className="form-group">
        <label htmlFor="appearanceTheme">Theme: </label>
        <select
            name="mysettings.appearance.theme"
            id="appearanceTheme"
            className="form-control"
            value={settings["mysettings.appearance.theme"]}
            onChange={(e) =>
                setSettings({
                    ...settings,
                    "mysettings.appearance.theme": e.target.value,
                })
            }
        >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </fieldset>
</SettingsPage>
  )
}

export default AppearanceSettings
