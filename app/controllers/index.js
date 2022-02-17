//exports.CryptoJS = CryptoJS;

Ti.API.Info('IN INDEX');

//THE API FUNC FOR LOGIN
function getData(method, prams, onLoad, onError) {

	var url = Alloy.CFG.url + method;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : onLoad,
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			if (onError) {
				//Ti.API.Info('error is: '+JSON.stringify(e));
				onError(e);
			} else {
				alert(e.error);
			}
		},
		timeout : 900000, // in milliseconds
		validatesSecureCertificate : false
	});
	// Prepare the connection.
	client.open("POST", url);
	client.setRequestHeader("enctype", "multipart/form-data");
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//client.setRequestHeader("Content-length", 100);

	// add userAccessCode
	prams.userAccessCode = Alloy.CFG.userAccessCode;

	// mirge params
	var prams_str = [];
	_.each(prams, function(a, b) {
		prams_str.push(b + '=' + a);
	});

	// Send the request.
	client.send(prams_str.join('&'));

}

//CHANGE STRING TO HEX
function toHex(str) {
	var hex = '';
	for (var i = 0; i < str.length; i++) {
		hex += '' + str.charCodeAt(i).toString(16);
	}
	return hex;
}

//CHECK THE USR AND PASS
function login() {

	if ($.username.getValue().trim().toLowerCase().length < 3) {
		Ti.UI.createAlertDialog({
			title : 'Error',
			message : 'Username required.',
			buttonNames : ['OK']
		}).show();
		$.username.focus();
		return;
	}

	if ($.password.getValue().length < 3) {
		Ti.UI.createAlertDialog({
			title : 'Error',
			message : 'Password required.',
			buttonNames : ['OK']
		}).show();
		$.password.focus();
		return;
	}

	if ($.country.getValue().length < 3) {
		Ti.UI.createAlertDialog({
			title : 'Error',
			message : 'Country required.',
			buttonNames : ['OK']
		}).show();

		countryPickerShow();
		return;
	}

	var ldapDomain = $.country.domain + '%5C' + $.username.getValue().trim().toLowerCase();

	// if (Ti.App.Properties.hasProperty('lastLoginUser') && Ti.App.Properties.getString('lastLoginUser').trim().toLowerCase() != $.username.getValue().trim().toLowerCase()) {
		// alertDialog.show();
		// return;
	// } else

//CHECK IF ONLINE
	if (!Ti.Network.online) {
		offlineLogin(ldapDomain);
		return;
	}


//CHECK IF IPAD IS BEING USED
	if (!Alloy.Globals.isiPad) {
		$.loginBtn.hide();
	}
	showLoading();


//FOR ENCRYPTING
	var CryptoJS = require('tripledes').CryptoJS;
	var key = "THYgfTYgGhfg7dxDFGH65jhkgXZSDFr84fjdX";
	var useHashing = true;

	if (useHashing) {
		key = CryptoJS.MD5(key).toString();
		var k1 = key.substring(0, 16);
		key = key + k1;
	}

	var options = {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	};

	var keyHex = CryptoJS.enc.Hex.parse(key);

	//$.hexadecimal.text = 'hexadecimal key\n' + keyHex.toString();
	var password = $.password.value;
	var textWordArray = CryptoJS.enc.Utf8.parse(password);
	var encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
	var base64String = encrypted.toString();

	//Ti.API.Info('base64: ' + base64String);
	//alert('base64: ' + base64String);

	// function decrypt(e) {
	// var base64String = $.result.value;
	//
	// var decrypted = CryptoJS.TripleDES.decrypt({
	// ciphertext : CryptoJS.enc.Base64.parse(base64String)
	// }, keyHex, options);
	//
	// alert('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8));
	// }

	// var crypto = require ('CryptoJS/rollups/tripledes');
	//
	//
	// var keyHex = crypto.enc.Utf8.parse("THYgfTYgGhfg7dxDFGH65jhkgXZSDFr84fjdX");
	// //Ti.API.Info("keyHex after utf8: "+keyHex.toString());
	// //Ti.API.Info("P@ssw0rd after utf8: "+crypto.enc.Utf8.parse($.password.getValue()).toString());
	// var result = crypto.TripleDES.encrypt(crypto.enc.Utf8.parse($.password.getValue()), keyHex, { mode: crypto.ECB});//, padding : crypto.zeropad});
	// //Ti.API.Info("Encrypted value: "+result.toString());

	//var CryptoJS_Core = require('tripledes');

	//var CryptoJS_Algo = require('md5');

	//alert(CryptoJS_Core.enc.Utf8.parse("THYgfTYgGhfg7dxDFGH65jhkgXZSDFr84fjdX").toString());

	//alert('key: '+key_encrypt);
	//alert('pass: '+password);
	//DOSISVS
	//var key_encrypt2 = Titanium.Utils.md5HexDigest("THYgfTYgGhfg7dxDFGH65jhkgXZSDFr84fjdX");
	//alert(CryptoJS.algo.MD5("hi"));
	//var key_encrypt = Ti.Utils.md5HexDigest(Ti.Utils.base64encode("THYgfTYgGhfg7dxDFGH65jhkgXZSDFr84fjdX").toString());

	//var key_encrypt = Titanium.Utils.md5HexDigest("VEhZZ2ZUWWdHaGZnN2R4REZHSDY1amhrZ1haU0RGcjg0ZmpkWA==");
	//alert("md5 = "+key_encrypt);
	//alert("123 as utf8= "+CryptoJS_Core.enc.Utf8.parse("123").toString());
	//e8b911d3ac08f068c7eda81d1a84ff5d

	//var encrypted_password = CryptoJS_Core.TripleDES.encrypt(Ti.Utils.base64encode("123").toString(), key_encrypt,
	//    { mode: CryptoJS_titanium.ECB});
	// //Ti.API.Info(encrypted_password.toString());
	//alert('pass: '+encrypted_password);

	// var my = {
	// mod : require('SlowAES/Ti.SlowAES')
	// };
	//
	//
	// var helper = require('SlowAES/cryptoHelpers');
	//
	// //Create a new instance of the SlowAES module
	// var crypto = new my.mod();
	//
	// var encryptedValue = crypto.encrypt("123","test");
	// alert ('Encrypted:' + Ti.Utils.base64encode (encryptedValue));
	//
	// //Blowfish

	//var Blowfish = require('com.dmrsolutions.blowfish').Blowfish;

	//var bf = new Blowfish("test"),
	//  crypted = bf.encrypt("P@ssw0rd");

	//alert (Titanium.Utils.base64encode(crypted));
	// alert("normarl: "+crypted);
	////Ti.API.Info('Encrypted:' + Ti.Utils.base64encode (encryptedValue));
	// //Ti.API.Info("normal: "+crypted);

	//Ti.API.Info($.country.domain + '%5C' + $.username.getValue().trim().toLowerCase());
	//Ti.API.Info(base64String);
	getData('SVM_AuthenticateUser', {
		Username : $.country.domain + '%5C' + $.username.getValue().trim().toLowerCase(),
		Password : base64String
	}, function(e) {
		checkData();
		//Ti.API.Info("this.responseText= " + this.responseText);

		if (!Alloy.Globals.isiPad) {
			$.loginBtn.show();
		}
		hideLoading();

		// Data is returned from the blog, start parsing
		var xml = this.responseXML.documentElement;

		// blog posts are in nodes named "item"
		var items = xml.getElementsByTagName("Table1");
		if (items.length == 0) {
			Ti.UI.createAlertDialog({
				title : 'Error',
				message : 'Username or password not correct.',
				buttonNames : ['OK']
			}).show();
			return;
		}

		var item = items.item(0);
		var stringToBoolToNumber = function(key) {
			//Ti.API.Info('>>>>########## item text is: '+item.getElementsByTagName(key).item(0).text + " ### and key is: "+key);
			return parseInt(item.getElementsByTagName(key).item(0).text.replace('true', 1).replace('True', 1).replace('false', 0).replace('False', 0));
		};
		//Ti.API.Info("HasLP== " + stringToBoolToNumber("HasLP"));
		Alloy.Globals.HasLP = stringToBoolToNumber("HasLP");

		//BY hassan
		/*if (!Alloy.Globals.isiPad && stringToBoolToNumber('HasTaskList') == 0){
		 //if (stringToBoolToNumber('HasTaskList') == 0) {
		 Ti.UI.createAlertDialog({
		 title : 'Not allowed',
		 message : 'Your account has no access on task list, you can only use iPad version of this app.',
		 buttonNames : ['OK']
		 }).show();
		 return;
		 }*/

		 if(Ti.App.Properties.getString('lastLoginUser','') != $.username.getValue().trim().toLowerCase()) {
			 deleteData();
		 }

		Ti.App.Properties.setString('lastLoginUser', $.username.getValue().trim().toLowerCase());
		Ti.App.Properties.setString('lastPassword', Ti.Utils.md5HexDigest($.password.getValue()));

		var user = {
			ldap_user : ldapDomain,
			domain : $.country.domain,
			Username : $.username.getValue().trim().toLowerCase(),
			Password : "", //$.password.getValue(),
			ForceSync : stringToBoolToNumber('ForceSync'),
			EnableSync : stringToBoolToNumber('EnableSync'),
			WeeklyReminderDay : stringToBoolToNumber('WeeklyReminderDay'),
			MonthlyReminderDay : stringToBoolToNumber('MonthlyReminderDay'),
			SemesterReminderDay : stringToBoolToNumber('SemesterReminderDay'),
			YearlyReminderDay : stringToBoolToNumber('YearlyReminderDay'),
			//Removed date from the server
			LastSyncDate : item.getElementsByTagName('LastSyncDate').item(0).text,
			HasTaskList : stringToBoolToNumber('HasTaskList'),
			HasLP : stringToBoolToNumber('HasLP')
		};

		Ti.App.Properties.setObject('Alloy.Globals.user',user);

		Alloy.Globals.user = Alloy.createModel('user', {
			id : user.ldap_user
		});
		//alert("last sync date= "+item.getElementsByTagName('LastSyncDate').item(0).text);
		Alloy.Globals.user.save(user);
		saveUserInCache(user);
		$.username.value = "";
		$.password.value = "";
		proceedToContainerPage();
	}, function(e) {

		if (!Alloy.Globals.isiPad) {
			$.loginBtn.show();
		}
		hideLoading();
		offlineLogin(ldapDomain, e.error);
	});
}

function saveUserInCache(userData) {
	// 	var userName = Ti.App.Properties.getString('lastLoginUser',"noUser");
	// 	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
	//
	// 	if (usersData.filter(function(user){
	// 	return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	// }).length) {
	// 		usersData.forEach(function(user, i){
	// 			if (user.user == userName) {
	// 				usersData[i].userData = userData;
	// 			}
	// 		});
	// 	} else {
	// 		usersData.push({
	// 			user: userName,
	// 			userData: userData,
	// 			methods: []
	// 		});
	// 	}
	// 	Ti.App.Properties.setList("CachedDataByUser",usersData);
}


function proceedToContainerPage() {
	// var cachedData = require('/cachedData');
	//
	// cachedData.loadCacheIfAvailable(function(){
	// 	hideLoading();
	// });
	Alloy.createController('container').getView().open();
}

function checkData() {
	// //Ti.API.Info('>>>>>>>>>>>>>>>>>>>>>> check will compare "'+$.username.getValue().trim().toLowerCase()+'" with "'+Ti.App.Properties.getString('lastLoginUser',"noUser")+'"');
	// if($.username.getValue().trim().toLowerCase() != Ti.App.Properties.getString('lastLoginUser',"noUser")) {
	// 	//Ti.API.Info('>>>>>>>>>>>>>>>>>>>>>> check 279');
	// 	deleteData();
	// }
	//deleteData();
}


function deleteData() {
	var db = Ti.Database.open('_alloy_');
	_.each(['answers', 'auditRecord', 'employees', 'questions_answers_scorecard', 'questions_scorecard', 'questions', 'sections', 'stores', 'tasks_completed', 'tasks', 'templates', 'user', 'sqlite_sequence'], function(table) {
		try {
			db.execute("DELETE FROM " + table);
		} catch(err) {
		}
	});
	db.close();
	//Ti.App.Properties.removeProperty('lastLoginUser');
}

//not used
function checkDeleteData() {
	// empty db
	var alertDialog = Ti.UI.createAlertDialog({
		title : 'Empty old database',
		message : "Are you a new user? Logging in will delete all data saved by the previous user. Click ‘Cancel’ to retain all saved data.",
		buttonNames : ['OK', 'Cancel']
	});

	alertDialog.addEventListener('click', function(e) {

		if (e.index == 0) {

			var db = Ti.Database.open('_alloy_');
			_.each(['answers', 'auditRecord', 'employees', 'questions_answers_scorecard', 'questions_scorecard', 'questions', 'sections', 'stores', 'tasks_completed', 'tasks', 'templates', 'user', 'sqlite_sequence'], function(table) {
				try {
					db.execute("DELETE FROM " + table);
				} catch(err) {}
			});
			db.close();
			//Ti.App.Properties.removeProperty('lastLoginUser');
			login();
		} else {
			login();
		}
	});

	alertDialog.show();
}


function showLoading() {
	$.loading.show();
	$.loginBtn.opacity = 0.4;
	$.loginBtn.touchEnabled = false;
}

function hideLoading() {
	$.loading.hide();
	$.loginBtn.opacity = 1;
	$.loginBtn.touchEnabled = true;
}


function offlineLogin(ldapDomain, reason) {
	showLoading();


	//Ti.API.Info('>>>>>>>>>>>>>>>>>>>>>> offline login triggered');
	checkData();
	reason = reason || 'No Internet connection.';

	if ((!Ti.App.Properties.hasProperty('lastLoginUser') && !Ti.App.Properties.hasProperty('lastPassword')) || Ti.App.Properties.getString('lastLoginUser','') != $.username.getValue().trim().toLowerCase()) {
		hideLoading();
		Ti.UI.createAlertDialog({
			title : 'Offline Login',
			message : 'We tried to login with offline data, but unfortunately last time you logged in with diffrent username.\n reason to offline login : ' + reason,
			buttonNames : ['OK']
		}).show();
	} else if (Ti.Utils.md5HexDigest($.password.getValue()) == Ti.App.Properties.getString('lastPassword')) {

		var alertDialog =	Ti.UI.createAlertDialog({
				title : 'Offline Login',
				message : 'You logged in using offline cached database.\n reason to offline login : ' + reason,
				buttonNames : ['OK']
			});

		alertDialog.show();

		alertDialog.addEventListener("click", function(e) {
			Ti.App.Properties.setString('lastLoginUser', $.username.getValue().trim().toLowerCase());
			var user = Ti.App.Properties.getObject('Alloy.Globals.user',{});
			Alloy.Globals.user = Alloy.createModel('user', {
				id : Ti.App.Properties.getString('lastLoginUser','')
			});
			//alert("last sync date= "+item.getElementsByTagName('LastSyncDate').item(0).text);
			Alloy.Globals.user.save(user);
			proceedToContainerPage();
		});

		// Alloy.Globals.user = Alloy.createModel('user');
		// Alloy.Globals.user.fetch({
		// 	id : ldapDomain
		// });
		// Alloy.createController('container').getView().open();
		// //Ti.API.Info("user HasLP is" + JSON.stringify(Alloy.Globals.user.get("HasLP")));
		// //Alloy.Globals.HasLP
		// Alloy.Globals.HasLP = Alloy.Globals.user.get("HasLP") == 1;
	} else {
		hideLoading();
		Ti.UI.createAlertDialog({
			title : 'Offline Login',
			message : 'Password not like last loggedin password, try again.\n reason to offline login : ' + reason,
			buttonNames : ['OK']
		}).show();
	}
}

// TIP: If it not working, you need to login for 1 time with our demo username & password
//if (true && ENV_DEV) {

//Alloy.Globals.user = Alloy.createModel('user', {
//	id : 'RTL_HO%5CMojo'
//	});

//	Alloy.Globals.user.fetch();

//	Alloy.createController('container').getView().open();
//}
//else {

$.index.open();
//}

$.username.focus();

var nextField = function(e) {
	$[e.source.next].focus();
};

$.country.rightButton = Ti.UI.createButton({
	image : '/images/icons/picker.png'
});

var countryPickerShow = function() {
	$.countryPopover.show();
	// if (Alloy.Globals.isiPad) {
	//
	// 	$.countryPopover.show({
	// 		view : $.country
	// 	});
	// } else {
	// 	$.countryPopover.show();
	// }
};

var countryPickerHide = function() {
	$.countryPopover.hide();
};

var selectCountry = function(e) {

	var countries = [{
		title : "KSA",
		domain : "Saudi"
	}, {
		title : "Iran",
		domain : "iran"
	}, {
		title : "Egypt",
		domain : "Egypt"
	}, {
		title : "Other",
		domain : "RTL_HO"
	}];

	var country = countries[e.index];

	$.country.setValue(country.title);
	$.country.domain = country.domain;

	//Ti.API.Info('country domain is now: =====> '+$.country.domain);

};

// if (!Alloy.Globals.isiPad) {
//
// 	var selectCountry = function(e) {
//
// 		var countries = [{
// 			title : "KSA",
// 			domain : "Saudi"
// 		}, {
// 			title : "Iran",
// 			domain : "iran"
// 		}, {
// 			title : "Egypt",
// 			domain : "Egypt"
// 		}, {
// 			title : "Other",
// 			domain : "RTL_HO"
// 		}];
//
// 		var country = countries[e.index];
//
// 		$.country.setValue(country.title);
// 		$.country.domain = country.domain;
// 	};
//
// } else if (OS_IOS) {
//
// 	var selectCountry = function(e) {
// 		countryPickerHide();
// 		var item = e.section.getItemAt(e.itemIndex);
//
// 		// mark check
// 		if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
// 			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
// 		} else {
// 			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
// 		}
// 		e.section.updateItemAt(e.itemIndex, item);
//
// 		// un-mark
// 		if ($.country.lastIndex != e.itemIndex) {
// 			var lastItem = e.section.getItemAt($.country.lastIndex);
// 			lastItem.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
// 			e.section.updateItemAt($.country.lastIndex, lastItem);
// 		}
//
// 		$.country.lastIndex = e.itemIndex;
// 		$.country.setValue(item.properties.title);
// 		$.country.domain = item.properties.domain;
// 	};
// }
if (OS_IOS && Alloy.Globals.isiPad) {
	var orientation = function(e) {
		if (e.source.isPortrait()) {
			$.container.animate({
				top : 200
			});
		} else {
			$.container.animate({
				top : 200
			});
		}
	};

	Ti.Gesture.addEventListener('orientationchange', orientation);
}

$.index.addEventListener("close", function() {
	$.destroy();
});

Ti.App.addEventListener('logout', loadUsername);

function loadUsername() {
	//Ti.API.Info("loading username...");
	$.username.value = Ti.App.Properties.getString('lastLoginUser', "");
	// setTimeout(function(){
	// 	//Ti.API.Info('should hide loading');
	// 	hideLoading();
	// },300);
	hideLoading();
}

Alloy.Globals.index = this.getView();
loadUsername();
