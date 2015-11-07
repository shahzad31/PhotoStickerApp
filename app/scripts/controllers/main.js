'use strict';

/**
 * @ngdoc function
 * @name photoStickerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the photoStickerApp
 */
angular.module('photoStickerApp.main', ['photoStickerApp.draggableImg','photoStickerApp.imageSvg','ui.bootstrap','photoStickerApp.ngFileSelect','photoStickerApp.stickerItem'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    });
  }])
  .controller('MainCtrl', function ($scope,$uibModal, $log) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
    var localStorageSpace = function(){
      var allStrings = '';
      for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
          allStrings += window.localStorage[key];
        }
      }
      return allStrings ? 3 + ((allStrings.length*16)/(8*1024*1024)) : 'Empty (0 KB)';
    };
    if(Math.round(localStorageSpace)>4999){
      alert('Local Storage is exceeding 5MB limit');
    }
    $scope.stickersCache = []; // This collection will be used to render sticker directives
    if(typeof(Storage) !== "undefined") {
      if(localStorage.stickersCache){
        $scope.stickersCache=JSON.parse(localStorage.getItem("stickersCache"));
      }
      if(localStorage.svgImage){
        $scope.svgImage=localStorage.getItem("svgImage");
      }
    }
    $scope.open = function () {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          file:$scope.file
        }
      });
      modalInstance.result.then(function (file) {
        $scope.file = file;
        file.id=$scope.stickersCache.length+1;
        $scope.stickersCache.push(file);
        localStorage.setItem("stickersCache",JSON.stringify($scope.stickersCache));
      }, function () {
      });
    };
    $scope.exportImage= function () {
      var svg = document.querySelector( "svg" );
      svg.setAttribute('width',"650");
      svg.setAttribute('height',"400");
      var svgData = new XMLSerializer().serializeToString( svg );

      var canvas = document.createElement( "canvas" );
      var ctx = canvas.getContext( "2d" );
      canvas.width=svg.width.animVal.value;
      canvas.height=svg.height.animVal.value;

      var img = document.createElement( "img" );
      img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );
      img.width=canvas.width;
      img.height=canvas.height;
      img.onload = function() {
        ctx.drawImage( img, 0, 0,img.width,img.height );

        // Now is done
        var dataURL= canvas.toDataURL( "image/png" );
        var a = $("<a>")
          .attr("href", dataURL)
          .attr("download", "img.png")
          .appendTo("body");

        a[0].click();

        a.remove();
      };
      localStorage.setItem("svgImage",svgData);
    };
    $scope.startOver= function () {
      localStorage.removeItem('svgImage');
      var svg=SVG(document.querySelector("svg").id);
      svg.clear();
    }
  });
angular.module('photoStickerApp.main').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.file={};
  $scope.ok = function () {
    if($scope.file.title && $scope.file.src)
    $uibModalInstance.close($scope.file);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.getFile=function(file){
      if (file.type.match('image.*')) {
        var reader = new FileReader();
        reader.onload = (function (theFile) {
          return function (e) {
            $scope.file.dataURL=e.target.result;
          };
        })(file);
        reader.readAsDataURL(file);
      }
  };
});
