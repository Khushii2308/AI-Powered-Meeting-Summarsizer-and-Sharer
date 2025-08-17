# Quick Server Restart Guide

## The Issue

React development server only reads environment variables when it starts. Since the .env file was created after the server started, it's not picking up the API key.

## Quick Fix (Temporary)

The app now uses a fallback API key, so it should work immediately.

## Proper Fix (Recommended)

1. **Stop the development server**: Press `Ctrl+C` in the terminal where `npm start` is running

2. **Restart the server**:

   ```bash
   npm start
   ```

3. **Verify environment variables are loaded**: Check the browser console for the debug log showing `hasApiKey: true`

## Alternative: Use the validation script

```bash
node start-dev.js
```

## After Restart

Once you restart the server properly, the environment variable will be loaded and you can remove the fallback API key from the code for better security.

## Verification

- Open browser DevTools (F12)
- Go to Console tab
- Look for the log: "Environment variables: { hasApiKey: true, ... }"
- If `hasApiKey` is `true`, the environment variable is working properly
