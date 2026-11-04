import fs from 'fs';
import path from 'path';

const existingNames = new Set(
  JSON.parse(fs.readFileSync('scripts/existing_names.json', 'utf-8')).map(n => n.toLowerCase().trim())
);

console.log(`Loaded ${existingNames.size} existing tools for deduplication check.`);

