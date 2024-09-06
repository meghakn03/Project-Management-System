import React from 'react';
import './HelpSupportPage.css';

const HelpSupportPage = () => {
    return (
        <div className="help-support-page">
            <h1>Help & Support</h1>
            <div className="help-support-sections">
                
                {/* Contact Support */}
                <section className="support-section">
                    <h2>Contact Support</h2>
                    <form className="contact-form">
                        <input type="text" placeholder="Name" required />
                        <input type="email" placeholder="Email" required />
                        <textarea placeholder="Describe your issue" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    <p>Email: support@example.com</p>
                    <p>Phone: 1-800-123-4567</p>
                </section>
                
                {/* FAQs */}
                <section className="support-section">
                    <h2>Frequently Asked Questions</h2>
                    <ul>
                        <li><a href="#general">General Questions</a></li>
                        <li><a href="#technical">Technical Support</a></li>
                        <li><a href="#account">Account Issues</a></li>
                    </ul>
                </section>

                {/* User Guides */}
                <section className="support-section">
                    <h2>User Guides and Documentation</h2>
                    <ul>
                        <li><a href="#getting-started">Getting Started Guide</a></li>
                        <li><a href="#manuals">User Manuals</a></li>
                        <li><a href="#tutorials">Video Tutorials</a></li>
                    </ul>
                </section>

                {/* Troubleshooting */}
                <section className="support-section">
                    <h2>Troubleshooting</h2>
                    <ul>
                        <li><a href="#common-issues">Common Issues</a></li>
                        <li><a href="#error-codes">Error Codes</a></li>
                    </ul>
                </section>

                {/* Community Forums */}
                <section className="support-section">
                    <h2>Community Forums</h2>
                    <p>Join our community forums to ask questions and share solutions.</p>
                    <a href="#forums">Visit Forums</a>
                </section>

                {/* Feedback and Suggestions */}
                <section className="support-section">
                    <h2>Feedback and Suggestions</h2>
                    <form className="feedback-form">
                        <textarea placeholder="Your feedback or suggestion" required></textarea>
                        <button type="submit">Send Feedback</button>
                    </form>
                </section>

                {/* System Status */}
                <section className="support-section">
                    <h2>System Status</h2>
                    <p>Check the current status of our system.</p>
                    <a href="#status">View System Status</a>
                </section>

                {/* Privacy and Security */}
                <section className="support-section">
                    <h2>Privacy and Security</h2>
                    <a href="#privacy-policy">Privacy Policy</a>
                    <a href="#security-guidelines">Security Guidelines</a>
                </section>

                {/* Accessibility */}
                <section className="support-section">
                    <h2>Accessibility</h2>
                    <p>Find resources for using our application with assistive technologies.</p>
                    <a href="#accessibility-resources">Accessibility Resources</a>
                </section>
                
            </div>
        </div>
    );
};

export default HelpSupportPage;
