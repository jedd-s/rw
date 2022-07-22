// import { NextConfig } from 'next'
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  devIndicators: {
    // autoPrerender: false,
    buildActivity: false,
    /** Position of "building..." indicator in browser */
    // buildActivityPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
    // runtime: 'nodejs',
    runtime: 'nodejs',
    // runtime: 'experimental-edge',
    serverComponents: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
    // images: { allowFutureImage: true },
  },
  webpack(webpackConfig, options) {
    const { dir, dev, config, isServer, webpack } = options

    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        // 'React.StrictMode': JSON.stringify('React.Fragment'),
        __DEV__: JSON.stringify(dev),
        __CLIENT__: JSON.stringify(!isServer),
        __SERVER__: JSON.stringify(isServer),
      })
    )
    // webpackConfig.module.rules.push({
    //   test: /.?css$/,
    //   use: ['@parcel/css'],
    // })
    webpackConfig.optimization.minimize = true
    webpackConfig.optimization.minimizer.push(
      new CssMinimizerPlugin({
        // minimize: true,
        minify: CssMinimizerPlugin.parcelCssMinify,
        // Uncomment this line for options
        minimizerOptions: {
          // minify: true,
          // drafts: { nesting: true, customMedia: true },
        },
      })
    )

    // const jsxRuntime = require.resolve('react/jsx-runtime')
    // const jsxDevRuntime = require.resolve('react/jsx-dev-runtime')

    // webpackConfig.resolve.alias = {
    //   ...(webpackConfig.resolve.alias || {}),
    //   'react/jsx-runtime': jsxRuntime,
    //   'react/jsx-dev-runtime': jsxDevRuntime,
    // }

    // const [first, second, ...rest] = webpackConfig.module.rules

    // console.log(webpackConfig.module.rules),

    // oneOfJSRules.splice(3, 0, {
    // })

    return webpackConfig
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/rewritten-to-dashboard',
  //       destination: '/dashboard',
  //     },
  //   ]
  // },
}
