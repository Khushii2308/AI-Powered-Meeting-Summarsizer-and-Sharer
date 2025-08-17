# Troubleshooting Guide

## Environment Variable Issues

### Error: "REACT_APP_GEMINI_API_KEY is not set in environment variables"

**Solution:**

1. **Stop the development server** (Ctrl+C if running)

2. **Check if .env file exists:**

   ```bash
   ls -la .env
   ```

3. **If .env doesn't exist, create it:**

   ```bash
   cp .env.example .env
   ```

4. **Edit .env file and add your API key:**

   ```
   REACT_APP_GEMINI_API_KEY=AIzaSyDrAJSiRpWBjMiOPxco1ogz7Foyut4ylHs
   ```

5. **Restart the development server:**
   ```bash
   npm start
   ```

### Alternative: Use the validation script

```bash
node start-dev.js
```

This script will check your environment setup before starting the server.

## API Issues

### Error: "Failed to generate summary"

**Possible causes:**

- Invalid API key
- Network connectivity issues
- API quota exceeded
- Gemini API service issues

**Solutions:**

1. Verify your API key is correct
2. Check your internet connection
3. Check Google AI Studio for API usage limits
4. Try again in a few minutes

## Build Issues

### TypeScript Errors

Run the TypeScript compiler to check for errors:

```bash
npx tsc --noEmit
```

### Dependency Issues

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Browser Issues

### CORS Errors

The Gemini API should work from browser environments. If you see CORS errors:

1. Make sure you're using the correct API endpoint
2. Check if your API key has the right permissions

### Console Errors

Open browser DevTools (F12) and check the Console tab for detailed error messages.

## Deployment Issues

### Environment Variables Not Working in Production

Make sure to set the environment variable in your hosting platform:

**Vercel:**

```bash
vercel env add REACT_APP_GEMINI_API_KEY
```

**Netlify:**

- Go to Site settings > Environment variables
- Add: `REACT_APP_GEMINI_API_KEY` = `your_api_key`

**Other platforms:**

- Check your hosting provider's documentation for setting environment variables

### Build Fails in Production

1. Test the build locally:

   ```bash
   npm run build
   ```

2. If it fails locally, fix the errors and try again

3. Make sure all dependencies are in `package.json`

## Getting Help

If you're still having issues:

1. Check the browser console for error messages
2. Verify your API key works in Google AI Studio
3. Make sure you've restarted the development server after creating/modifying .env
4. Try the sample transcript to isolate the issue

## Quick Verification Checklist

- [ ] .env file exists and contains your API key
- [ ] Development server was restarted after creating .env
- [ ] API key is valid (test in Google AI Studio)
- [ ] Internet connection is working
- [ ] Browser console shows no errors
