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
  this.__controllerPath = 'left';
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
  Alloy.Collections.instance('tasks');Alloy.Models.instance('user');

  // Generated UI code
  $.__views["left"] = Ti.UI.createView(
  { id: "left" });

  $.__views["left"] && $.addTopLevelView($.__views["left"]);
  $.__views["__alloyId387"] = Ti.UI.createView(
  { top: 0, height: 140, id: "__alloyId387" });

  $.__views["left"].add($.__views["__alloyId387"]);
  if (true) {
    $.__views["__alloyId388"] = Alloy.Globals.blur.createGPUBlurImageView(
    { width: Ti.UI.FILL, height: Ti.UI.FILL, top: 0, image: "/images/Carrefour-Logo.jpg", backgroundRepeat: true, blur: { type: Alloy.Globals.blur.IOS_BLUR, radiusInPixels: 4 }, id: "__alloyId388" });

    $.__views["__alloyId387"].add($.__views["__alloyId388"]);
  }
  $.__views["avatar"] = Ti.UI.createImageView(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { width: 80, height: 80, borderRadius: 40, top: 40, left: 10, backgroundImage: "/images/user.png" });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { width: 70, height: 70, borderRadius: 35, top: 40, left: 10, backgroundImage: "/images/user.png" });
    Alloy.deepExtend(true, o, { id: "avatar" });
    return o;
  }());

  $.__views["__alloyId387"].add($.__views["avatar"]);
  changeUserImage ? $.addListener($.__views["avatar"], 'click', changeUserImage) : __defers['$.__views["avatar"]!click!changeUserImage'] = true;$.__views["name"] = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { textAlign: "left", color: "#115EAC", font: { fontSize: 24, fontWeight: "bold" }, left: 100, zIndex: 4 });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { color: "#115EAC", font: { fontSize: 22 }, left: 100, textAlign: "left", zIndex: 4 });
    Alloy.deepExtend(true, o, { id: "name" });
    return o;
  }());

  $.__views["__alloyId387"].add($.__views["name"]);
  var __alloyId389 = {};var __alloyId392 = [];var __alloyId394 = { type: 'Ti.UI.View', childTemplates: function () {var __alloyId395 = [];var __alloyId397 = { type: 'Ti.UI.ImageView', bindId: 'icon', properties: function () {
          var o = {};
          Alloy.deepExtend(true, o, { width: 42, height: 42, left: 8 });
          if (Alloy.isHandheld) Alloy.deepExtend(true, o, { width: 30, height: 30, left: 7 });
          Alloy.deepExtend(true, o, { bindId: "icon" });
          return o;
        }() };__alloyId395.push(__alloyId397);var __alloyId399 = { type: 'Ti.UI.Label', bindId: 'Title', properties: function () {
          var o = {};
          Alloy.deepExtend(true, o, { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, left: 65, color: "#115EAC", font: { fontSize: 18 } });
          if (Alloy.isHandheld) Alloy.deepExtend(true, o, { left: 50, color: "#115EAC", font: { fontSize: 16 } });
          Alloy.deepExtend(true, o, { bindId: "Title" });
          return o;
        }() };__alloyId395.push(__alloyId399);return __alloyId395;}(), properties: function () {
      var o = {};
      Alloy.deepExtend(true, o, { height: 65, backgroundColor: "#E5E5E5" });
      if (Alloy.isHandheld) Alloy.deepExtend(true, o, { height: 45, backgroundColor: "#E5E5E5" });
      return o;
    }() };__alloyId392.push(__alloyId394);var __alloyId391 = { properties: { name: "elementTemplate", backgroundColor: "#E5E5E5", height: 45 }, childTemplates: __alloyId392 };__alloyId389["elementTemplate"] = __alloyId391;var __alloyId401 = [];$.__views["__alloyId402"] = { properties: { height: 70, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.BLUE, ref: "home", id: "__alloyId402" }, icon: { image: "/images/icons/home.png" }, Title: { text: "Dashboard" } };__alloyId401.push($.__views["__alloyId402"]);$.__views["dashboardSec"] = Ti.UI.createListSection(
  { id: "dashboardSec" });

  $.__views["dashboardSec"].items = __alloyId401;var __alloyId403 = [];__alloyId403.push($.__views["dashboardSec"]);$.__views["__alloyId406"] = Ti.UI.createView(
  { backgroundColor: "#ffffff", height: 52, separatorColor: "#115EAC", id: "__alloyId406" });

  $.__views["__alloyId407"] = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, color: "#115EAC", font: { fontSize: 22, fontWeight: "bold" }, left: 25 });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { color: "#115EAC", font: { fontSize: 20 }, left: 25 });
    Alloy.deepExtend(true, o, { text: 'My Audits', id: "__alloyId407" });
    return o;
  }());

  $.__views["__alloyId406"].add($.__views["__alloyId407"]);
  $.__views["__alloyId408"] = Ti.UI.createView(
  { bottom: 0, height: 1, left: 0, right: 10, backgroundColor: "gray", id: "__alloyId408" });

  $.__views["__alloyId406"].add($.__views["__alloyId408"]);
  var __alloyId409 = [];$.__views["__alloyId410"] = { properties: { height: 70, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.BLUE, ref: "audit/index", id: "__alloyId410" }, icon: { image: "/images/icons/template.png" }, Title: { text: "Templates" } };__alloyId409.push($.__views["__alloyId410"]);$.__views["__alloyId411"] = { properties: { height: 70, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.BLUE, ref: "audit/in_completed", id: "__alloyId411" }, icon: { image: "/images/icons/document.png" }, Title: { text: "Incomplete" } };__alloyId409.push($.__views["__alloyId411"]);$.__views["__alloyId412"] = { properties: { height: 70, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.BLUE, ref: "audit/completed", id: "__alloyId412" }, icon: { image: "/images/icons/checkmark.png" }, Title: { text: "Complete" } };__alloyId409.push($.__views["__alloyId412"]);$.__views["__alloyId413"] = { properties: { height: 70, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.BLUE, ref: "audit/history", id: "__alloyId413" }, icon: { image: "/images/icons/history.png" }, Title: { text: "History" } };__alloyId409.push($.__views["__alloyId413"]);$.__views["auditSec"] = Ti.UI.createListSection(
  { headerView: $.__views["__alloyId406"], id: "auditSec" });

  $.__views["auditSec"].items = __alloyId409;__alloyId403.push($.__views["auditSec"]);$.__views["__alloyId416"] = Ti.UI.createView(
  { backgroundColor: "#ffffff", height: 52, separatorColor: "#115EAC", id: "__alloyId416" });

  $.__views["__alloyId417"] = Ti.UI.createLabel(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, color: "#115EAC", font: { fontSize: 22, fontWeight: "bold" }, left: 25 });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { color: "#115EAC", font: { fontSize: 20 }, left: 25 });
    Alloy.deepExtend(true, o, { text: 'My Tasks', id: "__alloyId417" });
    return o;
  }());

  $.__views["__alloyId416"].add($.__views["__alloyId417"]);
  $.__views["__alloyId418"] = Ti.UI.createView(
  { bottom: 0, height: 1, left: 0, right: 10, backgroundColor: "gray", id: "__alloyId418" });

  $.__views["__alloyId416"].add($.__views["__alloyId418"]);
  $.__views["tasksSec"] = Ti.UI.createListSection(
  { headerView: $.__views["__alloyId416"], id: "tasksSec" });

  var __alloyId422 = Alloy.Collections['tasks'] || tasks;function __alloyId423(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId423.opts || {};var models = __alloyId422.models;var len = models.length;var __alloyId414 = [];for (var i = 0; i < len; i++) {var __alloyId419 = models[i];__alloyId419.__transform = _.isFunction(__alloyId419.transform) ? __alloyId419.transform() : __alloyId419.toJSON();var __alloyId421 = { properties: { height: 70, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.BLUE, ref: "tasks/tasksList", res: __alloyId419.__transform.TaskID }, icon: { image: "/images/icons/calendar.png" }, Title: { text: __alloyId419.__transform.TaskName } };__alloyId414.push(__alloyId421);}opts.animation ? $.__views["tasksSec"].setItems(__alloyId414, opts.animation) : $.__views["tasksSec"].items = __alloyId414;};__alloyId422.on('fetch destroy change add remove reset', __alloyId423);__alloyId403.push($.__views["tasksSec"]);$.__views["__alloyId426"] = Ti.UI.createView(
  { backgroundColor: "#ffffff", height: 15, separatorColor: "#115EAC", id: "__alloyId426" });

  $.__views["__alloyId427"] = Ti.UI.createView(
  { bottom: 0, height: 1, left: 0, right: 10, backgroundColor: "gray", id: "__alloyId427" });

  $.__views["__alloyId426"].add($.__views["__alloyId427"]);
  var __alloyId428 = [];$.__views["__alloyId429"] = { properties: { height: 70, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.BLUE, ref: "synchronization", id: "__alloyId429" }, icon: { image: "/images/icons/cloud.png" }, Title: { text: "Synchronization" } };__alloyId428.push($.__views["__alloyId429"]);$.__views["syncSec"] = Ti.UI.createListSection(
  { headerView: $.__views["__alloyId426"], id: "syncSec" });

  $.__views["syncSec"].items = __alloyId428;__alloyId403.push($.__views["syncSec"]);$.__views["list"] = Ti.UI.createListView(
  { defaultItemTemplate: "elementTemplate", separatorColor: "transparent", top: 140, backgroundColor: "#E5E5E5", sections: __alloyId403, templates: __alloyId389, id: "list" });

  $.__views["left"].add($.__views["list"]);
  openScreen ? $.addListener($.__views["list"], 'itemclick', openScreen) : __defers['$.__views["list"]!itemclick!openScreen'] = true;var __alloyId430 = function () {Alloy['Models']['user'].__transform = _.isFunction(Alloy['Models']['user'].transform) ? Alloy['Models']['user'].transform() : Alloy['Models']['user'].toJSON();$.name.text = Alloy['Models']['user']['__transform']['Username'];};Alloy['Models']['user'].on('fetch change destroy', __alloyId430);exports.destroy = function () {__alloyId422 && __alloyId422.off('fetch destroy change add remove reset', __alloyId423);Alloy['Models']['user'] && Alloy['Models']['user'].off('fetch change destroy', __alloyId430);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var openScreen = function (e) {
    //Ti.API.Info('>>>>>>> CHECK 1 on openScreen');
    Alloy.Globals.drawerToggleLeftWindow();
    //Ti.API.Info('>>>>>>> CHECK 2 on openScreen');
    Alloy.Globals.pageStack.open(Alloy.createController(e.section.getItemAt(e.itemIndex).properties.ref, {
      res: e.section.getItemAt(e.itemIndex).properties.res || false,
      windowTitle: e.section.getItemAt(e.itemIndex).properties.title }).
    getView(), true);

  };

  //TODO clean this image after logout
  function changeUserImage(e) {

    Titanium.Media.openPhotoGallery({
      allowEditing: true,
      popoverView: true ? e.source : null,
      arrowDirection: true ? Titanium.UI.iPad.POPOVER_ARROW_DIRECTION_UP : null,
      autohide: true ? true : null,
      mediaTypes: true ? Titanium.Media.MEDIA_TYPE_PHOTO : null,
      success: function (event) {
        Ti.API.error(JSON.stringify(event));

        if (true) {
          var imageAsTaken = Ti.UI.createImageView({
            image: event.media });


          imageAsTaken = imageAsTaken.toImage().imageAsThumbnail(80);
        }
        //Save local

        var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userImage");

        if (true) {
          f.write(imageAsTaken);
        } else {
          f.write(event.media);
        }
        $.avatar.setImage("ayKalam");
        $.avatar.setImage(f.getNativePath());

      } });


  }

  if (Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userImage").exists()) {
    $.avatar.setImage(Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userImage"));
  }

  // remove Tasks section if not allowed for logged in user
  try {
    if (Alloy.Globals.user.get('HasTaskList') == 1) {
      try {
        Alloy.Collections.tasks.fetch({
          query: "SELECT TaskName, TaskID FROM tasks GROUP BY TaskID ORDER BY TaskOrder" });

      } catch (e) {
        //Ti.API.Info('error -> '+JSON.stringify(e));
      }

    }
  } catch (e) {

  } //Ti.API.Info('error --> '+JSON.stringify(e));



  // set sections
  var sectionsArr = [];

  // Dashboard only if has tasks
  if (Alloy.Globals.user.get('HasTaskList') == 1 || true) {
    sectionsArr.push($.dashboardSec);
  }

  // Audit only if iPad
  //By Hassanisipad
  //if (Alloy.Globals.isiPad){
  if (Alloy.Globals.isiPad || Alloy.Globals.isTablet) {
    sectionsArr.push($.auditSec);
  }

  // Tasks only if has tasks
  if (Alloy.Globals.user.get('HasTaskList') == 1) {
    sectionsArr.push($.tasksSec);
  }

  // sync for everyone
  sectionsArr.push($.syncSec);
  $.list.sections = sectionsArr;
  sectionsArr = null;

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["avatar"]!click!changeUserImage'] && $.addListener($.__views["avatar"], 'click', changeUserImage);__defers['$.__views["list"]!itemclick!openScreen'] && $.addListener($.__views["list"], 'itemclick', openScreen);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/left.js.map