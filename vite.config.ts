import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {configDefaults} from "vitest/config";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        exclude: [...configDefaults.exclude, 'e2e/**']
    }
});
