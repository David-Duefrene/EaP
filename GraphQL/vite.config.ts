import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	build: {
		outDir: './vite-build',
		lib: {
			entry: fileURLToPath(new URL('./ElectronEntry.ts', import.meta.url)),
			name: 'ElectronEntry',
			fileName: 'ElectronEntry',
		},
		watch: {},
	},
})
