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

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Error: Missing Cloudinary credentials in .env file.");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

const BACKUP_BASE = 'D:\\Nikhil\\Pixeel Nest\\Website\\Utkarsh Project images';
const LOCAL_BASE = path.join(__dirname, '../public/assets/projects');
const JSON_FILE_PATH = path.join(__dirname, '../src/lib/project_galleries.json');

// Map JSON project keys to their local folder name and backup folder name(s)
const projectMappings = [
  {
    name: "Barfiwala Sweets",
    localFolder: "barfiwala-sweets",
    backupFolders: ["barfiwala sweets", "Barfiwala new"]
  },
  {
    name: "Indie Stitch",
    localFolder: "indie-stitch",
    backupFolders: ["indie stitch"]
  },
  {
    name: "MS Jewellers",
    localFolder: "ms-jewellers",
    backupFolders: ["MS jewellers"]
  },
  {
    name: "Shri Narayan Sales",
    localFolder: "shri-narayan-sales",
    backupFolders: [] // Handled via local files
  },
  {
    name: "Sanjay Stores",
    localFolder: "sanjay-stores",
    backupFolders: ["Sanjay store"]
  }
];

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm', '.mov'];

async function uploadFile(filePath, folderName, publicId) {
  try {
    const resourceType = filePath.toLowerCase().endsWith('.mp4') || filePath.toLowerCase().endsWith('.webm') || filePath.toLowerCase().endsWith('.mov') ? 'video' : 'image';
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `utkarsh construction/projects/${folderName}`,
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
      invalidate: true
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function run() {
  console.log("--- Starting Cloudinary Gallery Upload & Recovery ---");

  // Read current JSON structure
  let currentGalleries = {};
  if (fs.existsSync(JSON_FILE_PATH)) {
    currentGalleries = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
  }

  for (const proj of projectMappings) {
    console.log(`\nProcessing project: ${proj.name}...`);
    const uniqueFiles = new Map(); // key: cleanName, value: absolutePath

    // 1. Scan Local public assets folder
    const localDir = path.join(LOCAL_BASE, proj.localFolder);
    if (fs.existsSync(localDir)) {
      const files = fs.readdirSync(localDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (supportedExtensions.includes(ext)) {
          // Skip col1_1, col1_2, col2 since they are project thumbnails/grid cards
          const baseName = path.basename(file, ext);
          if (['col1_1', 'col1_2', 'col2', 'col2_extra'].includes(baseName)) {
            continue;
          }
          uniqueFiles.set(baseName.toLowerCase(), path.join(localDir, file));
        }
      }
    }

    // 2. Scan Backup folders
    for (const backupDirName of proj.backupFolders) {
      const backupDir = path.join(BACKUP_BASE, backupDirName);
      if (fs.existsSync(backupDir)) {
        const files = fs.readdirSync(backupDir);
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (supportedExtensions.includes(ext)) {
            const baseName = path.basename(file, ext);
            if (['col1_1', 'col1_2', 'col2', 'col2_extra'].includes(baseName)) {
              continue;
            }
            // If file is not in uniqueFiles or if backup has a larger/raw version, use it
            const cleanKey = baseName.toLowerCase();
            uniqueFiles.set(cleanKey, path.join(backupDir, file));
          }
        }
      }
    }

    console.log(`Found ${uniqueFiles.size} unique files to upload for ${proj.name}.`);

    const urls = [];
    let count = 0;
    for (const [cleanName, filePath] of uniqueFiles.entries()) {
      count++;
      console.log(`[${count}/${uniqueFiles.size}] Uploading: ${path.basename(filePath)}...`);
      // Use clean name as public ID to preserve filenames on Cloudinary
      const url = await uploadFile(filePath, proj.name, cleanName);
      if (url) {
        console.log(`  Uploaded successfully: ${url}`);
        urls.push(url);
      }
    }

    if (urls.length > 0) {
      // Overwrite the project gallery array with the new Cloudinary URLs
      currentGalleries[proj.name] = urls;
    }
  }

  // Save the updated JSON file
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(currentGalleries, null, 2), 'utf8');
  console.log(`\nSuccessfully updated project galleries config file at: ${JSON_FILE_PATH}`);
  console.log("--- Cleanup / Upload Run Completed ---");
}

run().catch(err => {
  console.error("Migration script failed fatally:", err);
});
