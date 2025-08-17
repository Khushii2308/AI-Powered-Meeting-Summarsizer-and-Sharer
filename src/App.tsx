import React, { useState } from 'react';
import './App.css';
import TranscriptUploader from './components/TranscriptUploader';
import PromptInput from './components/PromptInput';
import SummaryDisplay from './components/SummaryDisplay';
import EmailShare from './components/EmailShare';
import { generateSummary, generateSummaryFromFile } from './services/geminiService';

interface AppState {
  transcript: string;
  customPrompt: string;
  summary: string;
  isLoading: boolean;
  error: string | null;
  uploadedFile: File | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    transcript: '',
    customPrompt: '',
    summary: '',
    isLoading: false,
    error: null,
    uploadedFile: null
  });

  const handleTranscriptChange = (transcript: string) => {
    setState(prev => ({ ...prev, transcript, error: null, uploadedFile: null }));
  };

  const handleFileUpload = (file: File) => {
    setState(prev => ({ ...prev, uploadedFile: file, error: null }));
  };

  const handlePromptChange = (prompt: string) => {
    setState(prev => ({ ...prev, customPrompt: prompt }));
  };

  const handleSummaryChange = (summary: string) => {
    setState(prev => ({ ...prev, summary }));
  };

  const handleGenerateSummary = async () => {
    if (!state.transcript.trim() && !state.uploadedFile) {
      setState(prev => ({ ...prev, error: 'Please upload a file or enter transcript text first.' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      let summary: string;

      if (state.uploadedFile) {
        // Use file-based generation for uploaded files (PDF or text)
        summary = await generateSummaryFromFile(state.uploadedFile, state.customPrompt);
      } else {
        // Use text-based generation for pasted content
        summary = await generateSummary(state.transcript, state.customPrompt);
      }

      setState(prev => ({ ...prev, summary, isLoading: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary. Please try again.';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Meeting Notes Summarizer</h1>
        <p>Upload your meeting transcript (TXT or PDF) and get AI-powered summaries</p>
      </header>

      <main className="App-main">
        {state.error && (
          <div className="error-message">
            {state.error}
          </div>
        )}

        <TranscriptUploader
          onTranscriptChange={handleTranscriptChange}
          onFileUpload={handleFileUpload}
          transcript={state.transcript}
        />

        <PromptInput
          prompt={state.customPrompt}
          onPromptChange={handlePromptChange}
        />

        <button
          className="generate-btn"
          onClick={handleGenerateSummary}
          disabled={state.isLoading || (!state.transcript.trim() && !state.uploadedFile)}
        >
          {state.isLoading
            ? (state.uploadedFile?.type === 'application/pdf'
              ? 'Extracting text from PDF and generating summary...'
              : 'Generating Summary...')
            : 'Generate Summary'}
        </button>

        {state.summary && (
          <>
            <SummaryDisplay
              summary={state.summary}
              onSummaryChange={handleSummaryChange}
            />
            <EmailShare summary={state.summary} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
