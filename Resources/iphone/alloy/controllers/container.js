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
  this.__controllerPath = 'container';
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
  $.__views["__alloyId340"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], role: "leftWindow", id: "__alloyId340" });

  $.__views["__alloyId341"] = Alloy.createController('left', { id: "__alloyId341", __parentSymbol: $.__views["__alloyId340"] });
  $.__views["__alloyId341"].setParent($.__views["__alloyId340"]);
  if (true) {
    $.__views["__alloyId343"] = Alloy.createController('home', { id: "__alloyId343", __parentSymbol: __parentSymbol });
    $.__views["__alloyId342"] = Ti.UI.createNavigationWindow(
    { window: $.__views["__alloyId343"].getViewEx({ recurse: true }), role: "centerWindow", id: "__alloyId342" });

  }
  if (true) {
    $.__views["profileWin"] = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.borderColor, navTintColor: "#ffffff", barColor: Alloy.CFG.tintColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: false, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "Profile", id: "profileWin" });

    $.__views["__alloyId349"] = Alloy.createController('profile', { id: "__alloyId349", __parentSymbol: $.__views["profileWin"] });
    $.__views["__alloyId349"].setParent($.__views["profileWin"]);
    $.__views["__alloyId348"] = Ti.UI.createNavigationWindow(
    { window: $.__views["profileWin"], role: "rightWindow", id: "__alloyId348" });

  }
  $.__views["drawer"] = Alloy.createWidget('nl.fokkezb.drawer', 'widget', function () {
    var o = {};
    Alloy.deepExtend(true, o, { closeDrawerGestureMode: "CLOSE_MODE_ALL", openDrawerGestureMode: "OPEN_MODE_MARGIN", showShadow: true, leftDrawerWidth: 270, rightDrawerWidth: 320, statusBarStyle: "STATUSBAR_WHITE" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { leftDrawerWidth: 300 });
    Alloy.deepExtend(true, o, { id: "drawer", children: [$.__views["__alloyId340"], $.__views["__alloyId342"], $.__views["__alloyId348"]], __parentSymbol: __parentSymbol });
    return o;
  }()).getViewEx({ recurse: true });
  $.__views["drawer"] && $.addTopLevelView($.__views["drawer"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  Alloy.Globals.drawer = $.drawer;

  Alloy.Globals.drawerToggleLeftWindow = function () {
    $.drawer.toggleLeftWindow();
  };
  Alloy.Globals.drawerToggleRighttWindow = function () {
    $.drawer.toggleRightWindow();
  };

  if (false) {
    $.drawer.addEventListener('open', onNavDrawerWinOpen);

    function onNavDrawerWinOpen(evt) {
      this.removeEventListener('open', onNavDrawerWinOpen);

      // set center area
      Alloy.Globals.pageStack.open(Alloy.createController('home').getView());

      var activity = evt.source.getActivity();
      Alloy.Globals.activity = evt.source.getActivity();
      Alloy.Globals.activeView = 0;

      activity.onCreateOptionsMenu = function (e) {
        //Ti.API.Info("calling onCreateOptionsMenu with activeview = "+Alloy.Globals.activeView);
        var item,
        menu;
        menu = e.menu;
        menu.clear();

        switch (Alloy.Globals.activeView) {
          case 0:
            //Ti.API.Info ("Entering Case 0");
            var menuItem = e.menu.add({
              showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
              icon: "/images/user.png" });


            menuItem.addEventListener("click", function (e) {
              Ti.API.log('right button clicked');
              var win = Ti.UI.createWindow({
                title: 'Profile' });

              var profile = Alloy.createController('profile');
              profile.on('logout', function () {
                win.close();
              });
              win.add(profile.getView());
              win.open();
            });

            break;
          case 1:
            var menuItem2 = e.menu.add({
              showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
              icon: "/images/icons/back.png" });

            menuItem2.addEventListener("click", Alloy.Globals.backSections);

            var menuItem = e.menu.add({
              showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
              icon: "/images/icons/save.png" });

            menuItem.addEventListener("click", Alloy.Globals.saveSections);

            // var item = e.menu.add({
            // title : "Share",
            // showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
            // icon : Ti.Android.R.drawable.ic_menu_send
            // });
            // item.addEventListener("click", Alloy.Globals.saveButton);

            break;

          case 2:

            var menuItem2 = e.menu.add({
              showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
              icon: "/images/icons/back.png" });

            menuItem2.addEventListener("click", Alloy.Globals.backQuestions);

            var menuItem = e.menu.add({
              showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
              icon: "/images/icons/save.png" });

            menuItem.addEventListener("click", Alloy.Globals.saveQuestions);

            // var item = e.menu.add({
            // title : "Share",
            // showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
            // icon : Ti.Android.R.drawable.ic_menu_send
            // });
            // item.addEventListener("click", Alloy.Globals.saveButton);

            break;}





      };

      Alloy.Globals.activity.invalidateOptionsMenu();

      // show an angle bracket next to the home icon,
      // indicating to users that the home icon is tappable
      //actionBar.setDisplayHomeAsUp(true);

      // toggle the left window when the home icon is selected
      Alloy.Globals.activity.getActionBar().onHomeIconItemSelected = function () {
        Ti.API.log('home button clicked');
        $.drawer.toggleLeftWindow();
      };
    }

  }

  if (false) {
    $.drawer.addEventListener("open", function () {
      $.drawer.addEventListener("androidback", function () {

        if ($.drawer.isLeftWindowOpen()) {
          $.drawer.toggleLeftWindow();
          return;
        }

        if (Alloy.Globals.activeView == 1 || Alloy.Globals.activeView == 2)
        {
          //Ti.API.Info("pressing back in navbar");
          return;
        }

        if (Alloy.Globals.pageStack.pages.length > 1) {
          Alloy.Globals.pageStack.close();
          return;
        }

        var alertDialog = Ti.UI.createAlertDialog({
          title: 'Logout',
          message: 'Are you sure?',
          buttonNames: ['OK', 'Cancel'] });


        alertDialog.addEventListener('click', function (e) {

          if (e.index == 0) {
            $.drawer.close();
          }
        });

        alertDialog.show();
      });
    });
  }

  $.drawer.addEventListener("close", function () {
    $.destroy();
    Alloy.Globals.drawerToggleLeftWindow = null;
    Alloy.Globals.drawerToggleRighttWindow = null;
    Alloy.Globals.drawer = null;
  });

  $.drawer.open();

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/container.js.map