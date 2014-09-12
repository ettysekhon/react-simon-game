'use strict';

var localStorageService = {
	get: function(key) {
		var val = localStorage[key];
		return val ? JSON.parse(val) : val;
	},
	set: function(key, object) {
		localStorage[key] = JSON.stringify(object);
	}
};

module.exports = localStorageService