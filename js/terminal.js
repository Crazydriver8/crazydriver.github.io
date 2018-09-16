var username = "user";
var domain = "wisteria_net";
var welcomeMessage;

var currentLocation = "train_site";
var passwordCheck = false;
var passwordTarget = "";

var trainAccess = false;
var secretAccess = false;

var eye_ascii = "" +
"__________________$$$$$$$$$$$$$$\n" +
"______________$$$$$$$$\n" +
"___________$$$$$$\n" +
"________$$$$$\n" +
"______$$$$\n" +
"___$$$$$\n" +
"_$$$$$___________________$$___$$\n" +
"$$$$___________$$$$$$__$$$__$$$_____$\n" +
"___________$$$$$$$$$$$$$$$$$$$$$$$$$\n" +
"________$$$$$$$$$$$$____$$$$$$$$$$$\n" +
"______$$$$$$$$$$$$$$$_____$$$$$$\n" +
"____$$$__$$$$$$$$$$$$_____$$$\n" +
"___$$$___$$$$$$$$$$$$____$$$\n" +
"__$$______$$$$$$$$$$____$$$\n" +
"_$$_________$$$$$$____$$$$\n" +
"$$__________________$$$$$\n" +
"______________$$$$$$$$\n" +
"_$$$$$$$$$$$$$$$$$\n";

function fauxTerm(config) {
  
  var term = config.el || document.getElementById('term');
  var termBuffer = config.initialMessage || '';
  var lineBuffer = config.initialLine || '';
  var cwd = config.cwd || "~/";
  var tags = config.tags || ['red', 'blue', 'white', 'bold', 'green'];
  var processCommand = config.cmd || false;
  var maxBufferLength = config.maxBufferLength || 8192;
  var commandHistory = [];
  var currentCommandIndex = -1;
  var maxCommandHistory = config.maxCommandHistory || 100;
  var autoFocus = config.autoFocus || false;
  var coreCmds = {
    "clear": clear
  };
  
  var fauxInput = document.createElement('textarea');
  fauxInput.className = "faux-input";
  document.body.appendChild(fauxInput);
  if ( autoFocus ) {
    fauxInput.focus();
  }


  function getLeader() {
    return username + "@" + domain + ":/" + currentLocation + "$ ";
  }

  function renderTerm() {
    var bell = '<span class="bell"></span>';
    var ob = termBuffer + getLeader() + lineBuffer;
    term.innerHTML = ob;
    term.innerHTML += bell;
    term.scrollTop = term.scrollHeight;
  }
  
  function writeToBuffer(str) {
    termBuffer += str;
    
    //Stop the buffer getting massive.
    if ( termBuffer.length > maxBufferLength ) {
      var diff = termBuffer.length - maxBufferLength;
      termBuffer = termBuffer.substr(diff);
    }
    
  }
  
  function renderStdOut(str) {
    var i = 0, max = tags.length;
    for ( i; i<max; i++ ) {
      var start = new RegExp('{' + tags[i] + '}', 'g');
      var end = new RegExp('{/' + tags[i] + '}', 'g');
      if (str != null) {
        str = str.replace(start, '<span class="' + tags[i] + '">');
        str = str.replace(end, '</span>');
      } else {
        str = '<span class="bell"></span>';
      }
    }
    return str;
  }
  
  function clear(argv, argc) {
    termBuffer = "";
    return "";
  }
  
  function isCoreCommand(line) {
    if ( coreCmds.hasOwnProperty(line) ) {
      return true;
    }
    return false;
  }
  
  function coreCommand(argv, argc) {
    
    var cmd = argv[0];
    return coreCmds[cmd](argv, argc);
    
  }

  function processLine() {
    
    //Dispatch command
    var stdout, line = lineBuffer, argv = line.split(" "), argc = argv.length;
    
    var cmd = argv[0];
    
    lineBuffer += "\n";
    writeToBuffer( getLeader() + lineBuffer );
    lineBuffer = "";
     
    //If it's not a blank line.
    if ( cmd !== "" ) {
      
      //If the command is not registered by the core.
      if ( !isCoreCommand(cmd) ) {
        
        //User registered command
        if ( processCommand ) {
          stdout = processCommand(argv,argc);
        } else {
          stdout = "{white}{bold}" + cmd + "{/bold}{/white}: command not found\n";
        }
      } else {
        //Execute a core command
        stdout = coreCommand(argv,argc);
      }

      //If an actual command happened.
      if ( stdout === false ) {
        stdout = "{white}{bold}" + cmd + "{/bold}{/white}: command not found\n";
      }
    
      stdout = renderStdOut(stdout);
      writeToBuffer(stdout);
      
      addLineToHistory(line);
    
    }

    renderTerm();
  }
  
  function addLineToHistory(line) {
    commandHistory.unshift( line );
    currentCommandIndex = -1;
    if ( commandHistory.length > maxCommandHistory ) {
      console.log('reducing command history size');
      console.log(commandHistory.length);
      var diff = commandHistory.length - maxCommandHistory;
      commandHistory.splice(commandHistory.length -1, diff);
      console.log(commandHistory.length);
    }
  }
  
  function isInputKey(keyCode) {
    var inputKeyMap = [32,190,192,189,187,220,221,219,222,186,188,191];
    if ( inputKeyMap.indexOf(keyCode) > -1 ) {
      return true;
    }
    return false;
  }
  
  function toggleCommandHistory(direction) {
    
    var max = commandHistory.length -1;
    var newIndex = currentCommandIndex + direction;
    
    if ( newIndex < -1 ) newIndex = -1;
    if ( newIndex >= commandHistory.length) newIndex = commandHistory.length -1;
    
    if ( newIndex !== currentCommandIndex ) {
      currentCommandIndex = newIndex;
    }
    
    if ( newIndex > -1 ) {
      //Change line to something from history.
      lineBuffer = commandHistory[newIndex];
    } else {
      //Blank line...
      lineBuffer = "";
    }
    
    
  }

  function acceptInput(e) {
    e.preventDefault();
    
     fauxInput.value = "";
    
    if ( e.keyCode >= 48 && e.keyCode <= 90 || isInputKey(e.keyCode) ) {
      if (! e.ctrlKey ) {
        //Character input
        lineBuffer += e.key;
      } else {
        //Hot key input? I.e Ctrl+C
      }
    } else if ( e.keyCode === 13 ) {
      processLine();
    } else if ( e.keyCode === 9 ) {
      lineBuffer += "\t";
    } else if ( e.keyCode === 38 ) {
      toggleCommandHistory(1);
    } else if ( e.keyCode === 40 ) {
      toggleCommandHistory(-1);
    }
    else if ( e.key === "Backspace" ) {
      lineBuffer = lineBuffer.substr(0, lineBuffer.length -1);
    }

    renderTerm();
  }

  term.addEventListener('click', function(e){
    fauxInput.focus();
    term.classList.add('term-focus');
  });
  fauxInput.addEventListener('keydown', acceptInput);
  fauxInput.addEventListener('blur', function(e){
    term.classList.remove('term-focus');
  });
  renderTerm();
  
}

var myTerm = new fauxTerm({
  el: document.getElementById("term"),
  cwd: username + "@" + domain + ":/" + currentLocation,
  initialMessage: "Wisteria_Net_v0.001\n",
  
  tags: ['red', 'blue', 'white', 'bold', 'green'],
  maxBufferLength: 8192,
  maxCommandHistory: 500,
  cmd: function(argv, argc) {
    //console.log(argv);
    //return false;

    //var buffer = "Triggered for command {bold}" + argv[0] + "{/bold}\n";
    var buffer;
    var command = argv[0];
    var argumentList = [];
    if ( argc > 1 ) {
      //buffer += "Args: ";
      for ( var i=1; i<argc; i++ ) {
        //buffer += argv[i] + " ";
        argumentList += argv[i] + ",";
      }
      //buffer += "\n";
    }

    buffer = "Command " + command + " triggered with arguments : {" + argumentList  + "}\n";

    if (passwordCheck) {
      return checkPassword(passwordTarget, command);
    }

    switch (command) {
      case "ls":
        return listDir();
      case "cd":
        return changeDir(argumentList);
      case "help":
        return helpText();
      default:
        return buffer;
    }

    
    //buffer += "Here is a nice {red}shiny{/red} string {green}using{/green} tags for styling.\n";
    //buffer += "Try using the up and down arrows, or typing 'clear' and pressing enter\n";
  }
});

function listDir() {
  if (currentLocation == "root") return listDir_Root();
  if (currentLocation.includes('train_site')) return listDir_TrainSite();
  return "Error listing directory for " + currentLocation + "\n";
}

function changeDir(dir) {
  if (currentLocation == "root") return changeDir_Root(dir);
  if (currentLocation.includes('train_site')) return changeDir_TrainSite(dir);
  return "cd called with invalid argument " + dir + "\n";
}

function helpText() {
  return "ls - List Directories/Files\n" +
    "cd [dir] - Change directory to [dir]\n" +
    "cat [file] - Show contents of file\n";
}

function checkPassword(target, password) {
  console.log("Password is " + password);
  passwordCheck = false;
  switch(target) {
    case "root":
      if (password == "password") {
        trainAccess = true;
        currentLocation = "root";
        return "{green}ACCESS GRANTED{/green}\n";
      } else {
        trainAccess = false;
        return "{red}ACCESS DENIED{/red}\n";
      }
    case "SUPER_SECRET":
      return "{red}ACCESS DENIED, YOUR IP HAS BEEN LOGGED\n" +
      eye_ascii + "{/red}\n";
    default:
      return "Error???????\n";
  }
}

/*
 *
 *    ROOT
 *
 */

var root_directories = "train_site\n" + 
"SUPER_SECRET\n";

function listDir_Root() {
  return root_directories;
}

function changeDir_Root(dir) {
  var test = "";
  test += dir;
  test = test.replace(',', '');
  switch (test) {
    case "train_site":
      currentLocation = "train_site";
      break;
    case "SUPER_SECRET":
      if (!secretAccess) {
        passwordCheck = true;
        passwordTarget = "SUPER_SECRET";
        return "Please enter password\n";
      } else {
        currentLocation = "root";
      }
    break;
    default:
      return "Invalid cd target " + dir + "\n";
  }
}

/*
 *
 *    TRAIN SITE
 *
 */
var train_site_directories = "..\n" +
  "css\n" +
  "js\n" +
  "pages\n" +
  "index.html\n";

function listDir_TrainSite() {
  switch (currentLocation) {
    case "train_site":
      return train_site_directories;
    case "train_site/css":
      return "..\nschedule.css\n";
    case "train_site/js":
      return "..\nschedule.js\n";
    case "train_site/pages":
      return "..\nschedule.html\n";
    default:
      return "list called!\n";
  }
}

function changeDir_TrainSite(dir) {
  var test = "";
  test += dir;
  test = test.replace(',', '');
  switch (currentLocation) {
    case "train_site":
      switch (test) {
        case "css":
          currentLocation = "train_site/css";
          break;
        case "js":
          currentLocation = "train_site/js";
          break;
        case "pages":
          currentLocation = "train_site/pages";
          break;
        case "..":
          if (!trainAccess) {
            passwordCheck = true;
            passwordTarget = "root";
            return "Please enter password\n";
          } else {
            currentLocation = "root";
          }
          break;
        default:
          return "Invalid cd target " + dir + "\n";
      }
      break;
    case "train_site/css":
    case "train_site/js":
    case "train_site/pages":
      switch (test) {
        case "..":
          currentLocation = "train_site";
          break;
        default:
          return "Invalid cd target " + dir + "\n";
      }
  }
}