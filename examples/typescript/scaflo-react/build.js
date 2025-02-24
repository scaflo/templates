import { build } from 'esbuild';
import chokidar from 'chokidar';

const buildOptions = {
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: './build.js',
  sourcemap: true,
  loader: { '.js': 'jsx' },
};

async function buildProject() {
  await build(buildOptions);
  console.log('Built successfully!');
}

// Watcher for live updates
chokidar.watch('src').on('change', async () => {
  console.log('Rebuilding...');
  await buildProject();
});

buildProject();
