import { build } from 'esbuild';
import chokidar from 'chokidar';

const buildOptions = {
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  sourcemap: true,
  loader: { '.js': 'jsx' },
};

async function buildProject() {
  await build(buildOptions);
  console.log('✅ Build complete!');
}

// Watch for file changes and rebuild
chokidar.watch('src').on('change', async () => {
  console.log('🔄 Rebuilding...');
  await buildProject();
});

buildProject();
