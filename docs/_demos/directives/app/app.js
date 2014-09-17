'use strict';
var app = angular.module('demo', ['ev-fdm']);


app.controller('TagController', ['$scope', function($scope) {
  $scope.context = {
    editMode: false,
    tags: [
      { name: 'Tartiflette'},
      { name: 'Endives au jambon'},
      { name: 'Petit salé'},
      { name: 'Ouiche'},
      { name: 'Camembert'},
      { name: 'Saucisses de morteaux'},
      { name: 'Lasagnes'}
    ]
  };

  $scope.newPlate = {
    name: ''
  };

  $scope.addPlate = function() {
    $scope.context.tags.unshift(angular.copy($scope.newPlate));
    $scope.newPlate.name = '';
  };
}]);