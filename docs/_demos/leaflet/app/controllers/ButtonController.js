angular.module('demo')
    .controller('ButtonController', ['$scope', 'PanelService', function($scope, panelService) {
        $scope.openPanel = function() {
        	panelService.open('right', {
	            templateUrl: 'demopanel.phtml',
	            push: false,
	            controller: 'PanelController'
	        });
        };
}]);
