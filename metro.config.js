const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const additionalConfig = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'lottie'],
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();

const baseConfig = getDefaultConfig(__dirname);

const mergedConfig = mergeConfig(baseConfig, additionalConfig);

module.exports = mergedConfig;
