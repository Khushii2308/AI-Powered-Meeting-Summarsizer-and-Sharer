import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';

const getApiKey = (): string => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

    // Debug logging (remove in production)
    console.log('Environment variables:', {
        hasApiKey: !!apiKey,
        nodeEnv: process.env.NODE_ENV,
        allEnvVars: Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'))
    });

    if (!apiKey) {
        // Fallback for development - use the API key directly
        // In production, this should come from environment variables
        const fallbackApiKey = 'AIzaSyDrAJSiRpWBjMiOPxco1ogz7Foyut4ylHs';
        console.warn('Using fallback API key. Please restart the development server to use environment variables.');
        return fallbackApiKey;
    }
    return apiKey;
};

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Helper function to extract text from PDF
const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
            fullText += pageText + '\n';
        }

        return fullText.trim();
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF');
    }
};

// Helper function to read text file
const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target?.result as string);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

export const generateSummary = async (transcript: string, customPrompt: string = ''): Promise<string> => {
    try {
        const apiKey = getApiKey();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

        const defaultPrompt = 'Please summarize the following meeting transcript in a clear, structured format:';
        const prompt = customPrompt.trim()
            ? `${customPrompt}\n\nTranscript:\n${transcript}`
            : `${defaultPrompt}\n\n${transcript}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating summary:', error);
        throw new Error('Failed to generate summary');
    }
};

export const generateSummaryFromFile = async (file: File, customPrompt: string = ''): Promise<string> => {
    try {
        let extractedText: string;

        if (file.type === 'application/pdf') {
            console.log('Extracting text from PDF...');
            extractedText = await extractTextFromPDF(file);
        } else if (file.type === 'text/plain') {
            console.log('Reading text file...');
            extractedText = await readTextFile(file);
        } else {
            throw new Error('Unsupported file type. Please upload a PDF or text file.');
        }

        if (!extractedText.trim()) {
            throw new Error('No text content found in the file. Please check if the file contains readable text.');
        }

        console.log('Extracted text length:', extractedText.length);
        console.log('First 200 characters:', extractedText.substring(0, 200));

        // Now use the extracted text with Gemini for summarization
        const apiKey = getApiKey();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

        const defaultPrompt = 'Please analyze the following document content and provide a clear, structured summary of the meeting:';
        const prompt = customPrompt.trim()
            ? `${customPrompt}\n\nDocument Content:\n${extractedText}`
            : `${defaultPrompt}\n\n${extractedText}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating summary from file:', error);
        throw new Error(`Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};