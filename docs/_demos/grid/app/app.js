// global angular
(function (angular) {
'use strict';
var app = angular.module('demo', ['ev-fdm'])
	.directive('gridDemo', function () {
		return {
			template:
				"<div>" +
				"	<p>" +
				"		<button class=\"btn btn-default\" type=\"button\" " +
				"			ng-click=\"containerSize='xs'\" "+
				"			ng-class=\"{ active: containerSize === 'xs' }\"> xs </button>" +
				"		<button class=\"btn btn-default\" type=\"button\" " +
				"			ng-click=\"containerSize='sm'\" "+
				"			ng-class=\"{ active: containerSize === 'sm' }\"> sm </button>" +
				"		<button class=\"btn btn-default\" type=\"button\" " +
				"			ng-click=\"containerSize='md'\" "+
				"			ng-class=\"{ active: containerSize === 'md' }\"> md </button>" +
				"		<button class=\"btn btn-default\" type=\"button\" " +
				"			ng-click=\"containerSize='lg'\" "+
				"			ng-class=\"{ active: containerSize === 'lg' }\"> lg </button>" +
				"	</p>" +
				"	<div class=\"well demo-ev-size\" ng-class=\"'ev-size-' + containerSize\" ng-transclude></div>" +
				"{{containerSize}}" +
				"</div>",
			transclude: true,
			scope: true,
			link: function linkGridDemo(scope, elem, attrs) {
				scope.containerSize = (attrs.containerSize) ? attrs.containerSize : "md";
				console.log(scope.containerSize);
			}
		};
	});
})(angular);
