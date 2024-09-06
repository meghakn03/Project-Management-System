import React from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="settings-grid">
            <section className="settings-column">
                <h2>Account Settings</h2>
                <button>Update Profile</button>
                <button>Change Password</button>
                <button>Manage Security</button>
            </section>

            {/* Privacy Settings */}
            <section className="settings-column">
                <h2>Privacy Settings</h2>
                <button>Visibility</button>
                <button>Data Sharing</button>
                <button>Activity Log</button>
            </section>

            {/* Theme and Appearance */}
            <section className="settings-column">
                <h2>Theme and Appearance</h2>
                <button>Select Theme</button>
                <button>Font and Layout</button>
                <button>Avatar and Background</button>
            </section>

            {/* Application Preferences */}
            <section className="settings-column">
                <h2>Application Preferences</h2>
                <button>Language and Region</button>
                <button>Accessibility Options</button>
                <button>Default Behavior</button>
            </section>

            {/* Data Management */}
            <section className="settings-column">
                <h2>Data Management</h2>
                <button>Backup and Restore</button>
                <button>Export Data</button>
                <button>Delete Account</button>
            </section>

            {/* Notifications */}
            <section className="settings-column">
                <h2>Notifications</h2>
                <button>Notification Preferences</button>
                <button>Notification Sounds</button>
            </section>

            {/* Application Settings */}
            <section className="settings-column">
                <h2>Application Settings</h2>
                <button>Sync Preferences</button>
                <button>Storage Management</button>
            </section>

            {/* Help and Support */}
            <section className="settings-column">
                <h2>Help and Support</h2>
                <button>Contact Support</button>
                <button>Provide Feedback</button>
            </section>

            {/* Legal and Compliance */}
            <section className="settings-column">
                <h2>Legal and Compliance</h2>
                <button>Terms of Service</button>
                <button>Privacy Policy</button>
                <button>Data Protection</button>
            </section>
            </div>

        </div>
    );
};

export default SettingsPage;
