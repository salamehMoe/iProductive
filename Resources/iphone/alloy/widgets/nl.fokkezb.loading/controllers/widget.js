var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;


function WPATH(s) {
  var index = s.lastIndexOf('/');
  var path = index === -1 ?
  'nl.fokkezb.loading/' + s :
  s.substring(0, index) + '/nl.fokkezb.loading/' + s.substring(index + 1);

  return path.indexOf('/') !== 0 ? '/' + path : path;
}

function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {
  var Widget = new (require('/alloy/widget'))('nl.fokkezb.loading');this.__widgetId = 'nl.fokkezb.loading';
  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'widget';
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
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var ctrl;

  function show(_message, _cancelable) {
    //Ti.API.Info("show is called");
    if (ctrl && ctrl.hasFocus) {
      ctrl.update(_message, _cancelable);
      return;
    }
    var newCtrl = Widget.createController(false && $.progress ? 'progress' : 'window');

    newCtrl.show(_message, _cancelable);

    if (ctrl) {
      hide();
    }

    ctrl = newCtrl;

  }

  function hide() {

    if (ctrl) {
      ctrl.hide();
      ctrl = null;
    }

    return;
  }

  Object.defineProperty($, 'visible', {
    get: function () {
      return ctrl && ctrl.hasFocus;
    },
    set: function (visible) {
      return visible ? show() : hide();
    } });


  $.show = show;
  $.hide = hide;

  $.progress = true;

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/widgets/nl.fokkezb.loading/controllers/widget.js.map