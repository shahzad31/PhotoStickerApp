/**
 * Created by mshahzad on 06/11/2015.
 */
angular.module('photoStickerApp.stickerItem', [])
  .directive('stickerItem', function($document) {
    return {
      templateUrl: 'views/directives/sticker-item.html',
      restrict: 'E',
      scope: false,
      link: function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;
        element.draggable({
          revert: true,
          refreshPositions: true,
          revertDuration:0,
          drag: function (event, ui) {
            ui.helper.addClass("draggable");
          },
          stop: function (event, ui) {
            // ui.helper.removeClass("draggable");
          }
        });
      }
    };
  });
