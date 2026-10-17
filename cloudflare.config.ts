import {bindings, defineConfig} from 'cf/config';

export default defineConfig({
  worker: {
    name: 'nexsus-site',
    entrypoint: './worker/index.ts',
    compatibilityDate: '2026-10-17',
    workersDev: true,
    previewUrls: true,
    domains: ['nexsus.ma', 'www.nexsus.ma'],
    assets: {
      htmlHandling: 'drop-trailing-slash',
      notFoundHandling: '404-page',
      runWorkerFirst: true,
    },
    env: {
      ASSETS: bindings.assets(),
      APP_URL: bindings.text('https://nexsus.ma'),
      CONTACT_TO_EMAIL: bindings.text('contact@nexsus.ma'),
      CONTACT_FROM_EMAIL: bindings.text('NEXSUS <contact@nexsus.ma>'),
    },
    observability: {
      enabled: true,
      redactQueryString: true,
      logs: {
        enabled: true,
        invocationLogs: true,
      },
      traces: {
        enabled: true,
      },
    },
  },
});
