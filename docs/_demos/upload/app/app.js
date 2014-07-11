(function() {
	'use strict';
	angular.module('upload-demo', ['ngMockE2E', 'ev-fdm', 'ev-upload'])
		// CONFIG FAKE SERVER for handling methods
		.run(['$httpBackend', function (httpBackend) {
			console.log('aatadaazazazaa');
			var id = 0;
			httpBackend
				.whenPOST('/pictures')
				.respond(200, {yadi: 'yada'});
				// .respond(function (method, url, data) {
				// 	return (data['flickr-url'])?
				// 		[200, {id: id++, url: data['flickr-url']}]
				// 	:
				// 		[200, {id: id++, url:'my/path/to/upload' + id}]
				// 	;
				// });
		}])
		.filter('i18n', function () {
			return function (input) {
				return input;
			};
		})
		.controller('demo', function () {
			// $scope
		});
}) ();