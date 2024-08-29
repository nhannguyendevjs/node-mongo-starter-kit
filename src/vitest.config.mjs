import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['verbose', 'json', 'html'],
    outputFile: {
      html: './dist/test-result/html/index.html',
      json: './dist/test-result/json/index.json',
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['html'],
      reportsDirectory: './dist/test-result/coverage/html',
    },
  },
});
