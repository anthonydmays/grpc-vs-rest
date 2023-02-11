import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:9090',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			}
		}
	}
});
