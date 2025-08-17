import React, { useState } from 'react';

interface EmailShareProps {
    summary: string;
}

const EmailShare: React.FC<EmailShareProps> = ({ summary }) => {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('Meeting Summary');
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = () => {
        if (!recipients.trim()) {
            alert('Please enter at least one recipient email address.');
            return;
        }

        setIsSharing(true);

        // Create mailto link
        const emailBody = encodeURIComponent(summary);
        const emailSubject = encodeURIComponent(subject);
        const emailRecipients = recipients.split(',').map(email => email.trim()).join(',');

        const mailtoLink = `mailto:${emailRecipients}?subject=${emailSubject}&body=${emailBody}`;

        // Open default email client
        window.location.href = mailtoLink;

        setTimeout(() => {
            setIsSharing(false);
            alert('Email client opened! Please send the email from your email application.');
        }, 1000);
    };

    return (
        <div className="email-share">
            <h2>Share Summary</h2>

            <div className="email-form">
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Meeting Summary"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="recipients">Recipients (comma-separated):</label>
                    <input
                        type="text"
                        id="recipients"
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="email1@example.com, email2@example.com"
                    />
                </div>

                <button
                    className="share-btn"
                    onClick={handleShare}
                    disabled={isSharing}
                >
                    {isSharing ? 'Opening Email Client...' : 'Share via Email'}
                </button>
            </div>
        </div>
    );
};

export default EmailShare;