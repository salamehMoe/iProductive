var args = arguments[0] || {};
//Ti.API.Info("hi from sections");
args.notEditable = args.notEditable || false;
var isScoreCard = args.item.type == 2;
var totalScore = "";
var totalWeight = "";
var totalWeightTotal = 0;
var win = Ti.UI.currentWindow;

//Ti.API.Info('>>>>>>>> in sections');

Alloy.Globals.Penalities = 0;

// $.sections.addEventListener("open", function(e) {
//
// $.index.activity.addEventListener("resume", function() {
//
// alert("resume");
//
// });
// $.index.activity.addEventListener("pause", function() {
//
// alert("pause");
//
// });
//
// });

var clickSection = function(e) {

	var item = e.section.getItemAt(e.itemIndex);
	if (isScoreCard) {
		Alloy.Globals.pageStack.open(Alloy.createController('audit/scoreCardQuestions', {
			AuditID : args.item.AuditID,
			auditRecordID : args.formPrams.auditRecordID,
			deptCode : args.formPrams.deptCode,
			section : item.properties,
			template : args.item,
			notEditable : args.notEditable,
			saveCallBack : save,
			refreshSections : refreshSections
		}).getView());

	} else {

		Alloy.Globals.pageStack.open(Alloy.createController('audit/questions', {
			AuditID : args.item.AuditID,
			auditRecordID : args.formPrams.auditRecordID,
			deptCode : args.formPrams.deptCode,
			section : item.properties,
			template : args.item,
			notEditable : args.notEditable,
			saveCallBack : save,
			isIncomplete : args.isIncomplete,
			refreshSections : refreshSections
		}).getView());
	}
};

$.sectionHeaderLbl.setText(args.item.title);
//$.Comment.setValue(args.formPrams.comment);

function refreshSections() {

	var tableName = isScoreCard ? 'questions_scorecard' : 'questions',
	    select = isScoreCard ? "" : ", IFNULL(sum(q.QWeight), 0) weightTotal ";

	var query = "select dt_sections.FuckedID FuckedID, dt_sections.SectionID SectionID, dt_sections.AuditID AuditID, dt_sections.sectionDesc SectionDesc, dt_sections.SectionOrder SectionOrder, dt_sections.ParentID ParentID, dt_sections.RootID RootID";
	query += select + " from " + tableName + " q inner join ";
	query += " (select s1.FuckedID, s1.SectionID, s1.AuditID, s1.sectionDesc, s1.SectionOrder, s1.ParentID, s1.RootID, s.sectionid fuck, s.AuditID";
	if (isScoreCard) {
		query += " from sections s inner join sections  s1 on s.rootid = s1.sectionid where s1.AuditID = " + args.item.AuditID + " ) dt_sections";

	}else {
		query += " from sections s inner join sections  s1 on s.rootid = s1.sectionid where s1.AuditID = " + args.item.AuditID + " and s.AuditID = " + args.item.AuditID + " ) dt_sections";

	}
	if (isScoreCard) {
		query += " on q.sectionid = dt_sections.fuck ";
	} else {
		query += " on q.sectionid = dt_sections.fuck and q.AuditID = " + args.item.AuditID;
	}
	query += " group by dt_sections.sectionid  ";

	if(isScoreCard) {
		 query = "SELECT s1.* " + select + "FROM sections s1 " + "JOIN " + tableName + " q ON q.AuditID = s1.AuditID AND (q.SectionID = s.SectionID or q.SectionID = s1.SectionID) " + "LEFT JOIN sections s ON s.AuditID = s1.AuditID AND s1.SectionID = s.ParentID " + "WHERE s1.AuditID = " + args.item.AuditID + " AND s1.ParentID = 0 " + "group by s1.SectionID " + "ORDER BY s1.SectionOrder";

	}
	//Ti.API.Info(query);

try {
	Alloy.Collections.sections.fetch({
		query : query//"SELECT s1.* " + select + "FROM sections s1 " + "JOIN " + tableName + " q ON q.AuditID = s1.AuditID AND (q.SectionID = s.SectionID or q.SectionID = s1.SectionID) " + "LEFT JOIN sections s ON s.AuditID = s1.AuditID AND (s1.SectionID = s.ParentID or s1.ParentID = s.SectionID) " + "WHERE s1.AuditID = " + args.item.AuditID + " AND s1.ParentID = 0 " + "group by s1.SectionID " + "ORDER BY s1.SectionOrder"
	});
} catch (e) {
	//Ti.API.Info('error -> '+JSON.stringify(e));
}


	////Ti.API.Info("SELECT s1.* " + select + "FROM sections s1 " + "JOIN " + tableName + " q ON q.AuditID = s1.AuditID AND (q.SectionID = s.SectionID or q.SectionID = s1.SectionID) " + "LEFT JOIN sections s ON s.AuditID = s1.AuditID AND (s1.SectionID = s.ParentID or s1.ParentID = s.SectionID) " + "WHERE s1.AuditID = " + args.item.AuditID + " AND s1.ParentID = 0 " + "group by s1.SectionID " + "ORDER BY s1.SectionOrder");

}

refreshSections();

function transformFunction(model) {
	var transform = model.toJSON();
	if (isScoreCard) {
		return _.extend(transform, {
			subTitle : ''
		});
	}

	totalScore = model.getTotalScore(args.formPrams.auditRecordID);
	//Ti.API.Info('Total Score = ' + totalScore);
	totalWeight = model.getTotalWeight(args.formPrams.auditRecordID);
	//Ti.API.Info('Total Weight = ' + totalWeight);
	totalWeightTotal = model.getTotalWeightTotal(args.formPrams.auditRecordID);

	transform.weight = model.getWeight(args.formPrams.auditRecordID, true);

	//Ti.API.Info(' transform.weightTotal = ' + transform.weightTotal);

	//Ti.API.Info(' transform.weight = ' + transform.weight);

	transform.scorePercent = model.getScore(args.formPrams.auditRecordID, true, (transform.weight == transform.weightTotal));
	//Ti.API.Info('Total Weight total = ' + totalWeightTotal);
	totalScore = transform.scorePercent;

	transform.subTitle = transform.weight + ' / ' + transform.weightTotal + "        Finished: " + (((transform.weight / transform.weightTotal) || 0) * 100).toFixed(3) + " %       Score: " + totalScore + " %";
	return transform;
}

function resetNavBar() {
	// if(OS_IOS)
	// return;
	// var activity = Ti.Android.currentActivity;
	// // need to explicitly use getXYZ methods
	// var actionBar = activity.getActionBar();
	//
	// if (actionBar) {
	// // Now we can do stuff to the actionbar
	// actionBar.setTitle('iProductive');
	//
	// actionBar.setIcon('/images/appicon.png');
	//
	// activity.onCreateOptionsMenu = function(e) {
	// var menuItem = e.menu.add({
	// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	// icon : "/images/user.png"
	// });
	// menuItem.addEventListener("click", function(e) {
	// Ti.API.log('right button clicked');
	// var win = Ti.UI.createWindow({
	// title : 'Profile'
	// });
	// var profile = Alloy.createController('profile');
	// profile.on('logout', function() {
	// win.close();
	// });
	// win.add(profile.getView());
	// win.open();
	// });
	// };
	// activity.invalidateOptionsMenu();
	//
	// // show an angle bracket next to the home icon,
	// // indicating to users that the home icon is tappable
	// //actionBar.setDisplayHomeAsUp(true);
	//
	// // toggle the left window when the home icon is selected
	// // actionBar.onHomeIconItemSelected = function() {
	// // Ti.API.log('home button clicked');
	// // $.drawer.toggleLeftWindow();
	// // };
	// }
}

function reset() {
	var confirm = Ti.UI.createAlertDialog({
		title : 'Are you sure?',
		message : 'Reset auditing?',
		buttonNames : ['Reset', 'Cancel']
	});

	confirm.addEventListener('click', function(e) {
		switch (e.index) {
		case 0:
			var answersCollaction = Alloy.createCollection('answers');

			answersCollaction.on('fetch', function() {
				var model = answersCollaction.models[0];
				//Ti.API.Info("here loop count:" + model.get('count'));

				var myModel = Alloy.createModel('auditRecord');

				myModel.fetch({
					id : args.formPrams.auditRecordID
				});

				myModel.save({
					online_id : '',
				});
				Alloy.Collections.auditRecord.remove(myModel);

				Alloy.Globals.pageStack.close($.sections);

			});
			try {
				answersCollaction.fetch({
					query : "SELECT count(a.id) count, (SELECT count(at.id) FROM answers at WHERE at.AuditRecordID = a.AuditRecordID) total FROM answers a WHERE AuditRecordID = " + args.formPrams.auditRecordID + " AND length(AnswerDate) > 0"
				});
			} catch (e) {
				//Ti.API.Info('error -> '+JSON.stringify(e));
			}

			resetNavBar();

			//alert("Reset Clicked");
			break;
		case 1:

			// alert("Cancel Clicked");
			Alloy.Globals.pageStack.close($.sections);
			resetNavBar();
			// var answersCollaction = Alloy.createCollection('answers');
			//
			// answersCollaction.on('fetch', function() {
			// var model = answersCollaction.models[0];
			// //Ti.API.Info("here loop count:" + model.get('count'));
			//
			// if (model.get('count') < model.get('total') || model.get('count') == 0) {
			//
			// Ti.UI.createAlertDialog({
			// title : 'This Audit form NOT completed',
			// message : 'you have to complete the audit form to submit it.'
			// }).show();
			//
			// answersCollaction = null;
			// } else {
			// var myModel = Alloy.createModel('auditRecord');
			//
			// myModel.fetch({
			// id : args.formPrams.auditRecordID
			// });
			//
			// myModel.save({
			// submisiondDate : Alloy.Globals.getFullDate(),
			// submittedBy : Alloy.Globals.user.get('ldap_user')
			// });
			// Alloy.Collections.auditRecord.remove(myModel);
			//
			// Alloy.Globals.pageStack.close($.sections);
			// }
			//
			// });
			// answersCollaction.fetch({
			// query : "SELECT count(a.id) count, (SELECT count(at.id) FROM answers at WHERE at.AuditRecordID = a.AuditRecordID) total FROM answers a WHERE AuditRecordID = " + args.formPrams.auditRecordID + " AND length(AnswerDate) > 0"
			// });
			// resetNavBar();
			break;
		}
	});

	confirm.show();
}

function save() {
	var confirm = Ti.UI.createAlertDialog({
		title : 'Are you sure?',
		message : 'Do you want to exit this audit? You may continue later.',
		buttonNames : ['Save as a draft', 'Submit to server', 'Cancel']
	});

	confirm.addEventListener('click', function(e) {
		switch (e.index) {
		case 0:
		//Ti.API.Info('case 0 <============================');
			Alloy.Globals.pageStack.close($.sections);
			resetNavBar();
			break;
		case 1:
		//Ti.API.Info('case 1 <============================');
			var answersCollaction = Alloy.createCollection('answers');

			answersCollaction.on('fetch', function() {
				var model = answersCollaction.models[0];
				//Ti.API.Info("here loop count:" + model.get('count'));
				//Ti.API.Info("count = " + model.get('count') + " total= " + model.get('total'));
				//Ti.API.Info("the audit is " + args.item.AuditID);

				if (model.get('count') < model.get('total') || model.get('count') == 0) {

					Ti.UI.createAlertDialog({
						title : 'This audit has not yet been completed',
						message : 'Please answer all questions before submitting it to the server.'
					}).show();

					answersCollaction = null;
				} else {
					var myModel = Alloy.createModel('auditRecord');

					myModel.fetch({
						id : args.formPrams.auditRecordID
					});

					myModel.save({
						submisiondDate : Alloy.Globals.getFullDate(),
						submittedBy : Alloy.Globals.user.get('ldap_user')
					});
					Alloy.Collections.auditRecord.remove(myModel);

					Alloy.Globals.pageStack.close($.sections);

				}

			});
			try {
				answersCollaction.fetch({
					query : "SELECT count(a.id) count, (SELECT count(at.id) FROM answers at WHERE at.AuditRecordID = a.AuditRecordID) total FROM answers a WHERE AuditRecordID = " + args.formPrams.auditRecordID + " AND length(AnswerDate) > 0"
				});
			} catch (e) {
				//Ti.API.Info('error -> '+JSON.stringify(e));
			}
			updateCache();
			resetNavBar();
			break;
		}
	});

	confirm.show();
}

function close() {

	var confirm = Ti.UI.createAlertDialog({
		title : 'Are you sure?',
		message : 'Do you want to exit this audit? You may continue later.',
		buttonNames : ['No', 'Yes']
	});

	confirm.addEventListener('click', function(e) {
		if (e.index == 1) {
			//Ti.API.Info('case 1 <============================');
			updateCache();
			Alloy.Globals.pageStack.close($.sections);
			resetNavBar();
		}
	});

	confirm.show();
}

function updateCache() {
	cacheQuestions();
}


function cacheQuestions() {
	//Ti.API.Info('>>> in updateCache');
	var qCollaction = Alloy.createCollection('questions');
//Ti.API.Info('>>> in updateCache 2');

	// qCollaction.on('fetch', function() {
	// 	//Ti.API.Info('>>> in updateCache 3');
	// 	var totalQuestions = []
	// 	qCollaction.each(function(model) {
	// 		totalQuestions.push(model.toJSON());
	//
	//
	// 	});
	// 	//Ti.API.Info('/////////////qCollection to backup////////\n\n '+JSON.stringify(totalQuestions)+'\n\n////////////////////////');
	// 	cacheDraftsQuestions(totalQuestions);
	// });
	qCollaction.fetch({
		success: function(){
				//Ti.API.Info('>>> in updateCache 3');
				cacheDraftsQuestions(JSON.stringify(qCollaction.models));
				cacheSections();
				// var totalQuestions = [];
				// _.each(qCollaction.models, function(element, index, list){
				//     totalQuestions.push(element.toJSON());
				// });
				// //Ti.API.Info('/////////////qCollection to backup////////\n\n '+JSON.stringify(totalQuestions)+'\n\n////////////////////////');
				// cacheDraftsQuestions(totalQuestions);
		},
		error: function(){
				// something is wrong..
		}
});
}

function cacheSections() {
// cacheDraftsAudits(JSON.stringify(Alloy.Collections.auditRecord));
// //Ti.API.Info('trying to cache: ---> '+ JSON.stringify(Alloy.Collections.auditRecord));
var sCollaction = Alloy.createCollection('sections');
	sCollaction.fetch({
		success: function(){
				//Ti.API.Info('>>> in updateCache audits !!!!!!!<<<<<<<<<');
				cacheDraftsSections(JSON.stringify(sCollaction.models));
				cacheAnswers();
		},
		error: function(){
				// something is wrong..
		}
});
}

function cacheAnswers() {
	var sCollaction = Alloy.createCollection('answers');
		sCollaction.fetch({
			success: function(){
					cacheDraftsAnswers(JSON.stringify(sCollaction.models));
					cachAuditRecord();
			},
			error: function(){
					// something is wrong..
			}
	});
}

function cachAuditRecord() {
	var sCollaction = Alloy.createCollection('auditRecord');
		sCollaction.fetch({
			success: function(){
					cacheAuditRecord(JSON.stringify(sCollaction.models));
					cachAuditHistory();
			},
			error: function(){
					// something is wrong..
			}
	});
}

function cacheAuditRecord(auditRecords) {
	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
	if (usersData.filter(function(user){
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	}).length) {
		usersData.forEach(function(user, i){
			if (user.user == Ti.App.Properties.getString('lastLoginUser',"noUser")) {
				usersData[i].auditRecords = auditRecords;
			}
		});
	}
	Ti.App.Properties.setList("CachedDataByUser",usersData);
}

function cachAuditHistory() {
	var sCollaction = Alloy.createCollection('auditHistory');
		sCollaction.fetch({
			success: function(){
					cacheDraftAuditHistory(JSON.stringify(sCollaction.models));
			},
			error: function(){
					// something is wrong..
			}
	});
}

function cacheDraftAuditHistory(auditHistory) {
	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
	if (usersData.filter(function(user){
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	}).length) {
		usersData.forEach(function(user, i){
			if (user.user == Ti.App.Properties.getString('lastLoginUser',"noUser")) {
				usersData[i].auditHistory = auditHistory;
			}
		});
	}
	Ti.App.Properties.setList("CachedDataByUser",usersData);
}

//auditHistory
//auditRecord


function cacheDraftsAnswers(answers) {
	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
	if (usersData.filter(function(user){
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	}).length) {
		usersData.forEach(function(user, i){
			if (user.user == Ti.App.Properties.getString('lastLoginUser',"noUser")) {
				usersData[i].cachedAnswers = answers;
			}
		});
	}
	Ti.App.Properties.setList("CachedDataByUser",usersData);
}

function cacheDraftsSections(sections) {

	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
	if (usersData.filter(function(user){
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	}).length) {
		usersData.forEach(function(user, i){
			if (user.user == Ti.App.Properties.getString('lastLoginUser',"noUser")) {
				usersData[i].cachedSections = sections;
			}
		});
	}
  Ti.App.Properties.setList("CachedDataByUser",usersData);
}


function cacheDraftsQuestions(questions) {

	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
	if (usersData.filter(function(user){
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	}).length) {
		usersData.forEach(function(user, i){
			if (user.user == Ti.App.Properties.getString('lastLoginUser',"noUser")) {
				usersData[i].cachedDraftsQuestions = questions;
			}
		});
	}
  Ti.App.Properties.setList("CachedDataByUser",usersData);


  // var usersData = Ti.App.Properties.getList("CachedDataByUser",[]).filter(function(user){
	// 	return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	// });
  //
  // if (usersData.length) {
  //   usersData[0].cachedDraftsQuestions = questions
  // }

}

if (!args.notEditable) {

	if (OS_ANDROID) {
		Alloy.Globals.activeView = 1;
		Alloy.Globals.saveSections = save;
		Alloy.Globals.backSections = close;
		Alloy.Globals.activity.invalidateOptionsMenu();
	}

	if (OS_IOS) {
		var saveBtn = Ti.UI.createButton({
			image : '/images/icons/save.png'
		});
		saveBtn.addEventListener('click', save);
		$.sections.setRightNavButton(saveBtn);

		var closeBtn = Ti.UI.createButton({
			image : '/images/icons/back.png'
		});
		closeBtn.addEventListener('click', close);
		$.sections.setLeftNavButton(closeBtn);
	} else {

		setAndroidNav();
	}
} else {

	if (args.isHistory) {
		if (OS_ANDROID) {
			Alloy.Globals.activeView = 1;
			Alloy.Globals.saveSections = reset;
			Alloy.Globals.activity.invalidateOptionsMenu();
		}

		if (OS_IOS) {
			var saveBtn = Ti.UI.createButton({
				image : '/images/icons/save.png'
			});
			saveBtn.addEventListener('click', reset);
			$.sections.setRightNavButton(saveBtn);

			// var closeBtn = Ti.UI.createButton({
			// image:'/images/icons/back.png'
			// });
			// closeBtn.addEventListener('click', close);
			// $.sections.setLeftNavButton(closeBtn);
		}
	}

	$.Comment.setEditable(false);

}

$.sections.addEventListener("close", function() {
	if (args.isIncomplete) {
		args.isIncomplete();
	}
	$.destroy();

	if (OS_ANDROID) {
		Alloy.Globals.activeView = 0;
		Alloy.Globals.saveButton = undefined;
		Alloy.Globals.activity.invalidateOptionsMenu();
	}
});

function setAndroidNav() {

	// var activity = Ti.Android.currentActivity;
	// // need to explicitly use getXYZ methods
	// var actionBar = activity.getActionBar();
	//
	// if (actionBar) {
	// // Now we can do stuff to the actionbar
	// actionBar.setTitle('iProductive');
	//
	// actionBar.setIcon('/images/appicon.png');
	//
	// activity.onCreateOptionsMenu = function(e) {
	// var menuItem2 = e.menu.add({
	// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	// icon : "/images/icons/back.png"
	// });
	// menuItem2.addEventListener("click", close);
	//
	// var menuItem = e.menu.add({
	// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	// icon : "/images/icons/save.png"
	// });
	// menuItem.addEventListener("click", save);
	//
	//
	// };
	// activity.invalidateOptionsMenu();
	//
	// // show an angle bracket next to the home icon,
	// // indicating to users that the home icon is tappable
	// //actionBar.setDisplayHomeAsUp(true);
	//
	// // toggle the left window when the home icon is selected
	// // actionBar.onHomeIconItemSelected = function() {
	// // Ti.API.log('home button clicked');
	// // $.drawer.toggleLeftWindow();
	// // };
	// }
}

//Ti.API.Info('\n\n\n\n>>>>>>>>>>>>>>>>> is In sections <<<<<<<<<<<<<<< \n\n\n\n');


function openComment(e) {

	//$.Score.text = totalScore;
	if (OS_IOS) {

		$.Comment.setSuppressReturn(false);
		$.Comment.setReturnKeyType(Ti.UI.RETURNKEY_DEFAULT);
		$.sections.add($.answersLayer);
		$.answersLayer.animate({
			opacity : 1
		});
	} else {
		$.sections.add($.answersLayer);
		$.answersLayer.animate({
			opacity : 1
		});
	}

	$.Score.text = totalWeight + ' / ' + totalWeightTotal + "        Finished: " + (((totalWeight / totalWeightTotal) || 0) * 100).toFixed(3) + " %       Score: " + totalScore + " %";
	//$.Comment.setValue(args.formPrams.comment);
	//alert(args.formPrams.comment);

	var auditRecordModel = Alloy.createModel('auditRecord');

	auditRecordModel.fetch({
		id : args.formPrams.auditRecordID
	});

	$.Comment.setValue(auditRecordModel.get("comment"));

}

function hideanswerLayer(e) {

	$.answersLayer.setOpacity(0);
	// TO DO Remove view form window
	var auditRecordModel = Alloy.createModel('auditRecord');

	auditRecordModel.fetch({
		id : args.formPrams.auditRecordID
	});

	$.Comment.setValue(auditRecordModel.get("comment"));

	$.sections.remove($.answersLayer);

}

function saveComment(e) {

	var auditRecordModel = Alloy.createModel('auditRecord');

	auditRecordModel.fetch({
		id : args.formPrams.auditRecordID
	});
	//Ti.API.error(args.formPrams.auditRecordID + $.Comment.getValue() + auditRecordModel.length);
	auditRecordModel.save({
		comment : $.Comment.getValue()
	});
	hideanswerLayer();

}
