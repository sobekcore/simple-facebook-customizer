import { resolve } from 'path';
import { defineCliConfig } from 'sanity/cli';
import { UserConfig } from 'vite';
import { SANITY_PROJECT_ID, SANITY_DATASET } from '../shared/sanity';

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  },
  vite: (config: UserConfig): UserConfig => {
    if (!config.resolve) {
      config.resolve = {};
    }

    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    config.resolve.alias = Object.assign(config.resolve.alias, {
      ['@']: resolve(__dirname),
    });

    return config;
  },
});
