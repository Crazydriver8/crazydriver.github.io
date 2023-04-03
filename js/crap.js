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
	    if (!au.paused) return;
	    au.play();
	    var oldVal = document.getElementById("age").value;
	    if (oldVal == null) oldVal = "";
	    var woop = 0;
	    var i = 0;
        (function loop() {
		    if (i > colors.length) {
			    $("#originYear").val("");
			    $("#destinationYear").val("");
			    $("#modYear").val("");
                $("#age").val("");
                i = 0;
		    }
		
            var color = colors[i];
		
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
        var exists = false;
        for (var i = 0; i < shopList.length; i++) {
            var shop = shopList[i];
            if (!name.toLowerCase().localeCompare(shop.name.toLowerCase())) {
                if (new Date(shop.opened) <= date && date <= new Date(shop.closed)) {
                    if (new Date(placeholder + shop.opentime) <= time && time <= new Date(placeholder + shop.closetime)) {
                        document.getElementById("shopAnswer").innerHTML = name + " was open on " + inDate + " at " + inTime;
                    } else {
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
        document.getElementById("diceTotalAnswerCustom").innerHTML = total.join(', ');
    });
	
	$('#calcTarotSpreadButton').click(function() {
		var cardsInSpread = eval(document.getElementById("tarotCardNum").value);
		var spreadCount = eval(document.getElementById("tarotSpreadNum").value);
		var useStrings = eval(document.getElementById("tarotUseStrings").checked);
		var useInverse = eval(document.getElementById("tarotUseInverse").checked);
		
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
				
				if (useInverse && Math.floor(Math.random() * 2) == 0) {
					randTarot = randTarot + " (inverted)"
				}
				if (!spreadArray.includes(randTarot)) {
					spreadArray.push(randTarot);
				}
			}
			const tarotNode = document.createElement("p");
			const tarotTextNode = document.createTextNode("[" + spreadArray.join(", ") + "]");
			tarotNode.appendChild(tarotTextNode);
			document.getElementById("tarotAnswer").appendChild(tarotNode);
			currentCount++;
		}
	});
	
	$('#calcColorAttributeButton').click(function() {
		var colorString = ""
		var attrString = ""
		var npcsToGenerate = eval(document.getElementById("attrGenNum").value)
		var color1 = document.getElementById('color1Select').selectedIndex + 1;
		var color2 = document.getElementById('color2Select').selectedIndex + 1;
		
		var colors = [color1, color2]
		if (!colors || colors.length < 1) return;
		document.getElementById("npcAttrAnswer").innerHTML = "";
		var npcList = []
		while (npcList.length < npcsToGenerate) {
			var npcAttributes = npcAttrGen(colors)
			if (!npcList.includes(npcAttributes)) {
				npcList.push(npcAttributes)
			}
		}
		var npcDisplay = "";
		for (var i = 0; i < npcList.length; i++) {
			var npcAttrs = npcList[i]
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
	
	$('#calcStoryButton').click(function() {
		var storyOutput = generateStory();
		document.getElementById("storyAnswer").innerHTML = storyOutput.join(';<br/>');
	});
	
	$('#calcStatsButton').click(function() {
		var statsToGen = eval(document.getElementById("statGenNum").value);
		if (statsToGen < 1) {
			document.getElementById("statAnswer").innerHTML = "Please enter a value greater than 0";
			return;
		}
		var statOutput = generateStats(statsToGen);
		document.getElementById("statAnswer").innerHTML = statOutput.join(';<br/><br/>');
	});
});

function openTab(evt, tabName) {
	console.log("OPENING " + tabName);
	
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
			"goodTraits": ["ambitious", "authoritative", "courageous", "nuturing"], 
			"badTraits": ["stubborn", "controlling", "short-tempered", "prideful"]
		},
		{ 
			"color": "orange", 
			"goodTraits": ["studious", "observant", "honorable", "industrious"], 
			"badTraits": ["perfectionist", "judgmental", "inhibited", "fanatical"]
		},
		{ 
			"color": "yellow", 
			"goodTraits": ["spontaneous", "enthusiastic", "trusting", "carefree"], 
			"badTraits": ["gullible", "thievish", "impulsive", "arrogant"]},
		{ 
			"color": "green", 
			"goodTraits": ["unadorned", "resourceful", "patient", "honest"], 
			"badTraits": ["defiant", "pessimistic", "callous", "untrusting"]
		},
		{ 
			"color": "blue", 
			"goodTraits": ["protective", "loyal", "tolerant", "sentimental"], 
			"badTraits": ["suspicious", "melodramatic", "needy", "depressive"]
		},
		{ 
			"color": "indigo", 
			"goodTraits": ["resilient", "independent", "discerning", "discreet"], 
			"badTraits": ["materialistic", "uncommunicative", "possessive", "jealous"]
		},
		{ 
			"color": "violet", 
			"goodTraits": ["charismatic", "diplomatic", "empathetic", "obedient"], 
			"badTraits": ["manipulative", "mischievous", "suggestible", "apathetic"]
		},
		{ 
			"color": "pink", 
			"goodTraits": ["cooperative", "idealistic", "reverent", "tenderhearted"], 
			"badTraits": ["naïve", "dishonest", "scatterbrained", "nervous"]
		}
	]
	
	var goodArray = []
	var badArray = []
	
	for (var i = 0; i < colorNumArray.length; i++){
		var num = colorNumArray[i] - 1
		var colorGoodArray = colorDict[num].goodTraits
		
		for (var j = 0; j < 2; j++) {
			var attrNum = Math.floor(Math.random() * 3);
			var attrStr = colorGoodArray[attrNum]
			colorGoodArray.splice(attrNum, 1)
			goodArray.push(attrStr)
		}
		
		var colorBadArray = colorDict[num].badTraits
        for (var j = 0; j < 2; j++) {
			var attrNum = Math.floor(Math.random() * 3);
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

var agentArray = ["warlock", "rogue", "tactician", "invoker", "mage", "arher", "behemoth", "warrior", "guard", "lord (sun)", "lady (moon)", "beggar", "fighter", "mimic", "noble", "dryad", "ardent", "sellsword", "ruler", "monk", "barbarian", "familiar", "mer", "beast tamer", "militia", "heir", "seer", "kennel master", "stalker", "weaver", "swashbuckler", "emissary", "conqueror", "dragon", "blacksmith", "bard", "wizard", "cleric", "trader", "ghoul", "hired knife", "paladin", "scout", "ranger", "dicer", "a clockmaker", "a golem", "an artificer", "a tinkerer", "an airship captain", "a duelist", "an enchanter", "an overseer", "an orphan", "a burglar", "a patron", "a miner", "a pick-pocket", "a gearhead", "an artifact dealer", "a drone", "a sky pirate", "a god-slayer", "an oracle", "a trickster", "a hag", "a titan", "an animal god", "a treasure hunter", "an underworld god", "a muse", "a minotaur", "a messenger of the gods", "a monster-hunter", "a harpy", "a skin-changer", "a pilgrim", "an angel", "a cartographer", "a god-child", "an earth god", "a war-god", "a chimera", "an aviator", "a forest god", "a detective", "a priest", "a cannibal", "a betrothed", "a child", "a gravedigger", "a cult leader", "a medium", "a serial killer", "a fanatic", "a clown", "a first responder", "an escapee", "a poltergeist", "a spirit", "a ghost hunter", "a carnival worker", "a hoaxer", "a murderer", "a vampire", "an arsonist", "a sadist", "a zombie", "a butcher", "a patient zero", "a cryptid", "a contortionist", "a worshipper", "a possessed person", "a plague victim", "a groundskeeper", "a camp leader", "a clone", "a millionaire", "a taxidermist", "a historian", "a surgeon", "a mortician", "an assailant", "a lab assistant", "an exorcist", "a hillbilly", "an innocent", "a slasher", "a skeptic", "a banshee", "a revenant", "a werewolf", "an entity", "a thrall", "an apothecary", "a brute", "a demonologist", "an ancient", "a prison guard", "a despot", "a field medic", "an infected", "a caravan guard", "a nomad", "a spoiler", "a road warrior", "a loyalist", "a torturer", "an activist", "a mutant", "a gladiator", "a farmer", "a sawbones", "a junk seller", "a slaver", "a survivalist", "a bloodbag", "a scavenger", "a propagandist", "a mercenary", "a warloard", "a geneticist", "an underdweller", "a hired gun", "an undercover agent", "a political prisoner", "a bomber", "an imp", "a lich", "an initiate", "a professor", "a freedom fighter", "a smuggler", "a devil", "an apparition", "a psionic", "a villager", "a lunatic", "an executioner", "a fugitive", "an informant", "a deserter", "A test subject", "a cadet", "a pyrokenetic", "an invader", "an operative", "a bodyguard", "an arms dealer", "a heist leader", "a terrorist", "a gamer", "a graffiti artist", "a technician", "a ceo", "a general", "a programmer", "an influencer", "a supercomputer", "a weapons specialist", "a bartender", "an asteroid miner", "a gene splicer", "a data scientist", "a blackmailer", "a telepath", "an astrophysicist", "a clubber", "a performance artist", "a translator", "a revolutionary", "an engineer", "an artificial intelligence", "a technician", "a sentient", "a bomb-maker", "a chemist", "a telekinetic", "an extra-terrestrial", "a hacker", "a navigator", "an escaped experiment", "a salvager", "a d.j.", "a colonist", "a robot", "a streamer", "a prisoner", "a pilot", "a chrononaut", "a neural net", "a corp employee", "a martial arts master", "a scrapper", "a cryptographer", "an information broker", "a supersoldier", "an android", "a raver", "a bounty hunter", "a data miner", "a sharpshooter", "a lookout", "a stim junkie", "a corp boss", "a fence", "a cyborg", "an enhanced", "a black market delear", "a gunrunner", "an artist", "an explorer", "an enforcer", "an avenger", "a radical", "a leader", "a beast", "a worker", "a teacher", "a student", "a monster", "an actor", "an amateur", "a vigilante", "a muscian", "a master craftsperson", "a warmonger", "a diplomat", "a scam artist", "a baker", "a boss", "an athlete", "a performer", "a genius", "a bookworm", "a holy person", "a courier", "a shape-shifter", "a politician", "an iconoclast", "a ghost", "a soldier", "a tourist", "a writer", "an assassin", "a guide", "a hermit", "an understudy", "a trailblazer", "a protester", "a salesperson", "a misfit", "a dancer", "a rival", "a pet", "an apprentice", "a guardian", "a fool", "a hero", "an outcast", "a caretaker", "an idol", "a visionary", "a heretic", "a hunter", "a survivor", "a healer", "a companion", "a veteran", "a painter", "an alien", "an officer", "a doctor", "a dissident", "a curator", "a fraud", "a secret admirer", "a collector", "a god", "a rebel", "a romantic partner", "a therapist", "a retiree", "a researcher", "a black sheep", "a prophet", "a superhuman", "a gardener", "a punk", "a mentor", "a daredevil", "a parent", "a martyr", "a model", "a killer", "a roommate", "a comedian", "a conservationist", "a witch", "a peacekeeper", "a bouncer", "a foreigner", "an inventor", "a victim", "a villain", "an expert", "an investigator", "an automaton", "an aristocrat", "an addict", "a designer", "a bully", "a twin", "an archivist", "an introvert", "a merchant", "an archaeologist", "a tailor", "a machine", "a tyrant", "a grump", "a predator", "a celebrity", "a virtuoso", "a grifter", "a doppelganger", "a patient", "a conspiracy theorist", "an investor", "a dreamer", "a librarian", "a stand-in", "a profiteer", "an architect", "an alcoholic", "a magnate", "a puppet", "a scientist", "an academic", "a scoundrel", "a journalist", "a gambler", "an imposter", "a miser", "a child prodigy", "a philanthropist", "a criminal", "a wanderer", "a kingpin", "a servant", "an artisan", "a witness"]
var engineArray = ["wants to drive out a spirit that has possessed", "wants to enchant", "wants to prevent a war from being started by", "wants to claim the hidden artifact of", "wants to map (or document history of)", "wants to sabotage an enemy with", "wants to navigate a maze at the heart of which sits", "wants to find the path home and their only lead is", "wants to lead a final, desperate charge on/for", "wants to obtain a rare spell component from", "wants to win a duel with/in/atop", "wants to pay an old debt with/to", "wants to open an ancient door that can only be unlocked by", "wants to be healed by", "wants to stop an enemy from reaching", "wants to pledge their life in service to", "wants to disarm the trap of", "wants to solve the puzzle of", "wants to stop the negotiations for", "wants to end an exile with/in/of", "wants to foil a scheme of/involving", "wants to start a war on/with", "wants to create a masterpiece for/involving", "wants to imprison a dangerous spirit in", "wants to found a religion on", "wants to unleash the divine wrath of", "wants to frame (or frame an enemy using)", "wants to inflict pain on/with/in", "wants to destroy a monster whose only weakness is", "wants to settle an old score with", "wants to escape the trap of", "wants to cover up the horrifying secret of", "wants to understand the terrible visions of", "wants to escape a trauma through/involving", "wants to commit murder on/with/in", "wants to drive a demon out of", "wants to escape the madness of", "wants to overcome a fear of", "wants to escape their reoccurring nightmare of being killed by/in", "wants to expose the evil of", "wants to imprison a demon inside", "wants to uphold a family legacy involving", "wants to trigger a memory involving", "wants to start a cult centered around", "wants to uncover the horrifying secret of", "wants to sacrifice", "wants to survive", "wants to catch a serial killer whose calling card is", "wants to set an elaborate trap for/with", "wants to solve a murder and their only lead is", "wants to break a curse involving", "wants to investigate a cult centered around", "wants to stop the government from discovering", "wants to break into a government facility for", "wants to outwit or overpower the warlord who controls", "wants to learn how the world ending and their only lead is", "wants to outwit a god with the help of", "wants to twart destiny with", "wants to decode ancient blueprints and needs to access", "wants to cure the virus and their only lead is", "wants to perform a forbidden ritual with-in-on", "wants to ignore the many occult warnings and unearth", "wants to bring down a big corp with", "wants to make contact with an informant through-at", "wants to find the coordinates of", "wants to light the powderkeg of revolution with the match of", "wants to suppress the dangerous invention of", "wants to find a cache location hidden in-on-by", "wants to unseat a politician with", "wants to plant a bomb on", "wants to uncover a government secret involving", "wants to carry out an invasion of-with", "wants to conduct blackmail on-with", "wants to pull off a heist on-with-of", "wants to invent or discover", "wants to change the future of", "wants to communicate with an alien species through", "wants to create a distraction with", "wants to make a major research breakthrough on/with", "wants the rare material they can only get from", "wants to make a weapon out of", "wants to upgrade the tech of", "wants to perform an assassination of/with", "wants to restore the lost memory of", "wants to change the past of/with", "wants to win a race involving", "wants to explore a new planet with the help of", "wants to arrange the release of", "wants to track down", "wants to topple a government with", "wants to find the bomb planted on/by", "wants to make a power grab with", "wants to follow the tracking device planted in/on", "wants to get the data from a microchip hidden in/on", "wants to finish a revolutionary new prototype and needs", "wants to win a war by experimenting on", "wants to unravel the mystery of", "wants to find hope in-for", "wants to hold on to", "wants to hide an obsession with", "wants to escape", "wants to expose the secret of", "wants to erase a memory of-with", "wants to get revenge with-on", "wants to create or improve", "wants to achieve a dream involving", "wants to end the power of", "wants to find redemption in-for", "wants to find a way back to", "wants to gain the power of", "wants to draw attention to", "wants to destroy", "wants to end a conflict with", "wants to restore a memory of-with", "wants to bury the secret", "wants to find", "wants to stop being haunted by", "wants to let go of", "wants to bring despair to-with", "wants to spread a lie about", "wants to defeat", "wants to save the world with-from", "wants to destroy the world with", "wants to win a bet with-for", "wants to end an obligation to", "wants to regain", "wants to reveal the dangers of", "wants to find love in-with", "wants to hurt (or damage)", "wants to liberate", "wants to help solve the problem of", "wants to end a family obligation to", "wants to connect with family through", "wants to steal a victory from-with", "wants to gain freedom with-from", "wants to heal or fix", "wants to ease a heartbreak with-of", "wants to conceal the dangers of", "wants to get rid of", "wants to establish loyalty through-in", "wants to win or win over", "wants to destroy someone's dream with-for", "wants to save a life with-from", "wants to find peace with-in-for", "wants to steal (or steal from)", "wants to finally satisfy an unspoken desire for", "wants to rise to the challenge of", "wants to betray (or betray someone with)", "wants to obtain", "wants to be saved by", "wants to upstage a rival with", "wants to save a loved one with", "wants to follow a path leading to", "wants to control", "wants to gain fame with-from", "wants to enact a secret plan focused on", "wants to unmask the conspiracy of", "wants to gain fortune with-from", "wants to shirk responsibility for", "wants to restore former glory with the help of", "wants to improve the reputation of", "wants to commit a crime with-involving", "wants to save", "wants to abandon", "wants to deliver justice for-with", "wants to reveal the good in", "wants to protect", "wants to stop the theft of"]
var aspectArray = ["infernal", "fairy-touched", "undead", "courageous", "merfolk", "diabolical", "dwarven", "toxic", "elemental", "charismatic", "crystalline", "blasphemous", "labyrinthine", "poisoned", "adamantine", "radiant", "celestial", "half-elven", "masterwork", "mithral", "plucky", "true-hearted", "draconian", "halfing", "bloodied", "expansive", "half-orcish", "gnomish", "burdened", "tryannical", "wise", "trapped", "necrotic", "ever-burning", "spined", "elvish", "brazen", "bilious", "strong", "throny", "dextrous", "chaotic", "intelligent", "tough", "thirsty", "sundered", "valiant", "lawful", "sentient", "life-giving", "omniscient", "pre-war", "malfunctioning", "sabotaged", "soothsaying", "cleansing", "jury-rigged", "prototype", "vorpal", "hardscrabbled", "cannibalistic", "mutated", "zombified", "clockwork", "steam-powered", "coal-powered", "scrappy", "angelic", "omnipotent", "jealous", "prophetic", "enigmatic", "inventive", "enduring", "hopeful", "knowledge-granting", "flying", "nihilistic", "apocryphal", "eternal", "humble", "exposed", "naive", "violent", "feral", "disguised", "foolish", "innocuous", "ruthless", "doubtful", "demented", "gibbering", "occult", "quaint", "sadistic", "trusting", "musty", "eldritch", "slumbering", "unsleeping", "unhinged", "prejudiced", "abyssal", "seaside", "toothy", "profane", "misleading", "populist", "inspiring", "downtrodden", "nocturnal", "shambling", "quiet", "dusty", "telepathic", "pious", "savage", "seedy", "bloodthirsty", "fearful", "remote", "creepy", "unexplored", "paranoid", "immortal", "amoral", "temperamental", "forbidden", "nightmarish", "quivering", "demonic", "muttering", "maddening", "inherited", "nuried", "evil-repelling", "silver", "monster-slaying", "strange", "submerged", "vision-inducing", "predatory", "hidden", "spooky", "sinking", "hungry", "malevolent", "hexed", "unsettling", "subterranean", "unassuming", "telekinetic", "despotic", "gifted", "hedonistic", "corprorate", "self-aware", "souped-up", "haywire", "modified", "freelance", "idealistic", "synthetic", "trusting", "populist", "decommisioned", "modified", "givvering", "seaside", "illegal", "souped-up", "cheap", "unsleeping", "unregistered", "hedonistic", "freelance", "hard-wired", "mind-bending", "occult", "musty", "compromised", "synthetic", "hard-wired", "proprietary", "precognitive", "cheap", "mind-bending", "surgical", "rich", "hyper-intelligent", "zero-gravity", "xenophobic", "untraceable", "inspired", "infested", "secretive", "oppressed", "unregistered", "unbreakable", "seditious", "contested", "illegal", "defiant", "brutal", "impovised", "decommissioned", "disgraced", "steely", "blacklisted", "advanced", "long-range", "addictive", "government-backed", "viral", "tracked", "gestating", "infected", "self-destructive", "explosive", "digital", "reckless", "overloaded", "privately owned", "cutting-edge", "aquatic", "experimental", "turbo-charged", "refurbished", "black-market", "alien", "hovering", "top-of-the-line", "phasing", "disappearing", "new", "time-manipulating", "anomalous", "uncharted", "dark", "expanding", "mobile", "unlisted", "radical", "poor", "possessed", "protective", "haunted", "ethereal", "bedeviled", "controlling", "obsessive", "panic-inducing", "harsh", "vindictive", "fragile", "impulsive", "decoy", "holy", "dire", "beautiful", "blessed", "charming", "stalwart", "empty", "elusive", "shadowy", "ornate", "valuable", "burning", "keen", "arcane", "seductive", "rejuvenating", "forgotten", "enchanted", "frozen", "passionate", "petty", "faithful", "decrepit", "peaceful", "fallen", "determined", "fascinating", "deceptive", "silent", "curious", "cursed", "kind", "clever", "belligerent", "influential", "fiery", "fortune-telling", "invisible", "ancient", "blighted", "hardened", "giant", "unlucky", "truth-telling", "secret", "greedy", "wounded", "scarred", "long-lost", "healing", "precious", "vast", "ghostly", "brilliant", "bloody", "fierce", "nurturing", "miraculous", "wealthy", "simple", "chilling", "illusory", "elegant", "corrupted", "bitter", "defeated", "icy", "talkative", "mysterious", "inspired", "divine", "trapped", "outgoing", "ominous", "foul-mouthed", "honest", "thoughtful", "indestructible", "young", "humble", "shocking", "charmed", "generous", "harmless", "whispering", "rare", "pensive", "destructive", "glorious", "fickle", "controversial", "private", "unnerving", "cut-rate", "traumatic", "protected", "mighty", "fearless", "irreplaceable", "besieged", "durable", "overlooked", "benevolent", "misunderstood", "damaged", "treacherous", "wild", "revolutionary", "surprising", "well-loved", "unexpected", "famous", "hated", "wish-granting", "vibrant", "tender", "distant", "shape-shifting", "broken"]
var anchorArray = ["a graveyard", "a cavern", "a crown", "a summit", "a shield", "a pair of gloves", "a market", "an empire", "an aerie", "a sanctuary", "a grove", "a castle", "an amulet", "a tree", "a throne", "a mask", "a glacier", "a warhammer", "an encampment", "a torch", "a breastplate", "a sword", "an orchard", "a coin", "a keep", "a frozen wasteland", "a siege", "a bow", "a spell", "an egg", "a port", "a potion", "a ship", "a carving", "a harp", "a hill", "a cloak", "an inn", "a suit of mail", "a scroll", "a uniform", "a skull", "a jungle", "a club", "a farm", "an axe", "a smithy", "a spear", "a staff", "a temple", "a forge", "an alignment", "a college", "an omen", "a pyre", "a higher plane", "an orb", "a holy order", "a flood", "a weapon of destiny", "a totem", "an arsenal", "a prophecy", "a gemstone", "a sacred mountain", "a pair of wings", "a pair of googles", "a drop of blood", "a grail", "a hilltop", "a set of scales", "a clocktower", "a set of scales", "a clocktower", "a sacred herb", "an atelier", "a guild", "a generator", "a mine", "a mechanism", "a foundry", "a crystal", "an airship", "a cannon", "a sky-city", "a cockpit", "a doll", "a shotgun", "a cabin", "a well", "a carnival", "a mansion", "a harvest", "a skeleton", "a field", "an asylum", "a disguise", "a corpse", "a haunting", "a knife", "a hymnal", "a van", "a disease", "a hiding place", "a vessel", "an infection", "a bite", "a funhouse", "a backwood", "a void", "a scalpel", "a fog", "a cemetery", "a barn", "a painting", "a mirror", "a flashlight", "a trophy", "a hunt", "a rocking chair", "a coffin", "a round of ammunition", "a music box", "an antidote", "a toy", "a nursery", "a set of keys", "a scythe", "a torture chamber", "a chapel", "an abattoir", "a keyhole", "a campsite", "a solstice", "a cult", "a mausoleum", "a lighthouse", "a set of riot gear", "a list", "a true name", "a candle", "a hamlet", "an incantation", "a santiorium", "a catacomb", "a personnel carrier", "an unregistered weapon", "a pentacle", "a cadaver", "a grimoire", "a shipwreck", "an awakening ritual", "a grenade", "a back alley", "a cure", "a med-pack", "an oasis", "a medical building", "a gas mask", "a crash site", "a case of ammo", "an exo-skeleton", "a rave", "a mecha", "a gadget", "a firearm", "a moving fortress", "a meal", "a vault", "a blast shelter", "an incendiary device", "a roadmap", "ajunkyard", "a tank of gas", "a weapons cache", "a transmission", "an outpost", "a nuclear site", "a bio-enhancement", "a lead-lined van", "a databank", "a corp", "a headquarters", "a passport", "an injection", "a broadcast", "a stimulant", "a transplant", "a heist", "a saferoom", "an exoplanet", "a power-suit", "an operating room", "an emp device", "a password", "a holodisk", "a sewer", "a microchip", "a warehouse", "a terminal", "an implant", "an explosive", "a dropship", "an energy shield", "a cypher", "a laser", "a biome", "a fuel source", "a gene", "a server room", "a countdown", "a hover vehicle", "a gas giant", "a particle", "a body modification", "a power source", "a jump point", "a hidden compartment", "an energy weapon", "an organism", "a blaster", "a jetpack", "a spaceport", "a set of coordinates", "a high-rise", "a machine part", "a hard drive", "a black hole", "an algorithm", "a serum", "a spacesuit", "a satellite", "a cloaking device", "a control tower", "a simulation", "a star system", "a nebula", "an engine", "a metropolis", "a surveillance drone", "a planet", "a reactor", "a beacon", "a spaceship", "a network", "a cryo pod", "a time machine", "a chemical", "a schematic", "a virus", "a keepsake", "a trap", "a machine", "a door", "a tool", "a duel", "a ruin", "a hospital", "a masterpiece", "a book an archive", "a flag", "a word", "a dump", "an address", "a letter", "an atlas", "a contagion", "a workshop", "a prison", "a nation", "a song", "a blade", "a job", "a court", "an island", "a library", "a school", "a medicine", "an artifact", "an arena", "a technique", "a key", "a factory", "a cage", "a basement", "a date", "a holy symbol", "a ticket", "a plant", "a bank", "a weapon", "a bag", "a puzzle", "a shore", "a document", "a tattoo", "a mineral", "a station", "a camp", "a paradise", "a pawn shop", "a lock", "a flower", "a fortune", "a boat", "a statue", "an ocean", "a helmet", "a path", "a cave", "a staircase", "a coach", "a ship", "a grave", "a cache", "a battleground", "a safe", "a forest", "a map", "a village", "a timepiece", "a tunnel", "a war", "a compass", "a pool", "a restaurant", "a combination", "a church", "a facility", "a gift", "a seed", "a disaster", "a suitcase", "a city", "a shrine", "a costume", "a piece of evidence", "a base", "a game", "a prototype", "a construction site", "a mountain", "an election", "a piece of furniture", "a work of art", "a museum", "a name", "a laboratory", "a bomb", "a tower", "a work of art", "a blueprint", "a government", "a vision", "a piece of jewelry", "a flash", "a lost and found", "a performance", "an exhibit", "a curse", "a rebellion", "a sacrifice", "a piece of clothing", "a poison", "a maze", "a code", "a pen", "a stage", "a drug", "a device", "a script", "an ambush", "a pit", "an auction item", "a figurine", "a recording", "an accident", "a hotel", "a battery", "a hideout", "a company", "a manifesto"]
var conflictArray = ["but it will loose a plague on the world", "but it will mean the end of wonder in the world", "but then will gain a corrupting power", "but it will mean giving up an important heirloom", "but they will bring darkness to those whose paths they cross", "but they will never find peace again", "but they will burn out the last of their power", "but one way or another, it will be their last adventure", "but they will lose part of their humanity", "but they must give up the source of their power", "but someone will get credit for their greatest idea", "but it will cost them their most priced possession", "but they will lose their divine powers", "but they do not meet the terms of the prophecy", "but they will lose their followers", "but they do not meet the terms of the prophecy", "but they must make a sacrifice no one will ever know about", "but it will cause at cataclysm", "but it will mean laying down arms forever", "but an ancient evil will be released", "but the gods will punish them", "but it will open old wounds", "but they will have to act against their religion", "but they must forget the thing that means the world to them", "but they will be exiled forever", "but their greatest enemy will return", "but something sacred will be defiled", "but their homeland will be put to the torch", "but it will mean a city is destroyed", "but it will mean shattering an old truce", "but they will suffer an injury that does not heal", "but they must forsake that which they worship", "but they must confront a hidden darkness", "but they must face their greatest fear", "but the door between the living and the dead will open", "but they will have to release something they once locked away", "but the memory will haunt them forever", "but they will live the rest of their life with false memories", "but their darkest desire will be revealed", "but someone they could have saved will die", "but it will drive them to the brink of madness", "but they will have to invite something evil inside", "but something that should have stayed dead will rise again", "but they must cross a line they swore they would never cross", "but it will shatter a delusion they are dependent on", "but they must confront a ghost of the past", "but the memory of what they did will haunt them forever", "but only the dead will know of their sacrifice", "but they will not be able to confess their guilt to the living", "but they will forget their entire life piece by piece", "but it will lead their enemy straight to them", "but they will have to draw on a dark power", "but they will be blamed for something they did not do", "but a friend will die and they must choose who", "but something evil will be unleashed on the world", "but their family will never look at them the same again", "but they will have to trade their most precious resource", "but their home will be exposed to a deadly infection", "but it will have to release something they once locked away", "but it will mean the sacrifice of someone or something innocent", "but they will become a monster", "but they must return to the site of an old trauma", "but they will develop a dangerous addiction", "but they will have to make a devil's bargain", "but they will never be able to travel off-world again", "but it will mean trusting someone who betrayed them", "but the blowback will land on their closest friend", "but it will mean giving up the chance to fix their biggest regret", "but they will be erased from the net forever", "but it will compromise the location of something important", "but it will mean joining the enemy", "but an unethical corp will gain a monopoly", "but their secrets will be leaked", "but they will live the rest of their life on the run", "but it will start a war", "but it will mean rioting in the streets", "but the government will never stop hunting them", "but it will unite their enemies", "but an innocent person will be executed", "but a widely used technology will become unstable", "but they will lose the person closest to them", "but they must face what they have been running from", "but they will have to keep a terrible secret", "but it will reveal a hypocrisy", "but it will cost them self-respect", "but it means risking the thing most precious to them", "but they will have to try something frightening and new", "but it will mean forgiving family", "but they will have to resist a great temptation", "but no one will know the reason why", "but they will have to break a personal rule", "but their community will reject them", "but they will lose their closest friend", "but must reconcile with an old enemy", "but they will have to abandon an important duty", "but they will have to break a religious rule", "but everyone will assume they did it for the wrong reason", "but they will have to endure something that repulses them", "but it will mean betraying family", "but the last time they tried, it ending in humiliation", "but it will cost their soul", "but it will cost their reputation", "but someone they love must pay the price", "but a terrible secret will come out", "but they must leave the familiar behind and face the unknown", "but it will mean forever living a lie", "but it will mean breaking a promise", "but they will have to unlearn something they were taught", "but they must let go of something they are holding on to", "but they must let go of an old grudge", "but it means giving up their dream", "but they will have to do something they can never tell anyone about", "but it will cost them their mental health", "but they must face their deepest fear", "but they will have to turn against a mentor", "but they will have to make a promise they know they cannot keep", "but they must accept a loss they have been in denial about", "but the blame will fall on their closest friend", "but it will gain the attention of their enemy", "but they will have to learn to trust again", "but they must convince an enemy to help them", "but it means a good deed will be punished", "but they will have to confront prejudice", "but it may cost them their life", "but it will mean the corruption of something pure", "but it will mean taking on a debt they cannot pay", "but they will bear the scars for all to see", "but first they must repair the damage they have done", "but it will turn them into someone they never wanted to be", "but it will take them somewhere they never wanted to go", "but they will owe something to someone they despise", "but no one will be able to see the scars", "but it will mean paying someone else's debts", "but they must become what they fear", "but they will lose their life's work", "but they will have to exploit prejudice", "but it means evil will go unpunished", "but they will have to push a friend away", "but they will have to betray a friend", "but they will lose the respect of someone they admire", "but it will mean letting their greatest rival can get ahead"]

function storySelect(selectArray) {
	return selectArray[Math.floor(Math.random() * selectArray.length)];
}

function shuffle(arrayToShuffle) {
    for (var i = arrayToShuffle.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arrayToShuffle[i];
        arrayToShuffle[i] = arrayToShuffle[j];
        arrayToShuffle[j] = temp;
    }
	return arrayToShuffle;
}

function pickRandom(arrayToPick) {
	return arrayToPick[Math.floor(Math.random() * arrayToPick.length)];
}

function formatStories(storyDict) {
	var formattedStoryDict = [];
	for (var i = 0; i < storyDict.length; i++) {
		var currStory = storyDict.at(i);
		const formattedStory = currStory.agentPick + " " + currStory.enginePick + " " + currStory.aspectPick + " " + currStory.anchorPick + " " + currStory.conflictPick;
		formattedStoryDict.push(formattedStory);
	}
	return formattedStoryDict;
}

function generateStory(){
	const baseAgentArray = shuffle(agentArray);
	const baseEngineArray = shuffle(engineArray);
	const baseAspectArray = shuffle(aspectArray);
	const baseAnchorArray = shuffle(anchorArray);
	const baseConflictArray = shuffle(conflictArray);
	var storyDict = [];
	for (var i = 0; i < baseAgentArray.length; i++) {
		var agentPick = baseAgentArray.at(i);
		var enginePick = "";
		var aspectPick = "";
		var anchorPick = "";
		var conflictPick = "";
		
		if (i > baseEngineArray.length) {
			enginePick = pickRandom(baseEngineArray);
		} else {
			enginePick = baseEngineArray[i];
		}
		
		if (i > baseAspectArray.length) {
			aspectPick = pickRandom(baseAspectArray);
		} else {
			aspectPick = baseAspectArray[i];
		}
		
		if (i > baseAnchorArray.length) {
			anchorPick = pickRandom(baseAnchorArray);
		} else {
			anchorPick = baseAnchorArray[i];
		}
		
		if (i > baseConflictArray.length) {
			conflictPick = pickRandom(baseConflictArray);
		} else {
			conflictPick = baseConflictArray[i];
		}
		
		storyDict.push({
			agentPick,
			enginePick,
			aspectPick,
			anchorPick,
			conflictPick
		});
	}
	return formatStories(storyDict)
}

function weightedRandom(items, weights) {
    var i;
	
    for (i = 0; i < weights.length; i++) {
        weights[i] += weights[i - 1] || 0;
	}
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++) {
        if (weights[i] > random) {
            break;
		}
	}
    
    return items[i];
}

const intellectArray = ["[S Tier. It seems to have supernatural intelligence. You would not be surprised if it turned out to be a great wizard in an animal form.]",
	"[A Tier. You trust the wisdom of this creature more than you trust most people. It knows what to do in most situations without instruction and sometimes despite bad instruction.]",
	"[B Tier. This is a capable and quick-learning beast. There are few commands that would not be mastered.]",
	"[C Tier. It is able to master the most rudimentary commands, but any idea too advanced gets lost easily.]",
	"[D Tier. You do not keep this creature for its powerful mind. Its foolishness often causes both of you a great deal of trouble.]"
];

const strengthArray = ["[S Tier. In battle this beast has no equal. It fights with dauntless fury, striking fear into the hearts of anyone who bears witness to its wrath. On top of strength, it has instinctual skill in combat.]", 
	"[A Tier. This beast is more powerful than most men will ever be. It is a capable participant in any fight, and you respect it as a combatant more than most allies.]",
	"[B Tier. Like any creature, this beast can be dangerous if it needs to be. It is outclassed by skilled fighters and great monsters, but it is more than capable of defending itself.]",
	"[C Tier. While this creature probably can fight, you have never witnessed it. You'd prefer to keep it out of harm's way when possible. It is more of a liability in battle than an asset.]",
	"[D Tier. This creature is a notably frail coward. Its participation in a fight would probably put you and your allies at greater risk.]"
];

const stealthArray = ["[S Tier. It moves like a shadow on the wind. It seems to avoid detection with supernatural ease at will. After years of working with this beast, even you are unable to detect it when it does not want to be found.]",
	"[A Tier. All but the keenest eyes and sharpest ears are powerless to detect this creature at work. It can find a way into almost any setting completely unnoticed.]",
	"[B Tier. It is possible for this creature to be stealthy, but it does not have much training beyond the natural advantages it has as an animal.]",
	"[C Tier. This creature is far from graceful or subtle. It would take a wild circumstance to make it an asset in any sort of clandestine activity.]",
	"[D Tier. Perhaps due to its shape, size, or color, this creature sticks out in almost every circumstance. Worse yet, it is easily identified as yours.]"
];

const sensesArray = ["[S Tier: You think this creature may possess some kind of supernatural gift for detection. It seems to anticipate events before they begin to unfold. It is capable of finding valuable information without great effort. To call it impressive would be an understatement.]",
	"[A Tier. Even for creatures of its type, this beast has impressive senses far beyond those of any humanoid.]",
	"[B Tier. Like most animals some of its senses are sharper than a human's, but others are considerably weaker. It is good for specific circumstances.]",
	"[C Tier. It may have one strong sense that allows it to function, but you wouldn't dream of setting it to a task like tracking or watch.]",
	"[D Tier. Perhaps due to age or injury, this creature lacks key senses. It is only barely functional under the best conditions. You must act as its eyes and ears at all times. It relies on you.]"
];

const loyaltyArray = ["[S Tier. The bond between you and this creature is unbreakable. It would endure any trial to remain at your side. This creature will protect you and the things you care about with dauntless determination.]",
	"[A Tier. There are few beings living or dead that you would rely on more than this creature. It sees you as family, with an intensity deeper than anything possible in the natural world. Its loyalty is only limited by its capability.]",
	"[B Tier. You have a close bond with this creature, but it is limited by instinct. There are some circumstances in which animalistic self-preservation outweighs training. Still, in most circumstances it can be relied upon.]",
	"[C Tier. You have a working relationship with this creature, but there are some areas in which you have distinct trouble. It heeds you because it knows you offer food and stability, but it can be swayed by opportunistic instinct.]",
	"[D Tier. Calling this creature actively treacherous is probably going too far. Probably. You are still able to work with it, but it has constant behavioral problems, and you get the impression that if you let your guard down, it could turn on you.]"
];

function checkIfIncludes(testArray, testVal) {
	for (let i of testArray) {
		if (i === testVal) return true;
	}
	return false;
}

function getStats(numToGenerate) {
	// choose 1 (one) from each array
	const weightArray = [5,25,25,25,20]
	
	//var retArray = Array.from(Array(numToGenerate), () => new Array(5));
	//statArray = Array(numToGenerate).fill("").map(() => Array(5));
	var retArray = new Array(numToGenerate).fill(0).map(() => new Array(5).fill(0));
	
	console.log(retArray);
	
	var numS = numToGenerate * 0.05;
	var numGen = numToGenerate * 0.25;
	var numD = numToGenerate * 0.2
	
	var usedIntPos = [];
	var usedStrPos = [];
	var usedStlPos = [];
	var usedSenPos = [];
	var usedLoyPos = [];
	
	for (var s = 0; s < numS; s++) {
		var intPos = -1;
		var strPos = -1;
		var stlPos = -1;
		var senPos = -1;
		var loyPos = -1;
		
		while (intPos < 0) {
			var tempIntPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedIntPos, tempIntPos)) {
				console.log("SKIP");
			} else {
				usedIntPos.push(tempIntPos);
				intPos = tempIntPos;
			}
		}
		
		while (strPos < 0) {
			var tempStrPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStrPos, tempStrPos)) {
				console.log("SKIP");
			} else {
				usedStrPos.push(tempStrPos);
				strPos = tempStrPos;
			}
		}
		
		while (stlPos < 0) {
			var tempStlPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStlPos, tempStlPos)) {
				console.log("SKIP");
			} else {
				usedStlPos.push(tempStlPos);
				stlPos = tempStlPos;
			}
		}
		
		while (senPos < 0) {
			var tempSenPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedSenPos, tempSenPos)) {
				console.log("SKIP");
			} else {
				usedSenPos.push(tempSenPos);
				senPos = tempSenPos;
			}
		}
		
		while (loyPos < 0) {
			var tempLoyPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedLoyPos, tempLoyPos)) {
				console.log("SKIP");
			} else {
				usedLoyPos.push(tempLoyPos);
				loyPos = tempLoyPos;
			}
		}
		
		retArray[intPos][0] = "Intelligence: " + intellectArray[0]
		retArray[strPos][1] = "Strength: " + strengthArray[0]
		retArray[stlPos][2] = "Stealth: " + stealthArray[0]
		retArray[senPos][3] = "Sense: " + sensesArray[0]
		retArray[loyPos][4] = "Loyalty: " + loyaltyArray[0]
	}
	
	for (a = 0; a < numGen; a++) {
		var intPos = -1;
		var strPos = -1;
		var stlPos = -1;
		var senPos = -1;
		var loyPos = -1;
		
		while (intPos < 0) {
			var tempIntPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedIntPos, tempIntPos)) {
				console.log("SKIP");
			} else {
				usedIntPos.push(tempIntPos);
				intPos = tempIntPos;
			}
		}
		
		while (strPos < 0) {
			var tempStrPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStrPos, tempStrPos)) {
				console.log("SKIP");
			} else {
				usedStrPos.push(tempStrPos);
				strPos = tempStrPos;
			}
		}
		
		while (stlPos < 0) {
			var tempStlPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStlPos, tempStlPos)) {
				console.log("SKIP");
			} else {
				usedStlPos.push(tempStlPos);
				stlPos = tempStlPos;
			}
		}
		
		while (senPos < 0) {
			var tempSenPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedSenPos, tempSenPos)) {
				console.log("SKIP");
			} else {
				usedSenPos.push(tempSenPos);
				senPos = tempSenPos;
			}
		}
		
		while (loyPos < 0) {
			var tempLoyPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedLoyPos, tempLoyPos)) {
				console.log("SKIP");
			} else {
				usedLoyPos.push(tempLoyPos);
				loyPos = tempLoyPos;
			}
		}
		
		retArray[intPos][0] = "Intelligence: " + intellectArray[1]
		retArray[strPos][1] = "Strength: " + strengthArray[1]
		retArray[stlPos][2] = "Stealth: " + stealthArray[1]
		retArray[senPos][3] = "Sense: " + sensesArray[1]
		retArray[loyPos][4] = "Loyalty: " + loyaltyArray[1]
	}
	
	for (b = 0; b < numGen; b++) {
		var intPos = -1;
		var strPos = -1;
		var stlPos = -1;
		var senPos = -1;
		var loyPos = -1;
		
		while (intPos < 0) {
			var tempIntPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedIntPos, tempIntPos)) {
				console.log("SKIP");
			} else {
				usedIntPos.push(tempIntPos);
				intPos = tempIntPos;
			}
		}
		
		while (strPos < 0) {
			var tempStrPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStrPos, tempStrPos)) {
				console.log("SKIP");
			} else {
				usedStrPos.push(tempStrPos);
				strPos = tempStrPos;
			}
		}
		
		while (stlPos < 0) {
			var tempStlPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStlPos, tempStlPos)) {
				console.log("SKIP");
			} else {
				usedStlPos.push(tempStlPos);
				stlPos = tempStlPos;
			}
		}
		
		while (senPos < 0) {
			var tempSenPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedSenPos, tempSenPos)) {
				console.log("SKIP");
			} else {
				usedSenPos.push(tempSenPos);
				senPos = tempSenPos;
			}
		}
		
		while (loyPos < 0) {
			var tempLoyPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedLoyPos, tempLoyPos)) {
				console.log("SKIP");
			} else {
				usedLoyPos.push(tempLoyPos);
				loyPos = tempLoyPos;
			}
		}
		
		retArray[intPos][0] = "Intelligence: " + intellectArray[2]
		retArray[strPos][1] = "Strength: " + strengthArray[2]
		retArray[stlPos][2] = "Stealth: " + stealthArray[2]
		retArray[senPos][3] = "Sense: " + sensesArray[2]
		retArray[loyPos][4] = "Loyalty: " + loyaltyArray[2]
	}
	
	for (c = 0; c < numGen; c++) {
		var intPos = -1;
		var strPos = -1;
		var stlPos = -1;
		var senPos = -1;
		var loyPos = -1;
		
		while (intPos < 0) {
			var tempIntPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedIntPos, tempIntPos)) {
				console.log("SKIP");
			} else {
				usedIntPos.push(tempIntPos);
				intPos = tempIntPos;
			}
		}
		
		while (strPos < 0) {
			var tempStrPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStrPos, tempStrPos)) {
				console.log("SKIP");
			} else {
				usedStrPos.push(tempStrPos);
				strPos = tempStrPos;
			}
		}
		
		while (stlPos < 0) {
			var tempStlPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStlPos, tempStlPos)) {
				console.log("SKIP");
			} else {
				usedStlPos.push(tempStlPos);
				stlPos = tempStlPos;
			}
		}
		
		while (senPos < 0) {
			var tempSenPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedSenPos, tempSenPos)) {
				console.log("SKIP");
			} else {
				usedSenPos.push(tempSenPos);
				senPos = tempSenPos;
			}
		}
		
		while (loyPos < 0) {
			var tempLoyPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedLoyPos, tempLoyPos)) {
				console.log("SKIP");
			} else {
				usedLoyPos.push(tempLoyPos);
				loyPos = tempLoyPos;
			}
		}
		
		retArray[intPos][0] = "Intelligence: " + intellectArray[3]
		retArray[strPos][1] = "Strength: " + strengthArray[3]
		retArray[stlPos][2] = "Stealth: " + stealthArray[3]
		retArray[senPos][3] = "Sense: " + sensesArray[3]
		retArray[loyPos][4] = "Loyalty: " + loyaltyArray[3]
	}
	
	for (d = 0; d < numD; d++) {
		var intPos = -1;
		var strPos = -1;
		var stlPos = -1;
		var senPos = -1;
		var loyPos = -1;
		
		while (intPos < 0) {
			var tempIntPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedIntPos, tempIntPos)) {
				console.log("SKIP");
			} else {
				usedIntPos.push(tempIntPos);
				intPos = tempIntPos;
			}
		}
		
		while (strPos < 0) {
			var tempStrPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStrPos, tempStrPos)) {
				console.log("SKIP");
			} else {
				usedStrPos.push(tempStrPos);
				strPos = tempStrPos;
			}
		}
		
		while (stlPos < 0) {
			var tempStlPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedStlPos, tempStlPos)) {
				console.log("SKIP");
			} else {
				usedStlPos.push(tempStlPos);
				stlPos = tempStlPos;
			}
		}
		
		while (senPos < 0) {
			var tempSenPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedSenPos, tempSenPos)) {
				console.log("SKIP");
			} else {
				usedSenPos.push(tempSenPos);
				senPos = tempSenPos;
			}
		}
		
		while (loyPos < 0) {
			var tempLoyPos = rollTypeDice(numToGenerate) - 1;
			if (checkIfIncludes(usedLoyPos, tempLoyPos)) {
				console.log("SKIP");
			} else {
				usedLoyPos.push(tempLoyPos);
				loyPos = tempLoyPos;
			}
		}
		
		retArray[intPos][0] = "Intelligence: " + intellectArray[4]
		retArray[strPos][1] = "Strength: " + strengthArray[4]
		retArray[stlPos][2] = "Stealth: " + stealthArray[4]
		retArray[senPos][3] = "Sense: " + sensesArray[4]
		retArray[loyPos][4] = "Loyalty: " + loyaltyArray[4]
	}
	
	console.log(retArray);
	
	return retArray;
		
	//return ["Intelligence: " + weightedRandom(intellectArray, weightArray), "Strength: " + weightedRandom(strengthArray, weightArray), "Stealth: " + weightedRandom(stealthArray, weightArray), "Senses: " + weightedRandom(sensesArray, weightArray), "Loyalty: " + weightedRandom(loyaltyArray, weightArray)]
}

function generateStats(numToGenerate) {
	/*var generatedStats = [];
	var remainingToGenerate = numToGenerate;
	while (remainingToGenerate > 0) {
		const newStats = getStats(numToGenerate);
		if (!generatedStats.includes(newStats)) {
			generatedStats.push(newStats);
			remainingToGenerate = remainingToGenerate - 1;
		}
	}
	return generatedStats;*/
	
	return getStats(numToGenerate);
	//return [];
}

function formatRelationshipPrompt(excelRows) {
	/*
		Popover (he/him) is in love with Chive (she/her), and Chive loves him back. 
		Everyone has good traits and bad traits.
		Popover's personality is that he's Authoritative; Honorable;	Cautious; and Trusting as well as	Stubborn; Overbearing;	Frivolous; and Gullible
		Chive's personality is that she's Nurturing; Authoritative;	Resourceful; and Just as well as	Stubborn; Self-Righteous;	Unforgiving; and Defiant
		List 3 reasons why Popover loves Chive.  List 3 reasons why Chive loves Popover.  List 3 things that they sometimes disagree on or need to work on as a couple.
	*/
	
	var relationshipHolder = [];
	
	//Add the data rows from Excel file.
	for (var i = 0; i < excelRows.length; i++) {
		//console.log(excelRows[i]);
		var relationships = excelRows[i].Pairing.split(',');
		for (var k = 0; k < relationships.length; k++) {
			var relationshipNumber = relationships[k].substring(0,3);
			if (!relationshipHolder.includes(relationshipNumber)) {
				//console.log("CHECKING FOR RELATIONSHIPS: " + relationshipNumber);
				for (var j = 0; j < excelRows.length; j++) {
					var checkingRelationship = excelRows[j].Pairing.split(',');
					for (var p = 0; p < checkingRelationship.length; p++) {
						var checkingRelationshipNumber = checkingRelationship[p].substring(0,3);
						if (relationshipNumber == checkingRelationshipNumber 
							&& excelRows[i].Name != excelRows[j].Name) {
							//console.log("FOUND RELATION! " + excelRows[i].Name + " AND " + excelRows[j].Name);
							relationshipHolder.push(relationshipNumber);
							
							// Format String!
							var name1 = excelRows[i].Name;
							var id1 = excelRows[i].Identity;
							var personality1 = excelRows[i].Personality;
							var goodTraits1 = excelRows[i].GoodTraits;
							var badTraits1 = excelRows[i].BadTraits;
							var badderTraits1 = excelRows[i].BadderTraits;
							
							var name2 = excelRows[j].Name;
							var id2 = excelRows[j].Identity;
							var personality2 = excelRows[j].Personality;
							var goodTraits2 = excelRows[j].GoodTraits;
							var badTraits2 = excelRows[j].BadTraits;
							var badderTraits2 = excelRows[j].BadderTraits;
					
							var outputString = "";
							
							// Popover (he/him) is in love with Chive (she/her), and Chive loves him back. 
							// Everyone has good traits and bad traits.
							console.log(relationshipNumber + ": ");
							console.log(name1 + " " + pronounConverter(id1, 0) + " is in love with " + name2 + " " + pronounConverter(id2, 0) + ", and " + name2 + " loves " + pronounConverter(id1, 2) + " back.");
							console.log("Everyone has good traits and bad traits.");
							
							outputString += name1 + " " + pronounConverter(id1, 0) + " is in love with " + name2 + " " + pronounConverter(id2, 0) + ", and " + name2 + " loves " + pronounConverter(id1, 2) + " back.\n";
							outputString += "Everyone has good traits and bad traits.\n";
							
							// Popover's personality is that he's Authoritative; Honorable;	Cautious; and Trusting as well as	Stubborn; Overbearing;	Frivolous; and Gullible
							console.log(name1 + "'s personality is that " + pronounConverter(id1, 1) + " " + personality1 + " " + goodTraits1 + " " + badTraits1 + " " + badderTraits1);
							console.log(name2 + "'s personality is that " + pronounConverter(id2, 1) + " " + personality2 + " " + goodTraits2 + " " + badTraits2 + " " + badderTraits2);
							
							outputString += name1 + "'s personality is that " + pronounConverter(id1, 1) + " " + personality1 + " " + goodTraits1 + " " + badTraits1 + " " + badderTraits1 + "\n";
							outputString += name2 + "'s personality is that " + pronounConverter(id2, 1) + " " + personality2 + " " + goodTraits2 + " " + badTraits2 + " " + badderTraits2 + "\n";
							
							// List 3 reasons why Popover loves Chive.  List 3 reasons why Chive loves Popover.  List 3 things that they sometimes disagree on or need to work on as a couple.
							console.log(relationshipNumber + ": List 3 reasons why " + name1 + " loves " + name2 + ". List 3 reasons why " + name2 + " loves " + name1 + ". List 3 things that they sometimes disagree on or need to work on as a couple.");
							outputString += relationshipNumber + ": List 3 reasons why " + name1 + " loves " + name2 + ". List 3 reasons why " + name2 + " loves " + name1 + ". List 3 things that they sometimes disagree on or need to work on as a couple.\n";
							
							const headerNode = document.createElement("p");
							headerNode.style.setProperty('color', 'white'); 
							const textHeaderNode = document.createTextNode(outputString);
							headerNode.appendChild(textHeaderNode);
							document.getElementById("stringOutputZone").appendChild(headerNode);
							const emptyNode = document.createElement("p");
							const emptyHeaderNode = document.createTextNode(" ");
							emptyNode.appendChild(emptyHeaderNode);
							document.getElementById("stringOutputZone").appendChild(emptyNode);
						}
					}
				}
			}
		}
	}
}

function formatAiZodiacPrompt(excelRows) {
	/*
		I would like to use elements of astrology readings and tarot card readings to generate the fictional past, present, and future of characters in a fantasy novel

		Soliel Firelight (he/him) is 21 years old and was born on October 13th.  

		Everyone has good and bad traits, and Soliel is Stubborn; Overbearing;	Authoritative; Generous;	Inhibited; and Perfectionist	Orderly; and Industrious as well as

		In a tarot reading for him, The Lovers card was pulled to represent his early childhood.
		The 3 of Pentacles was pulled to represent his early adolescence.
		and The King of Cups was pulled to represent his early adulthood.

		Create a story of Soliel's life so far based on this information.
	*/
	for (var i = 0; i < excelRows.length; i++) {
		var name = excelRows[i].Name;
		var gender = excelRows[i].Gender;
		var age = excelRows[i].Age;
		var birthMonth = excelRows[i].BirthMonth;
		var birthDate = excelRows[i].BirthDate;
		var goodTraits = excelRows[i].GoodTraits;
		var gooderTraits = excelRows[i].GooderTraits;
		var badTraits = excelRows[i].BadTraits;
		var badderTraits = excelRows[i].BadderTraits;
		var cardReadingStr = excelRows[i].CardReading.replace('[','').replace(']','');
		var cardReading = cardReadingStr.split(",");
		
		var outputString = "I would like to use elements of astrology readings and tarot card readings to generate the fictional past, present, and future of characters in a fantasy novel. ";
		outputString += name + " " + pronounConverter(gender, 0) + " is " + age + " years old and was born on " + birthMonth + " " + birthDate + dateSuffix(birthDate) + ". ";
		outputString += "Everyone has good and bad traits, and " + name + " is " + goodTraits + gooderTraits + " as well as " + badTraits + badderTraits + ". ";
		outputString += "In a tarot reading for " + pronounConverter(gender, 2) + ", " + cardReading[0] + " was pulled to represent " + pronounConverter(gender, 3) + " early childhood. ";
		outputString += cardReading[1] + " was pulled to represent " + pronounConverter(gender, 3) + " early adolescence. ";
		outputString += "and " + cardReading[2] + " was pulled to represent " + pronounConverter(gender, 3) + " early adulthood. ";
		outputString += "Create a story of " + name + "'s life so far based on this information.";
		
		//console.log(outputString);
		
		const headerNode = document.createElement("p");
		headerNode.style.setProperty('color', 'white'); 
		const textHeaderNode = document.createTextNode(outputString);
		headerNode.appendChild(textHeaderNode);
		document.getElementById("stringOutputZone2").appendChild(headerNode);
	}
}

function dateSuffix(date) {
	switch(date) {
		case 1:
		case "1":
			return "st";
		case 2:
		case "2":
			return "nd";
		case 3:
		case "3":
			return "rd";
		default:
			return "th";
	}
}

function pronounConverter(identity, num) {
	var returnString = "";
	
	switch(identity) {
		case 'Cis-Girl':
		case 'Trans-Girl':
			if (num == 1) {
				returnString = "she is";
			} else if (num == 2) {
				returnString = "her";
			} else if (num == 3) {
				returnString = "her";
			} else {
				returnString = "(she/her)";
			}
			break;
		case 'Cis-Boy':
		case 'Trans-Boy':
			if (num == 1) {
				returnString = "he is";
			} else if (num == 2) {
				returnString = "him";
			} else if (num == 3) {
				returnString = "his";
			} else {
				returnString = "(he/him)";
			}
			break;
		case 'Nonbinary':
			if (num == 1) {
				returnString = "they are";
			} else if (num == 2) {
				returnString = "them";
			} else if (num == 3) {
				returnString = "their";
			} else {
				returnString = "(they/them)";
			}
			break;
	}
	
	return returnString;
}

	
function UploadProcess() {
	//Reference the FileUpload element.
	var fileUpload = document.getElementById("fileUpload");

	//Validate whether File is valid Excel file.
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();

			//For Browsers other than IE.
			if (reader.readAsBinaryString) {
				reader.onload = function (e) {
					GetTableFromExcel(e.target.result, 1);
				};
				reader.readAsBinaryString(fileUpload.files[0]);
			} else {
				//For IE Browser.
				reader.onload = function (e) {
					var data = "";
					var bytes = new Uint8Array(e.target.result);
					for (var i = 0; i < bytes.byteLength; i++) {
						data += String.fromCharCode(bytes[i]);
					}
					GetTableFromExcel(data, 1);
				};
				reader.readAsArrayBuffer(fileUpload.files[0]);
			}
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid Excel file.");
	}
}

function UploadProcess2() {
	//Reference the FileUpload element.
	var fileUpload = document.getElementById("fileUpload2");

	//Validate whether File is valid Excel file.
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();

			//For Browsers other than IE.
			if (reader.readAsBinaryString) {
				reader.onload = function (e) {
					GetTableFromExcel(e.target.result, 2);
				};
				reader.readAsBinaryString(fileUpload.files[0]);
			} else {
				//For IE Browser.
				reader.onload = function (e) {
					var data = "";
					var bytes = new Uint8Array(e.target.result);
					for (var i = 0; i < bytes.byteLength; i++) {
						data += String.fromCharCode(bytes[i]);
					}
					GetTableFromExcel(data, 2);
				};
				reader.readAsArrayBuffer(fileUpload.files[0]);
			}
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid Excel file.");
	}
}

function GetTableFromExcel(data, type) {
	console.log("TYPE : " + type);
	//Read the Excel File data in binary
	var workbook = XLSX.read(data, {
		type: 'binary'
	});

	//get the name of First Sheet.
	var Sheet = workbook.SheetNames[0];

	//Read all rows from First Sheet into an JSON array.
	var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

	// outputHtmlExcelTable(excelRows);
	console.log("TYPE IS " + type);
	if (type == 1 || type == "1") {	
		formatRelationshipPrompt(excelRows);
	} else if (type == 2 || type == "2") {
		formatAiZodiacPrompt(excelRows);
	}

	var ExcelTable = document.getElementById("ExcelTable");
	ExcelTable.innerHTML = "";
	//ExcelTable.appendChild(myTable);
}

function outputHtmlExcelTable(excelRows) {
	//Create a HTML Table element.
	var myTable  = document.createElement("table");
	myTable.border = "1";

	//Add the header row.
	var row = myTable.insertRow(-1);

	//Add the header cells.
	var headerCell = document.createElement("TH");
	headerCell.innerHTML = "Pairing";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Name";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Identity";
	row.appendChild(headerCell);
	
	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Personality";
	row.appendChild(headerCell);
	
	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Good Traits";
	row.appendChild(headerCell);
	 
	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Bad Traits";
	row.appendChild(headerCell);
	
	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Badder Traits";
	row.appendChild(headerCell);

	//Add the data rows from Excel file.
	for (var i = 0; i < excelRows.length; i++) {
		//Add the data row.
		var row = myTable.insertRow(-1);

		//Add the data cells.
		var cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Pairing;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Name;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Identity;
		
		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Personality;
		
		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].GoodTraits;
		
		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].BadTraits;
		
		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].BadderTraits;
	}
}