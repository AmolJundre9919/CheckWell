import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const { html, css, js } = await req.json();
    
    const publishId = `site-${Date.now()}`;
    const publishDir = path.join(process.cwd(), 'public', 'sites', publishId);
    const componentsDir = path.join(publishDir, 'components');
    
    // Create directories
    await fs.mkdir(publishDir, { recursive: true });
    await fs.mkdir(path.join(publishDir, 'assets'), { recursive: true });
    await fs.mkdir(componentsDir, { recursive: true });
    
    // Copy source files to temp directory for compilation
    const tempDir = path.join(publishDir, 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    await fs.cp(path.join(process.cwd(), 'app', 'site'), tempDir, { recursive: true });
    
    // Compile TypeScript files
    try {
      await execAsync(`tsc --project tsconfig.publish.json --outDir ${componentsDir}`);
    } catch (error) {
      console.error('TypeScript compilation error:', error);
      // Continue even if there are compilation errors
    }
    
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });
    
    // Write the files
    await Promise.all([
      fs.writeFile(path.join(publishDir, 'index.html'), html),
      fs.writeFile(path.join(publishDir, 'assets/styles.css'), css),
      fs.writeFile(path.join(publishDir, 'assets/components.js'), js),
    ]);
    
    const url = `/sites/${publishId}/index.html`;
    const localPath = publishDir;
    
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