import React, { useRef } from 'react';

interface TranscriptUploaderProps {
    onTranscriptChange: (transcript: string) => void;
    onFileUpload: (file: File) => void;
    transcript: string;
}

const TranscriptUploader: React.FC<TranscriptUploaderProps> = ({
    onTranscriptChange,
    onFileUpload,
    transcript
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type === 'text/plain') {
            // Handle text files as before
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                onTranscriptChange(content);
            };
            reader.readAsText(file);
        } else if (file.type === 'application/pdf') {
            // Handle PDF files
            onFileUpload(file);
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            onTranscriptChange(`📄 PDF file uploaded: ${file.name} (${fileSize} MB)\n\n✅ Ready to analyze! Click "Generate Summary" to extract and summarize the content.\n\nNote: The AI will first extract text from your PDF, then create a summary based on the actual content.`);
        } else {
            alert('Please upload a valid text file (.txt) or PDF file (.pdf)');
        }
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onTranscriptChange(event.target.value);
    };

    return (
        <div className="transcript-uploader">
            <h2>Upload Transcript</h2>

            <div className="upload-section">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".txt,.pdf"
                    style={{ display: 'none' }}
                />
                <button
                    className="upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                >
                    📁 Upload File (TXT or PDF)
                </button>
                <span className="upload-info">or paste your transcript below</span>
            </div>

            <textarea
                className="transcript-textarea"
                placeholder="Paste your meeting transcript here..."
                value={transcript}
                onChange={handleTextAreaChange}
                rows={10}
            />
        </div>
    );
};

export default TranscriptUploader;