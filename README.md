# ignore-assets-webpack-plugin

[![Build Status](https://travis-ci.org/medfreeman/ignore-assets-webpack-plugin.svg?branch=master)](https://travis-ci.org/medfreeman/ignore-assets-webpack-plugin)
[![dependencies Status](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin/status.svg)](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin)
[![peerDependencies Status](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin/peer-status.svg)](https://david-dm.org/medfreeman/ignore-assets-webpack-plugin?type=peer)
[![Coverage Status](https://coveralls.io/repos/github/medfreeman/ignore-assets-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/medfreeman/ignore-assets-webpack-plugin?branch=master)
[![npm version](https://badge.fury.io/js/ignore-assets-webpack-plugin.svg)](https://badge.fury.io/js/ignore-assets-webpack-plugin)

## peerDependencies

webpack >=2.2.0

## Installation

```console
$ npm i -D ignore-assets-webpack-plugin
```

## Usage

```
/* ES6 */
import IgnoreAssetsWebpackPlugin from 'ignore-assets-webpack-plugin';

/* ES5 - CommonJS */
var IgnoreAssetsWebpackPlugin = require('ignore-assets-webpack-plugin');


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


## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
