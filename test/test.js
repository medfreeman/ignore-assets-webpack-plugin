import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import test from 'ava';
import webpack from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import rimraf from 'rimraf';

import IgnoreAssetsPlugin from '../src/index';

import regeneratorRuntime from 'regenerator-runtime';

function randomPath() {
	return join(__dirname, 'dist', String(Math.random()).slice(2));
}

test('single entry chunk', async (t) => {
	const out = randomPath();

	await new Promise((resolve, reject) => {
		webpack({
			entry: join(__dirname, 'src/test.css'),
			bail: true,
			output: {
				path: out,
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
		}, (err, stats) => {
			err ? reject(err) : resolve(stats);
		});
	});

	const mainDistJsExists = existsSync(join(out, 'main-dist.js'));
	const mainDistCss = readFileSync(join(out, 'main-dist.css'), { encoding: 'utf8' });

	t.falsy(mainDistJsExists, 'dist js file should not exist');

	t.regex(mainDistCss, /\.test {/, 'has prelude');
});

test('single entry chunk with array ignore option', async (t) => {
	const out = randomPath();

	await new Promise((resolve, reject) => {
		webpack({
			entry: join(__dirname, 'src/test.css'),
			bail: true,
			output: {
				path: out,
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
					ignore: [
						'main-dist.js'
					]
				})
			]
		}, (err, stats) => {
			err ? reject(err) : resolve(stats);
		});
	});

	const mainDistJsExists = existsSync(join(out, 'main-dist.js'));
	const mainDistCss = readFileSync(join(out, 'main-dist.css'), { encoding: 'utf8' });

	t.falsy(mainDistJsExists, 'dist js file should not exist');

	t.regex(mainDistCss, /\.test {/, 'has prelude');
});

test.after((t) => {
	rimraf.sync(join(__dirname, 'dist'));
});
