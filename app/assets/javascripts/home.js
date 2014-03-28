var video = document.querySelector("#vid");
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var dataURL;

var nIntervId;

$(function(){
  $('#countdown, .digit').hide();
})

function setIntervalLoop(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {
       callback();
       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

function sizeCanvas(container){
  $fullWidth = $(container).width();
  $('canvas').each(function(){
    $(this).attr('width', $fullWidth/3)
  })
}

function takePic() {
  setIntervalLoop(function(logCallback) {

    // self.setInterval(function(){anim()},1325);
    ctx.drawImage(video, 0, 0);
    $('#image').append('<div class="row"><div class="col-md-4 col-offset-md-4"><img src="'+canvas.toDataURL('image/png')+'" class="image-responsive"></div></div>')

    Caman("#image img", function () {
      this.brightness(20);
      this.contrast(10);
      this.render(function () {
        console.log("Done!");
      });
    });

    dataURL =  canvas.toDataURL('image/png');
    var file= dataURLtoBlob(dataURL);
    var name = $('#name').val()
    var fd = new FormData();

    fd.append("image", file);
    fd.append("name", name)

    $.ajax({
       url: "/save_photo",
       type: "POST",
       data: fd,
       processData: false,
       contentType: false,
    });
  }, 3000, 3);
}

var onCameraFail = function (e) {
  console.log('Camera did not work.', e);
};

function threeTwo(){
  $('#three').hide()
  $('#two').show();
}
function twoOne(){
  $('#two').hide()
  $('#one').show();
}
function final(){
  $('#one').hide()
}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'cheese': function() {
     $('#countdown, #three').show();
      setTimeout("threeTwo()", 1000);
      setTimeout("twoOne()", 2000);
      setTimeout("final()", 3000);  
      if (localMediaStream) {
        takePic();
      }
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

$(document).on('click', '#snapshot', function(){
  $('#countdown, #three').show();
  setTimeout("threeTwo()", 1000);
  setTimeout("twoOne()", 2000);
  setTimeout("final()", 3000);  
  if (localMediaStream) {
    takePic();
  }
});

function dataURLtoBlob(dataURL) {
  var binary = atob(dataURL.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/png'});
}

// sizeCanvas('#image')

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia({video:true}, function (stream) {
  video.src = window.URL.createObjectURL(stream);
  localMediaStream = stream;
}, onCameraFail);