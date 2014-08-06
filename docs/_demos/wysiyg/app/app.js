'use strict';


var app = angular.module('wysiwyg-demo', [ 'ui.router', 'ev-fdm', 'ev-tinymce'])
    .controller('demo', function ($scope) {
        $scope.demoText = "Lorem. (etc). ";
    });
