import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ react() ],
	base: './',
	build: {
		outDir: './vite-build',
		lib: {
			entry: fileURLToPath(new URL('./index.ts', import.meta.url)),
			name: 'index',
			fileName: 'index',
		},
		watch: {},
		sourcemap: true,
	},
})
