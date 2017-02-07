# ignore-assets-webpack-plugin

[![Build Status](https://travis-ci.org/medfreeman/ignore-assets-webpack-plugin.svg?branch=master)](https://travis-ci.org/medfreeman/ignore-assets-webpack-plugin)
[![dependencies Status](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin/status.svg)](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin)
[![peerDependencies Status](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin/peer-status.svg)](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin?type=peer)
[![Coverage Status](https://coveralls.io/repos/github/medfreeman/ignore-assets-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/medfreeman/ignore-assets-webpack-plugin?branch=master)

## peerDependencies

webpack >=2.2.0

## Installation

```console
$ npm i -D ignore-assets-webpack-plugin
```

## Usage

```
webpack({
			entry: 'src/test.css',
			output: {
				filename: '[name]-dist.js'
			},
			module: {
				rules: [
					{
						test: /\.css$/,
						use: ExtractTextWebpackPlugin.extract({
							fallback: 'style-loader',
							use: [
								{
									loader: 'css-loader'
								}
							]
						})
					}
				]
			},
			plugins: [
				new ExtractTextWebpackPlugin('[name]-dist.css'),
				new IgnoreAssetsPlugin({
					ignore: 'main-dist.js'
				})
			]
		}
```

## Options

ignore: (String | Array) List of assets to be ignored by webpack.
