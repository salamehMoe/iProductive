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
  this.__controllerPath = 'audit/history';
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
  $.__views["history"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: false, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "History", id: "history" });

  $.__views["history"] && $.addTopLevelView($.__views["history"]);
  $.__views["__alloyId31"] = Alloy.createController('centerNavBtns', { id: "__alloyId31", __parentSymbol: $.__views["history"] });
  $.__views["__alloyId31"].setParent($.__views["history"]);
  if (true) {
    $.__views["__alloyId32"] = Ti.UI.createSearchBar(
    { hintText: "Search ...", barColor: "#115EAC", tintColor: "#ffffff", keyboardType: Titanium.UI.RETURNKEY_SEARCH, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, id: "__alloyId32" });

  }
  $.__views["headerView"] = Ti.UI.createView(
  { backgroundColor: "#efefef", height: 60, id: "headerView" });

  $.__views["__alloyId36"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: 'Completed audits which were submitted to the server', id: "__alloyId36" });

  $.__views["headerView"].add($.__views["__alloyId36"]);
  $.__views["__alloyId33"] = Ti.UI.createListSection(
  { headerView: $.__views["headerView"], id: "__alloyId33" });

  var __alloyId40 = Alloy.Collections['auditRecord'] || auditRecord;function __alloyId41(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId41.opts || {};var models = __alloyId40.models;var len = models.length;var __alloyId34 = [];for (var i = 0; i < len; i++) {var __alloyId37 = models[i];__alloyId37.__transform = transformFunction(__alloyId37);var __alloyId39 = { properties: { height: 70, accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE, title: __alloyId37.__transform.AuditName, searchableText: __alloyId37.__transform.AuditName, subtitle: __alloyId37.__transform.subTitle, auditRecordID: __alloyId37.__transform.id, storeCode: __alloyId37.__transform.storeCode, deptCode: __alloyId37.__transform.deptCode, AuditID: __alloyId37.__transform.AuditID, openDate: __alloyId37.__transform.openDate, submisiondDate: __alloyId37.__transform.submisiondDate, submittedBy: __alloyId37.__transform.submittedBy, online_id: __alloyId37.__transform.online_id, CompanyTypeID: __alloyId37.__transform.CompanyTypeID, DeptCode: __alloyId37.__transform.DeptCode, AuditDesc: __alloyId37.__transform.AuditDesc, Target: __alloyId37.__transform.Target, type: __alloyId37.__transform.type, comment: __alloyId37.__transform.comment } };__alloyId34.push(__alloyId39);}opts.animation ? $.__views["__alloyId33"].setItems(__alloyId34, opts.animation) : $.__views["__alloyId33"].items = __alloyId34;};__alloyId40.on('fetch destroy change add remove reset', __alloyId41);var __alloyId42 = [];__alloyId42.push($.__views["__alloyId33"]);$.__views["list"] = Ti.UI.createListView(
  { defaultItemTemplate: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE, top: 62, sections: __alloyId42, searchView: $.__views["__alloyId32"], id: "list" });

  $.__views["history"].add($.__views["list"]);
  openTemplate ? $.addListener($.__views["list"], 'itemclick', openTemplate) : __defers['$.__views["list"]!itemclick!openTemplate'] = true;exports.destroy = function () {__alloyId40 && __alloyId40.off('fetch destroy change add remove reset', __alloyId41);};

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

      notEditable: true,
      isHistory: true }).
    getView());

  };

  function transformFunction(model) {
    var transform = model.toJSON();
    transform.subTitle = transform.storeCode + " / " + transform.openDate;
    return transform;
  }



  try {
    Alloy.Collections.auditRecord.fetch({
      query: "SELECT a.*, t.* FROM auditRecord a JOIN templates t ON t.AuditID = a.AuditID WHERE length(a.online_id) > 0" });

  } catch (e) {
    //Ti.API.Info('error -> '+JSON.stringify(e));
  }


  $.history.addEventListener("close", function () {
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
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/history.js.map