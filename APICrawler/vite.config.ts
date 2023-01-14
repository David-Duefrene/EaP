import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [ react() ],
	base: './',
	build: {
		ssr: true,
		sourcemap: 'inline',
		outDir: './vite-build',
		lib: {
			entry: fileURLToPath(new URL('./ElectronEntry.ts', import.meta.url)),
			name: 'ElectronEntry',
			fileName: 'ElectronEntry',
			formats: [ 'cjs' ,]
		},
		rollupOptions: {
			input: {
				Auth: fileURLToPath(new URL('./ElectronEntry.ts', import.meta.url)),
			},
			output: {
				entryFileNames: '[name].cjs',
			},
		},
		watch: {},
	},
})
