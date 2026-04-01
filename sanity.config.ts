/**
 * Sanity Studio configuration
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { structure }   from './sanity/lib/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production';

export default defineConfig({
  name:     'zion4commerce',
  title:    'Zion4Commerce CMS',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [ structureTool({ structure }) ],
  schema:  { types: schemaTypes },
  document: {
    actions: (prev, ctx) => {
      const singletons = ['siteSettings', 'homePage', 'aboutPage', 'contactPage'];
      if (singletons.includes(ctx.schemaType))
        return prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate');
      return prev;
    },
  },
});
