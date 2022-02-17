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
  this.__controllerPath = 'audit/scoreCard_question_section';
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
  { backgroundColor: "#7092BE", height: 60, id: "headerView" });

  $.__views["titleLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, left: 10, color: "#ffffff", id: "titleLbl" });

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
  var args = arguments[0] || {};

  $.titleLbl.setText(args.title);
  //$.weightLbl.setText(args.weight);
  //$.weightTotalLbl.setText(' / ' + args.weightTotal);

  var qCollaction = Alloy.createCollection('questions_scorecard');

  qCollaction.on('fetch', function () {
    var rows = [];
    qCollaction.each(function (model) {

      rows.push({
        properties: _.extend(model.toJSON(), {
          answerID: model.get('id'),
          searchableText: model.get('QuestionDesc') }),

        id: model.get('id'),
        AuditRecordID: model.get('AuditRecordID'),
        QuestionID: model.get('QuestionID'),
        AnswerID: model.get('AnswerID'),
        Answerstring: model.get('Answerstring'),
        Answervalue: model.get('Answervalue'),
        QuestionValue: model.get('QuestionValue'),
        AnswerDate: model.get('AnswerDate'),
        uploaded_date: model.get('uploaded_date'),
        AuditID: model.get('uploaded_date'),
        SectionID: model.get('SectionID'),
        QuestionDesc: model.get('QuestionDesc'),
        QuestionDesc: {
          text: model.get('QuestionDesc') },

        answer: {
          text: model.get('Answerstring') } });


    });

    $.mySec.setItems(rows);

  });
  try {
    qCollaction.fetch({
      query: "SELECT a.*, q.* FROM  questions_scorecard q JOIN answers a ON q.QuestionID = a.QuestionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID });

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
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/scoreCard_question_section.js.map