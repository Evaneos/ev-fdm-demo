// global angular
(function (angular) {
'use strict';
angular.module('demo', ['ev-fdm'])
    .run(function (PanelService) {
        // Open panel for the first demo
        PanelService.open({
            name: 'ResponsivePanel1',
            templateUrl: 'responsive-panel.html',
        }, 'responsive-example');
        PanelService.open({
            name: 'ResponsivePanel2',
            templateUrl: 'responsive-panel.html',
        }, 'responsive-example');
    })

    .run(function (PanelService) {
        PanelService.open({
            name: 'stacked-panel-1',
            templateUrl: 'stacked-panel.html',
        }, 'stacked-example');
        PanelService.open({
            name: 'stacked-panel-2',
            templateUrl: 'stacked-panel.html',
        }, 'stacked-example');
        PanelService.open({
            name: 'stacked-panel-3',
            templateUrl: 'stacked-panel.html',
        }, 'stacked-example');
    });
})(angular);
