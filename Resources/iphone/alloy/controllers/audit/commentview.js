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
  this.__controllerPath = 'audit/commentview';
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
  $.__views["answersLayer"] = Ti.UI.createView(
  { id: "answersLayer", title: "Completed Audits" });

  $.__views["answersLayer"] && $.addTopLevelView($.__views["answersLayer"]);
  $.__views["__alloyId0"] = Ti.UI.createView(
  { backgroundColor: "#000000", opacity: 0.7, id: "__alloyId0" });

  $.__views["answersLayer"].add($.__views["__alloyId0"]);
  $.__views["containner"] = Ti.UI.createView(
  { id: "containner" });

  $.__views["answersLayer"].add($.__views["containner"]);
  $.__views["__alloyId1"] = Ti.UI.createView(
  { id: "__alloyId1" });

  $.__views["containner"].add($.__views["__alloyId1"]);
  $.__views["__alloyId2"] = Ti.UI.createImageView(
  { id: "__alloyId2" });

  $.__views["__alloyId1"].add($.__views["__alloyId2"]);
  $.__views["titleLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "titleLbl" });

  $.__views["__alloyId1"].add($.__views["titleLbl"]);
  $.__views["__alloyId3"] = Ti.UI.createView(
  { height: 1, backgroundColor: "gray", id: "__alloyId3" });

  $.__views["containner"].add($.__views["__alloyId3"]);
  $.__views["__alloyId4"] = Ti.UI.createView(
  { id: "__alloyId4" });

  $.__views["containner"].add($.__views["__alloyId4"]);
  $.__views["__alloyId5"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: 'Comment', id: "__alloyId5" });

  $.__views["__alloyId4"].add($.__views["__alloyId5"]);
  $.__views["Comment"] = Ti.UI.createTextArea(
  { color: Alloy.CFG.borderColor, id: "Comment" });

  $.__views["__alloyId4"].add($.__views["Comment"]);
  $.__views["__alloyId6"] = Ti.UI.createView(
  { id: "__alloyId6" });

  $.__views["containner"].add($.__views["__alloyId6"]);
  $.__views["Score"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: 'Hello world', id: "Score" });

  $.__views["__alloyId6"].add($.__views["Score"]);
  $.__views["__alloyId7"] = Ti.UI.createView(
  { id: "__alloyId7" });

  $.__views["containner"].add($.__views["__alloyId7"]);
  $.__views["cancelBtn"] = Ti.UI.createButton(
  { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.tintColor, borderRadius: 2, font: { fontSize: 22 }, title: 'Cancel', id: "cancelBtn" });

  $.__views["__alloyId7"].add($.__views["cancelBtn"]);
  hideanswerLayer ? $.addListener($.__views["cancelBtn"], 'click', hideanswerLayer) : __defers['$.__views["cancelBtn"]!click!hideanswerLayer'] = true;$.__views["saveBtn"] = Ti.UI.createButton(
  { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.borderColor, borderRadius: 2, font: { fontSize: 22 }, title: 'Save Comment', id: "saveBtn" });

  $.__views["__alloyId7"].add($.__views["saveBtn"]);
  saveComment ? $.addListener($.__views["saveBtn"], 'click', saveComment) : __defers['$.__views["saveBtn"]!click!saveComment'] = true;$.__views["__alloyId8"] = Ti.UI.createView(
  { height: 20, id: "__alloyId8" });

  $.__views["containner"].add($.__views["__alloyId8"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file


  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["cancelBtn"]!click!hideanswerLayer'] && $.addListener($.__views["cancelBtn"], 'click', hideanswerLayer);__defers['$.__views["saveBtn"]!click!saveComment'] && $.addListener($.__views["saveBtn"], 'click', saveComment);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/commentview.js.map