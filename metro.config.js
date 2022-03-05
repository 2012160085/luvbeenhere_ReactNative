const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('cjs');
defaultConfig.resolver.assetExts.push('cjs.js');
module.exports = defaultConfig;