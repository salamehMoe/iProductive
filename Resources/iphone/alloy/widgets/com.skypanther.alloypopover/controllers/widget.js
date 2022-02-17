var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;


function WPATH(s) {
  var index = s.lastIndexOf('/');
  var path = index === -1 ?
  'com.skypanther.alloypopover/' + s :
  s.substring(0, index) + '/com.skypanther.alloypopover/' + s.substring(index + 1);

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
  var Widget = new (require('/alloy/widget'))('com.skypanther.alloypopover');this.__widgetId = 'com.skypanther.alloypopover';
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
  $.__views["popover"] = Ti.UI.createWindow(
  { backgroundColor: "transparent", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], navBarHidden: true, zIndex: 2, id: "popover" });

  $.__views["popover"] && $.addTopLevelView($.__views["popover"]);
  $.__views["backshade"] = Ti.UI.createView(
  { backgroundColor: "#2a2a2a", opacity: 0.6, top: 0, left: 0, right: 0, bottom: 0, id: "backshade" });

  $.__views["popover"].add($.__views["backshade"]);
  if (true) {
    $.__views["shadow"] = Ti.UI.createView(
    { backgroundColor: "#333", width: "75%", height: "80%", opacity: 0.6, id: "shadow" });

    $.__views["popover"].add($.__views["shadow"]);
  }
  $.__views["wrapper"] = Ti.UI.createView(
  { backgroundColor: "white", width: "75%", height: "80%", borderColor: "#777", borderWidth: 3, borderRadius: 4, id: "wrapper" });

  $.__views["popover"].add($.__views["wrapper"]);
  $.__views["titlebar"] = Ti.UI.createView(
  { backgroundColor: "#777", height: 40, top: 0, width: Ti.UI.FILL, backgroundGradient: { type: "linear", startPoint: { x: "100%", y: "100%" }, endPoint: { x: "100%", y: "0" }, colors: [{ color: "#666", offset: 0 }, { color: "#555", offset: 0.5 }, { color: "#777", offset: 1 }] }, id: "titlebar" });

  $.__views["wrapper"].add($.__views["titlebar"]);
  $.__views["leftnavbutton"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, backgroundColor: "transparent", left: 5, bottom: 5, top: 5, width: 50, height: 30, font: { fontSize: 12, fontWeight: "bold" }, backgroundImage: "none", borderColor: "#444444", borderWidth: 1, color: "#fff", text: "Left", visible: false, backgroundGradient: { type: "linear", colors: [{ color: "#aaa" }, { color: "#1a48a4" }] }, style: Titanium.UI.iOS.SystemButtonStyle.PLAIN, borderRadius: 2, id: "leftnavbutton" });

  $.__views["titlebar"].add($.__views["leftnavbutton"]);
  $.__views["title"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, font: { fontSize: 16 }, fontWeight: "bold", color: "white", text: "Title", width: Ti.UI.SIZE, zIndex: 1, id: "title" });

  $.__views["titlebar"].add($.__views["title"]);
  $.__views["rightnavbutton"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, backgroundColor: "transparent", right: 5, bottom: 5, top: 5, width: 50, height: 30, font: { fontSize: 12, fontWeight: "bold" }, backgroundImage: "none", borderColor: "#444", borderWidth: 1, color: "#fff", text: "Right", visible: false, backgroundGradient: { type: "linear", colors: [{ color: "#aaa" }, { color: "#1a48a4" }] }, style: Titanium.UI.iOS.SystemButtonStyle.PLAIN, borderRadius: 2, id: "rightnavbutton" });

  $.__views["titlebar"].add($.__views["rightnavbutton"]);
  $.__views["contents"] = Ti.UI.createView(
  { backgroundColor: "white", top: 40, left: 2, right: 2, bottom: 2, id: "contents" });

  $.__views["wrapper"].add($.__views["contents"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};

  // add child views to controller if they exist
  if (args.children) {

    _.each(args.children, function (child) {

      // fix: https://jira.appcelerator.org/browse/TC-3583
      if (!child) {
        return;
      }

      $.contents.add(child);
    });
  }

  var disableBackshadeClose = false;
  $.init = function (args) {
    if (!args) args = {};
    if (args.disableBackshadeClose) disableBackshadeClose = true;
    $.title.text = args.title ? args.title : '';
    if (args && args.showLeftNavButton) {
      $.leftnavbutton.text = args.leftNavButtonTitle ? args.leftNavButtonTitle : '';
      $.leftnavbutton.visible = true;
      $.leftnavbutton.addEventListener('click', function (e) {
        e.bubbles = false;
        e.cancelBubble = true;
        if (args && args.view && args.view.children) {
          var kids = args.view.children;
          if (kids && kids.length) {
            for (var i = 0, j = kids.length; i < j; i++) {
              try {
                kids[i].blur();
              } catch (err) {}
            }
          }
        }
        if (typeof args.leftNavCallback == 'function') {
          args.leftNavCallback();
        }
        $.hideMe();
      });
    }
    if (args && args.showRightNavButton) {
      $.rightnavbutton.text = args.rightNavButtonTitle ? args.rightNavButtonTitle : '';
      $.rightnavbutton.visible = true;
      $.rightnavbutton.addEventListener('click', function (e) {
        e.bubbles = false;
        e.cancelBubble = true;
        if (args && args.view && args.view.children) {
          var kids = args.view.children;
          if (kids && kids.length) {
            for (var i = 0, j = kids.length; i < j; i++) {
              try {
                kids[i].blur();
              } catch (err) {}
            }
          }
        }
        args.rightNavCallback();
        $.hideMe();
      });
    }
    if (args && args.view) {
      $.contents.add(args.view);
    }
  };

  if (true) {
    var shadowOffset = Ti.UI.createAnimation({
      transform: Ti.UI.create2DMatrix().translate(3, 3),
      duration: 1 });

    $.shadow.animate(shadowOffset);
  }


  var duration = 200;
  if (true) {
    var showAnim = Titanium.UI.createAnimation({
      opacity: 1,
      duration: duration }),

    hideAnim = Titanium.UI.createAnimation({
      // closes quicker than opens
      opacity: 0,
      duration: duration / 2 });


  }
  $.popover.addEventListener('click', function (e) {
    if (e.source.id == 'backshade' && !disableBackshadeClose) {
      if (true) $.popover.animate(hideAnim);
      setTimeout(function () {
        $.popover.close();
      }, duration);
    }
  });

  $.hideMe = function () {
    if (true) $.popover.animate(hideAnim);
    setTimeout(function () {
      $.popover.close();
    }, duration);
  };

  $.showMe = function (theArgs) {
    var args = theArgs || {};
    if (args.view) {
      try {
        $.contents.removeAllChildren();
      } catch (err) {
        alert(JSON.stringify(err));
      }
      $.contents.add(args.view);
    }
    $.popover.opacity = 0;
    $.popover.open();
    if (true) {
      $.popover.animate(showAnim);
    } else {
      $.popover.opacity = 1;
    }
  };

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/widgets/com.skypanther.alloypopover/controllers/widget.js.map