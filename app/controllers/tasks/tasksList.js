// Get section ID
// "1"  "Before The Opening" Notification at 9
// "2"  "After the store opening" Notifcation at 11
// "3"  "Throughout the day" Notification at 16
// "5"  "Re-opening" Notification at 17
// "6"  "Before leaving" Notification at 18:30

// Get task ID
// 2   Weekly Notifiaction on day of the week 5
// 3   Monthly Notification on day of the month 23
// 4   Semester notification I don't care do this one later
// 5   YEARLY notification on 01/11/

//Titanium.Media.vibrate();
//Add this so Titanium will add the permissions and links needed to play sounds
//var sound = Titanium.Media.createSound();
var alarmManager;

if (!OS_IOS) {
  var alarmModule = require('bencoding.alarmmanager');
  alarmManager = alarmModule.createAlarmManager();
}
checkIncompleteTasks();

function checkIncompleteTasks() {
  var tasksModel = Alloy.createModel('tasks');

  var beforeOpeningTasksNum = tasksModel.getDaily("1");
  if (beforeOpeningTasksNum > 0) {
    scheduleNotification('daily', 9, 0);
  }

  var afterStoreOpeningNum = tasksModel.getDaily("2");
  if (afterStoreOpeningNum > 0) {
    scheduleNotification('daily', 11, 0);
  }

  var throughoutTheDayTasksNum = tasksModel.getDaily("3");
  if (throughoutTheDayTasksNum > 0) {
    scheduleNotification('daily', 16, 0);
    //4:00 PM
  }

  var reopeningTasksNum = tasksModel.getDaily("4");
  if (reopeningTasksNum > 0) {
    scheduleNotification('daily', 17, 0);
    //5:00 PM
  }

  var beforeLeavingTasksNum = tasksModel.getDaily("5");
  if (beforeLeavingTasksNum > 0) {
    scheduleNotification('daily', 18, 30);
    //6:30 PM
  }

  var weeklyTasksNum = tasksModel.getUncompletedTasks("2");
  if (weeklyTasksNum > 0) {
    scheduleNotification('weekly', 9, 0);
    //weekly
  }

  var monthlyTasksNum = tasksModel.getUncompletedTasks("3");
  if (monthlyTasksNum > 0) {
    scheduleNotification('monthly', 9, 0);
    //monthly
  }

  var semesterTasksNum = tasksModel.getUncompletedTasks("4");
  if (semesterTasksNum > 0) {
    scheduleNotification('semester', 9, 0);
    //semester
  }

  var yearlyTasksNum = tasksModel.getUncompletedTasks("5");
  if (yearlyTasksNum > 0) {
    scheduleNotification('yearly', 9, 0);
    //yearly
  }

}



function scheduleNotification(type, hours, minutes) {
  var today = new Date();
  var date2 = new Date();
  var x = new Date();
  var currentTimeZoneOffsetInHours = x.getTimezoneOffset();
  //alert(currentTimeZoneOffsetInHours);
  var requestCode = 40;
  switch (type.toLowerCase()) {
    case 'yearly':
      date2.setFullYear(today.getFullYear() + 1);
      requestCode = 46;
      break;
    case 'semester':
      date2.setMonth(today.getMonth() + 6 * 1);
      requestCode = 45;
      break;
    case 'quarterly':
      date2.setMonth(today.getMonth() + 3 * 1);
      requestCode = 44;
      break;
    case 'monthly':
      date2.setMonth(today.getMonth() + 1);
      requestCode = 43;
      break;
    case 'weekly':
      date2.setDate(today.getDate() + 7 * 1);
      requestCode = 42;
      break;
    case 'daily':
      //var hoursDif = today.getHours()-hours;

      date2.setDate(today.getDate());
      requestCode = 41 + hours;
      break;
    default:
      date2 = undefined;
      break;
  }
  date2.setHours(hours);
  //+((currentTimeZoneOffsetInHours*-1)/60));
  date2.setMinutes(minutes);
	date2.setSeconds(0);
  date2.setMilliseconds(0);

  //Ti.API.Info("type, " + type + " hours, " + hours + " minutes " + minutes + " date2 =" + JSON.stringify(date2));
  // var timeDiff = Math.abs(date2.getTime() - today.getTime());
  // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  // alert("timeDiff = "+timeDiff);
  // alert("days = "+diffDays);
  notify('Incompleted High Priority Tasks', 'You have incompleted High Priority Tasks', date2, requestCode);
}

function notify(androidTitle, displayText, date, requestCode) {
  //Ti.API.Info("notify on " + JSON.stringify(date));
  if (OS_IOS) {

    var notification = Ti.App.iOS.scheduleLocalNotification({
      userInfo: {
        "id": "" + requestCode
      },
      alertAction: "update", // or 'Update' instead of 'Open' in the alert dialog
      alertBody: displayText, // Alert will display the following message
      //badge: -1,// The badge value in the icon will be changed to 1
      date: date,
    });
  } else {
    //Import our module into our Titanium App
    //var requestCode = requestCode;

    //Ti.API.Info("requestcode: " + requestCode.toString());
    //Set an Alarm to publish a notification in about two minutes and repeat each minute
    alarmManager.addAlarmNotification({
      requestCode: requestCode,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(), //Set the number of minutes until the alarm should go off
      contentTitle: androidTitle, //Set the title of the Notification that will appear
      contentText: displayText,
      playSound: true, //On notification play the default sound ( by default off )
      vibrate: true, //On notification vibrate device ( by default off )
      showLights: true,
      icon: Ti.App.Android.R.drawable.appicon //Set the body of the notification that will apear
      //sound: Ti.Filesystem.getResRawDirectory() + 'alarm', //Set a custom sound to play, located at: platform/android/res/raw/alarm.mp3
      //repeat:60000 //You can use the words hourly,daily,weekly,monthly,yearly or you can provide milliseconds.
      //Or as shown above you can provide the millesecond value
    });
    // var notification = Titanium.Android.createNotification({
    // contentTitle: androidTitle,
    // contentText : displayText,
    // contentIntent: Ti.Android.createPendingIntent({
    // intent: Ti.Android.createIntent({}),
    // activity : Ti.Android.currentActivity,
    // }),
    // //icon: Ti.App.Android.R.drawable.warn,
    // number: 1,
    // when: date,
    // });
    // Ti.Android.NotificationManager.notify(1, notification);
  }
}

var args = arguments[0] || {},
  items,
  filterByCompleted = false;

if (OS_IOS) {
  $.tasks_list.setTitle(args.windowTitle);
}

var secsCollaction = Alloy.createCollection('tasks');

secsCollaction.on('fetch', function() {
  var sections = [];
  secsCollaction.each(function(model) {

    Ti.API.error(model.get('SectionDesc'));

    sections.push(Alloy.createController('tasks/tasks_sections', {
      SectionID: model.get('SectionID'),
      TaskID: args.res,
      SectionDesc: model.get('SectionDesc'),
      filterByCompleted: filterByCompleted

    }).getView());

  });

  $.list.setSections(sections);

});

// limit the time
try {
  secsCollaction.fetch({
    query: "select SectionID,SectionDesc from tasks where TaskID=" + args.res + " group by SectionID "
  });
} catch (e) {
  //Ti.API.Info('error -> '+JSON.stringify(e));
}

function showHideCompleted(e) {
  if (e.source.title == "Show completed") {
    e.source.setTitle("Hide Completed");
    filterByCompleted = false;

  } else {
    e.source.setTitle("Show completed");
    filterByCompleted = true;
  }
  try {
    secsCollaction.fetch({
      query: "select SectionID,SectionDesc from tasks where TaskID=" + args.res + " group by SectionID "
    });
  } catch (e) {
    //Ti.API.Info('error -> '+JSON.stringify(e));
  }


}

/*
 var taskClicked = function(e) {

 //Ti.API.Info(JSON.stringify(e));

 var item = e.section.getItemAt(e.itemIndex);

 var taskModel = Alloy.createModel('tasks_completed');

 if (item.completedId) {// so delete the task
 taskModel.fetch({
 id : item.completedId
 });
 taskModel.destroy();

 item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
 item.status.image = "/images/noDone.png";
 item.completedId = null;

 } else {
 taskModel.save({
 CompletedDate : Alloy.Globals.getFullDate(),
 TaskQuestionID : item.properties.TaskQuestionID
 });
 //item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
 item.status.image = "/images/done.png";
 item.completedId = taskModel.get('id');

 }

 e.section.updateItemAt(e.itemIndex, item);

 };*/

function swipeOnTask(e) {

  var item = e.section.getItemAt(e.itemIndex);

  var taskModel = Alloy.createModel('tasks_completed');

  if (item.completedId) { // so delete the task
    taskModel.fetch({
      id: item.completedId
    });
    taskModel.destroy();
    item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
    item.doneMark.visible = false;

    item.completedId = null;

  } else {
    taskModel.save({
      CompletedDate: Alloy.Globals.getFullDate(),
      TaskQuestionID: item.properties.TaskQuestionID
    });
    item.doneMark.visible = true;
    item.completedId = taskModel.get('id');
    //e.section.updateItemAt(e.itemIndex, item);

  }

  /*setTimeout(function() {
   item.properties.height = 0;
   item.properties.top = -80;
   item.properties.searchableText = null;

   e.section.updateItemAt(e.itemIndex, item);
   }, $.completedTasks.getTitle() == "Completed" ? 5000 : 600);*/

  e.section.updateItemAt(e.itemIndex, item);

  if (OS_IOS) {
    Ti.App.iOS.cancelLocalNotification("50");
    Ti.App.iOS.cancelLocalNotification("52");
    Ti.App.iOS.cancelLocalNotification("57");
    Ti.App.iOS.cancelLocalNotification("58");
    Ti.App.iOS.cancelLocalNotification("59");
    Ti.App.iOS.cancelLocalNotification("42");
    Ti.App.iOS.cancelLocalNotification("43");
    Ti.App.iOS.cancelLocalNotification("44");
    Ti.App.iOS.cancelLocalNotification("45");
    Ti.App.iOS.cancelLocalNotification("46");
    checkIncompleteTasks();

  } else {

    alarmManager.cancelAlarmNotification(50);
    alarmManager.cancelAlarmNotification(52);
    alarmManager.cancelAlarmNotification(57);
    alarmManager.cancelAlarmNotification(58);
    alarmManager.cancelAlarmNotification(59);
    alarmManager.cancelAlarmNotification(42);
    alarmManager.cancelAlarmNotification(43);
    alarmManager.cancelAlarmNotification(44);
    alarmManager.cancelAlarmNotification(45);
    alarmManager.cancelAlarmNotification(46);
    checkIncompleteTasks();

  }

}

$.tasks_list.addEventListener("close", function() {
  $.destroy();
});
