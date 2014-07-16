(function() {
	'use strict';
	angular.module('language-demo', ['ev-fdm'])
		.filter('i18n', function () {
			return function (input) {
				return input;
			};
		})
		.config(['evSelectLanguageProvider', function (cfg) {
			cfg.setLanguages(['fr', 'en', 'es', 'it']);
		}]);
}) ();