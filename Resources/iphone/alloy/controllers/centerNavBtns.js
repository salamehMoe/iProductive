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
  this.__controllerPath = 'centerNavBtns';
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
  $.__views["__alloyId338"] = Ti.UI.createButton(
  { image: "/images/icons/user.png", id: "__alloyId338" });

  profileOpen ? $.addListener($.__views["__alloyId338"], 'click', profileOpen) : __defers['$.__views["__alloyId338"]!click!profileOpen'] = true;__parentSymbol.rightNavButton = $.__views["__alloyId338"];$.__views["centerNavBtns"] && $.addTopLevelView($.__views["centerNavBtns"]);
  $.__views["__alloyId339"] = Ti.UI.createButton(
  { image: "/images/icons/menu.png", id: "__alloyId339" });

  menuOpen ? $.addListener($.__views["__alloyId339"], 'click', menuOpen) : __defers['$.__views["__alloyId339"]!click!menuOpen'] = true;__parentSymbol.leftNavButton = $.__views["__alloyId339"];$.__views["centerNavBtns"] && $.addTopLevelView($.__views["centerNavBtns"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  function profileOpen() {
    Alloy.Globals.drawerToggleRighttWindow();
  }

  function menuOpen() {
    Alloy.Globals.drawerToggleLeftWindow();
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId338"]!click!profileOpen'] && $.addListener($.__views["__alloyId338"], 'click', profileOpen);__defers['$.__views["__alloyId339"]!click!menuOpen'] && $.addListener($.__views["__alloyId339"], 'click', menuOpen);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/centerNavBtns.js.map