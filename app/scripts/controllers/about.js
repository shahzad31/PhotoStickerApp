'use strict';

/**
 * @ngdoc function
 * @name photoStickerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the photoStickerApp
 */
angular.module('photoStickerApp')
  .controller('AboutCtrl', function ($scope) {
    //make navbar class active over about
    $scope.homeActive=false;
    $scope.aboutActive=true;
    $scope.contactActive=false;
  });
