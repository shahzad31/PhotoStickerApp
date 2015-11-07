/**
 * Created by mshahzad on 06/11/2015.
 */
angular.module('photoStickerApp.draggableImg', [])
  .directive('draggableImg', function($document) {
    return {
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
