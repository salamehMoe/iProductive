exports.definition = {
	config : {
		columns : {
			"AnswerID" : "INTEGER PRIMARY KEY",
			"QuestionID" : "INTEGER",
			"Answer" : "TEXT",
			"Value" : "INTEGER",
			"Weight" : "INTEGER"
		},
		adapter : {
			type : "sql",
			collection_name : "questions_answers_scorecard",
			idAttribute : "AnswerID"
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
