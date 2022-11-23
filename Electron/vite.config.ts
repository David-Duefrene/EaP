import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ react() ],
	base: './',
	build: {
		outDir: './vite-build',
		emptyOutDir: false,
		lib: {
			entry: fileURLToPath(new URL('./index.ts', import.meta.url)),
			formats: [ 'es' ],
			fileName: 'index',
		},
		rollupOptions: {
			input: {
				ElectronMain: fileURLToPath(new URL('./index.ts', import.meta.url)),
				Preload: fileURLToPath(new URL('./preload.ts', import.meta.url)),
			},
		},
		watch: {},
		sourcemap: false,
	},
})
