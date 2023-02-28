import { SanityClient, createClient } from '@sanity/client';

export const SANITY_PROJECT_ID: string = 'uizhoci7';

export const SANITY_DATASET: string = 'production';

export const sanityClient: SanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: 'v1',
  useCdn: true,
});
