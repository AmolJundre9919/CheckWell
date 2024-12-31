import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { html, css, js } = await req.json();
    
    // Create a unique folder name for this publish
    const publishId = `site-${Date.now()}`;
    const publishDir = path.join(process.cwd(), 'public', 'sites', publishId);
    
    // Create the directory structure
    await fs.mkdir(publishDir, { recursive: true });
    await fs.mkdir(path.join(publishDir, 'assets'), { recursive: true });
    
    // Write the files
    await Promise.all([
      fs.writeFile(path.join(publishDir, 'index.html'), html),
      fs.writeFile(path.join(publishDir, 'assets/styles.css'), css),
      fs.writeFile(path.join(publishDir, 'assets/components.js'), js),
    ]);
    
    // Return the local URL where the site is published
    const url = `/sites/${publishId}/index.html`;
    const localPath = publishDir;
    
    console.log(localPath);
    return NextResponse.json({ 
      url,
      localPath,
      message: `Site published successfully to ${localPath}`
    });
  } catch (error) {
    console.error('Error publishing website:', error);
    return NextResponse.json(
      { error: 'Failed to publish website' },
      { status: 500 }
    );
  }
} 