'use strict';


// configure the loading bar to be displayed just beneath the menu
commonModule.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = 'body';
    cfpLoadingBarProvider.includeSpinner = false;
}]);


var app = angular.module('demo', [ 'ui.router', 'ev-fdm', 'ev-leaflet']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('index', {
          url: '/',
          templateUrl: 'index.phtml',
          controller: 'DemoController'
      });

  $urlRouterProvider.otherwise("/");
}]);


app.config(['evLeafletProvider', function(evLeafletProvider) {
    evLeafletProvider
        .setIcons({
            default: { iconUrl: '/bower_components/ev-fdm/dist/images/leaflet/lecture.png', shadowUrl: '/bower_components/ev-fdm/dist/images/leaflet/blank.png'},
            draggable: { iconUrl: '/bower_components/ev-fdm/dist/images/leaflet/edition.png', shadowUrl: '/bower_components/ev-fdm/dist/images/leaflet/blank.png'}
        });
}]);
