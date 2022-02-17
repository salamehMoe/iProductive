var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'tasks/tasks_sections';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  $.__views["headerView"] = Ti.UI.createView(
  { backgroundColor: "#efefef", height: 40, id: "headerView" });

  $.__views["titleLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, left: 10, id: "titleLbl" });

  $.__views["headerView"].add($.__views["titleLbl"]);
  $.__views["mySec"] = Ti.UI.createListSection(
  { headerView: $.__views["headerView"], id: "mySec" });

  $.__views["mySec"] && $.addTopLevelView($.__views["mySec"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {},filterByCompletedQuery;

  $.titleLbl.setText(args.SectionDesc);

  var taskCollaction = Alloy.createCollection('tasks');

  taskCollaction.on('fetch', function () {
    var rows = [];

    taskCollaction.each(function (model) {

      // var height = 75;

      if (Alloy.isHandheld && model.get('QuestionDesc').length > 50) {
        // height = model.get('QuestionDesc').length * 1.6;
      }

      rows.push({
        properties: _.extend(model.toJSON(), {
          TaskQuestionID: model.get('tTaskQuestionID'),
          //accessoryType : model.get('CompletedDate') == null ? Ti.UI.LIST_ACCESSORY_TYPE_NONE : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK,
          searchableText: model.get('QuestionDesc')
          //height : height
        }),
        status: {
          image: "/images/noDone.png" },

        taskTitle: {
          text: model.get('QuestionDesc') },

        //PriorityCode
        taskDesc: {
          //text : "from:" + model.get('timeFrom') + " to:" + model.get('timeTo')
        },
        doneMark: {
          visible: model.get('CompletedDate') == null ? false : true },

        priorityIcon: {
          image: model.get('PriorityCode') == "High" ? "/images/redIcon.png" : "" },

        completedId: model.get('id'),
        CompletedDate: model.get('CompletedDate'),
        taskRecord: model.get('taskRecord'),
        tcTaskQuestionID: model.get('tcTaskQuestionID') });

    });
    Ti.API.error("this>>>" + rows.length);

    if (rows.length > 0) {
      $.mySec.setItems(rows);
    } else {
      $.mySec.headerView.setHeight(0);
    }

  });

  var tmpModel = Alloy.createModel('tasks_completed', {
    TaskQuestionID: 0 });

  tmpModel.save();
  tmpModel.destroy();

  filterByCompletedQuery = args.filterByCompleted ? "tc.CompletedDate is null AND " : ''; //"tc.CompletedDate IS NULL AND ";
  //filterByCompletedQuery = '';
  try {
    taskCollaction.fetch({
      query: "SELECT t.*, tc.*, t.TaskQuestionID tTaskQuestionID, tc.TaskQuestionID tcTaskQuestionID " +
      "FROM tasks t " +
      "LEFT JOIN tasks_completed tc ON CASE WHEN TaskID = 1 THEN t.TaskQuestionID = tc.TaskQuestionID AND date(tc.CompletedDate) = date() " +
      "	WHEN TaskID = 2 THEN  t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-w%W', tc.CompletedDate) = strftime('%Y-w%W', date()) " +
      "	WHEN TaskID = 3 THEN t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-m%m', tc.CompletedDate) = strftime('%Y-m%m', date()) " +
      "	WHEN TaskID = 4 THEN t.TaskQuestionID = tc.TaskQuestionID AND ((((cast(strftime('%Y-m%m', tc.CompletedDate) as integer) + 2) / 3) > 2) + 1) = 2 " +
      "	WHEN TaskID = 5 THEN t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-m%m', tc.CompletedDate) = strftime('%Y-m%m', date()) " +
      "	END = 1 " +
      "WHERE " + filterByCompletedQuery + " t.SectionID=" + args.SectionID + " AND t.TaskID=" + args.TaskID });

  } catch (e) {

  } //Ti.API.Info('error -> '+JSON.stringify(e));

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/tasks/tasks_sections.js.map