var args = arguments[0] || {},filterByCompletedQuery;

$.titleLbl.setText(args.SectionDesc);

var taskCollaction = Alloy.createCollection('tasks');

taskCollaction.on('fetch', function() {
    var rows = [];

    taskCollaction.each(function(model) {

        // var height = 75;

        if (Alloy.isHandheld && model.get('QuestionDesc').length > 50) {
            // height = model.get('QuestionDesc').length * 1.6;
        }

        rows.push({
            properties : _.extend(model.toJSON(), {
                TaskQuestionID : model.get('tTaskQuestionID'),
                //accessoryType : model.get('CompletedDate') == null ? Ti.UI.LIST_ACCESSORY_TYPE_NONE : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK,
                searchableText : model.get('QuestionDesc'),
                //height : height
            }),
            status : {
                image : "/images/noDone.png"
            },
            taskTitle : {
                text : model.get('QuestionDesc')
            },
            //PriorityCode
            taskDesc : {
                //text : "from:" + model.get('timeFrom') + " to:" + model.get('timeTo')
            },
            doneMark : {
                visible : model.get('CompletedDate') == null ? false : true
            },
            priorityIcon : {
                image : model.get('PriorityCode') == "High" ? "/images/redIcon.png" : ""
            },
            completedId : model.get('id'),
            CompletedDate : model.get('CompletedDate'),
            taskRecord : model.get('taskRecord'),
            tcTaskQuestionID : model.get('tcTaskQuestionID')
        });
    });
    Ti.API.error("this>>>" + rows.length);

    if (rows.length > 0) {
        $.mySec.setItems(rows);
    } else {
        $.mySec.headerView.setHeight(0);
    }

});

var tmpModel = Alloy.createModel('tasks_completed', {
    TaskQuestionID : 0
});
tmpModel.save();
tmpModel.destroy();

filterByCompletedQuery = args.filterByCompleted ?  "tc.CompletedDate is null AND " : '' ;//"tc.CompletedDate IS NULL AND ";
//filterByCompletedQuery = '';
try {
  taskCollaction.fetch({
      query : "SELECT t.*, tc.*, t.TaskQuestionID tTaskQuestionID, tc.TaskQuestionID tcTaskQuestionID " +
      		"FROM tasks t " +
      		"LEFT JOIN tasks_completed tc ON CASE WHEN TaskID = 1 THEN t.TaskQuestionID = tc.TaskQuestionID AND date(tc.CompletedDate) = date() " +
      		"	WHEN TaskID = 2 THEN  t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-w%W', tc.CompletedDate) = strftime('%Y-w%W', date()) " +
      		"	WHEN TaskID = 3 THEN t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-m%m', tc.CompletedDate) = strftime('%Y-m%m', date()) " +
      		"	WHEN TaskID = 4 THEN t.TaskQuestionID = tc.TaskQuestionID AND ((((cast(strftime('%Y-m%m', tc.CompletedDate) as integer) + 2) / 3) > 2) + 1) = 2 " +
      		"	WHEN TaskID = 5 THEN t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-m%m', tc.CompletedDate) = strftime('%Y-m%m', date()) " +
      		"	END = 1 " +
      		"WHERE " + filterByCompletedQuery + " t.SectionID=" + args.SectionID + " AND t.TaskID=" + args.TaskID
  });
} catch (e) {
  //Ti.API.Info('error -> '+JSON.stringify(e));
}
