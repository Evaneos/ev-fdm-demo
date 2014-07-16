(function() {
	'use strict';
	angular.module('upload-demo', ['ev-fdm', 'ev-upload'])
		.filter('i18n', function () {
			return function (input) {
				return input;
			};
		})
		.controller('demo', function ($scope) {
			$scope.pictures = [];
			$scope.uploadUrl = "http://uploads.im/api?upload";
		});
}) ();