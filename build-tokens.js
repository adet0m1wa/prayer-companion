import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { usesReferences, getReferences } from 'style-dictionary/utils';

// Register Tokens Studio transforms, preprocessors, and formats
await register(StyleDictionary);

// Custom format: Tailwind v4 @theme { } wrapper with namespaced variables
StyleDictionary.registerFormat({
  name: 'css/tailwind-theme',
  format: ({ dictionary, options }) => {
    const { outputReferences } = options;
    const lines = [];

    for (const token of dictionary.allTokens) {
      // Only include color, spacing, radius, and icon tokens
      const category = token.path[0];
      if (!['color', 'spacing', 'radius', 'icon', 'surface', 'text', 'interactive', 'border'].includes(category)) {
        continue;
      }

      // Build Tailwind v4 namespaced variable name
      let varName;
      if (['surface', 'text', 'interactive', 'border'].includes(category)) {
        // Semantic color tokens → --color-*
        varName = `--color-${token.path.join('-')}`;
      } else if (category === 'color') {
        varName = `--color-${token.path.slice(1).join('-')}`;
      } else if (category === 'spacing') {
        varName = `--spacing-${token.path.slice(1).join('-')}`;
      } else if (category === 'radius') {
        varName = `--radius-${token.path.slice(1).join('-')}`;
      } else if (category === 'icon') {
        varName = `--icon-${token.path.slice(1).join('-')}`;
      }

      let value;
      if (outputReferences && usesReferences(token.original.$value)) {
        const refs = getReferences(token.original.$value, dictionary.tokens);
        value = `var(--${refs[0].name})`;
      } else {
        value = token.$value;
      }

      lines.push(`  ${varName}: ${value};`);
    }

    return `@theme {\n${lines.join('\n')}\n}\n`;
  },
});

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
        {
          destination: 'tailwind-tokens.css',
          format: 'css/tailwind-theme',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

console.log('✓ Token build complete');
