#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Check if .env file exists
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.error("❌ .env file not found!");
  console.log("📝 Creating .env file from .env.example...");

  const examplePath = path.join(__dirname, ".env.example");
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log("✅ .env file created. Please edit it with your API key.");
    console.log("🔑 Add your Gemini API key to REACT_APP_GEMINI_API_KEY");
    process.exit(1);
  } else {
    console.error("❌ .env.example not found either!");
    process.exit(1);
  }
}

// Check if API key is set
const envContent = fs.readFileSync(envPath, "utf8");
if (
  !envContent.includes("REACT_APP_GEMINI_API_KEY=") ||
  envContent.includes("your_actual_api_key_here")
) {
  console.error("❌ Please set your Gemini API key in the .env file");
  console.log(
    '🔑 Edit .env and replace "your_actual_api_key_here" with your actual API key'
  );
  process.exit(1);
}

console.log("✅ Environment setup looks good!");
console.log("🚀 Starting development server...");

// Start the development server
const child = spawn("npm", ["start"], {
  stdio: "inherit",
  shell: true,
});

child.on("error", (error) => {
  console.error("Failed to start development server:", error);
});

child.on("close", (code) => {
  console.log(`Development server exited with code ${code}`);
});
