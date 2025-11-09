# EchoNote :  AI Meeting Notes Summarizer

A full-stack React application that uses Google's Gemini AI to generate intelligent summaries of meeting transcripts.

## Features

- **Upload Transcripts**: Upload text files (.txt) or PDF documents (.pdf), or paste meeting transcripts directly
- **Custom Instructions**: Use preset prompts or create custom instructions for AI summarization
- **AI-Powered Summaries**: Generate structured summaries using Google's Gemini AI
- **Editable Results**: Edit and refine the generated summaries
- **Email Sharing**: Share summaries via email with multiple recipients

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:

   ```bash
   cd meeting-notes-ai
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your Google Gemini API key:

   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app

## Usage

1. **Upload a Transcript**:

   - Click "Upload File (TXT or PDF)" to upload a .txt or .pdf file
   - Or paste your meeting transcript directly into the text area

2. **Set Instructions** (Optional):

   - Choose from preset prompts like "Summarize in bullet points for executives"
   - Or write custom instructions for the AI

3. **Generate Summary**:

   - Click "Generate Summary" to create an AI-powered summary
   - Wait for the AI to process your transcript

4. **Edit Summary**:

   - Click "Edit" to modify the generated summary
   - Save your changes when done

5. **Share via Email**:
   - Enter recipient email addresses (comma-separated)
   - Add a custom subject line
   - Click "Share via Email" to open your default email client

## Sample Files

- A sample meeting transcript is included in `public/sample-transcript.txt` for testing text uploads
- A sample meeting document is included in `public/sample-meeting.md` (convert to PDF for testing PDF uploads)

## API Configuration

The app uses Google's Gemini AI API. You need to:

1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file as `REACT_APP_GEMINI_API_KEY`

For deployment, make sure to set the environment variable in your hosting platform (Vercel, Netlify, etc.).

## Technologies Used

- **Frontend**: React with TypeScript
- **AI Service**: Google Generative AI (Gemini)
- **Styling**: Custom CSS with responsive design
- **Build Tool**: Create React App

## Available Scripts

- `npm start` - Runs the app in development mode
- `node start-dev.js` - Runs the app with environment validation
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable: `REACT_APP_GEMINI_API_KEY`
4. Deploy

### Netlify

1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set environment variable in Netlify dashboard: `REACT_APP_GEMINI_API_KEY`

### Other Platforms

Make sure to set the `REACT_APP_GEMINI_API_KEY` environment variable in your hosting platform's settings.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
