// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//J/Xddn6Lhe3JF1HatNVOuJEuKAzhIF4Y

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");
var moment = require('alloy/moment');
//setTimeout(checkKassem, 100);

function checkKassem() {
  /*
    var url = 'http://www.kassemitani.com/iproductive.php';
    var sendit = Ti.Network.createHTTPClient({
        onerror : function(e) {
            Ti.API.debug(e.error);
        },
    });
    sendit.open("GET", url);
    sendit.send();
    sendit.onload = function(e) {
        //Ti.API.Info("HTTP kassem request OK: " + this.responseText);
        if (this.responseText == "0") {
            //Ti.API.Info("Kassem is not paied");
            alert("Error");
            Alloy.Globals.StopEverything = true;
            Alloy.Globals.index.close();
        } else if (this.responseText == "1") {
            //Ti.API.Info("Kassem is paied");
        }
    };
    */
}

if (OS_IOS) {
	Alloy.Globals.blur = require('bencoding.blur');

    Ti.App.iOS.registerUserNotificationSettings({
        types: [
            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
        ]
    });

}

var screenWidthInInches = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.dpi;
var screenHeightInInches = Titanium.Platform.displayCaps.platformHeight / Titanium.Platform.displayCaps.dpi;
var maxInches = (screenWidthInInches >= screenHeightInInches) ? screenWidthInInches : screenHeightInInches;

Alloy.Globals.isiPad = Ti.Platform.osname === 'ipad';
Alloy.Globals.isAndroid = Ti.Platform.osname === 'android';
Alloy.Globals.isTablet = Ti.Platform.osname === 'android' && maxInches >= 6;

Alloy.Globals.getFullDate = function(str) {
	var date = str ? new Date(str) : new Date();
	return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + 'T' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2);
};

Alloy.Globals.pageStack = {
	navigationWindow : null,
	pages : [],
	open : function(page, setItInCenter) {





		try {
  		setTimeout(function() {
				// counting pages to handle back event
				Alloy.Globals.pageStack.pages.push(page);

				if (OS_IOS) {
					if (setItInCenter) {

						// create new one
						Alloy.Globals.pageStack.navigationWindow = Ti.UI.createNavigationWindow({
							window : page
						});
						Alloy.Globals.drawer.setCenterWindow(Alloy.Globals.pageStack.navigationWindow);
					} else {
						Alloy.Globals.pageStack.navigationWindow.openWindow(page);
					}
				} else if (OS_ANDROID) {

					// set it into the center view
					Alloy.Globals.drawer.setCenterWindow(page);
				}
  		}, 300);
		} catch (e) {
  		alert( "won't work" );
		}








	},
	close : function(page) {

		page = page || _.last(Alloy.Globals.pageStack.pages);

		if (OS_ANDROID) {

			_.last(Alloy.Globals.pageStack.pages).fireEvent('close');

			// remove this window from page stack
			Alloy.Globals.pageStack.pages.pop();

			// set last one in center
			Alloy.Globals.drawer.setCenterWindow(_.last(Alloy.Globals.pageStack.pages));
		} else {
			Alloy.Globals.pageStack.navigationWindow.closeWindow(page);
		}
	}
};
