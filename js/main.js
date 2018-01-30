
var Main = {};

var player, player1, player2, player3, player4;
var controls;
//var scrollbox = $('#logs');
var fullscreenMode=0;

var rotation_flag = 0;
var PackageId =  tizen.application.getCurrentApplication().appInfo.packageId;
var sharedDir = tizen.application.getAppSharedURI(PackageId);
var url = sharedDir + "../res/wgt/img/blue.mp4";
var url2 = sharedDir + "../res/wgt/img/red.mp4";
var url3 = sharedDir + "../res/wgt/img/yellow.mp4";
var url4 = sharedDir + "../res/wgt/img/6.mp4";

var listener1;
var listener2;
var listener3;
var listener4;

Main.onLoad = function (){	
	"use strict";
	 if (window.tizen === undefined) {
        
         setTimeout(
         		function(){
         			 Main.log('This application needs to be run on Tizen device');
         		},
         		1000
         );
     }else{
    	setTimeout(
    		function(){
    			
    			Main.log('Started Example');
    			Main.registAllKeys();
    			Main.initplayer();
    			//player = new VideoPlayer(config);
    			//document.onHide = onHide;
    			//enable key input
    			document.addEventListener('keydown', Main.onKeyDown, false);
    		},
    		5000
    	);
     }
	
	//window.onunload = onHide;
};


/**
 * Handles a key press
 * @param {KeyboardEvent} event
 */
Main.onKeyDown = function (event) {
	"use strict";
	var keyCode = event.keyCode;
    
	switch (keyCode) {
		case 13:    // Enter
	   
	        break;
	    case 10252: // MediaPlayPause
	    case 415:   // MediaPlay
	    case 19:    // MediaPause
	    	console.log("share dir id = " + sharedDir);
	    	console.log("package id = " + url);
	    	Main.play();
	        break;
	    case 413:   // MediaStop
	        Main.stop();
	        break;
	    case 417:   // MediaFastForward
	        break;
	    case 412:   // MediaRewind
	        break;	    
	    case 10009: // Return
	        if (webapis.avplay.getState() !== 'IDLE' && webapis.avplay.getState() !== 'NONE') {
	            Main.stop();
	        } else {
	            tizen.application.getCurrentApplication().hide();
	        }
        break;
		case 38: 
		break;
		case 40:
		break;
		default:
			Main.log(keyCode);
		break;
	}
};


/**
 * Adds text to a UI element -  NOTE: THIS FUNCTION SHOULD NOT BE USED ON PRODUCTION APPS, it is only for visual demonstration of what is happening
 * @param {String} text
 */
Main.log = function (text) {
  "use strict";
  console.log(text);
};


/**
 * Generic Error handler for uncaught JS errors
 * @param errMsg
 * @param url
 * @param lineNum
 * @returns {boolean}
 */
window.onerror = function handleError(errMsg, url, lineNum) {
	"use strict";
  Main.log('Error Message: ' + errMsg);
  Main.log('  URL: ' + url);
  Main.log('  Line: ' + lineNum);
  return false;
};


function onHide()
{   
	player1.stop();
	player1.close();
	player2.stop();
	player2.close();
	player3.stop();
	player3.close();
	player4.stop();
	player4.close();
}

Main.registAllKeys = function () {
	"use strict";
	try {
        tizen.tvinputdevice.getSupportedKeys()
            .forEach(function (k){
                if ([
                    'ColorF0Red',
                    'ColorF1Green',
                    'ColorF2Yellow',
                    'ColorF3Blue',
                    'MediaFastForward',
                    'MediaPause',
                    'MediaPlay',
                    'MediaPlayPause',
                    'MediaRecord',
                    'MediaRewind',
                    'MediaStop',
                    'Info',
                    '1',
                    '2',
                    '3',
                    '4'
                ].indexOf(k.name) > -1) {
                    tizen.tvinputdevice.registerKey(k.name);
                    Main.log('Subscribed key:'+ k.name + ' ' + k.code);
                }
            });
    } catch (e) {
        Main.log('Could not subscribe keys, exception occurred:'+ e);
    }

	
};


Main.initplayer = function(){
	"use strict";
	
	player1 = webapis.avplaystore.getPlayer();
	player2 = webapis.avplaystore.getPlayer();
	player3 = webapis.avplaystore.getPlayer();
	player4 = webapis.avplaystore.getPlayer();
	
	
	// DOM reference to player controls container
	
	controls = document.querySelector('.video-controls');

	// DOM references to player control buttons
	this.btnPlay = document.querySelector('.video-controls .play');
	this.btnStop = document.querySelector('.video-controls .stop');
	
	// DOM reference to avplay object
	player = document.getElementById('av-player');

	// event listeners for player control buttons
	this.btnPlay.addEventListener('click', function() {
		Main.play();
        Main.log("Play");
	});

	this.btnStop.addEventListener('click', function() {
		Main.stop();
	});

	
	
	
	listener1 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {
				  	player3.stop();
				  	player3.close();
				  	player1 = webapis.avplaystore.getPlayer();
					Main.log('open1: '+url);
					Main.log('open status: '+player1.open(url));
					Main.log('setListener status: '+player1.setListener(listener3));
					Main.log('mixbuffer set: '+player1.setStreamingProperty("USE_VIDEOMIXER"));
					player1.setDisplayRect(0, 0, 1920, 1080);
					Main.log('prepare status: '+player1.prepare());
					Main.log('frame set: '+player1.setStreamingProperty("SET_MIXEDFRAME"));
					
					
					
					Main.log('play status: '+player1.play());
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error listener 1: " + eventType);
			  }
	};
	
	listener2 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {

					player4.stop();
					player4.close();
					player2 = webapis.avplaystore.getPlayer();
					Main.log('open status: '+player2.open(url2));
					Main.log('setListener status: '+player2.setListener(listener4));
					Main.log('mixbuffer set: '+player2.setStreamingProperty("USE_VIDEOMIXER"));
					player2.setDisplayRect(0, 0, 1920, 1080);
					Main.log('prepare status: '+player2.prepare());
					Main.log('frame set: '+player2.setStreamingProperty("SET_MIXEDFRAME"));
					
					
					
					Main.log('play status: '+player2.play());
					
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error listerner 2: " + eventType);
			  }
	};
	
	listener3 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {
				  Main.log("3onstream complete.");
				  	player1.stop();
				  	player1.close();
					player3 = webapis.avplaystore.getPlayer();
					Main.log('open3: '+url3);
					Main.log('open status: '+player3.open(url3));
					Main.log('setListener status: '+player3.setListener(listener1));
					Main.log('mixbuffer set: '+player3.setStreamingProperty("USE_VIDEOMIXER"));
					player3.setDisplayRect(0, 0, 1920, 1080);
					Main.log('prepare status: '+player3.prepare());
					Main.log('frame set: '+player3.setStreamingProperty("SET_MIXEDFRAME"));

					
					
					Main.log('play status: '+player3.play());
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error listener 3 : " + eventType);
			  }
	};
	
	listener4 = {
			  onbufferingstart: function() {
				  Main.log("Buffering start.");
			  },
			  onbufferingprogress: function(percent) {
				  
				  Main.log("Buffering progress data : " + percent);
			  },
			  onbufferingcomplete: function() {
				  Main.log("Buffering complete.");
			  },
			  onstreamcompleted: function() {
				  Main.log("4onstream complete.");
				  	player2.stop();
				  	player2.close();
					player4 = webapis.avplaystore.getPlayer();
					Main.log('open1: '+url4);
					Main.log('open status: '+player4.open(url4));
					Main.log('setListener status: '+player4.setListener(listener2));
					Main.log('mixbuffer set: '+player4.setStreamingProperty("USE_VIDEOMIXER"));
					player4.setDisplayRect(0, 0, 1920, 1080);
					Main.log('prepare status: '+player4.prepare());
					Main.log('frame set: '+player4.setStreamingProperty("SET_MIXEDFRAME"));
					
						
					Main.log('play status: '+player4.play());
					
			  },
			  onevent: function(eventType, eventData) {
				  Main.log("event type error : " + eventType + ", data: " + eventData);
			  },
			  onerror: function(eventType) {
				  Main.log("event type error listener 4: " + eventType);
			  }
	};
};


//start playback
Main.play = function() {		
		Main.log('open1: '+url);
		Main.log('open2: '+url2);
		Main.log('open status: '+player1.open(url));
		Main.log('open status: '+player2.open(url2));
		
		Main.log('setListener status: '+player1.setListener(listener3));
		Main.log('setListener status: '+player2.setListener(listener4));

		Main.log('mixbuffer set: '+player1.setStreamingProperty("USE_VIDEOMIXER"));
		Main.log('mixbuffer set: '+player2.setStreamingProperty("USE_VIDEOMIXER"));		

		player1.setDisplayRect(0, 0, 1920, 1080);
		player2.setDisplayRect(0, 0, 1920, 1080);	
		
		Main.log('prepare status: '+player1.prepare());
		Main.log('prepare status: '+player2.prepare());
		
		Main.log('frame set: '+player1.setStreamingProperty("SET_MIXEDFRAME"));
		Main.log('frame set: '+player2.setStreamingProperty("SET_MIXEDFRAME"));


		Main.log('play status: '+player1.play());
		//Main.log('play status: '+player2.play());	
};


//stop playback
Main.stop = function() {
	
	"use strict";
	player1.stop();
	player1.close();
	player2.stop();
	player2.close();
	player3.stop();
	player3.close();
	player4.stop();
	player4.close();
};




Main.onUnLoad = function (){
	onHide();
	
};



