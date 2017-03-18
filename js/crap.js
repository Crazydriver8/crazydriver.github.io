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
  $('.hella').click(function() {
		audio.play();
  });
  
  /* Start Video */
  $('#skeltal').click(function() {
		
  });
  
  $('#calcButton').click(function() {
	alert("WHAT");
	var origin = document.getElementById("originYear").value;
	var destination = document.getElementById("destinationYear").value;
	var mod = document.getElementById("modYear").value;
	alert("Obtained: " + origin + ", " + destination + ", " + mod);
	var normalAge = destination - origin;
	alert("In human years: " + normalAge);
	var modAge = normalAge / mod;
	alert("Mod Age: " + modAge);
	
	$("#result").val(modAge + " years old");
  });
});