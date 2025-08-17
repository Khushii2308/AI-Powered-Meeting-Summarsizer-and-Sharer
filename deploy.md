# Deployment Guide

## Quick Deploy to Vercel

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy:

   ```bash
   vercel --prod
   ```

4. Set environment variable:

   ```bash
   vercel env add REACT_APP_GEMINI_API_KEY
   ```

   Enter your API key when prompted.

5. Redeploy to apply environment variables:
   ```bash
   vercel --prod
   ```

## Quick Deploy to Netlify

1. Build the project:

   ```bash
   npm run build
   ```

2. Install Netlify CLI:

   ```bash
   npm i -g netlify-cli
   ```

3. Deploy:

   ```bash
   netlify deploy --prod --dir=build
   ```

4. Set environment variable in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add: `REACT_APP_GEMINI_API_KEY` = `your_api_key`

## Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Upload the `build` folder to your hosting service

3. Set the environment variable `REACT_APP_GEMINI_API_KEY` in your hosting platform

## Environment Variables for Production

Make sure to set this environment variable in your hosting platform:

```
REACT_APP_GEMINI_API_KEY=AIzaSyDrAJSiRpWBjMiOPxco1ogz7Foyut4ylHs
```

## Testing the Deployment

After deployment, test the application by:

1. Uploading the sample transcript from `public/sample-transcript.txt`
2. Trying different prompt presets
3. Generating a summary
4. Editing the summary
5. Testing the email share functionality
