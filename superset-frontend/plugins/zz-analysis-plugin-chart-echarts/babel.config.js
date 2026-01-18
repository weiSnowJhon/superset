const { getConfig } = require('@airbnb/config-babel');

const config = getConfig({
  library: true,
  react: true,
  next: true,
  esm: process.env.BABEL_OUTPUT === 'esm',
  node: process.env.NODE_ENV === 'test',
  typescript: true,
  env: {
    targets: { esmodules: true },
  },
});

// Remove all React presets (both string and array forms) and add one with automatic runtime
config.presets = config.presets
  .filter(preset => {
    if (typeof preset === 'string') {
      return !preset.includes('react');
    }
    if (Array.isArray(preset)) {
      const presetName = typeof preset[0] === 'string' ? preset[0] : '';
      return !presetName.includes('react');
    }
    return true;
  })
  .concat([
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ]);

config.plugins = [
  ['babel-plugin-transform-dev', { evaluate: false }],
  ['babel-plugin-typescript-to-proptypes', { loose: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];

module.exports = config;
