import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			'RazionStyles': path.resolve(__dirname, '..', 'libs', 'styles', 'index.css'),
			'RazionComponents': path.resolve(__dirname, '..', 'libs', 'components'),
			'RazionUtils': path.resolve(__dirname, '..', 'libs', 'utils'),
			'RazionServices': path.resolve(__dirname, '..', 'libs', 'services'),
			'RazionIcons': path.resolve(__dirname, '..', 'libs', 'icons', 'index.svg')
		},
	}
})
