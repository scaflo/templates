// import { build } from 'esbuild';
// import chokidar from 'chokidar';
// import { spawn } from 'child_process';

// const buildOptions = {
//   entryPoints: ['src/index.jsx'],
//   bundle: true,
//   outfile: 'public/bundle.js',
//   format: 'esm',
//   jsx: 'automatic',
//   loader: { '.js': 'jsx' },
// };

// async function buildProject() {
//   await build(buildOptions);
//   console.log('✅ Build complete!');
// }

// // Start a static file server
// function startServer() {
//   console.log('🚀 Starting server on http://localhost:3000');
//   return spawn('yarn', ['serve', 'public', '-p', '3000', '-s'], {
//     stdio: 'inherit',
//     shell: true,
//   });
// }

// let server = startServer(); // Start server initially

// // Watch for file changes and rebuild
// chokidar.watch('src').on('change', async () => {
//   console.log('🔄 Rebuilding...');
//   await buildProject();
//   console.log('🔄 Restarting server...');
//   server.kill(); // Kill the previous server
//   server = startServer(); // Restart the server
// });

// buildProject();

// attempt 2


// import { build } from 'esbuild';
// import chokidar from 'chokidar';
// import { spawn } from 'child_process';
// import { createServer } from 'http';


// //not working
// // 🔥 Live reload server (SSE - Server-Sent Events)
// const clients = [];
// const sseServer = createServer((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     'Connection': 'keep-alive',
//     'Access-Control-Allow-Origin': '*', // ✅ Allow requests from any origin
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'GET, OPTIONS',
//   });
//   res.write("retry: 10000\n\n"); 

//   clients.push(res);
//   req.on('close', () => {
//     clients.splice(clients.indexOf(res), 1);
//   });
// });


// sseServer.listen(3001, () => {
//   console.log("🔄 Live reload server running on port 3001");
// });

// function triggerReload() {
//   clients.forEach(res => res.write("data: reload\n\n"));
// }
// //not working

// const buildOptions = {
//   entryPoints: ['src/index.jsx'],
//   bundle: true,
//   outfile: 'public/bundle.js',
//   format: 'esm',
//   jsx: 'automatic',
//   loader: { '.jsx': 'jsx', '.js': 'jsx' }, // Ensure JSX handling
// };

// async function buildProject() {
//   await build(buildOptions);
//   console.log('✅ Build complete!');
//   triggerReload(); // Notify browser to reload
// }

// // Start a static file server only once
// function startServer() {
//   console.log('🚀 Starting server on http://localhost:3000');
//   return spawn('yarn', ['serve', 'public', '-p', '3000', '-s'], {
//     stdio: 'inherit',
//     shell: true,
//   });
// }

// const server = startServer(); // Start server initially

// // Watch for file changes and rebuild
// chokidar.watch('src').on('change', async () => {
//   console.log('🔄 Rebuilding...');
//   await buildProject(); 
//   triggerReload();
//   startServer()
// });

// buildProject(); // Initial build


import { build } from 'esbuild';
import chokidar from 'chokidar';
import express from 'express';

const app = express();
const PORT = 3000;
const clients = [];

app.use(express.static('public'));

app.get('/reload', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.write("retry: 10000\n\n");

  clients.push(res);
  req.on('close', () => clients.splice(clients.indexOf(res), 1));
});

function triggerReload() {
  clients.forEach(res => res.write("data: reload\n\n"));
}

// ✅ esbuild Build Configuration
const buildOptions = {
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  format: 'esm',
  jsx: 'automatic',
  loader: { '.jsx': 'jsx', '.js': 'jsx' },
};

async function buildProject() {
  await build(buildOptions);
  console.log('✅ Build complete!');
  triggerReload(); // Notify browser to reload
}
if (process.env.NODE_ENV == "development") {
  chokidar.watch('src').on('change', async () => {
    console.log('🔄 Rebuilding...');
    await buildProject();
  });
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}


buildProject(); // Initial Build
