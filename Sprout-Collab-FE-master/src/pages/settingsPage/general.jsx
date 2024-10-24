import React from "react";
import { SettingsPage } from "react-settings-pane";
import { useSettings } from "../../contexts/SettingsContext";

const General = ({ handler }) => {
    const { settings, setSettings } = useSettings();
   

    return (
        <SettingsPage handler={handler}>
            <fieldset className="form-group">
                <label htmlFor="generalName">Name: </label>
                <input
                    type="text"
                    className="form-control"
                    name="mysettings.general.name"
                    placeholder="Name"
                    id="generalName"
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            "mysettings.general.name": e.target.value,
                        })
                    }
                    value={settings["mysettings.general.name"]}
                />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="generalUsername">Username: </label>
                <div className="input-group">
                    <input
                        type="text"
                        name="mysettings.general.username"
                        className="form-control"
                        placeholder="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                "mysettings.general.username": e.target.value,
                            })
                        }
                        value={settings["mysettings.general.username"]}
                    />
                </div>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="generalMail">E-Mail address: </label>
                <input
                    type="text"
                    className="form-control"
                    name="mysettings.general.email"
                    placeholder="E-Mail Address"
                    id="generalMail"
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            "mysettings.general.email": e.target.value,
                        })
                    }
                    value={settings["mysettings.general.email"]}
                />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="generalPic">Picture: </label>
                <input
                    type="text"
                    className="form-control"
                    name="mysettings.general.picture"
                    placeholder="Picture"
                    id="generalPic"
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            "mysettings.general.picture": e.target.value,
                        })
                    }
                    value={settings["mysettings.general.picture"]}
                />
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="profileColor">Color-Theme: </label>
                <select
                    name="mysettings.general.color-theme"
                    id="profileColor"
                    className="form-control"
                    value={settings["mysettings.general.color-theme"]}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            "mysettings.general.color-theme": e.target.value,
                        })
                    }
                >
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                </select>
            </fieldset>
        </SettingsPage>
    );
};

export default General;
