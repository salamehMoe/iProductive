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
  this.__controllerPath = 'window';
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
  $.__views["win"] = Ti.UI.createWindow(
  { backgroundColor: "transparent", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], backgroundImage: null, opacity: 0.7, navBarHidden: true, modal: false, theme: "Theme.AppCompat.Translucent.NoTitleBar", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  onFocus ? $.addListener($.__views["win"], 'focus', onFocus) : __defers['$.__views["win"]!focus!onFocus'] = true;onBlur ? $.addListener($.__views["win"], 'blur', onBlur) : __defers['$.__views["win"]!blur!onBlur'] = true;$.__views["view"] = Alloy.createWidget('nl.fokkezb.loading', 'view', { id: "view", __parentSymbol: $.__views["win"] });
  $.__views["view"].setParent($.__views["win"]);
  hide ? $.__views["view"].on('cancel', hide) : __defers['$.__views["view"]!cancel!hide'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  $.update = update;
  $.show = show;
  $.hide = hide;

  Object.defineProperty($, 'visible', {
    get: function () {
      return isOpen && hasFocus;
    },
    set: function (visible) {
      return visible ? show() : hide();
    } });


  var cancelable;

  // Bug: https://jira.appcelerator.org/browse/TC-2857
  var isOpen = false;

  var hasFocus = false;

  (function constructor(args) {

    if (false) {
      $.win.addEventListener('androidback', function onAndroidback() {

        if (!_.isFunction(cancelable)) {

          if (false && e.type === 'androidback') {
            var intent = Ti.Android.createIntent({
              action: Ti.Android.ACTION_MAIN });

            intent.addCategory(Ti.Android.CATEGORY_HOME);
            Ti.Android.currentActivity.startActivity(intent);
          }

          return;

        } else {
          $.view.cancel();
        }
      });
    }

    if (false) {

      $.win.addEventListener('open', function onOpen(e) {

        // Bug: https://jira.appcelerator.org/browse/TC-2857
        isOpen = true;
      });
    }

    args = null;

  })(arguments[0] || {});

  function update(_message, _cancelable) {
    $.view.update(_message, _cancelable);

    cancelable = _cancelable;
  }

  function show(_message, _cancelable) {
    $.view.show(_message, _cancelable);

    $.win.open();
  }

  function hide() {

    var close = function close() {
      $.view.hide();
      $.win.close();

      cancelable = null;
    };

    if (!false || isOpen) {
      close();

      // Bug: https://jira.appcelerator.org/browse/TC-2857
    } else {
      var interval = setInterval(function atInterval() {
        if (isOpen) {
          close();
          clearInterval(interval);
        }
      }, 100);
    }
  }

  function onFocus(e) {
    hasFocus = true;
  }

  function onBlur(e) {
    hasFocus = false;
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["win"]!focus!onFocus'] && $.addListener($.__views["win"], 'focus', onFocus);__defers['$.__views["win"]!blur!onBlur'] && $.addListener($.__views["win"], 'blur', onBlur);__defers['$.__views["view"]!cancel!hide'] && $.__views["view"].on('cancel', hide);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/widgets/nl.fokkezb.loading/controllers/window.js.map