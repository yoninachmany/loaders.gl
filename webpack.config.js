/* eslint-disable import/no-extraneous-dependencies */
const getWebpackConfig = require('ocular-dev-tools/config/webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env = {}) => {
  const config = getWebpackConfig(env);

  config.plugins = config.plugins || [];
  config.plugins.push(new BundleAnalyzerPlugin());

  config.node = {
    buffer: false
  };

  console.error(JSON.stringify(config, null, 2));

  config.module.rules.push({
    // Load worker tests
    test: /\.worker\.js$/,
    use: {
      loader: 'worker-loader'
    }
  });

  // Uncomment to debug config
  // console.error(JSON.stringify(config, null, 2));

  return [
    config
    // For worker tests - currently disabled
    // Output bundles to root and can be loaded with `new Worker('/*.worker.js')`
    /*
    {
      mode: 'development',
      entry: {
        'json-loader': './modules/loader-utils/test/lib/worker-loader-utils/json-loader.worker.js',
        'jsonl-loader': './modules/loader-utils/test/lib/worker-loader-utils/jsonl-loader.worker.js'
      },
      output: {
        filename: '[name].worker.js'
      },
      target: 'webworker'
    }
    */
  ];
};
