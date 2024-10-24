import React, { useState } from 'react';
import { SettingsPage } from "react-settings-pane";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PrivacySettings = ({ handler }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError(""); // Clear previous error

        try {
            setLoading(true);
            const response = await fetch("/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (data.success) {
                setSuccess(data.message);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error("Error changing password:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // const handleResetPassword = async () => {
    //     if (!email) {
    //         setError("Please enter your email.");
    //         return;
    //     }

    //     setError(""); // Clear previous error

    //     try {
    //         setLoading(true);
    //         const response = await fetch("/api/reset-password", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email }),
    //         });

    //         const data = await response.json();
    //         if (data.success) {
    //             setSuccess(data.message);
    //         } else {
    //             setError(data.message);
    //         }
    //     } catch (error) {
    //         console.error("Error sending reset email:", error);
    //         setError("An error occurred. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <SettingsPage handler={handler}>
            <fieldset className="form-group">
                <label htmlFor="password">Current Password: </label>
                <div className="input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Current Password"
                    />
                    <button type="button" className="eye-button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="password">New Password: </label>
                <div className="input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password"
                    />
                    <button type="button" className="eye-button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <div className="input-container">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                    <button type="button" className="eye-button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </fieldset>
            {/* <fieldset className="form-group">
                <label htmlFor="email">Email for Password Reset: </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </fieldset> */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <div className="privacy-action-buttons">
                <button
                    className="btn btn-primary"
                    onClick={handlePasswordChange}
                    disabled={loading}
                >
                    Change Password
                </button>
                {/* <button
                    className="btn btn-secondary"
                    onClick={handleResetPassword}
                    disabled={loading}
                >
                    Reset Password
                </button> */}
            </div>
        </SettingsPage>
    );
}

export default PrivacySettings;
