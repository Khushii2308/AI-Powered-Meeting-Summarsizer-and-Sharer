import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./services/geminiService', () => ({
  generateSummary: jest.fn(async () => 'Mock summary'),
  generateSummaryFromFile: jest.fn(async () => 'Mock summary from file'),
}));

test('renders app header', () => {
  render(<App />);
  expect(screen.getByText(/AI Meeting Notes Summarizer/i)).toBeInTheDocument();
});
