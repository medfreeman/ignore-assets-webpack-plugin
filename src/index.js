/* eslint no-param-reassign: ["error", { "props": false }] */

/**
 * @author Mehdi Lahlou <mehdi.lahlou@free.fr>
 */

import _ from 'lodash';

function IgnoreAssetsPlugin(options) {
	this.ignoredAssets = [];
	if (typeof options === 'object') {
		this.ignoredAssets = _.isArray(options.ignore) ? options.ignore : [options.ignore];
	}
}

IgnoreAssetsPlugin.prototype.apply = function apply(compiler) {
	compiler.plugin('emit', (compilation, callback) => {
		const compiledAssets = _.keys(compilation.assets);
		this.ignoredAssets.forEach((element) => {
			if (_.indexOf(compiledAssets, element) !== -1) {
				delete compilation.assets[element];
			}
		});
		callback();
	});
};

export default IgnoreAssetsPlugin;
