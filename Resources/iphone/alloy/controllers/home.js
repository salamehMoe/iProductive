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
  this.__controllerPath = 'home';
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
  Alloy.Collections.instance('tasks');Alloy.Collections.instance('tasks_completed');Alloy.Collections.instance('auditRecord');

  // Generated UI code
  $.__views["home"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "Dashboard", id: "home" });

  $.__views["home"] && $.addTopLevelView($.__views["home"]);
  if (true) {
    $.__views["__alloyId356"] = Alloy.createController('centerNavBtns', { id: "__alloyId356", __parentSymbol: $.__views["home"] });
    $.__views["__alloyId356"].setParent($.__views["home"]);
  }
  $.__views["__alloyId357"] = Ti.UI.createWebView(
  { url: "/html/chart.htm", disableBounce: true, scalesPageToFit: true, enableZoomControls: false, id: "__alloyId357" });

  $.__views["home"].add($.__views["__alloyId357"]);
  loaded ? $.addListener($.__views["__alloyId357"], 'load', loaded) : __defers['$.__views["__alloyId357"]!load!loaded'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  function loaded() {
    //Ti.API.Info('>>>>>>>>>>> WE ARE HOME <<<<<<<<<<<<<');
    // tasks
    if (Alloy.Globals.user) {
      if (Alloy.Globals.user.get('HasTaskList') == 1) {
        var tasksData = {};
        if (_.isEmpty(tasksData = Alloy.Collections.tasks_completed.dashBoard())) {
          tasksData = false;

          Ti.App.addEventListener("html:openSync", function () {
            Alloy.Globals.pageStack.open(Alloy.createController('synchronization').getView(), true);
          });
        }

        Ti.App.fireEvent("App:drawTasksDashboard", {
          tasksData: tasksData,
          isiPad: Alloy.Globals.isiPad,
          HasTaskList: Alloy.Globals.user.get('HasTaskList') });

      }
    }
    // audit
    //By hassanisipad
    //if (Alloy.Globals.isiPad) {
    if (Alloy.Globals.isiPad || Alloy.Globals.isTablet) {
      Alloy.Collections.auditRecord.dashBoard(function (auditData) {
        Ti.App.fireEvent("App:drawAuditDashboard", {
          auditData: auditData,
          isiPad: Alloy.Globals.isiPad });

      });
    }
  };

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId357"]!load!loaded'] && $.addListener($.__views["__alloyId357"], 'load', loaded);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/home.js.map