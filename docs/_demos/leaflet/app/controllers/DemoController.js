angular.module('demo')
    .controller('DemoController', ['$scope', 'PanelService', function($scope, panelService) {
        console.log("zob");

        panelService.open('right', {
            templateUrl: 'demopanel.phtml',
            push: true,
            controller: 'PanelController',
            panelClass: ''
        });
}]);
