exports.definition = {
	config : {
		columns : {
			"QuestionID" : "INTEGER PRIMARY KEY",
			"AuditID" : "INTEGER",
			"SectionID" : "INTEGER",
			"QuestionDesc" : "TEXT"
		},
		adapter : {
			type : "sql",
			collection_name : "questions_scorecard",
			idAttribute : "QuestionID"
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
