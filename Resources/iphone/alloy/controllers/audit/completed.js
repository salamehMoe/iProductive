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
  this.__controllerPath = 'audit/completed';
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
  Alloy.Collections.instance('auditRecord');

  // Generated UI code
  $.__views["completed"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: false, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "Completed", id: "completed" });

  $.__views["completed"] && $.addTopLevelView($.__views["completed"]);
  $.__views["__alloyId11"] = Alloy.createController('centerNavBtns', { id: "__alloyId11", __parentSymbol: $.__views["completed"] });
  $.__views["__alloyId11"].setParent($.__views["completed"]);
  if (true) {
    $.__views["__alloyId12"] = Ti.UI.createSearchBar(
    { hintText: "Search ...", barColor: "#115EAC", tintColor: "#ffffff", keyboardType: Titanium.UI.RETURNKEY_SEARCH, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, id: "__alloyId12" });

  }
  var __alloyId13 = {};var __alloyId16 = [];var __alloyId17 = { type: 'Ti.UI.Label', bindId: 'info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, color: "black", left: "10dp", top: "15dp", bindId: "info" } };__alloyId16.push(__alloyId17);var __alloyId18 = { type: 'Ti.UI.Label', bindId: 'es_info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, font: { fontSize: "10dp" }, left: "10dp", top: "40dp", color: "black", bindId: "es_info" } };__alloyId16.push(__alloyId18);var __alloyId15 = { properties: { name: "template" }, childTemplates: __alloyId16 };__alloyId13["template"] = __alloyId15;$.__views["headerView"] = Ti.UI.createView(
  { backgroundColor: "#efefef", height: 60, id: "headerView" });

  $.__views["__alloyId22"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: 'Completed audits which are not yet submitted to the server. Perform a sync to update the server.', id: "__alloyId22" });

  $.__views["headerView"].add($.__views["__alloyId22"]);
  $.__views["__alloyId19"] = Ti.UI.createListSection(
  { headerView: $.__views["headerView"], id: "__alloyId19" });

  var __alloyId26 = Alloy.Collections['auditRecord'] || auditRecord;function __alloyId27(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId27.opts || {};var models = __alloyId26.models;var len = models.length;var __alloyId20 = [];for (var i = 0; i < len; i++) {var __alloyId23 = models[i];__alloyId23.__transform = transformFunction(__alloyId23);var __alloyId25 = { properties: { height: 70, accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE, searchableText: __alloyId23.__transform.AuditName, auditRecordID: __alloyId23.__transform.id, storeCode: __alloyId23.__transform.storeCode, deptCode: __alloyId23.__transform.deptCode, AuditID: __alloyId23.__transform.AuditID, openDate: __alloyId23.__transform.openDate, submisiondDate: __alloyId23.__transform.submisiondDate, submittedBy: __alloyId23.__transform.submittedBy, online_id: __alloyId23.__transform.online_id, CompanyTypeID: __alloyId23.__transform.CompanyTypeID, DeptCode: __alloyId23.__transform.DeptCode, AuditDesc: __alloyId23.__transform.AuditDesc, Target: __alloyId23.__transform.Target, type: __alloyId23.__transform.type, comment: __alloyId23.__transform.comment }, info: { text: __alloyId23.__transform.AuditName }, es_info: { text: __alloyId23.__transform.subTitle } };__alloyId20.push(__alloyId25);}opts.animation ? $.__views["__alloyId19"].setItems(__alloyId20, opts.animation) : $.__views["__alloyId19"].items = __alloyId20;};__alloyId26.on('fetch destroy change add remove reset', __alloyId27);var __alloyId28 = [];__alloyId28.push($.__views["__alloyId19"]);$.__views["list"] = Ti.UI.createListView(
  { defaultItemTemplate: "template", top: 62, sections: __alloyId28, templates: __alloyId13, searchView: $.__views["__alloyId12"], id: "list" });

  $.__views["completed"].add($.__views["list"]);
  openTemplate ? $.addListener($.__views["list"], 'itemclick', openTemplate) : __defers['$.__views["list"]!itemclick!openTemplate'] = true;exports.destroy = function () {__alloyId26 && __alloyId26.off('fetch destroy change add remove reset', __alloyId27);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var openTemplate = function (e) {

    var item = e.section.getItemAt(e.itemIndex);

    Alloy.Globals.pageStack.open(Alloy.createController('audit/sections', {
      item: item.properties,
      formPrams: {
        auditRecordID: item.properties.auditRecordID,
        deptCode: item.properties.deptCode,
        store: item.properties.storeCode,
        date: item.properties.openDate,
        comment: item.properties.comment },

      notEditable: true }).
    getView());

  };

  function transformFunction(model) {
    var transform = model.toJSON();
    transform.subTitle = transform.storeCode + " / " + transform.openDate;
    return transform;
  }
  try {
    Alloy.Collections.auditRecord.fetch({
      query: "SELECT a.*, t.* FROM auditRecord a JOIN templates t ON t.AuditID = a.AuditID WHERE length(a.submisiondDate) > 3 AND a.online_id = ''" });

  } catch (e) {
    //Ti.API.Info('error -> '+JSON.stringify(e));
  }


  $.completed.addEventListener("close", function () {
    $.destroy();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["list"]!itemclick!openTemplate'] && $.addListener($.__views["list"], 'itemclick', openTemplate);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/completed.js.map