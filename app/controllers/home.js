function loaded() {
	//Ti.API.Info('>>>>>>>>>>> WE ARE HOME <<<<<<<<<<<<<');
	// tasks
	if(Alloy.Globals.user) {
		if (Alloy.Globals.user.get('HasTaskList') == 1) {
			var tasksData = {};
			if (_.isEmpty( tasksData = Alloy.Collections.tasks_completed.dashBoard())) {
				tasksData = false;

				Ti.App.addEventListener("html:openSync", function() {
					Alloy.Globals.pageStack.open(Alloy.createController('synchronization').getView(), true);
				});
			}

			Ti.App.fireEvent("App:drawTasksDashboard", {
				tasksData : tasksData,
				isiPad : Alloy.Globals.isiPad,
				HasTaskList : Alloy.Globals.user.get('HasTaskList')
			});
		}
	}
	// audit
	//By hassanisipad
	//if (Alloy.Globals.isiPad) {
	if (Alloy.Globals.isiPad||Alloy.Globals.isTablet) {
		Alloy.Collections.auditRecord.dashBoard(function(auditData) {
			Ti.App.fireEvent("App:drawAuditDashboard", {
				auditData : auditData,
				isiPad : Alloy.Globals.isiPad
			});
		});
	}
};
