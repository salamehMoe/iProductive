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
  this.__controllerPath = 'audit/index';
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
  Alloy.Collections.instance('templates');

  // Generated UI code
  $.__views["index"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: false, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], id: "index", title: "Audit templates" });

  $.__views["index"] && $.addTopLevelView($.__views["index"]);
  $.__views["__alloyId69"] = Alloy.createController('centerNavBtns', { id: "__alloyId69", __parentSymbol: $.__views["index"] });
  $.__views["__alloyId69"].setParent($.__views["index"]);
  if (true) {
    $.__views["__alloyId70"] = Ti.UI.createSearchBar(
    { hintText: "Search ...", barColor: "#115EAC", tintColor: "#ffffff", keyboardType: Titanium.UI.RETURNKEY_SEARCH, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, id: "__alloyId70" });

  }
  var __alloyId71 = {};var __alloyId74 = [];var __alloyId75 = { type: 'Ti.UI.Label', bindId: 'info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, color: "black", left: "10dp", top: "15dp", bindId: "info" } };__alloyId74.push(__alloyId75);var __alloyId76 = { type: 'Ti.UI.Label', bindId: 'es_info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, font: { fontSize: "10dp" }, left: "10dp", top: "40dp", color: "black", bindId: "es_info" } };__alloyId74.push(__alloyId76);var __alloyId73 = { properties: { name: "template" }, childTemplates: __alloyId74 };__alloyId71["template"] = __alloyId73;$.__views["headerView"] = Ti.UI.createView(
  { backgroundColor: "#efefef", height: 60, id: "headerView" });

  $.__views["__alloyId80"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: 'Welcome, please select a template to be completed', id: "__alloyId80" });

  $.__views["headerView"].add($.__views["__alloyId80"]);
  $.__views["__alloyId77"] = Ti.UI.createListSection(
  { headerView: $.__views["headerView"], id: "__alloyId77" });

  var __alloyId84 = Alloy.Collections['templates'] || templates;function __alloyId85(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId85.opts || {};var models = __alloyId84.models;var len = models.length;var __alloyId78 = [];for (var i = 0; i < len; i++) {var __alloyId81 = models[i];__alloyId81.__transform = transformFunction(__alloyId81);var __alloyId83 = { properties: { height: 70, accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE, AuditID: __alloyId81.__transform.AuditID, title: __alloyId81.__transform.AuditName, CompanyTypeID: __alloyId81.__transform.CompanyTypeID, DeptCode: __alloyId81.__transform.DeptCode, Target: __alloyId81.__transform.Target, searchableText: __alloyId81.__transform.AuditName, type: __alloyId81.__transform.type }, info: { text: __alloyId81.__transform.AuditName }, es_info: { text: __alloyId81.__transform.AuditDesc } };__alloyId78.push(__alloyId83);}opts.animation ? $.__views["__alloyId77"].setItems(__alloyId78, opts.animation) : $.__views["__alloyId77"].items = __alloyId78;};__alloyId84.on('fetch destroy change add remove reset', __alloyId85);var __alloyId86 = [];__alloyId86.push($.__views["__alloyId77"]);$.__views["list"] = Ti.UI.createListView(
  { defaultItemTemplate: "template", top: 62, sections: __alloyId86, templates: __alloyId71, searchView: $.__views["__alloyId70"], id: "list" });

  $.__views["index"].add($.__views["list"]);
  startSurvey ? $.addListener($.__views["list"], 'itemclick', startSurvey) : __defers['$.__views["list"]!itemclick!startSurvey'] = true;var __alloyId88 = [];__alloyId88.push("OK");__alloyId88.push("Cancel");$.__views["confirmAlert"] = Ti.UI.createAlertDialog(
  { buttonNames: __alloyId88, title: "Start audit?", message: "Do you want to start this audit now?", cancel: 1, id: "confirmAlert" });

  if (true) {
    $.__views["preSurveyView"] = Alloy.createController('audit/pre_survey', { id: "preSurveyView", __parentSymbol: $.__views["index"] });
    $.__views["preSurveyView"].setParent($.__views["index"]);
  }
  exports.destroy = function () {__alloyId84 && __alloyId84.off('fetch destroy change add remove reset', __alloyId85);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var pre = Alloy.createController('audit/pre_survey');
  var startSurvey = function (e) {

    var item = e.section.getItemAt(e.itemIndex);

    //if (!$.confirmAlert.eventAssaignedBefore) {
    $.confirmAlert.eventAssaignedBefore = true;
    $.confirmAlert.addEventListener('click', function (alertE) {

      if (alertE.index == 0) {

        if (true) {

          $.preSurveyView.show({
            item: item.properties,
            onNext: function (formPrams) {
              //Ti.API.Info('>>> test onNext');
              Alloy.Globals.pageStack.open(Alloy.createController('audit/sections', {
                item: item.properties,
                formPrams: formPrams,
                isEditing: true }).
              getView());
            } });

        } else {
          pre.titleLbl.setText("");
          pre.tempName.setValue("");
          //Ti.API.Info("Calling Show: " + item.title);
          pre.show({
            item: item.properties,
            onNext: function (formPrams) {
              $.index.remove(pre.getView());
              Alloy.Globals.pageStack.open(Alloy.createController('audit/sections', {
                item: item.properties,
                formPrams: formPrams,
                isEditing: true }).
              getView());
            } });

          $.index.add(pre.getView());
        }
      }
      $.confirmAlert.removeEventListener('click', arguments.callee);
    });
    //}
    $.confirmAlert.show();
  };

  try {
    Alloy.Collections.templates.fetch({
      query: "SELECT * FROM templates WHERE Show > 0 AND deleted = 0" });

  } catch (e) {
    //Ti.API.Info('error -> '+JSON.stringify(e));
  }

  function transformFunction(model) {

    m = model.toJSON();

    if (m.AuditDesc == null) {
      m.AuditDesc = "";
    }
    return m;
  }




  $.index.addEventListener("close", function () {
    $.destroy();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["list"]!itemclick!startSurvey'] && $.addListener($.__views["list"], 'itemclick', startSurvey);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/index.js.map