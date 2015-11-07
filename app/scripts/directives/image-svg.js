/**
 * Created by mshahzad on 05/11/2015.
 */
angular.module('photoStickerApp.imageSvg', [])
  .directive('imageSvg',  function() {
    return {
      link: function(scope, element, attr) {
        var svgContainer = element.find(".svgContainer")[0];
        var draw;
        if(localStorage.svgImage){
          var svgDiv=$(localStorage.svgImage);
          svgContainer.appendChild(svgDiv[0]);
          draw=SVG(svgDiv[0].id);

          // draw.svg(localStorage.svgImage);
        }else{
           draw=SVG(svgContainer);
        }
        var svg = element.find("svg")[0];
        var filBtn = element.find("#fileBtn");
        var image;
        var imagesList=[];
        $(svg).droppable({
          drop: function (event, ui) {
            var img = ui.draggable[0];
            var $newPosX = ui.offset.left - $(this).offset().left;
            var $newPosY = ui.offset.top - $(this).offset().top;
            var image = draw.image(img.src,img.width,img.height).x($newPosX).y($newPosY);
            image.draggable();
            imagesList.push(image);
            image.click(function(){
              imagesList.forEach(function(item,index){
                item.resize('stop');
                item.select(false);
              });
              image.select().resize();
            });
          }
        });
        filBtn.on('change', handleImageSelect);
        function handleImageSelect(evt) {
          var files = evt.target.files;
          for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
              continue;
            }
            var reader = new FileReader();
            if (image) {
              image.remove();
            }
            reader.onload = (function (theFile) {
              return function (e) {
                imagesList=[];
                draw.clear();
                image = draw.image(e.target.result);
                image.click(function(){
                  imagesList.forEach(function(item,index){
                    item.resize('stop');
                    item.select(false);
                  });
                });
                image.size("100%", "100%");
              };
            })(f);
            reader.readAsDataURL(f);
          }
        }


        window.addEventListener('beforeunload', function() {
          imagesList.forEach(function(item,index){
            item.resize('stop');
            item.select(false);
          });
          var svg = document.querySelector( "svg" );
          svg.setAttribute('width',"650");
          svg.setAttribute('height',"400");
          var svgData = new XMLSerializer().serializeToString( svg );
          localStorage.setItem("svgImage",svgData);
        });
      }
    };
  });
