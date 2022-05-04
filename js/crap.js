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
			alert("destination cannot be null");
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
        var placeholder = "12-26-2018 ";

        var name = document.getElementById("storeName").value;
        var inDate = document.getElementById("storeYear").value;
        var date = new Date(inDate);
        var inTime = document.getElementById("storeTime").value;
        var time = new Date(placeholder + inTime);
        
        console.log("Name: " + name + ", Date: " + inDate);
        var exists = false;
        for (var i = 0; i < shopList.length; i++) {
            var shop = shopList[i];
            if (!name.toLowerCase().localeCompare(shop.name.toLowerCase())) {
                if (new Date(shop.opened) <= date && date <= new Date(shop.closed)) {
                    if (new Date(placeholder + shop.opentime) <= time && time <= new Date(placeholder + shop.closetime)) {
                        console.log("time: " + time + "; open: " + new Date(placeholder + shop.opentime) + "; closed: " + new Date(placeholder + shop.closetime));
                        document.getElementById("shopAnswer").innerHTML = name + " was open on " + inDate + " at " + inTime;
                    } else {
                        console.log("time: " + time + "; open: " + new Date(placeholder + shop.opentime) + "; closed: " + new Date(placeholder + shop.closetime));
                        document.getElementById("shopAnswer").innerHTML = name + " was open on " + inDate + " but was closed at " + inTime;
                    }
                } else {
                    if (new Date(shop.closed) <= date) {
                        document.getElementById("shopAnswer").innerHTML = name + " was closed permanently by " + inDate;
                    } else {
                        document.getElementById("shopAnswer").innerHTML = name + " did not exist on " + inDate;
                    }
                }

                exists = true;
                break;
            }
        }

        if (!exists) {
            console.log(name + " was not found in this database");
            document.getElementById("shopAnswer").innerHTML = name + " was not found in this database";
        }
    });

    $('#calcArrayButton').click(function () {
        var max = document.getElementById("maxValue").value;
        var min = document.getElementById("minValue").value;
        document.getElementById("randArrAnswer").innerHTML = genShuffledArray(max, min);
    });

    $('#calcDiceButton').click(function () {
        var d2val = document.getElementById("d2val").value;
        var d4val = document.getElementById("d4val").value;
        var d6val = document.getElementById("d6val").value;
        var d8val = document.getElementById("d8val").value;
        var d10val = document.getElementById("d10val").value;
		var d10x10val = document.getElementById("d10x10val").value;
        var d12val = document.getElementById("d12val").value;
        var d20val = document.getElementById("d20val").value;
		var d24val = document.getElementById("d24val").value;
		var d28val = document.getElementById("d28val").value;
        var resultArray = rollDice(d2val, d4val, d6val, d8val, d10val, d10x10val, d12val, d20val, d24val, d28val);
        var total = resultArray.pop();
        document.getElementById("diceTotalAnswer").innerHTML = total;
        document.getElementById("diceArrAnswer").innerHTML = resultArray;
    });

    $('#calcCustomDiceButton').click(function () {
        var numfaces = document.getElementById("faceval").value;
		var numdice = document.getElementById("diceval").value;
        var total = [];
		if (!numfaces || numfaces == 0) {
			document.getElementById("diceTotalAnswerCustom").innerHTML = "Number of faces cannot be empty";
			return;
		}
		if (!numdice || numdice == 0) {
			document.getElementById("diceTotalAnswerCustom").innerHTML = "Number of dice cannot be empty";
			return;
		}
		for (var i = 0; i < numdice; i++) {
			total.push(rollTypeDice(numfaces));
		}
        console.log("TOTAL: " + total);
        document.getElementById("diceTotalAnswerCustom").innerHTML = total.join(', ');
    });
	
	$('#calcTarotSpreadButton').click(function() {
		var cardsInSpread = eval(document.getElementById("tarotCardNum").value);
		var spreadCount = eval(document.getElementById("tarotSpreadNum").value);
		var useStrings = eval(document.getElementById("tarotUseStrings").checked);
		
		var tarotStrings = ["The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", "The Hierophant",
							"The Lovers", "The Chariot", "Strength", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man",
							"Death", "Temperance", "Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement",
							"The World", 
							"Ace of Cups", "2 of Cups", "3 of Cups", "4 of Cups", "5 of Cups", "6 of Cups", "7 of Cups",
							"8 of Cups", "9 of Cups", "10 of Cups", "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
							"Ace of Pentacles", "2 of Pentacles", "3 of Pentacles", "4 of Pentacles", "5 of Pentacles", "6 of Pentacles", "7 of Pentacles", "8 of Pentacles", 
							"9 of Pentacles", "10 of Pentacles", "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles",
							"Ace of Swords", "2 of Swords", "3 of Swords", "4 of Swords", "5 of Swords", "6 of Swords", "7 of Swords", "8 of Swords", 
							"9 of Swords", "10 of Swords", "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",
							"Ace of Wands", "2 of Wands", "3 of Wands", "4 of Wands", "5 of Wands", "6 of Wands", "7 of Wands", "8 of Wands", 
							"9 of Wands", "10 of Wands", "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands"];
							
		if (cardsInSpread > 78) {
			document.getElementById("tarotAnswer").innerHTML = "Cards in spread cannot exceed 78";
			return;
		}
		
		var returnString = "";
		var currentCount = 0;
		
		document.getElementById("tarotAnswer").innerHTML = "";
		
		while (currentCount < spreadCount) {
			var spreadArray = [];
			while (spreadArray.length < cardsInSpread) {
				var randTarotNum = rollTypeDice(78);
				var randTarot = "";
				if (useStrings) {
					randTarot = tarotStrings[randTarotNum - 1];
				} else {
					randTarot = randTarotNum;
				}
				if (!spreadArray.includes(randTarot)) {
					spreadArray.push(randTarot);
				}
			}
			//returnString = returnString + "[" + spreadArray.join(", ") + "] ";
			const tarotNode = document.createElement("p");
			const tarotTextNode = document.createTextNode("[" + spreadArray.join(", ") + "]");
			tarotNode.appendChild(tarotTextNode);
			document.getElementById("tarotAnswer").appendChild(tarotNode);
			currentCount++;
		}
		
		//document.getElementById("tarotAnswer").innerHTML = returnString;
	});
	
	$('#calcColorAttributeButton').click(function() {
		var colorString = ""
		var attrString = ""
		var npcsToGenerate = eval(document.getElementById("attrGenNum").value)
		var color1 = document.getElementById('color1Select').selectedIndex + 1;
		var color2 = document.getElementById('color2Select').selectedIndex + 1;
		
		//var colors = npcColorGen((colorsToUse > 0) ? colorsToUse : 2)
		var colors = [color1, color2]
		if (!colors || colors.length < 1) return;
		document.getElementById("npcAttrAnswer").innerHTML = "";
		//document.getElementById("attrGenNum").value = colors.length;
		//for (var i = 0; i < colors.length; i++) {
		//	colorString += npcColorTranslate(colors[i]) + (i+1 != colors.length ? ", " : "")
		//}
		var npcList = []
		while (npcList.length < npcsToGenerate) {
			var npcAttributes = npcAttrGen(colors)
			console.log(npcAttributes)
			if (!npcList.includes(npcAttributes)) {
				npcList.push(npcAttributes)
			}
		}
		var npcDisplay = "";
		for (var i = 0; i < npcList.length; i++) {
			var npcAttrs = npcList[i]
			console.log("APPENDING: " + npcAttrs);
			const headerNode = document.createElement("p")
			const textHeaderNode = document.createTextNode("NPC #" + (i + 1))
			headerNode.appendChild(textHeaderNode);
			const detailNode = document.createElement("p")
			const textDetailnode = document.createTextNode("[Good Attributes: " + npcAttrs[0].join(', ') + "] [Bad Attributes: " + npcAttrs[1].join(', ') + "]");
			detailNode.appendChild(textDetailnode);
			document.getElementById("npcAttrAnswer").appendChild(headerNode)
			document.getElementById("npcAttrAnswer").appendChild(detailNode)
		}
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

var shopList = [
    { "name": "Sherry's Succulents", "opened": "2000-05-05", "closed": "2090-06-30", "opentime": "09:00", "closetime": "17:00" },
    { "name": "Pete's Peppers", "opened": "1920-02-10", "closed": "N/A", "opentime": "09:00", "closetime": "17:00" },
    { "name": "Adam's Assault Association ", "opened": "1999-11-12", "closed": "1999-11-13", "opentime": "00:00", "closetime": "24:00" }
];

// Builds the HTML Table out of shopList.
function buildHtmlTable() {
    var columns = addAllColumnHeaders(shopList);

    for (var i = 0; i < shopList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = shopList[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#shopTable").append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(shopList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < shopList.length; i++) {
        var rowHash = shopList[i];
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

function genShuffledArray(max, min) {
    let arr = genArray(max, min);
    return shuffleNums(arr);
}

function genArray(max, min) {
    var results = [];
    for (i = 1; i <= max; i++) {
        if (i < min) continue;
        results.push(i);
    }
    return results;
}

function shuffleNums(array) {
    var arr = array;
    var i = arr.length;
    var tempValue;
    var randIndex;

    while (0 !== i) {
        randIndex = Math.floor(Math.random() * i);
        i -= 1;
        tempValue = arr[i];
        arr[i] = arr[randIndex];
        arr[randIndex] = tempValue;
    }
    return arr;
}

function rollDice(d2val, d4val, d6val, d8val, d10val, d10x10val, d12val, d20val, d24val, d28val) {
    var arr = [];
    var total = 0;
    if (d2val) {
        for (let i = 0; i < d2val; i++) {
            var diceVal = rollTypeDice(2)
            arr.push(diceVal);
            total += diceVal;
        }
    }
    if (d4val) {
        for (let i = 0; i < d4val; i++) {
            var diceVal = rollTypeDice(4)
            arr.push(diceVal);
            total += diceVal;
        }
    }
    if (d6val) {
        for (let i = 0; i < d6val; i++) {
            var diceVal = rollTypeDice(6)
            arr.push(diceVal);
            total += diceVal;
        }
    }
    if (d8val) {
        for (let i = 0; i < d8val; i++) {
            var diceVal = rollTypeDice(8)
            arr.push(diceVal);
            total += diceVal;
        }
    }
    if (d10val) {
        for (let i = 0; i < d10val; i++) {
            var diceVal = rollTypeDice(10)
            arr.push(diceVal);
            total += diceVal;
        }
    }
	if (d10x10val) {
		for (let i = 0; i < d10x10val; i++) {
            var diceVal = rollTypeDice(10)
            arr.push(diceVal * 10);
            total += (diceVal * 10);
        }
	}
    if (d12val) {
        for (let i = 0; i < d12val; i++) {
            var diceVal = rollTypeDice(12)
            arr.push(diceVal);
            total += diceVal;
        }
    }
    if (d20val) {
        for (let i = 0; i < d20val; i++) {
            var diceVal = rollTypeDice(20)
            arr.push(diceVal);
            total += diceVal;
        }
    }
	if (d24val) {
		for (let i = 0; i < d24val; i++) {
            var diceVal = rollTypeDice(24)
            arr.push(diceVal);
            total += diceVal;
        }
	}
	if (d28val) {
		for (let i = 0; i < d28val; i++) {
            var diceVal = rollTypeDice(28)
            arr.push(diceVal);
            total += diceVal;
        }
	}
    arr.push(total);
    return arr;
}

function rollTypeDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function npcColorGen(numToExtract) {	
	if (numToExtract > 8) {
		console.log("Maximum 8 colors")
		return
	}
	
	var extracted = [];
	while (extracted.length < numToExtract) {
		var colorNum = Math.floor(Math.random() * 8);
		if (!extracted.includes(colorNum)) {
			extracted.push(colorNum)
		}
	}
	return extracted
}

function npcColorTranslate(colorNum) {
	var adjustedColorNum = colorNum
	var colorArray = [
		"red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink"
	]
	return capitalizeFirstLetter(colorArray[colorNum])
}
	
function npcAttrGen(colorNumArray) {	
	var colorDict = [
		{ 
			"color": "red", 
			"goodTraits": ["ambitious", "courageous", "hospitable", "focused", "determined", "passionate", "generous", "romantic"], 
			"badTraits": ["possessive", "haughty", "controlling", "short-tempered", "stubborn", "single-minded", "vindictive", "disrespectful"]
		},
		{ 
			"color": "orange", 
			"goodTraits": ["observant", "cooperative", "industrious", "honorable", "curious", "organized", "studious", "reverent"], 
			"badTraits": ["perfectionist", "judgmental", "workaholic", "hypocritical", "cowardly", "humorless", "inhibited", "fanatical"]
		},
		{ 
			"color": "yellow", 
			"goodTraits": ["idealistic", "adventurous", "competitive", "enthusiastic", "carefree", "plucky", "trusting", "playful"], 
			"badTraits": ["tactless", "volatile", "cocky", "impatient", "gullible", "kleptomania", "impulsive", "reckless"]},
		{ 
			"color": "green", 
			"goodTraits": ["creative", "naturalistic", "resourceful", "patient", "honest", "flexible", "inventive", "nurturing"], 
			"badTraits": ["jaded", "pessimistic", "stingy", "apathetic", "callous", "untrusting", "resentful", "messy"]
		},
		{ 
			"color": "blue", 
			"goodTraits": ["appreciative", "affectionate", "empathetic", "loyal", "tolerant", "merciful", "sentimental", "contented"], 
			"badTraits": ["defensive", "melodramatic", "oversensitive", "needy", "gossipy", "insecure", "depressive", "temperamental"]
		},
		{ 
			"color": "indigo", 
			"goodTraits": ["analytical", "disciplined", "independent", "protective", "responsible", "pensive", "just", "sophisticated"], 
			"badTraits": ["hedonistic", "greedy", "antisocial", "materialistic", "uncommunicative", "suspicious", "jealous", "pretentious"]
		},
		{ 
			"color": "violet", 
			"goodTraits": ["charismatic", "diplomatic", "confident", "discreet", "obedient", "funny", "persuasive", "devoted"], 
			"badTraits": ["manipulative", "mischievous", "vain", "indecisive", "subservient", "cynical", "unethical", "self-destructive"]
		},
		{ 
			"color": "pink", 
			"goodTraits": ["tenderhearted", "humble", "cautious", "whimsical", "empathetic", "kind", "wholesome", "hopeful"], 
			"badTraits": ["naïve", "ignorant", "nervous", "fanciful", "irresponsible", "scatterbrained", "dishonest", "nosy"]
		}
	]
	
	var goodArray = []
	var badArray = []
	
	for (var i = 0; i < colorNumArray.length; i++){
		var num = colorNumArray[i] - 1
		var colorGoodArray = colorDict[num].goodTraits
		
		for (var j = 0; j < 2; j++) {
			var attrNum = Math.floor(Math.random() * 7);
			var attrStr = colorGoodArray[attrNum]
			colorGoodArray.splice(attrNum, 1)
			goodArray.push(attrStr)
		}
		
		var colorBadArray = colorDict[num].badTraits
        for (var j = 0; j < 2; j++) {
			var attrNum = Math.floor(Math.random() * 7);
			var attrStr = colorBadArray[attrNum]
			colorBadArray.splice(attrNum, 1)
			badArray.push(attrStr)
		}
		
    }	
	
	return [goodArray, badArray]
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}