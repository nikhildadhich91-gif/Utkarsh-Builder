const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Load environment variables from .env
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      if (key) process.env[key] = val;
    }
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const localImagePath = 'C:\\Users\\kesha\\Downloads\\ChatGPT Image Aug 1, 2026, 11_31_47 PM.png';

async function run() {
  if (!fs.existsSync(localImagePath)) {
    console.error("Local file does not exist at:", localImagePath);
    process.exit(1);
  }

  console.log("Uploading new file version to Cloudinary...");
  const result = await cloudinary.uploader.upload(localImagePath, {
    folder: 'utkarsh construction/assets',
    public_id: 'construction_made_easy_banner_v2',
    overwrite: true,
    invalidate: true
  });
  console.log("Uploaded successfully!");
  console.log("URL:", result.secure_url);
}

run().catch(err => {
  console.error("Upload failed:", err);
});
