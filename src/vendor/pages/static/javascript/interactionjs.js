/*
 ** Draggable : stack[JQuery, Javascript]
 ** Draggable events : mousedown, mousemove, mouseup
 */
$('.element').on("click", function(event) {
  $('.element').removeClass('selected');
  $(this).addClass("selected");
});

$('.fixedBackground').on("click", function(event) {
  $('.element').removeClass('selected');
});

$("#handles_size_horizontal").css({
  'width': ($(".element").width() - 20) + 'px',
});

$("#handles_size_vertical #range-width-svg").css({
  'height': ($(".element").height() - 20) + 'px',
});

$("#handles_size_vertical_left #range-angle").css({
  'height': ($(".element").height() - 20) + 'px',
});

$('.element').on("mousedown", function(event) {
  var move = $(this);
  var matrix_list = matrix_translate3d(this);

  var lastOffset = move.data('lastTransform');
  var lastOffsetX = lastOffset ? lastOffset.dx : matrix_list[0];
  var lastOffsetY = lastOffset ? lastOffset.dy : matrix_list[1];

  var startX = event.pageX - lastOffsetX;
  var startY = event.pageY - lastOffsetY;

  var angle = elementAngle(this);

  $(document).on("mousemove", function(e) {
    var newDx = e.pageX - startX;
    var newDy = e.pageY - startY;

    move.css('transform', 'translate3d(' + newDx + 'px, ' + newDy + 'px, 0px) rotate(' + angle + 'deg)');
    $('#handles_manager').css('visibility','hidden');

    move.data('lastTransform', {
      dx: newDx,
      dy: newDy
    });
  });
});
$(document).on("mouseup", function() {
  $(this).off("mousemove");
});
/* --------------------------------------------------------------------- */

/*
 ** Resizable : stack[JQuery, JQuery UI, JQuery CSS, Javascript]
 ** Resizable events : mousedown (count as click), resizable
 */


$('#tb-fontSize').on("change", function(event) { 
  selected_JQ = $('.selected'); 
  var selected_JS;  
  var selected_element = document.getElementsByClassName('selected');
  for (var i = 0; i < selected_element.length; i++) {selected_JS = selected_element[i];}
  var matrix_list = matrix_translate3d(selected_JS);
  var angle = elementAngle(selected_JS);
  var position_x = matrix_list[0];
  var position_y = matrix_list[1];
  var height = selected_JS.children[0].offsetHeight;
  var width = selected_JS.children[0].offsetWidth;

  $('#handles_manager').css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': (width + 15) + 'px',
    'visibility': 'visible',
  });

  selected_JQ.css({
    'font-size': event.target.value + 'px',
    'height': height + 'px',  
    'width': width + 'px',
  });
});



$('.text').on("click", function(event) {
  selected_JQ = $('.selected');
  var selected_JS;  
  var selected_element = document.getElementsByClassName('selected');
  for (var i = 0; i < selected_element.length; i++) {selected_JS = selected_element[i];}
  var matrix_list = matrix_translate3d(selected_JS);
  var angle = elementAngle(selected_JS);
  var position_x = matrix_list[0];
  var position_y = matrix_list[1];
  var height = selected_JS.children[0].offsetHeight;
  var width = selected_JS.children[0].offsetWidth;

  var fontSizeValue = parseInt(window.getComputedStyle(selected_JS, null).getPropertyValue('font-size'));
  document.getElementById('tb-select-fontSize').value = fontSizeValue;

  $('#handles_manager').css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': (width + 15) + 'px',
    'visibility': 'visible',
  });

  $("#range-width-text, #tb-fontSize").css({'visibility':'visible'});
  $("#range-width-svg").css({'visibility':'hidden'});


  $("#range-width-text").slider({
    min: 15,
    max: $(".element").width(),
    value: $('#handles_manager').width() + 15,
    slide: function(event, ui) {
       resizeText(ui.value);
    }
  }).slider("pips", {
    first: "pip",
    last: "pip"
  }); 

});


function resizeText(value) {
  var selected_JS;  
  var selected_element = document.getElementsByClassName('selected');
  for (var i = 0; i < selected_element.length; i++) {selected_JS = selected_element[i];}
  var matrix_list = matrix_translate3d(selected_JS);
  var position_x = matrix_list[0];
  var position_y = matrix_list[1];
  var angle = elementAngle(selected_JS);
  var height = selected_JS.children[0].offsetHeight;

  $(".selected").css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': value + 'px',
  });

  $('#handles_manager').css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': value + 'px',
  });
}

/* --------------------------------------------------------------- */

$('.svg').on("click", function(event) {
  selected_JQ = $('.selected');
  var selected_JS;  
  var selected_element = document.getElementsByClassName('selected');
  for (var i = 0; i < selected_element.length; i++) {selected_JS = selected_element[i];}
  var matrix_list = matrix_translate3d(selected_JS);
  var angle = elementAngle(selected_JS);
  var position_x = matrix_list[0];
  var position_y = matrix_list[1];
  var height = selected_JS.children[0].offsetHeight;
  var width = selected_JS.children[0].offsetWidth;

  $('#handles_manager').css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': (width + 15) + 'px',
    'visibility': 'visible',
  });

  $("#range-width-svg").css({'visibility':'visible'});
  $("#range-width-text, #tb-fontSize, #range-size-text").css({'visibility':'hidden'});

  $("#range-width-svg").slider({
    orientation: 'vertical',
    range: "max",
    min: 50,
    max: $(".element").width(),
    value: $('#handles_manager').width() + 15,
    slide: function(event, ui) {
       resizeSvg(ui.value);
    }
  }).slider("pips", {
    first: "pip",
    last: "pip"
  });
});

function resizeSvg(value) {
  var selected_JS;  
  var selected_element = document.getElementsByClassName('selected');
  for (var i = 0; i < selected_element.length; i++) {selected_JS = selected_element[i];}
  var matrix_list = matrix_translate3d(selected_JS);
  var position_x = matrix_list[0];
  var position_y = matrix_list[1];
  var angle = elementAngle(selected_JS);
  var height = selected_JS.children[0].offsetHeight;

  $(".selected").css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': value + 'px',
  });

  $('#handles_manager').css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': value + 'px',
  });
}

/* --------------------------------------------------------------- */

$('.element').on("click", function(event) {
  selected_JQ = $('.selected');
  var selected_JS;  
  var selected_element = document.getElementsByClassName('selected');
  for (var i = 0; i < selected_element.length; i++) {selected_JS = selected_element[i];}
  var matrix_list = matrix_translate3d(selected_JS);
  var angle = elementAngle(selected_JS);
  var position_x = matrix_list[0];
  var position_y = matrix_list[1];
  var height = selected_JS.children[0].offsetHeight;
  var width = selected_JS.children[0].offsetWidth;

  $('#handles_manager').css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + angle + 'deg)',
    'height': height + 'px',
    'width': (width + 15) + 'px',
    'visibility': 'visible',
  });

  $("#range-angle").slider({
    orientation: 'vertical',
    range: "max",
    min: 0,
    max: 360,
    value: angle,
    slide: function(event, ui) {
       turnToAngle(ui.value);
    }
  }).slider("pips", {
    first: "pip",
    last: "pip"
  });
});

function turnToAngle(value) {
  var selected_JS;  
  var selected_element = document.getElementsByClassName('selected');
  for (var i = 0; i < selected_element.length; i++) {selected_JS = selected_element[i];}
  var matrix_list = matrix_translate3d(selected_JS);
  var position_x = matrix_list[0],
      position_y = matrix_list[1];

  var height = selected_JS.children[0].offsetHeight;  
  var width = selected_JS.children[0].offsetWidth;

  $(".selected").css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + value + 'deg)',
    'height': height + 'px',
    'width': width + 'px',
  });

  $('#handles_manager').css({
    'transform': 'translate3d(' + (position_x) + 'px, ' + (position_y) + 'px, 0px) rotate(' + value + 'deg)',
    'height': height + 'px',
    'width': width + 'px',
  });
}

/* ---------------------- FUNCTIONS ------------------------------ */

/*
 ** translate3d calculator : stack[JQuery, Javascript]
 ** translate3d calculator events : function, matrix
 */

function matrixToArray(matrix) {
  return matrix.substr(7, matrix.length - 8).split(', ');
}

function matrix_translate3d(pos) {
  var matrix_list = [];
  matrix = matrixToArray($(pos).css("-webkit-transform"));
  x = matrix[4].replace(/px/gi, '');
  y = matrix[5].replace(/px/gi, '');
  matrix_list.push(parseInt(x));
  matrix_list.push(parseInt(y));
  return matrix_list;
}

/*
 ** angle calculator : stack[Javascript]
 ** angle calculator events : function, matrix, Math
 */

function elementAngle(deg) {
  var el = deg;
  var st = window.getComputedStyle(el, null);
  var tr = st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform");

  var values = tr.split('(')[1].split(')')[0].split(',');
  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];
  var scale = Math.sqrt(a * a + b * b);
  var sin = b / scale;
  var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle;
}


