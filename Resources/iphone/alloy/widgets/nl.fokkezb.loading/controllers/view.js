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
  this.__controllerPath = 'view';
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
  $.__views["loadingMask"] = Ti.UI.createView(
  { backgroundColor: "#5000", visible: false, id: "loadingMask" });

  $.__views["loadingMask"] && $.addTopLevelView($.__views["loadingMask"]);
  cancel ? $.addListener($.__views["loadingMask"], 'click', cancel) : __defers['$.__views["loadingMask"]!click!cancel'] = true;$.__views["loadingOuter"] = Ti.UI.createView(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, borderRadius: 10, backgroundColor: "#C000", id: "loadingOuter" });

  $.__views["loadingMask"].add($.__views["loadingOuter"]);
  $.__views["loadingInner"] = Ti.UI.createView(
  { top: "20dp", right: "20dp", bottom: "20dp", left: "20dp", width: Ti.UI.SIZE, height: Ti.UI.SIZE, layout: "vertical", id: "loadingInner" });

  $.__views["loadingOuter"].add($.__views["loadingInner"]);
  $.__views["loadingIndicator"] = Ti.UI.createActivityIndicator(
  { message: "Loading ...", color: "black", style: Titanium.UI.ActivityIndicatorStyle.BIG, top: "0dp", id: "loadingIndicator" });

  $.__views["loadingInner"].add($.__views["loadingIndicator"]);
  $.__views["loadingImages"] = Ti.UI.createImageView(
  { top: "0dp", images: ["/images/nl.fokkezb.loading/00.png", "/images/nl.fokkezb.loading/01.png", "/images/nl.fokkezb.loading/02.png", "/images/nl.fokkezb.loading/03.png", "/images/nl.fokkezb.loading/04.png", "/images/nl.fokkezb.loading/05.png", "/images/nl.fokkezb.loading/06.png", "/images/nl.fokkezb.loading/07.png", "/images/nl.fokkezb.loading/08.png", "/images/nl.fokkezb.loading/09.png", "/images/nl.fokkezb.loading/10.png", "/images/nl.fokkezb.loading/11.png"], id: "loadingImages" });

  $.__views["loadingInner"].add($.__views["loadingImages"]);
  $.__views["loadingMessage"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, top: "20dp", width: Ti.UI.SIZE, height: Ti.UI.SIZE, text: L('loadingMessage', 'Loading..'), color: "#fff", font: { fontSize: "16dp" }, id: "loadingMessage" });

  $.__views["loadingInner"].add($.__views["loadingMessage"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var useImages = false,
  cancelable = null;

  $.show = show;
  $.hide = hide;
  $.update = update;
  $.cancel = cancel;

  Object.defineProperty($, 'visible', {
    get: function () {
      return $.loadingMask.visible;
    },
    set: function (visible) {
      return visible ? show() : hide();
    } });


  (function constructor(args) {

    if ($.loadingMask.images) {
      useImages = true;

      $.loadingInner.remove($.loadingIndicator);
      $.loadingIndicator = null;

    } else {
      $.loadingInner.remove($.loadingImages);
      $.loadingImages = null;
    }

    args = null;

  })(arguments[0] || {});

  function update(_message, _cancelable) {
    $.loadingMessage.text = _message || L('loadingMessage', 'Loading...');
    cancelable = _cancelable;
  }

  function cancel() {

    if (_.isFunction(cancelable)) {
      cancelable();

      $.trigger('cancel');

      hide();
    }
  }

  function show(_message, _cancelable) {
    update(_message, _cancelable);

    $.loadingMask.show();

    if (useImages) {
      $.loadingImages.start();
    } else {
      $.loadingIndicator.show();
    }
  }

  function hide() {
    $.loadingMask.hide();
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["loadingMask"]!click!cancel'] && $.addListener($.__views["loadingMask"], 'click', cancel);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/widgets/nl.fokkezb.loading/controllers/view.js.map