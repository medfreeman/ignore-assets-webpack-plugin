/* eslint no-param-reassign: ["error", { "props": false }] */

/**
 * @author Mehdi Lahlou <mehdi.lahlou@free.fr>
 */

import _ from 'lodash';

let ignoredAssets = [];

function IgnoreAssetsPlugin(options) {
	if (typeof options === 'object') {
		ignoredAssets = _.isArray(options.ignore) ? options.ignore : [options.ignore];
	}
}

IgnoreAssetsPlugin.prototype.apply = (compiler) => {
	compiler.plugin('after-compile', (compilation, callback) => {
		const compiledAssets = _.keys(compilation.assets);
		ignoredAssets.forEach((element) => {
			if (_.indexOf(compiledAssets, element) !== -1) {
				delete compilation.assets[element];
			}
		});
		callback();
	});
};

export default IgnoreAssetsPlugin;
