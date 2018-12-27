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
	var origin = eval(document.getElementById("originYear").value);
	var destination = eval(document.getElementById("destinationYear").value);
	var mod = eval(document.getElementById("modYear").value);
	var age = eval(document.getElementById("age").value);
	var normalAge = destination - origin;
	if (mod == null) {
		mod = 1;
		$("#modYear").val(mod);
	}
	if (age == null) {
		var modAge = normalAge / mod;
		$("#age").val(modAge);
	} else if (origin == null) {
		if (destination == null) {
			alert("fuck you");
			return;
		}
		var realAge = age * mod;
		var originTemp = destination - realAge;
		$("#originYear").val(originTemp);
	} else if (destination == null) {
		var realAge = age * mod;
		var destTemp = origin + realAge;
		$("#destinationYear").val(destTemp);
	} else {
		alert("Please clear a field to calculate");
	}
  });
  
    var colors = ['purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'black', 'orange', 'cyan', 'pink', 'purple', 'orange', 'cyan', 'pink'];

    $('#witchLucky').click(function () {
        console.log("Lucky Pressed!");

	    if (!au.paused) return;
	    au.play();
	    var oldVal = document.getElementById("age").value;
	    if (oldVal == null) oldVal = "";
	    var woop = 0;
	    var i = 0;
        (function loop() {
            console.log("Loop: " + i);
		    if (i > colors.length) {
			    $("#originYear").val("");
			    $("#destinationYear").val("");
			    $("#modYear").val("");
                $("#age").val("");
                i = 0;
		    }
		
            var color = colors[i];
            console.log("Color is : " + color);
		
            document.body.style.backgroundColor = color;
            if (colors.length) {
                setTimeout(loop, 500);
			    $("#originYear").val("");
			    $("#destinationYear").val("");
			    $("#modYear").val("");
			    $("#age").val("");
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
				    $("#age").val("FART");
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
				    $("#age").val("BUTT");
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
    $('#calcShopButton').click(function () {
        var name = eval(document.getElementById("storeName").value);
        var year = eval(document.getElementById("storeYear").value);
        console.log("Name: " + name + ", Year: " + year);
    });
});

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

var myList = [
    { "name": "Sherry's Succulents", "opened": 50, "closed": 2090 },
    { "name": "Pete's Peppers", "opened": 1920, "closed": "N/A" },
    { "name": "Adam's Assault Association ", "opened": 1999, "closed": 1999 }
];

// Builds the HTML Table out of myList.
function buildHtmlTable() {
    $.getJSON('../content/shopYears.json', function (data) {
        alert(data);
        var columns = addAllColumnHeaders(myList);

        for (var i = 0; i < myList.length; i++) {
            var row$ = $('<tr/>');
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                var cellValue = myList[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }

                row$.append($('<td/>').html(cellValue));
            }
            $("#shopTable").append(row$);
        }
    });
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}