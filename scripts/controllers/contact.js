/**
 * Created by mshahzad on 09/11/2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name photoStickerApp.controller:AboutCtrl
 * @description
 * # ContactCtrl
 * Controller of the photoStickerApp
 */
angular.module('photoStickerApp')
  .controller('ContactCtrl', function ($scope) {
//make navbar class active over about
    $scope.homeActive=false;
    $scope.aboutActive=false;
    $scope.contactActive=true;
  });
