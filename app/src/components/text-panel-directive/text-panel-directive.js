'use strict';

angular.module('lingua')
  .directive('textPanelDirective',
  ['AppData',
    function (AppData) {
      return {
        restrict: 'A',
        scope: {text: '='},
        templateUrl: '/src/components/text-panel-directive/text-panel.html',
        link: function(scope, elm, attrs) {

          // DIMENSIONS
          var lineHeight = 28;
          var viewPortHeight = 600;
          var pageHeight = Math.floor(viewPortHeight / lineHeight);
          //TODO - get height from test off screen
          //var height = document.getElementById('myTA').clientHeight;
          var height = 600;

          // TEXT
          var lines = [];

          var _wt = document.getElementById('widthTester');

          function parseParagraph(paragraph){
            var para = [];
            if(scope.text && scope.text.paragraphs.length > 0){
              para = {'words':paragraph.split(" ")};
            }
            return para;
          }
          parseParagraph();

          //var paragraph = scope.text.paragraphs[AppData.position.chapter].body;

          function drawParagraph(words){

            var span = document.createElement('span');
            var position;
            _wt.appendChild(span);

            var pageText="";
            var previousText="";
            for(var w=0; w<words.length; w++){

              pageText += words[w] + " ";
              span.innerHTML = pageText;

              if(span.offsetWidth > 400){
                w--;
                pageText = previousText;
                _wt.removeChild(span);

                span = document.createElement('span');
                _wt.appendChild(span);
                if(lines.length > 0 && lines.length === pageHeight){

                  position = {'index': w, 'sentence': lines[lines.length-1]};
                  lines = [];
                } else {
                  lines.push(pageText);
                }

                pageText = '';
              } else {
                previousText = pageText;
              }

            }



          }

// document.getElementById('myTA').innerHTML = page;
          // document.getElementById('myTA').css('text-align', 'justify');
        }
      }
    }]);