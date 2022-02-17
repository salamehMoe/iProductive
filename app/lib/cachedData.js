function loadCacheIfAvailable(callback) {
//Ti.API.Info('\n\n###############\n\ncached data: \n\n'+JSON.stringify(Ti.App.Properties.getList("CachedDataByUser",[]))+"\n\n##############\n\n");
	if (Ti.App.Properties.getList("CachedDataByUser",[]).filter(function(user) {
		//Ti.API.Info('######\nuser.user = '+user.user+"\n###### Ti.App.Properties.getString('lastLoginUser','noUser') = "+Ti.App.Properties.getString('lastLoginUser',"noUser")+"\n#######");
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	}).length) {

		loadUserData();
		getQuestionAnswers();
		donwloadAuditData();
		donwloadScoreCardData();
		donwloadTaskData();
		uploadAuditData();
		uploadTaskData();
		getBackCachedQuestions();
		getBackCachedSections();
		getBackCachedAnswers();
		getBackCachedAuditHistory();
		getBackCachedAuditRecords();
		callback();
	}
}


function getBackCachedAnswers() {
	///////////
	var usersData = Ti.App.Properties.getList("CachedDataByUser", []).filter(function(user) {
		return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
	});
	if (usersData.length) {
		//var myData = usersData[0].cachedDraftsAudits;
		//Ti.API.Info('is there audit draft data?');
		if(usersData[0].cachedAnswers){
			var myData = usersData[0].cachedAnswers;
			if(myData){
				myData = JSON.parse(myData);
				var aCollaction = Alloy.createCollection('answers');
				aCollaction.reset(myData);
			}
		}

	}
	///////////
}

function getBackCachedAuditHistory() {
	///////////
	var usersData = Ti.App.Properties.getList("CachedDataByUser", []).filter(function(user) {
		return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
	});
	if (usersData.length) {
		//var myData = usersData[0].cachedDraftsAudits;
		//Ti.API.Info('is there audit draft data?');
		if(usersData[0].auditHistory){
			var myData = usersData[0].auditHistory;
			if(myData){
				myData = JSON.parse(myData);
				var aCollaction = Alloy.createCollection('auditHistory');
				aCollaction.reset(myData);
			}
		}

	}
	///////////
}

function getBackCachedAuditRecords() {
	///////////
	var usersData = Ti.App.Properties.getList("CachedDataByUser", []).filter(function(user) {
		return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
	});
	if (usersData.length) {
		//var myData = usersData[0].cachedDraftsAudits;
		//Ti.API.Info('is there audit draft data?');
		if(usersData[0].auditRecords){
			var myData = usersData[0].auditRecords;
			if(myData){
				myData = JSON.parse(myData);
				var aCollaction = Alloy.createCollection('auditRecord');
				aCollaction.reset(myData);
			}
		}

	}
	///////////
}

function getBackCachedSections() {
	///////////
	var usersData = Ti.App.Properties.getList("CachedDataByUser", []).filter(function(user) {
		return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
	});
	if (usersData.length) {
		//var myData = usersData[0].cachedDraftsAudits;
		//Ti.API.Info('is there audit draft data?');
		if(usersData[0].cachedSections){
			var myData = usersData[0].cachedSections;
			if(myData){
				myData = JSON.parse(myData);
				var aCollaction = Alloy.createCollection('sections');
				aCollaction.reset(myData);
			}
		}

	}
	///////////

}

function getBackCachedQuestions() {
	///////////
	var usersData = Ti.App.Properties.getList("CachedDataByUser", []).filter(function(user) {
		return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
	});
	if (usersData.length) {
		var myData = usersData[0].cachedDraftsQuestions;
		if(myData){
			myData = JSON.parse(myData);
			var qCollaction = Alloy.createCollection('questions');
			qCollaction.reset(myData);
		}
	}
	///////////
}

function loadUserData() {
	//Ti.API.Info('############\n\n\n>>>>>>>>>>> loadUserData\n\n\n##############');
	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]).filter(function(user){
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	});
	if (usersData.length) {
		var user = usersData[0].userData;
		Alloy.Globals.user = Alloy.createModel('user', {
			id : user.ldap_user
		});
		Alloy.Globals.user.save(user);

		Alloy.Models.user.fetch({
			id : Alloy.Globals.user.get('ldap_user')
		});
	}
}

function getData(methodName, prams, onLoad, onError, multipart) {
	//Ti.API.Info('############\n\n\n>>>>>>>>>>> getData, method: '+methodName+'\n\n\n##############');
	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]).filter(function(user){
		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
	});

	if (usersData.length) {
		usersData[0].methods.forEach(function(method, i){
			if (method.name == methodName) {
				// var x2jsMod = require('xml2json');
				// var x2js = new x2jsMod();
				method.self.responseXML = Ti.XML.parseString(method.self.responseText);
				onLoad(method.self);
			}
		});
	}
}

var donwloadAuditData = function() {
//Ti.API.Info('############\n\n\n>>>>>>>>>>> downloadAuditData\n\n\n##############');
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

		//Ti.API.Info('>>>>>> HERE TO SAVE STORES');
		// blog posts are in nodes named "item"
		var xml = This.responseXML.documentElement;
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


	});

	getData("LP_GetAuditTemplates", {}, function(This) {

		// mark all templates as deleted
		//Alloy.Collections.templates.markAsDeleted(1);




		// blog posts are in nodes named "item"
		var xml = This.responseXML.documentElement;
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
				// blog posts are in nodes named "item"
				var xml = This.responseXML.documentElement;
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




				// blog posts are in nodes named "item"
				var xml = This.responseXML.documentElement;
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


			});
		}



	});
	// } else {
	// stores
	getData("SVM_GetUserStores", {}, function(This) {




		// blog posts are in nodes named "item"
		var xml = This.responseXML.documentElement;
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

	});

	getData("SVM_GetAuditTemplates", {}, function(This) {

		// mark all templates as deleted
		//Alloy.Collections.templates.markAsDeleted(1);




		// blog posts are in nodes named "item"
		var xml = This.responseXML.documentElement;
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




				// blog posts are in nodes named "item"
				var xml = This.responseXML.documentElement;
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

				// blog posts are in nodes named "item"
				var xml = This.responseXML.documentElement;
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
			});
		}



	});
	// }

};

var getQuestionAnswers = function(AuditID, StoreCode) {
//Ti.API.Info('############\n\n\n>>>>>>>>>>> getQuestionAnswers\n\n\n##############');
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

				// blog posts are in nodes named "item"
				var xml = This.responseXML.documentElement;
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
	//Ti.API.Info('error -> '+JSON.stringify(e));
}


};

var donwloadScoreCardData = function() {
//Ti.API.Info('############\n\n\n>>>>>>>>>>> downloadScoreCardData\n\n\n##############');

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

		// blog posts are in nodes named "item"
		var xml = This.responseXML.documentElement;
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
	});

	getData("ScoreCard_GetAuditTemplates", {}, function(This) {

		// mark all templates as deleted
		//Alloy.Collections.templates.markAsDeleted(2);


		// blog posts are in nodes named "item"
		var xml = This.responseXML.documentElement;
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




				// blog posts are in nodes named "item"
				var xml = This.responseXML.documentElement;
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
		}


	});

};

var donwloadTaskData = function() {
//Ti.API.Info('############\n\n\n>>>>>>>>>>> downloadTaskData\n\n\n##############');

	// some definations
	var rowsIndex = {
		'department' : 0,
		'tasks' : 1
	};

	// get departments
	getData("CheckList_GetUserDepts", {}, function(This) {

		// items are in nodes named "Table1"
		var xml = This.responseXML.documentElement;
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




			// items are in nodes named "Table1"
			var xml = This.responseXML.documentElement;
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


			// update task list
			// Alloy.Collections.tasks.fetch({
			// 	query : "SELECT TaskName, TaskID FROM tasks GROUP BY TaskID ORDER BY TaskOrder"
			// });
		});
	});

};

var uploadAuditData = function() {
//Ti.API.Info('############\n\n\n>>>>>>>>>>> uploadAuditData\n\n\n##############');
	// if (Alloy.Collections.auditRecord.length == 0) {
	// 	return;
	// }



	// if (Alloy.Globals.HasLP) {
	// get departments
	getData("LP_GetUserDepts", {}, function(This) {



		// items are in nodes named "Table1"
		var xml = This.responseXML.documentElement;
		var items = xml.getElementsByTagName("Table1");
		//Ti.API.Info("line 462 "+JSON.stringify(items));
		if(items.item(0) == null){
				return;
		}
		var department = items.item(0).getElementsByTagName("DeptCode").item(0).text;

		if (!department) {
			return;
		}

		var x2jsMod = require('xml2json');
		var x2js = new x2jsMod();
		Alloy.Collections.auditRecord.each(function(model, collectionIndex) {


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
									// function(This)
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
					try {
						answersCollaction.fetch({
							query : "SELECT * from answers WHERE AuditRecordID = " + model.get('id')
						});
					} catch (e) {
						//Ti.API.Info('error -> '+JSON.stringify(e));
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
					//Ti.API.Info('error -> '+JSON.stringify(e));
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



		});
	});
	// } else {
	// get departments
	getData("SVM_GetUserDepts", {}, function(This) {



		// items are in nodes named "Table1"
		var xml = This.responseXML.documentElement;
		var items = xml.getElementsByTagName("Table1");
		//Ti.API.Info("line 810");

		if(items.item(0) == null){
				return;
		}
		var department = items.item(0).getElementsByTagName("DeptCode").item(0).text;

		if (!department) {
			return;
		}

		var x2jsMod = require('xml2json');
		var x2js = new x2jsMod();
		Alloy.Collections.auditRecord.each(function(model, collectionIndex) {


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
					try {
						answersCollaction.fetch({
							query : "SELECT * from answers WHERE AuditRecordID = " + model.get('id')
						});
					} catch (e) {
						//Ti.API.Info('error -> '+JSON.stringify(e));
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
					//Ti.API.Info('error -> '+JSON.stringify(e));
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



		});
	});
	// }

};

var uploadTaskData = function() {
//Ti.API.Info('############\n\n\n>>>>>>>>>>> uploadTaskData\n\n\n##############');


//Ti.API.Info('step 1..');
	// get un-uploaded tasks, group them into lists
	var lists = {};
//Ti.API.Info('step 2..');
	var tasksCompletedCollaction = Alloy.createCollection('tasks_completed');
	//Ti.API.Info('step 3..');
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
//Ti.API.Info('step 4..');
try {
	//Ti.API.Info('attempting the sql query..');
	tasksCompletedCollaction.fetch({
		query : "SELECT tc.id, t.TaskID, t.TaskName, count(*) completed, tc.CompletedDate, strftime('%Y-%m-%d', tc.CompletedDate) day, strftime('%Y-w%W', tc.CompletedDate) week, strftime('%Y-m%m', tc.CompletedDate) month, strftime('%Y', tc.CompletedDate) year, (cast(strftime('%m', tc.CompletedDate) as integer) + 2) / 3 as quarter FROM tasks t JOIN tasks_completed tc ON t.TaskQuestionID = tc.TaskQuestionID WHERE tc.taskRecord IS NULL GROUP BY tc.id ORDER BY t.TaskID, tc.CompletedDate"
	});
} catch (e) {
	//Ti.API.Info('Error -->'+JSON.stringify(e));
}

//Ti.API.Info('step 5..');
	// get departments
	getData("CheckList_GetUserDepts", {}, function(This) {

		// items are in nodes named "Table1"
		var xml = This.responseXML.documentElement;
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
		});

	});
};

exports.loadCacheIfAvailable = loadCacheIfAvailable;
