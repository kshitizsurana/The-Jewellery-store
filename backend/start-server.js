const { spawn } = require('child_process');
const path = require('path');

console.log('Starting The Jewellery Store backend...');
console.log('Node.js version:', process.version);

async function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, NODE_OPTIONS: '--no-warnings' }
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${command} completed successfully`);
        resolve();
      } else {
        reject(new Error(`${command} failed with exit code ${code}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

async function startServer() {
  try {
    // Step 1: Generate Prisma client
    console.log('🔄 Generating Prisma client...');
    await runCommand('npx', ['prisma', 'generate']);
    
    // Step 2: Push database schema
    console.log('🔄 Setting up database schema...');
    await runCommand('npx', ['prisma', 'db', 'push', '--accept-data-loss']);
    
    // Step 3: Seed database
    console.log('🔄 Seeding database...');
    await runCommand('node', ['seed.js']);
    
    // Step 4: Start server
    console.log('🔄 Starting Express server...');
    require('./index.js');
    
  } catch (error) {
    console.error('❌ Startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
