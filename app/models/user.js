exports.definition = {
	config : {
		columns : {
			"ldap_user" : "TEXT PRIMARY KEY",
			"domain" : "TEXT",
			"Username" : "TEXT",
			"startOfWeek" : "INTEGER",
			"endOfWeek" : "INTEGER",
			"endOfMonth" : "TEXT",
			"endOfQuarter" : "TEXT",
			"endOfSemester" : "TEXT",
			"endOfYear" : "TEXT",
			"Password" : "TEXT",
			"ForceSync" : "INTEGER",
			"EnableSync" : "INTEGER",
			"WeeklyReminderDay" : "INTEGER",
			"MonthlyReminderDay" : "INTEGER",
			"SemesterReminderDay" : "INTEGER",
			"YearlyReminderDay" : "INTEGER",
			"LastSyncDate" : "TEXT",
			"HasTaskList" : "INTEGER",
			"HasLP": "INTEGER",
		},
		adapter : {
			type : "sql",
			collection_name : "user",
			idAttribute : "ldap_user"
		},
		defaults : {
			startOfWeek : 1,
			endOfWeek : 5,
			endOfMonth : 'Last day of each month',
			endOfQuarter : 'Every 3 months',
			endOfSemester : 'Every 6 months',
			endOfYear : 'End of each year',
			
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
