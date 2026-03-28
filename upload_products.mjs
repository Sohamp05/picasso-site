import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Minimal dotenv loader
function loadEnv() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    envFile.split('\n').forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    });
  } catch (err) {
    console.error("No .env.local file found or error reading it.");
  }
}
loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const uploadImage = async (filePath) => {
  const fileStats = fs.statSync(filePath);
  if (fileStats.size === 0) {
      console.warn(`File ${filePath} is empty, skipping.`);
      return null;
  }
  const stream = fs.createReadStream(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, ext);
  
  // Create an asset in Sanity
  try {
    console.log(`Uploading ${basename}${ext}...`);
    const asset = await client.assets.upload('image', stream, {
      filename: basename + ext,
    });
    console.log(`Successfully uploaded: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error.message);
    return null;
  }
};

const main = async () => {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Missing SANITY_API_TOKEN inside .env.local');
    process.exit(1);
  }

  const baseDir = path.join(process.cwd(), 'Product', 'Product');
  if (!fs.existsSync(baseDir)) {
      console.error(`Directory ${baseDir} does not exist`);
      process.exit(1);
  }
  
  const categories = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

  for (const category of categories) {
    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const categoryDir = path.join(baseDir, category);
    const categoryContents = fs.readdirSync(categoryDir);
    
    // Check if categoryDir contains files directly or subdirectories
    let hasSubdirs = false;
    for(const item of categoryContents) {
       if(fs.statSync(path.join(categoryDir, item)).isDirectory()) {
           hasSubdirs = true;
           break;
       }
    }

    if (hasSubdirs) {
        // category contains products (subdirectories)
        const products = categoryContents.filter(f => fs.statSync(path.join(categoryDir, f)).isDirectory());
        for (const productStr of products) {
            const productDir = path.join(categoryDir, productStr);
            const productFiles = fs.readdirSync(productDir).filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
            
            console.log(`\nProcessing Product: ${productStr} (Category: ${category})`);
            
            const uploadedAssets = [];
            for (const file of productFiles) {
                const filePath = path.join(productDir, file);
                const asset = await uploadImage(filePath);
                if (asset) {
                    uploadedAssets.push({
                        _type: 'image',
                        _key: crypto.randomUUID(), // simple key
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    });
                }
            }

            if (uploadedAssets.length > 0) {
                const doc = {
                    _type: 'product',
                    title: productStr,
                    slug: { _type: 'slug', current: productStr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') },
                    category: categorySlug,
                    images: uploadedAssets,
                    featured: false,
                };
                try {
                    console.log(`Creating document for ${productStr}...`);
                    await client.create(doc);
                    console.log(`Document created successfully!`);
                } catch(e) {
                    console.error(`Failed to create doc for ${productStr}:`, e.message);
                }
            } else {
                console.log(`No images uploaded for ${productStr}, skipping document creation.`);
            }
        }
    } else {
        // category itself is the product and contains images directly
        const productFiles = categoryContents.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f) && fs.statSync(path.join(categoryDir, f)).isFile());
        
        console.log(`\nProcessing single Product Category: ${category}`);
        if(productFiles.length === 0) {
            console.log(`No images found in ${category}. Skipping.`);
            continue;
        }

        const uploadedAssets = [];
        for (const file of productFiles) {
            const filePath = path.join(categoryDir, file);
            const asset = await uploadImage(filePath);
            if (asset) {
                uploadedAssets.push({
                    _type: 'image',
                    _key: crypto.randomUUID(),
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    }
                });
            }
        }

        if (uploadedAssets.length > 0) {
            const doc = {
                _type: 'product',
                title: category,
                slug: { _type: 'slug', current: categorySlug },
                category: categorySlug,
                images: uploadedAssets,
                featured: false,
            };
            try {
                console.log(`Creating document for ${category}...`);
                await client.create(doc);
                console.log(`Document created successfully!`);
            } catch(e) {
                console.error(`Failed to create doc for ${category}:`, e.message);
            }
        }
    }
  }

  console.log('\nAll done!');
};

main();
