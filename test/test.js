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

test('multiple configs', async (t) => {
	const out = randomPath();

	await new Promise((resolve, reject) => {
    const buildConfig = (entry) => ({
			entry: {
        [entry]: join(__dirname, 'src/' + entry + '.css')
      },
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
					ignore: entry + '-dist.js'
				})
			]
		})
		webpack([
      buildConfig('test'),
      buildConfig('test2')
    ], (err, stats) => {
			err ? reject(err) : resolve(stats);
		});
	});

	const firstDistJsExists = existsSync(join(out, 'test-dist.js'));
  const firstDistCss = readFileSync(join(out, 'test-dist.css'), { encoding: 'utf8' });

  t.falsy(firstDistJsExists, 'dist js file should not exist');
	t.regex(firstDistCss, /\.test {/, 'has prelude');
  
  const secondDistJsExists = existsSync(join(out, 'test2-dist.js'));
  const secondDistCss = readFileSync(join(out, 'test2-dist.css'), { encoding: 'utf8' });
  
  t.falsy(secondDistJsExists, 'dist js file should not exist');
	t.regex(secondDistCss, /\.test {/, 'has prelude');
});

test.after((t) => {
	rimraf.sync(join(__dirname, 'dist'));
});
