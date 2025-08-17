import React from 'react';

interface PromptInputProps {
    prompt: string;
    onPromptChange: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange }) => {
    const presetPrompts = [
        'Summarize in bullet points for executives',
        'Highlight only action items and deadlines',
        'Create a detailed summary with key decisions',
        'Extract main topics and participant contributions',
        'Focus on technical discussions and solutions'
    ];

    const handlePresetClick = (presetPrompt: string) => {
        onPromptChange(presetPrompt);
    };

    return (
        <div className="prompt-input">
            <h2>Custom Instructions</h2>

            <div className="preset-prompts">
                <h3>Quick Presets:</h3>
                <div className="preset-buttons">
                    {presetPrompts.map((preset, index) => (
                        <button
                            key={index}
                            className="preset-btn"
                            onClick={() => handlePresetClick(preset)}
                        >
                            {preset}
                        </button>
                    ))}
                </div>
            </div>

            <textarea
                className="prompt-textarea"
                placeholder="Enter custom instructions for the AI (e.g., 'Summarize in bullet points for executives')"
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                rows={3}
            />
        </div>
    );
};

export default PromptInput;