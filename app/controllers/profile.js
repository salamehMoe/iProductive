$.versionCode.value = "iProductive V"+Titanium.App.version;
function logOut() {

	$.alertDialog.addEventListener('click', function(e) {

		if (e.index == 0) {
			//Alloy.Models.user.destory();
			//deleteData();
			Ti.App.fireEvent('logout');
			if (!OS_IOS) {
				$.trigger('logout');
			}
			if (Alloy.Globals.drawer != undefined) {
				Alloy.Globals.drawer.close();
			}
		}
	});

	$.alertDialog.show();
	if (OS_IOS) {
		Alloy.Globals.drawerToggleRighttWindow();
	}
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

function save() {

	Alloy.Models.user.save({
		ForceSync : [true, 'true', 1, '1'].indexOf($.ForceSync.getValue()) != -1 ? 1 : 0
	});
	if (OS_IOS) {
		Alloy.Globals.drawerToggleRighttWindow();
	} else {
		$.trigger('logout');
	}
	Alloy.Models.user.fetch({
		id : Alloy.Globals.user.get('ldap_user')
	});
}


var showWeekPopover = function(e) {
 if(Alloy.Globals.isiPad){
  $.weekPopoverWin.title = e.source.popOverTitle;
 }
 $.weekPopover.show({
  view : $[e.source.ref]
 });
 $.weekPopover.ref = e.source.ref;
};

var selectWeek = function(e) {

 var index = e.hasOwnProperty('itemIndex') ? e.itemIndex : e.index;

 if (OS_IOS && e.cancel == index) {
  return;
 }

 // show the name of day and save number of day
 Alloy.Models.user.set($.weekPopover.ref, index + 1);

 $.weekPopover.hide();
};

var showDatePopover = function(e) {
	return false;
	$.datePopover.show({
		view : $[e.source.ref]
	});

	$.datePopover.ref = e.source.ref;
};

var selectDate = function(e) {
	Alloy.Models.user.set($.datePopover.ref, e.value.getFullYear() + "-" + (e.value.getMonth() + 1) + "-" + e.value.getDate());
	$.datePopover.hide();
};

// update model data
Alloy.Models.user.fetch({
	id : Alloy.Globals.user.get('ldap_user')
});

// Update day strings on update day number
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Alloy.Models.user.on('change:startOfWeek', function(e) {
	Alloy.Models.user.set('startOfWeekStr', days[Alloy.Models.user.get('startOfWeek') - 1]);
});

Alloy.Models.user.on('change:endOfWeek', function(e) {
	Alloy.Models.user.set('endOfWeekStr', days[Alloy.Models.user.get('endOfWeek') - 1]);
});

Alloy.Models.user.on('change:EnableSync', function(e) {
	Alloy.Models.user.set('EnableSyncBool', Alloy.Models.user.get('EnableSync') == 1);
});

Alloy.Models.user.on('change:ForceSync', function(e) {
	Alloy.Models.user.set('ForceSyncBool', Alloy.Models.user.get('ForceSync') == 1);
});

// Show initial values for strings
Alloy.Models.user.trigger('change:startOfWeek');
Alloy.Models.user.trigger('change:endOfWeek');
Alloy.Models.user.trigger('change:EnableSync');
Alloy.Models.user.trigger('change:ForceSync');
