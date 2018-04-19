'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint no-param-reassign: ["error", { "props": false }] */

/**
 * @author Mehdi Lahlou <mehdi.lahlou@free.fr>
 */

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IgnoreAssetsPlugin(options) {
	this.ignoredAssets = [];
	if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
		this.ignoredAssets = _lodash2.default.isArray(options.ignore) ? options.ignore : [options.ignore];
	}
}

IgnoreAssetsPlugin.prototype.apply = function apply(compiler) {
	var _this = this;

	compiler.plugin('emit', function (compilation, callback) {
		var compiledAssets = _lodash2.default.keys(compilation.assets);
		_this.ignoredAssets.forEach(function (element) {
			if (_lodash2.default.indexOf(compiledAssets, element) !== -1) {
				delete compilation.assets[element];
			}
		});
		callback();
	});
};

exports.default = IgnoreAssetsPlugin;
module.exports = exports['default'];