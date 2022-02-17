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
  this.__controllerPath = 'audit/section_template';
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
  { backgroundColor: "#efefef", height: 60, id: "headerView" });

  clickSection ? $.addListener($.__views["headerView"], 'click', clickSection) : __defers['$.__views["headerView"]!click!clickSection'] = true;$.__views["titleLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: "Add comment to the Template", left: 73, font: { fontSize: 22 }, id: "titleLbl" });

  $.__views["headerView"].add($.__views["titleLbl"]);
  $.__views["__alloyId310"] = Ti.UI.createView(
  { id: "__alloyId310" });

  $.__views["headerView"].add($.__views["__alloyId310"]);
  $.__views["weightLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "weightLbl" });

  $.__views["__alloyId310"].add($.__views["weightLbl"]);
  $.__views["weightTotalLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "weightTotalLbl" });

  $.__views["__alloyId310"].add($.__views["weightTotalLbl"]);
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



  var clickSection = function (e) {

    var item = e.section.getItemAt(e.itemIndex);
    if (isScoreCard) {
      Alloy.Globals.pageStack.open(Alloy.createController('audit/scoreCardQuestions', {
        AuditID: args.item.AuditID,
        auditRecordID: args.formPrams.auditRecordID,
        deptCode: args.formPrams.deptCode,
        section: item.properties,
        template: args.item,
        notEditable: args.notEditable,
        saveCallBack: save,
        refreshSections: refreshSections }).
      getView());

    } else {

      Alloy.Globals.pageStack.open(Alloy.createController('audit/questions', {
        AuditID: args.item.AuditID,
        auditRecordID: args.formPrams.auditRecordID,
        deptCode: args.formPrams.deptCode,
        section: item.properties,
        template: args.item,
        notEditable: args.notEditable,
        saveCallBack: save,
        refreshSections: refreshSections }).
      getView());
    }
  };

  function openComment(e) {


    //$.Score.text = totalScore;
    if (true) {

      $.Comment.setSuppressReturn(false);
      $.Comment.setReturnKeyType(Ti.UI.RETURNKEY_DEFAULT);
      $.sections.add($.answersLayer);
      $.answersLayer.animate({
        opacity: 1 });

    } else
    {
      $.sections.add($.answersLayer);
      $.answersLayer.animate({
        opacity: 1 });

    }

    //totalScore = (totalScore >= 84.99 && totalScore != 100) ? 84.99 : totalScore;

    $.Score.text = totalWeight + ' / ' + totalWeightTotal + "        Finished: " + ((totalWeight / totalWeightTotal || 0) * 100).toFixed(3) + " %       Score: " + totalScore + " %";
    //$.Comment.setValue(args.formPrams.comment);
    //alert(args.formPrams.comment);

    var auditRecordModel = Alloy.createModel('auditRecord');

    auditRecordModel.fetch({
      id: args.formPrams.auditRecordID });


    $.Comment.setValue(auditRecordModel.get("comment"));

  }


  $.titleLbl.setText(args.info);


  var clickSection = function (e) {

    //var item = e.section.getItemAt(e.itemIndex);
    var item = args.model;
    // if (isScoreCard) {
    // Alloy.Globals.pageStack.open(Alloy.createController('audit/scoreCardQuestions', {
    // AuditID : args.item.AuditID,
    // auditRecordID : args.formPrams.auditRecordID,
    // deptCode : args.formPrams.deptCode,
    // section : item.properties,
    // template : args.item,
    // notEditable : args.notEditable,
    // saveCallBack : save,
    // refreshSections : refreshSections
    // }).getView());
    //
    // } else
    {

      Alloy.Globals.pageStack.open(Alloy.createController('audit/questions', {
        AuditID: args.AuditID,
        auditRecordID: args.auditRecordID,
        deptCode: args.deptCode,
        section: args.section,
        template: args.template,
        notEditable: args.notEditable,
        saveCallBack: args.saveCallBack,
        refreshSections: args.refreshSections }).
      getView());
    }
  };

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["headerView"]!click!clickSection'] && $.addListener($.__views["headerView"], 'click', clickSection);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/section_template.js.map