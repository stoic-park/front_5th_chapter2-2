import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default mergeConfig(
    defineConfig({
        plugins: [react()],
        base: process.env.NODE_ENV === 'production' ? '/front_5th_chapter2-2/' : '/',
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.refactoring.html'),
                    notFound: resolve(__dirname, '404.html'),
                },
            },
        },
    }),
    defineTestConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTests.ts',
        },
    })
);
