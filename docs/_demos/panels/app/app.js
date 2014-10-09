// global angular
(function (angular) {
'use strict';
angular.module('demo', ['ev-fdm'])
	.run(function (PanelService) {
		PanelService.open({
            name: 'ResponsivePanel1',
            templateUrl: 'responsive-panel-1.html',
        });
        PanelService.open({
            name: 'ResponsivePanel2',
            templateUrl: 'responsive-panel-1.html',
        });
	});
	// .controller('panelDemoController', function (PanelService, $scope) {
	// 	$scope.openResponsivePanel = function() {
	// 		PanelService.open({
	//             name: 'ResponsivePanel',
	//             // templateUrl: 'responsive-panel-1.html',
	//             template: '<p> Yo </p>',
	//             index: 0
	//         });
	// 	};
	// });
})(angular);
