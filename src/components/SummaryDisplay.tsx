import React, { useState } from 'react';

interface SummaryDisplayProps {
    summary: string;
    onSummaryChange: (summary: string) => void;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, onSummaryChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSummary, setEditedSummary] = useState(summary);

    const handleEdit = () => {
        setEditedSummary(summary);
        setIsEditing(true);
    };

    const handleSave = () => {
        onSummaryChange(editedSummary);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedSummary(summary);
        setIsEditing(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
        alert('Summary copied to clipboard!');
    };

    return (
        <div className="summary-display">
            <div className="summary-header">
                <h2>Generated Summary</h2>
                <div className="summary-actions">
                    <button className="copy-btn" onClick={handleCopy}>
                        Copy
                    </button>
                    {!isEditing ? (
                        <button className="edit-btn" onClick={handleEdit}>
                            Edit
                        </button>
                    ) : (
                        <div className="edit-actions">
                            <button className="save-btn" onClick={handleSave}>
                                Save
                            </button>
                            <button className="cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isEditing ? (
                <textarea
                    className="summary-editor"
                    value={editedSummary}
                    onChange={(e) => setEditedSummary(e.target.value)}
                    rows={15}
                />
            ) : (
                <div className="summary-content">
                    {summary.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummaryDisplay;