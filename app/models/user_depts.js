exports.definition = {
	config : {
		columns : {
			"DeptCode" : "TEXT PRIMARY KEY",
			"DeptName" : "TEXT"
		},
		adapter : {
			type : "sql",
			collection_name : "user_depts",
			idAttribute : "DeptCode"
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
