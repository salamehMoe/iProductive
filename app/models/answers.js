exports.definition = {
	config : {
		columns : {
			"id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
			"AuditRecordID" : "INTEGER",
			"QuestionID" : "INTEGER",
			"AnswerID" : "INTEGER",
			"Answerstring" : "TEXT",
			"Answervalue" : "INTEGER",
			"QuestionValue" : "INTEGER",
			"Qweight":"INTEGER",
			"AnswerDate" : "TEXT",
			"Comment" : "TEXT",
			"Image" : "BLOB",
			"Image1" : "BLOB",
			"uploaded_date" : "TEXT"
		},
		adapter : {
			type : "sql",
			collection_name : "answers",
			idAttribute : "id"
		},
		defaults : {
			AnswerDate : ''
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
}; 