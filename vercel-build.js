const fs = require('fs');
const path = require('path');

// Ensure lib directory exists
const libDir = path.join(__dirname, 'src', 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Copy utils.ts if it doesn't exist
const utilsPath = path.join(libDir, 'utils.ts');
if (!fs.existsSync(utilsPath)) {
  const utilsContent = `
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
  fs.writeFileSync(utilsPath, utilsContent);
} 