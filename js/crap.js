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
  
  var colors = ['purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'orange', 'cyan', 'pink'];
  $('#witchLucky').click(function() {
	if (!au.paused) return;
	au.play();
	var oldVal = document.getElementById("result").value;
	if (oldVal == null) oldVal = "";
	var woop = 0;
	var i = 0;
	(function loop(){
		if (i > colors.length + 1) {
			$("#originYear").val("");
			$("#destinationYear").val("");
			$("#modYear").val("");
			$("#result").val("");
		}
		
        var color = colors.shift();
		
        document.body.style.backgroundColor = color;
        if (colors.length) {
            setTimeout(loop, 500);
			$("#originYear").val("");
			$("#destinationYear").val("");
			$("#modYear").val("");
			$("#result").val("");
        }
		switch (woop) {
			case 0:
				$("#originYear").val("FART");
				woop++;
				break;
			case 1:
				$("#destinationYear").val("FART");
				woop++;
				break;
			case 2:
				$("#modYear").val("FART");
				woop++;
				break;
			case 3:
				$("#result").val("FART");
				woop++;
				break;
			case 4:
				$("#originYear").val("BUTT");
				woop++;
				break;
			case 5:
				$("#destinationYear").val("BUTT");
				woop++;
				break;
			case 6:
				$("#modYear").val("BUTT");
				woop++;
				break;
			case 7:
				$("#result").val("BUTT");
				woop = 0;
				break;
			default:
				break;
		}
		i++;
		
    })();
	$("#originYear").val("");
	$("#destinationYear").val("");
	$("#modYear").val("");
	$("#result").val("");
  });
  
});