$(document).ready(function() {
  /* Push the body and the nav over by 285px over */
  $('.icon-menu').click(function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

  /* Then push them back */
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });
  
  /* Set up audio playback */
  var audio = new Audio('../content/doot_doot.mp3');
  var au = new Audio('../content/magic.mp3');
  $('.hella').click(function() {
		audio.play();
  });
  
  /* Start Video */
  $('#skeltal').click(function() {
		
  });
  
  $('#calcButton').click(function() {
	var origin = document.getElementById("originYear").value;
	var destination = document.getElementById("destinationYear").value;
	var mod = eval(document.getElementById("modYear").value);
	var normalAge = destination - origin;
	if (mod == null) mod = 1;
	var modAge = normalAge / mod;
	
	$("#result").val(modAge + " years old");
  });
  
  var box = document.getElementById('box'),
    colors = ['purple', 'yellow', 'orange', 'cyan', 'pink', 'purple', 'yellow', 'orange', 'cyan', 'pink', 'purple', 'yellow', 'orange', 'cyan', 'pink', 'purple', 'yellow', 'orange', 'cyan', 'pink'];
  $('#witchLucky').click(function() {
	au.play();
	(function loop(){
        var color = colors.shift();

        document.body.style.backgroundColor = color;

        if (colors.length) {
            setTimeout(loop, 500);
        }
    })();
  });
});