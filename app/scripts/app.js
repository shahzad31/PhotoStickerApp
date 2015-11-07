'use strict';

/**
 * @ngdoc overview
 * @name photoStickerApp
 * @description
 * # photoStickerApp
 *
 * Main module of the application.
 */
angular
  .module('photoStickerApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'photoStickerApp.main',
    'photoStickerApp.draggableImg',
    'photoStickerApp.about',
    'photoStickerApp.imageSvg',
    'photoStickerApp.ngFileSelect',
    'photoStickerApp.stickerItem'


  ])
  .config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/'
      });
  });
