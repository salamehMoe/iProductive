Ti.API.info('in sync LALALA');

var checknetwork = function checkNetwork(e) {
	networkIsOnline = e.online;
	networkType = e.networkType;
	if (!networkIsOnline) {
		//Ti.API.Info("user is offline");
		alert("Please Check your connection first and then Sync the data");
		$.syncBtn.enable = false;
	} else {
		//Ti.API.Info("you are online");
		$.syncBtn.enable = true;
	}
};
// checknetwork(Ti.Network);

Ti.Network.addEventListener('change', checknetwork);

// display completed audits
function uploadAuditTransform(model) {
	var transform = model.toJSON();
	transform.subTitle = '[' + (transform.type == 1 ? 'SVM' : 'ScoreCard') + '] ' + transform.storeCode + " / " + transform.openDate;
	transform.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
	transform.EnableSync = transform.EnableSync == 1;
	//Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
	return transform;
}

function updateAuditRecord() {
	try {
		Alloy.Collections.auditRecord.fetch({
			query : "SELECT a.*, t.* FROM auditRecord a JOIN templates t ON t.AuditID = a.AuditID WHERE length(a.submisiondDate) > 3 AND a.online_id = ''"
		});
	} catch (e) {
		//Ti.API.Info('error -> ' + JSON.stringify(e));
	}

	var last = Alloy.Globals.user.get('LastSyncDate');

	$.lastSyncLbl.setText(moment(last).format('DD-MM-YYYY HH:mm'));
}

updateAuditRecord();

// update model data
Alloy.Models.user.fetch({
	id : Alloy.Globals.user.get('ldap_user')
});

// convert 1 and 0 to true & false
Alloy.Models.user.on('change:EnableSync', function(e) {
	Alloy.Models.user.set('EnableSyncBool', Alloy.Models.user.get('EnableSync') == 1);
});

Alloy.Models.user.on('change:ForceSync', function(e) {
	Alloy.Models.user.set('ForceSyncBool', Alloy.Models.user.get('ForceSync') == 1);
});

// Show initial values for strings
Alloy.Models.user.trigger('change:EnableSync');
Alloy.Models.user.trigger('change:ForceSync');

// display completed audits
function uploadTasksTransform(model) {
	var transform = model.toJSON();
	switch (transform.TaskID) {
	case 1:
		transform.title = transform.TaskName + ' ( ' + transform.date + ' )';
		break;
	case 2:
		transform.title = transform.TaskName + ' ( Week #' + transform.week + ' of ' + transform.year + ' )';
		break;
	case 3:
		transform.title = transform.TaskName + ' ( Month #' + transform.date + ' of ' + transform.year + ' )';
		break;
	case 4:
		transform.title = transform.TaskName + ' ( Semester #' + transform.yearHalf + ' of ' + transform.year + ' )';
		break;
	case 5:
		transform.title = transform.TaskName + ' ( ' + transform.year + ' )';
		break;
	}
	transform.subTitle = (transform.completed || 0) + " Completed tasks waiting to upload";
	return transform;
}

// update task list, use function to re-use it after update data
function updateTaskLists(updateSideMenu) {
	// Tasks only if logged in user allowed for tasks
	if (Alloy.Models.user.get('HasTaskList') == 1) {
		try {
			Alloy.Collections.tasks_completed.fetch({
				query : "SELECT t.TaskID, t.TaskName, count(*) completed, min(CompletedDate) openDate, max(CompletedDate) closeDate, date(CompletedDate) date, strftime('%d', tc.CompletedDate) day, strftime('%W', tc.CompletedDate) week, strftime('%m', tc.CompletedDate) month, strftime('%Y', tc.CompletedDate) year, ((cast(strftime('%m', CompletedDate) as integer) + 2) / 3) quarter, ((((cast(strftime('%m', CompletedDate) as integer) + 2) / 3) > 2) + 1) yearHalf  \
				FROM tasks t  \
				JOIN tasks_completed tc ON t.TaskQuestionID = tc.TaskQuestionID  \
				WHERE tc.taskRecord IS NULL  \
				GROUP BY substr(CompletedDate, 0, 11), t.TaskID  \
				ORDER BY t.TaskOrder"
			});
		} catch (e) {
			//Ti.API.Info('error -> ' + JSON.stringify(e));
		}

	}

}

// set sections
var sectionsArr = [];

// Audit only if iPad
//By Hassanisipad
//if (Alloy.Globals.isiPad) {
if (Alloy.Globals.isiPad || Alloy.Globals.isTablet) {
	sectionsArr.push($.downloadAuditSec);
	sectionsArr.push($.uploadAuditSec);
	sectionsArr.push($.downloadScoreCardSec);
}

// Tasks only if has tasks
if (Alloy.Models.user.get('HasTaskList') == 1) {
	sectionsArr.push($.downloadTaskSec);
	sectionsArr.push($.uploadTasksSec);
}

// set sections
$.list.sections = sectionsArr;
sectionsArr = null;

updateTaskLists();

function cacheInformationForUser(methodName, responseText, responseXML, prams) {
	//var parsedResponseXML = x2js.xml2json(responseXML);
	var userName = Ti.App.Properties.getString('lastLoginUser', "noUser");
	var usersData = Ti.App.Properties.getList("CachedDataByUser", []);
	if (usersData.filter(function(user) {
		return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
	}).length) {
		usersData.forEach(function(user, i) {
			if (user.user == userName) {
				if (user.methods.filter(function(method) {
					return method.name == methodName;
				}).length) {
					usersData[i].methods.forEach(function(method, j) {
						if (method.name == methodName) {
							usersData[i].methods[j].self.responseText = responseText;
							//usersData[i].methods[j].self.responseXML = parsedResponseXML;
							usersData[i].methods[j].self.prams = prams;
						}
					});
				} else {
					usersData[i].methods.push({
						name : methodName,
						self : {
							responseText : responseText,
							//responseXML: parsedResponseXML,
							prams : prams
						}
					});
				}
			}
		});
	} else {
		usersData.push({
			user : userName,
			userData : {},
			methods : [{
				name : methodName,
				self : {
					responseText : responseText,
					//responseXML: parsedResponseXML,
					prams : prams
				}
			}]

		});
	}

	Ti.App.Properties.setList("CachedDataByUser", usersData);
}

function getData(method, prams, onLoad, onError, multipart) {
	if (method == "CheckList_GetCheckList") {
		//Ti.API.Info('#### In getData function');
	}
	var url = Alloy.CFG.url + method;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {

			Ti.API.info("***********************\n\nresponse:" + this.responseText + "\n\n***********************");

			//cacheInformationForUser(method, this.responseText, this.responseXML, prams);
			onLoad(this);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			if (onError) {
				onError(e.error);
			} else {
				Ti.UI.createAlertDialog({
					title : e.error,
					message : "Please check with your system administrator.\n\n" + this.responseText + "\n" + this.url,
					buttonNames : ['OK']
				}).show();
			}
		},
		timeout : 900000, // in milliseconds
		validatesSecureCertificate : false
	});

	client.prams = prams;
	//Ti.API.Info('Paramet: ' + prams.toString());
	//Ti.API.Info('url: ' + url);
	// Prepare the connection..
	client.open("POST", url);
	if (multipart) {
		//client.setRequestHeader('enctype', 'multipart/form-data');
		client.setRequestHeader('Content-Type', 'multipart/form-data');

	} else {
		client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}

	// add username
	prams.Username = Alloy.Models.user.get('ldap_user');

	// add userAccessCode
	prams.userAccessCode = Alloy.CFG.userAccessCode;

	// mirge params
	var prams_str = [];
	_.each(prams, function(a, b) {
		prams_str.push(b + '=' + a);
	});
	//Ti.API.Info('url: ' + url);
	//Ti.API.Info('param ' + prams_str);
	//Ti.API.Info('param join ' + prams_str.join('&'));
	Ti.API.info('***********************\n\nrequest:\n\nurl: '+url+"\nparameters:"+prams_str.join('&')+"\n\n***********************");
	// Send the request.

	client.send(prams_str.join('&'));

}

var donwloadAuditData = function() {

	$.auditDownLoading.show();

	// some definations
	var rowsIndex = {
		'template' : 0,
		'sections' : 1,
		'questions' : 2,
		'stores' : 3
	};

	// if (Alloy.Globals.HasLP) {
	// stores
	getData("LP_GetUserStores", {}, function(This) {

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;
		//Ti.API.Info('>>>>>> HERE TO SAVE STORES');
		// blog posts are in nodes named "item"
		var items = xml.getElementsByTagName("Table1");

		var db = Ti.Database.open('_alloy_');
		_.each(['stores'], function(table) {
			try {
				db.execute("DELETE FROM " + table);
			} catch(err) {
			}
		});
		db.close();

		for (var i = 0; i < items.length; i++) {
			var myModel = Alloy.createModel('stores', {
				StoreCode : items.item(i).getElementsByTagName("StoreCode").item(0).text,
				StoreDesc : items.item(i).getElementsByTagName("StoreDesc").item(0).text,
				CountryCode : items.item(i).getElementsByTagName("CountryCode").item(0).text,
				CountryDesc : items.item(i).getElementsByTagName("CountryDesc").item(0).text,
				ZoneID : items.item(i).getElementsByTagName("ZoneID").item(0).text,
				ZoneDesc : items.item(i).getElementsByTagName("ZoneDesc").item(0).text,
				CompanyTypeID : items.item(i).getElementsByTagName("CompanyTypeID").item(0).text,
				CompanyTypeDesc : items.item(i).getElementsByTagName("CompanyTypeDesc").item(0).text
			});

			myModel.save();
		}

		var item = $.downloadAuditSec.getItemAt(rowsIndex.stores);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.stores, item);
	});

	getData("LP_GetAuditTemplates", {}, function(This) {

		// mark all templates as deleted
		Alloy.Collections.templates.markAsDeleted(1);

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// blog posts are in nodes named "item"
		var items = xml.getElementsByTagName("Table1");
		for (var i = 0; i < items.length; i++) {
			var myModel = Alloy.createModel('templates', {
				AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
				CompanyTypeID : items.item(i).getElementsByTagName("CompanyTypeID").item(0).text,
				DeptCode : items.item(i).getElementsByTagName("DeptCode").item(0).text,
				AuditName : items.item(i).getElementsByTagName("AuditName").item(0).text,
				AuditDesc : items.item(i).getElementsByTagName("AuditDesc").length > 0 ? items.item(i).getElementsByTagName("AuditDesc").item(0).text : items.item(i).getElementsByTagName("AuditName").item(0).text,
				Show : items.item(i).getElementsByTagName("Show").item(0).text,
				Target : items.item(i).getElementsByTagName("Target").item(0).text,
				type : 1,
				deleted : 0
			});

			myModel.save();

			// update sections
			getData("LP_GetAuditSections", {
				AuditID : myModel.get('AuditID')
			}, function(This) {

				// Data is returned from the blog, start parsing
				var xml = This.responseXML.documentElement;

				// blog posts are in nodes named "item"
				var items = xml.getElementsByTagName("Table1");
				for (var i = 0; i < items.length; i++) {
					//Ti.API.Info("section Descr =" + items.item(i).getElementsByTagName("SectionDesc").item(0).text);
					var secModel = Alloy.createModel('sections', {
						FuckedID : items.item(i).getElementsByTagName("SectionID").item(0).text + "-" + items.item(i).getElementsByTagName("AuditID").item(0).text,
						AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
						SectionID : items.item(i).getElementsByTagName("SectionID").item(0).text,
						SectionDesc : items.item(i).getElementsByTagName("SectionDesc").item(0).text,
						SectionOrder : items.item(i).getElementsByTagName("SectionOrder").item(0).text,
						ParentID : items.item(i).getElementsByTagName("ParentID").item(0).text,
						RootID : items.item(i).getElementsByTagName("RootID").item(0).text
					});

					secModel.save();
				}
			});

			//Ti.API.Info("myModel.get('AuditID')=" + myModel.get('AuditID'));
			// update qestions
			getData("LP_GetAuditQuestions", {
				AuditID : myModel.get('AuditID')
			}, function(This) {

				// Data is returned from the blog, start parsing
				var xml = This.responseXML.documentElement;

				// blog posts are in nodes named "item"
				var items = xml.getElementsByTagName("Table1");
				for (var i = 0; i < items.length; i++) {
					//Ti.API.Info("QuestionDesc=" + items.item(i).getElementsByTagName("QuestionDesc").item(0).text);
					var QValue = 0;
					if (items.item(i).getElementsByTagName("QValue").item(0) != null) {
						//Ti.API.Info("QValue= " + items.item(i).getElementsByTagName("QValue").item(0).text);
						QValue = items.item(i).getElementsByTagName("QValue").item(0).text;
					} else {
						//Ti.API.Info("WTF QValue is null!");
					}
					//Ti.API.Info("question: " + items.item(i).getElementsByTagName("QuestionDesc").item(0).text);
					var secModel = Alloy.createModel('questions', {
						QuestionID : items.item(i).getElementsByTagName("QuestionID").item(0).text,
						AuditID : This.prams.AuditID,
						SectionID : items.item(i).getElementsByTagName("SectionID").item(0).text,
						ResponsibilityDesc : items.item(i).getElementsByTagName("ResponsibilityDesc").item(0).text,
						QuestionDesc : items.item(i).getElementsByTagName("QuestionDesc").item(0).text,
						QValue : QValue, //items.item(i).getElementsByTagName("QValue").item(0).text,
						QWeight : items.item(i).getElementsByTagName("QWeight").item(0).text,
						QuestionOrder : items.item(i).getElementsByTagName("QuestionOrder").length > 0 ? items.item(i).getElementsByTagName("QuestionOrder").item(0).text : 0,
						CSA : items.item(i).getElementsByTagName("CSA").item(0).text,
						Show : items.item(i).getElementsByTagName("Show").item(0).text ? 1 : 0
					});

					secModel.save();
				}

				$.auditDownLoading.hide();
			});
		}

		var item = $.downloadAuditSec.getItemAt(rowsIndex.template);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.template, item);
		var item = $.downloadAuditSec.getItemAt(rowsIndex.sections);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.sections, item);
		var item = $.downloadAuditSec.getItemAt(rowsIndex.questions);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.questions, item);

	});
	// } else {
	// stores
	getData("SVM_GetUserStores", {}, function(This) {

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// blog posts are in nodes named "item"
		var items = xml.getElementsByTagName("Table1");
		for (var i = 0; i < items.length; i++) {
			var myModel = Alloy.createModel('stores', {
				StoreCode : items.item(i).getElementsByTagName("StoreCode").item(0).text,
				StoreDesc : items.item(i).getElementsByTagName("StoreDesc").item(0).text,
				CountryCode : items.item(i).getElementsByTagName("CountryCode").item(0).text,
				CountryDesc : items.item(i).getElementsByTagName("CountryDesc").item(0).text,
				ZoneID : items.item(i).getElementsByTagName("ZoneID").item(0).text,
				ZoneDesc : items.item(i).getElementsByTagName("ZoneDesc").item(0).text,
				CompanyTypeID : items.item(i).getElementsByTagName("CompanyTypeID").item(0).text,
				CompanyTypeDesc : items.item(i).getElementsByTagName("CompanyTypeDesc").item(0).text
			});

			myModel.save();
		}
		var item = $.downloadAuditSec.getItemAt(rowsIndex.stores);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.stores, item);
	});

	getData("SVM_GetAuditTemplates", {}, function(This) {

		// mark all templates as deleted
		//Alloy.Collections.templates.markAsDeleted(1);

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// blog posts are in nodes named "item"
		var items = xml.getElementsByTagName("Table1");
		for (var i = 0; i < items.length; i++) {
			var myModel = Alloy.createModel('templates', {
				AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
				CompanyTypeID : items.item(i).getElementsByTagName("CompanyTypeID").item(0).text,
				DeptCode : items.item(i).getElementsByTagName("DeptCode").item(0).text,
				AuditName : items.item(i).getElementsByTagName("AuditName").item(0).text,
				AuditDesc : items.item(i).getElementsByTagName("AuditDesc").length > 0 ? items.item(i).getElementsByTagName("AuditDesc").item(0).text : items.item(i).getElementsByTagName("AuditName").item(0).text,
				Show : items.item(i).getElementsByTagName("Show").item(0).text,
				Target : items.item(i).getElementsByTagName("Target").item(0).text,
				type : 1,
				deleted : 0
			});

			myModel.save();

			// update sections
			getData("SVM_GetAuditSections", {
				AuditID : myModel.get('AuditID')
			}, function(This) {

				// Data is returned from the blog, start parsing
				var xml = This.responseXML.documentElement;

				// blog posts are in nodes named "item"
				var items = xml.getElementsByTagName("Table1");
				for (var i = 0; i < items.length; i++) {
					var secModel = Alloy.createModel('sections', {
						FuckedID : items.item(i).getElementsByTagName("SectionID").item(0).text + "-" + items.item(i).getElementsByTagName("AuditID").item(0).text,
						AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
						SectionID : items.item(i).getElementsByTagName("SectionID").item(0).text,
						SectionDesc : items.item(i).getElementsByTagName("SectionDesc").item(0).text,
						SectionOrder : items.item(i).getElementsByTagName("SectionOrder").item(0).text,
						ParentID : items.item(i).getElementsByTagName("ParentID").item(0).text,
						RootID : items.item(i).getElementsByTagName("RootID").item(0).text
					});

					secModel.save();
				}
			});

			// update qestions
			getData("SVM_GetAuditQuestions", {
				AuditID : myModel.get('AuditID')
			}, function(This) {

				// Data is returned from the blog, start parsing
				var xml = This.responseXML.documentElement;

				// blog posts are in nodes named "item"
				var items = xml.getElementsByTagName("Table1");
				for (var i = 0; i < items.length; i++) {
					var secModel = Alloy.createModel('questions', {
						QuestionID : items.item(i).getElementsByTagName("QuestionID").item(0).text,
						AuditID : This.prams.AuditID,
						SectionID : items.item(i).getElementsByTagName("SectionID").item(0).text,
						ResponsibilityDesc : items.item(i).getElementsByTagName("ResponsibilityDesc").item(0).text,
						QuestionDesc : items.item(i).getElementsByTagName("QuestionDesc").item(0).text,
						QValue : items.item(i).getElementsByTagName("QValue").item(0).text,
						QWeight : items.item(i).getElementsByTagName("QWeight").item(0).text,
						QuestionOrder : items.item(i).getElementsByTagName("QuestionOrder").length > 0 ? items.item(i).getElementsByTagName("QuestionOrder").item(0).text : 0,
						CSA : items.item(i).getElementsByTagName("CSA").item(0).text,
						Show : parseInt(items.item(i).getElementsByTagName("Show").item(0).text)
					});

					secModel.save();
				}

				$.auditDownLoading.hide();
			});
		}

		var item = $.downloadAuditSec.getItemAt(rowsIndex.template);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.template, item);
		var item = $.downloadAuditSec.getItemAt(rowsIndex.sections);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.sections, item);
		var item = $.downloadAuditSec.getItemAt(rowsIndex.questions);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadAuditSec.updateItemAt(rowsIndex.questions, item);

	});
	// }

};
var uploadAuditData = function() {

	if (Alloy.Collections.auditRecord.length == 0) {
		return;
	}

	$.pb.max = Alloy.Collections.auditRecord.length;
	$.pb.message = 'Uploading 1 of ' + Alloy.Collections.auditRecord.length;
	$.pb.show();

	// if (Alloy.Globals.HasLP) {
	// get departments
	getData("LP_GetUserDepts", {}, function(This) {

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// items are in nodes named "Table1"
		var items = xml.getElementsByTagName("Table1");
		//Ti.API.Info("line 462 " + JSON.stringify(items));
		if (items.item(0) == null) {
			$.auditDownLoading.hide();
			return;
		}
		var department = items.item(0).getElementsByTagName("DeptCode").item(0).text;

		if (!department) {
			return;
		}

		var x2jsMod = require('xml2json');
		var x2js = new x2jsMod();
		Alloy.Collections.auditRecord.each(function(model, collectionIndex) {

			$.pb.value = collectionIndex + 1;
			$.pb.message = 'Uploading ' + $.pb.value + ' of ' + Alloy.Collections.auditRecord.length;

			var data = model.toJSON();

			if (data.type == 1) {// SVM
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

				var textWordArray = CryptoJS.enc.Utf8.parse(data.comment);
				var encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
				var base64String = encrypted.toString();
				var CommentEncrypt = base64String;

				getData("LP_CreateAuditRecord", {
					storeCode : data.storeCode,
					DeptCode : department,
					auditID : data.auditID,
					openDate : data.openDate,
					submisiondDate : data.submisiondDate,
					submittedBy : data.submittedBy,
					comment : CommentEncrypt
				}, function(This) {

					var online_id = parseInt(This.responseText.match(">([0-9]+)<")[1]);
					if (!online_id) {
						Ti.UI.createAlertDialog({
							title : 'Error',
							message : "Can't get CreateAuditRecord, please check with your system administrator.\n\n" + This.responseText,
							buttonNames : ['OK']
						}).show();
						return;
					}

					model.set('accessoryType', Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK);
					model.save({
						online_id : online_id,
						//deptCode : department
					});

					var answers = {
						online_id : online_id,
						answers : []
					};
					var numOfImages = 0;
					var noImages = true;
					var answersCollaction = Alloy.createCollection('answers');
					var wait = false;
					answersCollaction.on('fetch', function() {
						answersCollaction.each(function(mymodel) {
							var myAns = mymodel.toJSON();
							while (wait) {
								//Ti.API.Info("waiting=-=-=-=-=-=-=-=-=-=-=-=");
							};
							// use saved data fo async errors
							myAns.AuditRecordID = answers.online_id;

							// upload images
							if (myAns.Image != null) {
								numOfImages++;
								noImages = false;
								// //Ti.API.Info('images uploading : ' + myAns.Image.getSize());
								////Ti.API.Info('images uploading 1 : ' + myAns.Image1.getSize());
								////Ti.API.Info('myAns.Image is not null '+myAns.Image.toString());
								// //Ti.API.Info('myAns.Image native path '+myAns.Image.nativePath);
								//Ti.API.Info('myAns.Image size ' + myAns.Image.size);
								////Ti.API.Info('myAns.Image is null ');
								////Ti.API.Info('BlobText image1 = '+Ti.Utils.base64encode(myAns.Image).toString());
								////Ti.API.Info('BlobText = '+Ti.Utils.base64encode(myAns.Image1).toString());
								// var file = Ti.Filesystem.getFile(myAns.Image);
								// var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, myAns.Image);
								////Ti.API.Info('image...................... '+f.exists());
								// var blob = f.read();
								// //Ti.API.Info('images uploading : ' + blob.getSize());

								//var imageFile = Titanium.Filesystem.getFile(myAns.Image).read();
								var encoded = Ti.Utils.base64encode(myAns.Image);
								var encoded1 = '';
								if (myAns.Image1 != null) {
									encoded1 = Ti.Utils.base64encode(myAns.Image1);
								}
								// wait = true;
								Alloy.Globals.loading.show("please wait...");
								getData('LP_InsertImages', {
									auditRecordID : answers.online_id,
									questionID : myAns.QuestionID,
									image : 'WebService_LP_InsertImages' + encoded.toString(),
									image1 : 'WebService_LP_InsertImages' + encoded1.toString()
								}, function(This) {
									wait = false;
									//Ti.API.Info('numOfImages was ' + numOfImages);
									numOfImages--;
									//Ti.API.Info('numOfImages now is ' + numOfImages);
									if (numOfImages == 0) {
										getData("LP_ImageSyncCompleted", {
											auditRecordID : answers.online_id
										}, function(This) {
											//Ti.API.Info("numOfImages is zero");
										});

										Alloy.Globals.loading.hide();

									}
									// getData("SVM_ImageSyncCompleted",
									// {
									// auditRecordID : answers.online_id
									// },
									// function(e)
									// {
									// //Ti.API.Info ("real Image Upload completed!!!!!!!!!!!!!!!!!");
									// });
									//
								}, function(e) {
									alert('Uploaded image error\nAuditRecordID : ' + answers.online_id + '\nquestionID : ' + myAns.QuestionID + '\n' + e);
								}, false);
							}
							delete myAns.id;
							delete myAns.uploaded_date;
							delete myAns.Image;
							delete myAns.Image1;

							answers.answers.push(myAns);
							mymodel.save({
								uploaded_date : Alloy.Globals.getFullDate()
							});
						});
					});

					////end function
					try
					{
						answersCollaction.fetch({
							query : "SELECT * from answers WHERE AuditRecordID = " + model.get('id')
						});
					} catch (e) {
						//Ti.API.Info('error -> ' + JSON.stringify(e));
					}

					var xmlStr = x2js.json2xml_str({
						root : {
							//AuditRecordID : online_id,
							answer : answers.answers
						}
					});

					//xmlStr = xmlStr.replace ("'","        ");
					//Ti.API.Info(xmlStr);
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

					var textWordArray = CryptoJS.enc.Utf8.parse(xmlStr);
					var encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
					var base64String = encrypted.toString();

					xmlStr = base64String;

					$.pb.message = 'Uploading ' + $.pb.value + ' of ' + Alloy.Collections.auditRecord.length + "\n" + 'please wait uploading images.';
					getData("LP_InsertAnswers", {
						xml : xmlStr
					}, function(This) {
						//Ti.API.Info(xmlStr);
						//Ti.API.Info("before real insert Upload completed!!!!!!!!!!!!!!!!!");
						getData("LP_SyncCompleted", {
							auditRecordID : answers.online_id
						}, function(This) {
							//Ti.API.Info("real insert Upload completed!!!!!!!!!!!!!!!!!");
							if (noImages) {
								//Ti.API.Info("No IMAGES WTF");

								getData("LP_ImageSyncCompleted", {
									auditRecordID : answers.online_id
								}, function(This) {
									//Ti.API.Info("numOfImages already was zero");
								});

							}
						});

						//Kassem guessing the upload is done
					}, function(e) {
						alert('XML upload error\nAuditRecordID : ' + answers.online_id + '\n' + e);
					});

					////*********Insert Images after Answers
					/*
					//var answersCollaction = Alloy.createCollection('answers');
					// answersCollaction.on('fetch', function() {
					answersCollaction.each(function(mymodel) {
					var myAns = mymodel.toJSON();

					// use saved data fo async errors
					myAns.AuditRecordID = answers.online_id;

					if (myAns.Image != null) {
					// //Ti.API.Info('images uploading : ' + myAns.Image.getSize());
					////Ti.API.Info('images uploading 1 : ' + myAns.Image1.getSize());
					////Ti.API.Info('myAns.Image is not null '+myAns.Image.toString());
					// //Ti.API.Info('myAns.Image native path '+myAns.Image.nativePath);
					//Ti.API.Info('myAns.Image size '+myAns.Image.size);
					////Ti.API.Info('myAns.Image is null ');
					////Ti.API.Info('BlobText image1 = '+Ti.Utils.base64encode(myAns.Image).toString());
					////Ti.API.Info('BlobText = '+Ti.Utils.base64encode(myAns.Image1).toString());
					// var file = Ti.Filesystem.getFile(myAns.Image);
					// var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, myAns.Image);
					////Ti.API.Info('image...................... '+f.exists());
					// var blob = f.read();
					// //Ti.API.Info('images uploading : ' + blob.getSize());

					//var imageFile = Titanium.Filesystem.getFile(myAns.Image).read();
					var encoded = Ti.Utils.base64encode(myAns.Image);
					var encoded1 ='';
					if (myAns.Image1 != null)
					{
					encoded1=Ti.Utils.base64encode(myAns.Image1);
					}
					getData('SVM_InsertImages', {
					auditRecordID : answers.online_id,
					questionID : myAns.QuestionID,
					image : 'WebService_SVM_InsertImages'+encoded.toString(),
					image1 : 'WebService_SVM_InsertImages'+encoded1.toString()
					}, function(e) {
					//Ti.API.Info('images uploaded : Image1' );
					//Ti.API.Info('images uploaded 1 : Image 2' );
					}, function(e) {
					alert('Uploaded image error\nAuditRecordID : ' + answers.online_id + '\nquestionID : ' + myAns.QuestionID + '\n' + e);
					}, false);
					}

					delete myAns.id;
					delete myAns.uploaded_date;
					delete myAns.Image;
					delete myAns.Image1;
					answers.answers.push(myAns);
					mymodel.save({
					uploaded_date : Alloy.Globals.getFullDate()
					});
					});
					});  ///end function
					// End Move
					*/
				});
			} else {// ScoreCard
				model.set('accessoryType', Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK);
				model.save({
					online_id : -1,
					deptCode : department
				});

				var answers = {
					auditID : data.auditID,
					storeCode : data.storeCode,
					PositionID : data.PositionID,
					UserID : data.UserID,
					answers : []
				};

				var answersCollaction = Alloy.createCollection('answers');
				answersCollaction.on('fetch', function() {
					answersCollaction.each(function(mymodel) {
						var myAns = mymodel.toJSON();
						answers.answers.push({
							StoreCode : answers.storeCode,
							PositionID : answers.PositionID,
							UserID : answers.UserID,
							AuditID : answers.auditID,
							QuestionID : myAns.QuestionID,
							AnswerID : myAns.AnswerID,
							"Date" : myAns.AnswerDate,
							AnswerValue : myAns.Answervalue,
							AuditCreationAuditor : Alloy.Globals.user.get('ldap_user'),
							Auditor : Alloy.Globals.user.get('ldap_user')
						});

						mymodel.save({
							uploaded_date : Alloy.Globals.getFullDate()
						});
					});
				});
				try {
					answersCollaction.fetch({
						query : "SELECT * from answers WHERE AuditRecordID = " + model.get('id')
					});
				} catch (e) {
					//Ti.API.Info('error -> ' + JSON.stringify(e));
				}

				var xmlStr = x2js.json2xml_str({
					root : {
						answer : answers.answers
					}
				});
				getData("ScoreCard_InsertEmployeeAnswers", {
					xml : xmlStr
				}, function(This) {
					//Ti.API.Info(xmlStr);

				});
			}

			$.pb.message = Alloy.Collections.auditRecord.length + ' audits uploaded.';
			setTimeout(function() {
				$.pb.hide();
			}, 5000);

		});
	});
	// } else {
	// get departments
	getData("SVM_GetUserDepts", {}, function(This) {

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// items are in nodes named "Table1"
		var items = xml.getElementsByTagName("Table1");
		//Ti.API.Info("line 810");

		if (items.item(0) == null) {
			$.auditDownLoading.hide();
			return;
		}
		var department = items.item(0).getElementsByTagName("DeptCode").item(0).text;

		if (!department) {
			return;
		}

		var x2jsMod = require('xml2json');
		var x2js = new x2jsMod();
		Alloy.Collections.auditRecord.each(function(model, collectionIndex) {

			$.pb.value = collectionIndex + 1;
			$.pb.message = 'Uploading ' + $.pb.value + ' of ' + Alloy.Collections.auditRecord.length;

			var data = model.toJSON();

			if (data.type == 1) {// SVM
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

				var textWordArray = CryptoJS.enc.Utf8.parse(data.comment);
				var encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
				var base64String = encrypted.toString();
				var CommentEncrypt = base64String;

				getData("SVM_CreateAuditRecord", {
					storeCode : data.storeCode,
					DeptCode : department,
					auditID : data.auditID,
					openDate : data.openDate,
					submisiondDate : data.submisiondDate,
					submittedBy : data.submittedBy,
					comment : CommentEncrypt
				}, function(This) {

					var online_id = parseInt(This.responseText.match(">([0-9]+)<")[1]);
					if (!online_id) {
						Ti.UI.createAlertDialog({
							title : 'Error',
							message : "Can't get CreateAuditRecord, please check with your system administrator.\n\n" + This.responseText,
							buttonNames : ['OK']
						}).show();
						return;
					}

					model.set('accessoryType', Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK);
					model.save({
						online_id : online_id,
						//deptCode : department
					});

					var answers = {
						online_id : online_id,
						answers : []
					};
					var numOfImages = 0;
					var noImages = true;
					var answersCollaction = Alloy.createCollection('answers');
					var isUploading = false;
					answersCollaction.on('fetch', function() {
						answersCollaction.each(function(mymodel) {
							var myAns = mymodel.toJSON();
							while (isUploading) {
								//Ti.API.Info("isuploading-=-=-=-=-=-=-=-=-=-=-=-=-");
							};
							// use saved data fo async errors
							myAns.AuditRecordID = answers.online_id;

							// upload images
							if (myAns.Image != null) {
								numOfImages++;
								noImages = false;
								// //Ti.API.Info('images uploading : ' + myAns.Image.getSize());
								////Ti.API.Info('images uploading 1 : ' + myAns.Image1.getSize());
								////Ti.API.Info('myAns.Image is not null '+myAns.Image.toString());
								// //Ti.API.Info('myAns.Image native path '+myAns.Image.nativePath);
								//Ti.API.Info('myAns.Image size ' + myAns.Image.size);
								////Ti.API.Info('myAns.Image is null ');
								////Ti.API.Info('BlobText image1 = '+Ti.Utils.base64encode(myAns.Image).toString());
								////Ti.API.Info('BlobText = '+Ti.Utils.base64encode(myAns.Image1).toString());
								// var file = Ti.Filesystem.getFile(myAns.Image);
								// var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, myAns.Image);
								////Ti.API.Info('image...................... '+f.exists());
								// var blob = f.read();
								// //Ti.API.Info('images uploading : ' + blob.getSize());

								//var imageFile = Titanium.Filesystem.getFile(myAns.Image).read();
								var encoded = Ti.Utils.base64encode(myAns.Image);
								var encoded1 = '';
								if (myAns.Image1 != null) {
									encoded1 = Ti.Utils.base64encode(myAns.Image1);
								}
								// isUploading = true;
								Alloy.Globals.loading.show("please wait...");
								getData('SVM_InsertImages', {
									auditRecordID : answers.online_id,
									questionID : myAns.QuestionID,
									image : 'WebService_SVM_InsertImages' + encoded.toString(),
									image1 : 'WebService_SVM_InsertImages' + encoded1.toString()
								}, function(This) {
									isUploading = false;
									//Ti.API.Info('numOfImages was ' + numOfImages);
									numOfImages--;
									//Ti.API.Info('numOfImages now is ' + numOfImages);
									if (numOfImages == 0) {
										getData("SVM_ImageSyncCompleted", {
											auditRecordID : answers.online_id
										}, function(This) {
											//Ti.API.Info("numOfImages is zero");
										});
										Alloy.Globals.loading.hide();

									}
									// getData("SVM_ImageSyncCompleted",
									// {
									// auditRecordID : answers.online_id
									// },
									// function(e)
									// {
									// //Ti.API.Info ("real Image Upload completed!!!!!!!!!!!!!!!!!");
									// });
									//
								}, function(e) {
									alert('Uploaded image error\nAuditRecordID : ' + answers.online_id + '\nquestionID : ' + myAns.QuestionID + '\n' + e);
								}, false);
							}
							delete myAns.id;
							delete myAns.uploaded_date;
							delete myAns.Image;
							delete myAns.Image1;

							answers.answers.push(myAns);
							mymodel.save({
								uploaded_date : Alloy.Globals.getFullDate()
							});
						});
					});

					////end function
					try
					{
						answersCollaction.fetch({
							query : "SELECT * from answers WHERE AuditRecordID = " + model.get('id')
						});
					} catch (e) {
						//Ti.API.Info('error -> ' + JSON.stringify(e));
					}

					var xmlStr = x2js.json2xml_str({
						root : {
							//AuditRecordID : online_id,
							answer : answers.answers
						}
					});

					//xmlStr = xmlStr.replace ("'","        ");
					//Ti.API.Info(xmlStr);
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

					var textWordArray = CryptoJS.enc.Utf8.parse(xmlStr);
					var encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
					var base64String = encrypted.toString();

					xmlStr = base64String;

					$.pb.message = 'Uploading ' + $.pb.value + ' of ' + Alloy.Collections.auditRecord.length + "\n" + 'please wait uploading images.';
					getData("SVM_InsertAnswers", {
						xml : xmlStr
					}, function(This) {
						//Ti.API.Info(xmlStr);
						//Ti.API.Info("before real insert Upload completed!!!!!!!!!!!!!!!!!");
						getData("SVM_SyncCompleted", {
							auditRecordID : answers.online_id
						}, function(This) {
							//Ti.API.Info("real insert Upload completed!!!!!!!!!!!!!!!!!");
							if (noImages) {
								//Ti.API.Info("No IMAGES WTF");

								getData("SVM_ImageSyncCompleted", {
									auditRecordID : answers.online_id
								}, function(This) {
									//Ti.API.Info("numOfImages already was zero");
								});

							}
						});

						//Kassem guessing the upload is done
					}, function(e) {
						alert('XML upload error\nAuditRecordID : ' + answers.online_id + '\n' + e);
					});

					////*********Insert Images after Answers
					/*
					//var answersCollaction = Alloy.createCollection('answers');
					// answersCollaction.on('fetch', function() {
					answersCollaction.each(function(mymodel) {
					var myAns = mymodel.toJSON();

					// use saved data fo async errors
					myAns.AuditRecordID = answers.online_id;

					if (myAns.Image != null) {
					// //Ti.API.Info('images uploading : ' + myAns.Image.getSize());
					////Ti.API.Info('images uploading 1 : ' + myAns.Image1.getSize());
					////Ti.API.Info('myAns.Image is not null '+myAns.Image.toString());
					// //Ti.API.Info('myAns.Image native path '+myAns.Image.nativePath);
					//Ti.API.Info('myAns.Image size '+myAns.Image.size);
					////Ti.API.Info('myAns.Image is null ');
					////Ti.API.Info('BlobText image1 = '+Ti.Utils.base64encode(myAns.Image).toString());
					////Ti.API.Info('BlobText = '+Ti.Utils.base64encode(myAns.Image1).toString());
					// var file = Ti.Filesystem.getFile(myAns.Image);
					// var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, myAns.Image);
					////Ti.API.Info('image...................... '+f.exists());
					// var blob = f.read();
					// //Ti.API.Info('images uploading : ' + blob.getSize());

					//var imageFile = Titanium.Filesystem.getFile(myAns.Image).read();
					var encoded = Ti.Utils.base64encode(myAns.Image);
					var encoded1 ='';
					if (myAns.Image1 != null)
					{
					encoded1=Ti.Utils.base64encode(myAns.Image1);
					}
					getData('SVM_InsertImages', {
					auditRecordID : answers.online_id,
					questionID : myAns.QuestionID,
					image : 'WebService_SVM_InsertImages'+encoded.toString(),
					image1 : 'WebService_SVM_InsertImages'+encoded1.toString()
					}, function(e) {
					//Ti.API.Info('images uploaded : Image1' );
					//Ti.API.Info('images uploaded 1 : Image 2' );
					}, function(e) {
					alert('Uploaded image error\nAuditRecordID : ' + answers.online_id + '\nquestionID : ' + myAns.QuestionID + '\n' + e);
					}, false);
					}

					delete myAns.id;
					delete myAns.uploaded_date;
					delete myAns.Image;
					delete myAns.Image1;
					answers.answers.push(myAns);
					mymodel.save({
					uploaded_date : Alloy.Globals.getFullDate()
					});
					});
					});  ///end function
					// End Move
					*/
				});
			} else {// ScoreCard
				model.set('accessoryType', Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK);
				model.save({
					online_id : -1,
					deptCode : department
				});

				var answers = {
					auditID : data.auditID,
					storeCode : data.storeCode,
					PositionID : data.PositionID,
					UserID : data.UserID,
					answers : []
				};

				var answersCollaction = Alloy.createCollection('answers');
				answersCollaction.on('fetch', function() {
					answersCollaction.each(function(mymodel) {
						var myAns = mymodel.toJSON();
						answers.answers.push({
							StoreCode : answers.storeCode,
							PositionID : answers.PositionID,
							UserID : answers.UserID,
							AuditID : answers.auditID,
							QuestionID : myAns.QuestionID,
							AnswerID : myAns.AnswerID,
							"Date" : myAns.AnswerDate,
							AnswerValue : myAns.Answervalue,
							AuditCreationAuditor : Alloy.Globals.user.get('ldap_user'),
							Auditor : Alloy.Globals.user.get('ldap_user')
						});

						mymodel.save({
							uploaded_date : Alloy.Globals.getFullDate()
						});
					});
				});
				try {
					answersCollaction.fetch({
						query : "SELECT * from answers WHERE AuditRecordID = " + model.get('id')
					});
				} catch (e) {
					//Ti.API.Info('error -> ' + JSON.stringify(e));
				}

				var xmlStr = x2js.json2xml_str({
					root : {
						answer : answers.answers
					}
				});
				getData("ScoreCard_InsertEmployeeAnswers", {
					xml : xmlStr
				}, function(This) {
					//Ti.API.Info(xmlStr);

				});
			}

			$.pb.message = Alloy.Collections.auditRecord.length + ' audits uploaded.';
			setTimeout(function() {
				$.pb.hide();
			}, 5000);

		});
	});
	// }

};

var getQuestionAnswers = function(AuditID, StoreCode) {

	var auditRecord = Alloy.createCollection('auditRecord');
	auditRecord.on('fetch', function() {
		var rows = [];
		auditRecord.each(function(model) {
			//Ti.API.Info("auditRecord ====" + JSON.stringify(model));
			var myData = model.toJSON();
			//Ti.API.Info("storeCode ====" + myData.storeCode);
			//Ti.API.Info("auditID ====" + myData.auditID);
			//Ti.API.Info("id ====" + myData.id);
			var myData = model.toJSON();
			var AuditID = myData.auditID;
			var StoreCode = myData.storeCode;
			getData("LP_GetAuditHistory", {
				AuditID : AuditID,
				StoreCode : StoreCode
			}, function(This) {
				//Ti.API.Info("the returned storeCode ====" + myData.storeCode);
				//Ti.API.Info("the returned auditID ====" + myData.auditID);

				var del = Alloy.createCollection('auditHistory');
				del.delete(myData.storeCode, myData.auditID);

				// Data is returned from the blog, start parsing
				var xml = This.responseXML.documentElement;
				//Ti.API.Info('\n\n\n\n################# response: ' + This.responseText + "\n\n\n\n\n");
				// blog posts are in nodes named "item"
				var items = xml.getElementsByTagName("Table1");
				for (var i = 0; i < items.length; i++) {
					var myModel = Alloy.createModel('auditHistory', {
						StoreCode : myData.storeCode,
						AuditRecordID : myData.id,
						AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
						QuestionID : items.item(i).getElementsByTagName("QuestionID").item(0).text,
						Previous_AuditDate : items.item(i).getElementsByTagName("Previous_AuditDate").item(0).text,
						Previous_Answer : items.item(i).getElementsByTagName("Previous_Answer").item(0) != null ? items.item(i).getElementsByTagName("Previous_Answer").item(0).text : '',
						Previous_AnswerValue : items.item(i).getElementsByTagName("Previous_AnswerValue").item(0).text,
						Previous_AnswerDate : items.item(i).getElementsByTagName("Previous_AnswerDate").item(0).text,
						Previous_Comment : items.item(i).getElementsByTagName("Previous_Comment").item(0).text
					});

					myModel.save(null, {
						success : function(model, response) {
							//Ti.API.Info("success->" + response);
						},
						error : function(model, response) {
							//Ti.API.Info("error->" + response);
						}
					});
				}

				//Ti.API.Info("kassem==>" + JSON.stringify(xml));

			});
		});
	});
	try {
		auditRecord.fetch({
			query : 'SELECT DISTINCT id, auditID, storeCode from auditRecord'//"SELECT * FROM auditRecord t1 INNER JOIN auditRecord t2 WHERE t1.auditID <> t2.auditID AND t1.storeCode <> t2.storeCode"
		});
	} catch (e) {
		//Ti.API.Info('error -> ' + JSON.stringify(e));
	}

};

var donwloadScoreCardData = function() {

	$.scoreCardDownLoading.show();

	// some definations
	var rowsIndex = {
		'template' : 0,
		'sections' : 1,
		'questions' : 2,
		'employees' : 3
	};

	// stores
	getData("ScoreCard_GetEmployees", {}, function(This) {

		var del = Alloy.createCollection('employees');
		del.deleteAllRecords();
		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// blog posts are in nodes named "item"
		var items = xml.getElementsByTagName("Table1");
		for (var i = 0; i < items.length; i++) {
			var myModel = Alloy.createModel('employees', {
				StoreCode : items.item(i).getElementsByTagName("StoreCode").item(0).text,
				DeptCode : items.item(i).getElementsByTagName("DeptCode").item(0).text,
				PositionID : items.item(i).getElementsByTagName("PositionID").item(0).text,
				AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
				UserID : items.item(i).getElementsByTagName("UserID").item(0).text,
				Name : items.item(i).getElementsByTagName("Name").item(0).text,
				EmployeeNo : items.item(i).getElementsByTagName("EmployeeNo").item(0).text
			});

			myModel.save();
		}
		var item = $.downloadScoreCardSec.getItemAt(rowsIndex.employees);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadScoreCardSec.updateItemAt(rowsIndex.employees, item);
	});

	getData("ScoreCard_GetAuditTemplates", {}, function(This) {

		// mark all templates as deleted
		Alloy.Collections.templates.markAsDeleted(2);

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// blog posts are in nodes named "item"
		var items = xml.getElementsByTagName("Table1");
		for (var i = 0; i < items.length; i++) {
			var myModel = Alloy.createModel('templates', {
				AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
				CompanyTypeID : items.item(i).getElementsByTagName("CompanyTypeID").item(0).text,
				DeptCode : items.item(i).getElementsByTagName("DeptCode").item(0).text,
				AuditName : items.item(i).getElementsByTagName("AuditName").item(0).text,
				Show : items.item(i).getElementsByTagName("Show").item(0).text,
				type : 2,
				deleted : 0
			});

			myModel.save();

			// update sections
			getData("ScoreCard_GetAuditSections", {
				AuditID : myModel.get('AuditID')
			}, function(This) {

				// Data is returned from the blog, start parsing
				var xml = This.responseXML.documentElement;

				// blog posts are in nodes named "item"
				var items = xml.getElementsByTagName("Table1");
				for (var i = 0; i < items.length; i++) {

					var secModel = Alloy.createModel('sections', {
						FuckedID : items.item(i).getElementsByTagName("SectionID").item(0).text + "-" + items.item(i).getElementsByTagName("AuditID").item(0).text,
						AuditID : items.item(i).getElementsByTagName("AuditID").item(0).text,
						SectionID : items.item(i).getElementsByTagName("SectionID").item(0).text,
						SectionDesc : items.item(i).getElementsByTagName("SectionDesc").item(0).text,
						SectionOrder : items.item(i).getElementsByTagName("SectionOrder").item(0).text,
						ParentID : items.item(i).getElementsByTagName("ParentID").item(0).text,
						RootID : items.item(i).getElementsByTagName("RootID").item(0).text
					});

					secModel.save();
				}
			});

			// update qestions
			getData("ScoreCard_GetAuditQuestionsAnswers", {
				AuditID : myModel.get('AuditID')
			}, function(This) {

				// Data is returned from the blog, start parsing
				var xml = This.responseXML.documentElement;

				// blog posts are in nodes named "item"
				var items = xml.getElementsByTagName("Question");
				for (var i = 0; i < items.length; i++) {
					var questionModel = Alloy.createModel('questions_scorecard', {
						QuestionID : items.item(i).getElementsByTagName("QuestionID").item(0).text,
						AuditID : This.prams.AuditID,
						SectionID : items.item(i).getElementsByTagName("SectionID").item(0).text,
						QuestionDesc : items.item(i).getElementsByTagName("QuestionDesc").item(0).text
					});

					questionModel.save();

					// Data is returned from the blog, start parsing
					var answersItems = items.item(i).getElementsByTagName("Answer");
					for (var i1 = 0; i1 < answersItems.length; i1++) {
						var answerModel = Alloy.createModel('questions_answers_scorecard', {
							AnswerID : answersItems.item(i1).getElementsByTagName("AnswerID").item(0).text,
							QuestionID : items.item(i).getElementsByTagName("QuestionID").item(0).text,
							Answer : answersItems.item(i1).getElementsByTagName("AnswerDesc").item(0).text,
							Value : answersItems.item(i1).getElementsByTagName("Value").item(0).text,
							Weight : answersItems.item(i1).getElementsByTagName("Weight").item(0).text
						});

						answerModel.save();
					}
				}

			});
			$.scoreCardDownLoading.hide();
		}

		var item = $.downloadScoreCardSec.getItemAt(rowsIndex.template);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadScoreCardSec.updateItemAt(rowsIndex.template, item);
		var item = $.downloadScoreCardSec.getItemAt(rowsIndex.sections);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadScoreCardSec.updateItemAt(rowsIndex.sections, item);
		var item = $.downloadScoreCardSec.getItemAt(rowsIndex.questions);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadScoreCardSec.updateItemAt(rowsIndex.questions, item);

	});

};

var donwloadTaskData = function() {

	$.taskDownLoading.show();

	// some definations
	var rowsIndex = {
		'department' : 0,
		'tasks' : 1
	};

	// get departments
	getData("CheckList_GetUserDepts", {}, function(This) {

		// mark department as completed
		var item = $.downloadTaskSec.getItemAt(rowsIndex.department);
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		$.downloadTaskSec.updateItemAt(rowsIndex.department, item);

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// items are in nodes named "Table1"
		var items = xml.getElementsByTagName("Table1");
		//Ti.API.Info("line 1379");
		var department = items.item(0).getElementsByTagName("DeptCode").item(0).text;

		if (!department) {
			return;
		}

		getData("CheckList_GetCheckList", {
			DeptCode : department
		}, function(This) {
			//Ti.API.Info('#### Success called');
			// mark department as completed
			var item = $.downloadTaskSec.getItemAt(rowsIndex.tasks);
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
			$.downloadTaskSec.updateItemAt(rowsIndex.tasks, item);

			// Data is returned from the blog, start parsing
			var xml = This.responseXML.documentElement;

			// items are in nodes named "Table1"
			var items = xml.getElementsByTagName("Table1");

			for (var i = 0; i < items.length; i++) {
				var myModel = Alloy.createModel('tasks', {
					TaskQuestionID : items.item(i).getElementsByTagName("TaskQuestionID").item(0).text,
					DeptCode : items.item(i).getElementsByTagName("DeptCode").item(0).text,
					TaskID : items.item(i).getElementsByTagName("TaskID").item(0).text,
					TaskName : items.item(i).getElementsByTagName("TaskName").item(0).text,
					SectionID : items.item(i).getElementsByTagName("SectionID").item(0).text,
					SectionDesc : items.item(i).getElementsByTagName("SectionDesc").item(0).text,
					QuestionDesc : items.item(i).getElementsByTagName("QuestionDesc").item(0).text,
					PriorityCode : items.item(i).getElementsByTagName("PriorityCode").item(0).text,
					timeFrom : items.item(i).getElementsByTagName("From").length > 0 ? parseInt(items.item(i).getElementsByTagName("From").item(0).text.replace('PT', '')) : 0,
					timeTo : items.item(i).getElementsByTagName("To").length > 0 ? parseInt(items.item(i).getElementsByTagName("To").item(0).text.replace('PT', '')) : 24,
					TaskOrder : items.item(i).getElementsByTagName("TaskOrder").item(0).text,
					SectionOrder : items.item(i).getElementsByTagName("SectionOrder").item(0).text,
					//QuestionOrder : items.item(i).getElementsByTagName("QuestionOrder").item(0).text,
					QuestionOrder : items.item(i).getElementsByTagName("QuestionOrder").length > 0 ? items.item(i).getElementsByTagName("QuestionOrder").item(0).text : 0
				});

				myModel.save();
			}

			$.taskDownLoading.hide();

			// update task list
			try {
				Alloy.Collections.tasks.fetch({
					query : "SELECT TaskName, TaskID FROM tasks GROUP BY TaskID ORDER BY TaskOrder"
				});
			} catch (e) {
				//Ti.API.Info('error -> ' + JSON.stringify(e));
			}

		});
	});

};

var uploadTaskData = function() {

	if (Alloy.Collections.tasks_completed.models.length == 0) {
		return;
	}

	$.taskUpLoading.show();

	// get un-uploaded tasks, group them into lists
	var lists = {};

	var tasksCompletedCollaction = Alloy.createCollection('tasks_completed');
	tasksCompletedCollaction.on('fetch', function() {
		tasksCompletedCollaction.each(function(mymodel) {
			var data = mymodel.toJSON();
			var CompletedDate = data.CompletedDate;

			// list type to get key
			if (data.TaskID == 1) {
				var key = data.day;
			} else if (data.TaskID == 2) {
				var key = data.week;
			} else if (data.TaskID == 3) {
				var key = data.month;
			} else if (data.TaskID == 4) {
				var key = data.year + '-h' + (data.quarter > 2 ? 2 : 1);
			} else if (data.TaskID == 5) {
				var key = data.year;
			} else {
				var key = data.year + '-q' + data.quarter;
			}

			if (!lists.hasOwnProperty(key)) {
				lists[key] = {
					ids : [],
					TaskID : data.TaskID,
					openDate : data.CompletedDate
				};
			}

			lists[key].ids.push(data.id);
			lists[key].closeDate = data.CompletedDate;
		});
	});
	try {
		tasksCompletedCollaction.fetch({
			query : "SELECT tc.id, t.TaskID, t.TaskName, count(*) completed, tc.CompletedDate, strftime('%Y-%m-%d', tc.CompletedDate) day, strftime('%Y-w%W', tc.CompletedDate) week, strftime('%Y-m%m', tc.CompletedDate) month, strftime('%Y', tc.CompletedDate) year, (cast(strftime('%m', tc.CompletedDate) as integer) + 2) / 3 as quarter FROM tasks t JOIN tasks_completed tc ON t.TaskQuestionID = tc.TaskQuestionID WHERE tc.taskRecord IS NULL GROUP BY tc.id ORDER BY t.TaskID, tc.CompletedDate"
		});
	} catch (e) {
		//Ti.API.Info('error -> ' + JSON.stringify(e));
	}

	// get departments
	getData("CheckList_GetUserDepts", {}, function(This) {

		// Data is returned from the blog, start parsing
		var xml = This.responseXML.documentElement;

		// items are in nodes named "Table1"
		var items = xml.getElementsByTagName("Table1");
		//Ti.API.Info("line 1489");
		var department = items.item(0).getElementsByTagName("DeptCode").item(0).text;

		if (!department) {
			return;
		}

		var x2jsMod = require('xml2json');
		var x2js = new x2jsMod();

		_.each(lists, function(data, key) {

			getData("CheckList_CreateCheckListRecord", {
				deptCode : department,
				taskID : data.TaskID,
				username : Alloy.Models.user.get('Username'),
				openDate : data.openDate,
				closeDate : data.closeDate,
				status : '1'
			}, function(This) {

				var online_id = parseInt(This.responseText.match(">([0-9]+)<")[1]);
				if (!online_id) {
					Ti.UI.createAlertDialog({
						title : 'Error',
						message : "Can't get CreateCheckListRecord, please check with your system administrator.\n\n" + This.responseText,
						buttonNames : ['OK']
					}).show();
					return;
				}

				var xmlStr = x2js.json2xml_str({
					root : {
						CheckListRecord : online_id,
						completedTasks : {
							ids : data.ids
						}
					}
				});
				getData("CheckList_InsertAnswers", {
					xml : xmlStr
				}, function(This) {
					//Ti.API.Info(xmlStr);
					tasksCompletedCollaction.markCompleted(data.ids, online_id);
				});

			});
			$.auditUpLoading.hide();

		});

	});
};

$.syncBtn.addEventListener('click', function() {
	//Ti.API.Info("hello");
	//setTimeout(checkKassem, 1000);
	getQuestionAnswers();

	// Donwload audit data
	//By Hassanisipad
	//Ti.API.Info($.downloadAuditSwitch.value == true);
	//Ti.API.Info(Alloy.Globals.isiPad);

	if ($.downloadAuditSwitch.value == true && (Alloy.Globals.isiPad || Alloy.Globals.isTablet)) {
		//if ($.downloadAuditSwitch.value == 'true') {
		donwloadAuditData();
	}

	// Upload audits & answers
	//By hassanisipad
	if ($.uploadAuditSwitch.value == true && (Alloy.Globals.isiPad || Alloy.Globals.isTablet)) {
		//if ($.uploadAuditSwitch.value == 'true') {
		updateAuditRecord();
		uploadAuditData();
	}

	// Donwload ScoreCard data
	//By Hassanisipad
	if ($.downloadScoreCardSwitch.value == true && (Alloy.Globals.isiPad || Alloy.Globals.isTablet)) {
		//if ($.downloadScoreCardSwitch.value == 'true') {
		donwloadScoreCardData();
	}

	// Donwload tasks data
	if ($.downloadTaskSwitch.value == true && Alloy.Models.user.get('HasTaskList') == 1) {
		//alert("will download data");
		donwloadTaskData();
	}

	// Donwload tasks data
	if ($.uploadTaskSwitch.value == true && Alloy.Models.user.get('HasTaskList') == 1) {
		updateTaskLists();
		uploadTaskData();
	}

	var today = new Date();
	Alloy.Globals.user.set('LastSyncDate', today);
	Alloy.Globals.user.save();
	var last = Alloy.Globals.user.get('LastSyncDate');

	$.lastSyncLbl.setText(moment(last).format('DD-MM-YYYY HH:mm'));
});

$.synchronization.addEventListener("close", function() {
	$.destroy();
});
