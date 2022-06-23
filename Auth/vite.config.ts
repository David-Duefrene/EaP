import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: './',
	build: {
		outDir: './vite-build',
		lib: {
			entry: fileURLToPath(new URL('./auth.ts', import.meta.url)),
			name: 'auth',
			fileName: 'auth',
		},
		rollupOptions: {
			input: {
				Auth: fileURLToPath(new URL('./auth.ts', import.meta.url)),
			},
		},
	},
});
