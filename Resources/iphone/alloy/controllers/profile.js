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
  this.__controllerPath = 'profile';
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
  Alloy.Models.instance('user');

  // Generated UI code
  $.__views["profile"] = Ti.UI.createView(
  { id: "profile" });

  $.__views["profile"] && $.addTopLevelView($.__views["profile"]);
  var __alloyId434 = [];__alloyId434.push("OK");__alloyId434.push("Cancel");$.__views["alertDialog"] = Ti.UI.createAlertDialog(
  { buttonNames: __alloyId434, title: "Logout", message: "Are you sure?", id: "alertDialog" });

  var __alloyId437 = 7;;var __alloyId440 = [];__alloyId440.push("Sunday");__alloyId440.push("Monday");__alloyId440.push("Tuesday");__alloyId440.push("Wednesday");__alloyId440.push("Thursday");__alloyId440.push("Friday");__alloyId440.push("Saturday");if (true) {
    __alloyId440.push("Cancel");}
  $.__views["weekPopover"] = Ti.UI.createOptionDialog(
  { options: __alloyId440, id: "weekPopover", title: "Select day", cancel: 7 });

  selectWeek ? $.addListener($.__views["weekPopover"], 'click', selectWeek) : __defers['$.__views["weekPopover"]!click!selectWeek'] = true;if (true && Alloy.isTablet) {
    $.__views["weekPopover"] = Ti.UI.iPad.createPopover(
    { id: "weekPopover" });

    $.__views["profile"].add($.__views["weekPopover"]);
    $.__views["weekPopoverWin"] = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], id: "weekPopoverWin" });

    var __alloyId454 = [];$.__views["__alloyId455"] = { properties: { height: 50, title: "Sunday", id: "__alloyId455" } };__alloyId454.push($.__views["__alloyId455"]);$.__views["__alloyId456"] = { properties: { height: 50, title: "Monday", id: "__alloyId456" } };__alloyId454.push($.__views["__alloyId456"]);$.__views["__alloyId457"] = { properties: { height: 50, title: "Tuesday", id: "__alloyId457" } };__alloyId454.push($.__views["__alloyId457"]);$.__views["__alloyId458"] = { properties: { height: 50, title: "Wednesday", id: "__alloyId458" } };__alloyId454.push($.__views["__alloyId458"]);$.__views["__alloyId459"] = { properties: { height: 50, title: "Thursday", id: "__alloyId459" } };__alloyId454.push($.__views["__alloyId459"]);$.__views["__alloyId460"] = { properties: { height: 50, title: "Friday", id: "__alloyId460" } };__alloyId454.push($.__views["__alloyId460"]);$.__views["__alloyId461"] = { properties: { height: 50, title: "Saturday", id: "__alloyId461" } };__alloyId454.push($.__views["__alloyId461"]);$.__views["__alloyId452"] = Ti.UI.createListSection(
    { id: "__alloyId452" });

    $.__views["__alloyId452"].items = __alloyId454;var __alloyId462 = [];__alloyId462.push($.__views["__alloyId452"]);$.__views["__alloyId451"] = Ti.UI.createListView(
    { defaultItemTemplate: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE, sections: __alloyId462, id: "__alloyId451" });

    $.__views["weekPopoverWin"].add($.__views["__alloyId451"]);
    selectWeek ? $.addListener($.__views["__alloyId451"], 'itemclick', selectWeek) : __defers['$.__views["__alloyId451"]!itemclick!selectWeek'] = true;$.__views["__alloyId450"] = Ti.UI.createNavigationWindow(
    { window: $.__views["weekPopoverWin"], height: 300, width: 200, id: "__alloyId450" });

    $.__views["weekPopover"].contentView = $.__views["__alloyId450"];}
  if (true && Alloy.isTablet) {
    $.__views["datePopover"] = Ti.UI.iPad.createPopover(
    { id: "datePopover", selectionIndicator: true });

    $.__views["profile"].add($.__views["datePopover"]);
    $.__views["__alloyId465"] = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], id: "__alloyId465" });

    $.__views["datePicker"] = Ti.UI.createPicker(
    { format24: false, calendarViewShown: false, id: "datePicker", type: Ti.UI.PICKER_TYPE_DATE });

    $.__views["__alloyId465"].add($.__views["datePicker"]);
    selectDate ? $.addListener($.__views["datePicker"], 'change', selectDate) : __defers['$.__views["datePicker"]!change!selectDate'] = true;$.__views["__alloyId464"] = Ti.UI.createNavigationWindow(
    { window: $.__views["__alloyId465"], height: 200, width: 250, id: "__alloyId464" });

    $.__views["datePopover"].contentView = $.__views["__alloyId464"];}
  $.__views["__alloyId466"] = Ti.UI.createScrollView(
  { layout: "vertical", top: 60, id: "__alloyId466" });

  $.__views["profile"].add($.__views["__alloyId466"]);
  $.__views["__alloyId467"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId467" });

  $.__views["__alloyId466"].add($.__views["__alloyId467"]);
  $.__views["versionCode"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, id: "versionCode", value: "iProductive V2.8" });
    return o;
  }());

  $.__views["__alloyId467"].add($.__views["versionCode"]);
  $.__views["__alloyId468"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId468" });

  $.__views["__alloyId466"].add($.__views["__alloyId468"]);
  $.__views["username"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, hintText: "Username", id: "username" });
    return o;
  }());

  $.__views["__alloyId468"].add($.__views["username"]);
  $.__views["__alloyId469"] = Ti.UI.createButton(
  { top: null, width: 25, height: 25, right: 10, backgroundImage: "/images/icons/user.png", id: "__alloyId469" });

  $.__views["__alloyId468"].add($.__views["__alloyId469"]);
  $.__views["__alloyId470"] = Ti.UI.createView(
  { width: "80%", height: 42, top: 20, id: "__alloyId470" });

  $.__views["__alloyId466"].add($.__views["__alloyId470"]);
  $.__views["__alloyId471"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, width: "80%", text: 'Sync check list', left: 0, id: "__alloyId471" });

  $.__views["__alloyId470"].add($.__views["__alloyId471"]);
  $.__views["ForceSync"] = Ti.UI.createSwitch(
  { editable: false, hintText: "Sync Check List", right: 0, id: "ForceSync" });

  $.__views["__alloyId470"].add($.__views["ForceSync"]);
  $.__views["__alloyId472"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId472" });

  $.__views["__alloyId466"].add($.__views["__alloyId472"]);
  $.__views["startOfWeek"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, hintText: "Start of work week", id: "startOfWeek", ref: "startOfWeek", popOverTitle: "Start of week" });
    return o;
  }());

  $.__views["__alloyId472"].add($.__views["startOfWeek"]);
  showWeekPopover ? $.addListener($.__views["startOfWeek"], 'click', showWeekPopover) : __defers['$.__views["startOfWeek"]!click!showWeekPopover'] = true;$.__views["__alloyId473"] = Ti.UI.createButton(
  { top: null, width: 25, height: 25, right: 10, backgroundImage: "/images/icons/picker.png", ref: "startOfWeek", popOverTitle: "Start of week", id: "__alloyId473" });

  $.__views["__alloyId472"].add($.__views["__alloyId473"]);
  showWeekPopover ? $.addListener($.__views["__alloyId473"], 'click', showWeekPopover) : __defers['$.__views["__alloyId473"]!click!showWeekPopover'] = true;$.__views["__alloyId474"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId474" });

  $.__views["__alloyId466"].add($.__views["__alloyId474"]);
  $.__views["endOfWeek"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, hintText: "End of work week", id: "endOfWeek", ref: "endOfWeek", popOverTitle: "End of week" });
    return o;
  }());

  $.__views["__alloyId474"].add($.__views["endOfWeek"]);
  showWeekPopover ? $.addListener($.__views["endOfWeek"], 'click', showWeekPopover) : __defers['$.__views["endOfWeek"]!click!showWeekPopover'] = true;$.__views["__alloyId475"] = Ti.UI.createButton(
  { top: null, width: 25, height: 25, right: 10, backgroundImage: "/images/icons/picker.png", ref: "endOfWeek", popOverTitle: "End of week", id: "__alloyId475" });

  $.__views["__alloyId474"].add($.__views["__alloyId475"]);
  showWeekPopover ? $.addListener($.__views["__alloyId475"], 'click', showWeekPopover) : __defers['$.__views["__alloyId475"]!click!showWeekPopover'] = true;$.__views["__alloyId476"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId476" });

  $.__views["__alloyId466"].add($.__views["__alloyId476"]);
  $.__views["endOfMonth"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, hintText: "End of month date", id: "endOfMonth", ref: "endOfMonth" });
    return o;
  }());

  $.__views["__alloyId476"].add($.__views["endOfMonth"]);
  showDatePopover ? $.addListener($.__views["endOfMonth"], 'click', showDatePopover) : __defers['$.__views["endOfMonth"]!click!showDatePopover'] = true;$.__views["__alloyId477"] = Ti.UI.createButton(
  { top: null, width: 25, height: 25, right: 10, backgroundImage: "/images/icons/calendar.png", ref: "endOfMonth", id: "__alloyId477" });

  $.__views["__alloyId476"].add($.__views["__alloyId477"]);
  showDatePopover ? $.addListener($.__views["__alloyId477"], 'click', showDatePopover) : __defers['$.__views["__alloyId477"]!click!showDatePopover'] = true;$.__views["__alloyId478"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId478" });

  $.__views["__alloyId466"].add($.__views["__alloyId478"]);
  $.__views["endOfQuarter"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, hintText: "End of quarter date", id: "endOfQuarter", ref: "endOfQuarter" });
    return o;
  }());

  $.__views["__alloyId478"].add($.__views["endOfQuarter"]);
  showDatePopover ? $.addListener($.__views["endOfQuarter"], 'click', showDatePopover) : __defers['$.__views["endOfQuarter"]!click!showDatePopover'] = true;$.__views["__alloyId479"] = Ti.UI.createButton(
  { top: null, width: 25, height: 25, right: 10, backgroundImage: "/images/icons/calendar.png", ref: "endOfQuarter", id: "__alloyId479" });

  $.__views["__alloyId478"].add($.__views["__alloyId479"]);
  showDatePopover ? $.addListener($.__views["__alloyId479"], 'click', showDatePopover) : __defers['$.__views["__alloyId479"]!click!showDatePopover'] = true;$.__views["__alloyId480"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId480" });

  $.__views["__alloyId466"].add($.__views["__alloyId480"]);
  $.__views["endOfSemester"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, hintText: "End of semester date", id: "endOfSemester", ref: "endOfSemester" });
    return o;
  }());

  $.__views["__alloyId480"].add($.__views["endOfSemester"]);
  showDatePopover ? $.addListener($.__views["endOfSemester"], 'click', showDatePopover) : __defers['$.__views["endOfSemester"]!click!showDatePopover'] = true;$.__views["__alloyId481"] = Ti.UI.createButton(
  { top: null, width: 25, height: 25, right: 10, backgroundImage: "/images/icons/calendar.png", ref: "endOfSemester", id: "__alloyId481" });

  $.__views["__alloyId480"].add($.__views["__alloyId481"]);
  showDatePopover ? $.addListener($.__views["__alloyId481"], 'click', showDatePopover) : __defers['$.__views["__alloyId481"]!click!showDatePopover'] = true;$.__views["__alloyId482"] = Ti.UI.createView(
  { backgroundColor: "silver", width: "80%", height: 42, top: 20, id: "__alloyId482" });

  $.__views["__alloyId466"].add($.__views["__alloyId482"]);
  $.__views["endOfYear"] = Ti.UI.createTextField(
  function () {
    var o = {};
    Alloy.deepExtend(true, o, { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS });
    if (Alloy.isHandheld) Alloy.deepExtend(true, o, { font: { size: 18 } });
    Alloy.deepExtend(true, o, { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, hintText: "End of year date", id: "endOfYear", ref: "endOfYear" });
    return o;
  }());

  $.__views["__alloyId482"].add($.__views["endOfYear"]);
  showDatePopover ? $.addListener($.__views["endOfYear"], 'click', showDatePopover) : __defers['$.__views["endOfYear"]!click!showDatePopover'] = true;$.__views["__alloyId483"] = Ti.UI.createButton(
  { top: null, width: 25, height: 25, right: 10, backgroundImage: "/images/icons/calendar.png", ref: "endOfYear", id: "__alloyId483" });

  $.__views["__alloyId482"].add($.__views["__alloyId483"]);
  showDatePopover ? $.addListener($.__views["__alloyId483"], 'click', showDatePopover) : __defers['$.__views["__alloyId483"]!click!showDatePopover'] = true;$.__views["__alloyId484"] = Ti.UI.createView(
  { height: 80, id: "__alloyId484" });

  $.__views["__alloyId466"].add($.__views["__alloyId484"]);
  $.__views["__alloyId485"] = Ti.UI.createButton(
  { top: 15, width: 120, color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.tintColor, borderRadius: 2, font: { fontSize: 22 }, title: "Save", right: "5%", id: "__alloyId485" });

  $.__views["__alloyId484"].add($.__views["__alloyId485"]);
  save ? $.addListener($.__views["__alloyId485"], 'click', save) : __defers['$.__views["__alloyId485"]!click!save'] = true;$.__views["__alloyId486"] = Ti.UI.createButton(
  { top: 15, width: 120, color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.borderColor, borderRadius: 2, font: { fontSize: 22 }, title: "Logout", left: "5%", id: "__alloyId486" });

  $.__views["__alloyId484"].add($.__views["__alloyId486"]);
  logOut ? $.addListener($.__views["__alloyId486"], 'click', logOut) : __defers['$.__views["__alloyId486"]!click!logOut'] = true;var __alloyId487 = function () {Alloy['Models']['user'].__transform = _.isFunction(Alloy['Models']['user'].transform) ? Alloy['Models']['user'].transform() : Alloy['Models']['user'].toJSON();$.username.value = Alloy['Models']['user']['__transform']['Username'];$.ForceSync.enabled = Alloy['Models']['user']['__transform']['EnableSyncBool'];$.ForceSync.value = Alloy['Models']['user']['__transform']['ForceSyncBool'];$.startOfWeek.value = Alloy['Models']['user']['__transform']['startOfWeekStr'];$.endOfWeek.value = Alloy['Models']['user']['__transform']['endOfWeekStr'];$.endOfMonth.value = Alloy['Models']['user']['__transform']['endOfMonth'];$.endOfQuarter.value = Alloy['Models']['user']['__transform']['endOfQuarter'];$.endOfSemester.value = Alloy['Models']['user']['__transform']['endOfSemester'];$.endOfYear.value = Alloy['Models']['user']['__transform']['endOfYear'];};Alloy['Models']['user'].on('fetch change destroy', __alloyId487);exports.destroy = function () {Alloy['Models']['user'] && Alloy['Models']['user'].off('fetch change destroy', __alloyId487);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  $.versionCode.value = "iProductive V" + Titanium.App.version;
  function logOut() {

    $.alertDialog.addEventListener('click', function (e) {

      if (e.index == 0) {
        //Alloy.Models.user.destory();
        //deleteData();
        Ti.App.fireEvent('logout');
        if (!true) {
          $.trigger('logout');
        }
        if (Alloy.Globals.drawer != undefined) {
          Alloy.Globals.drawer.close();
        }
      }
    });

    $.alertDialog.show();
    if (true) {
      Alloy.Globals.drawerToggleRighttWindow();
    }
  }

  function deleteData() {
    var db = Ti.Database.open('_alloy_');
    _.each(['answers', 'auditRecord', 'employees', 'questions_answers_scorecard', 'questions_scorecard', 'questions', 'sections', 'stores', 'tasks_completed', 'tasks', 'templates', 'user', 'sqlite_sequence'], function (table) {
      try {
        db.execute("DELETE FROM " + table);
      } catch (err) {
      }
    });
    db.close();
    //Ti.App.Properties.removeProperty('lastLoginUser');
  }

  function save() {

    Alloy.Models.user.save({
      ForceSync: [true, 'true', 1, '1'].indexOf($.ForceSync.getValue()) != -1 ? 1 : 0 });

    if (true) {
      Alloy.Globals.drawerToggleRighttWindow();
    } else {
      $.trigger('logout');
    }
    Alloy.Models.user.fetch({
      id: Alloy.Globals.user.get('ldap_user') });

  }


  var showWeekPopover = function (e) {
    if (Alloy.Globals.isiPad) {
      $.weekPopoverWin.title = e.source.popOverTitle;
    }
    $.weekPopover.show({
      view: $[e.source.ref] });

    $.weekPopover.ref = e.source.ref;
  };

  var selectWeek = function (e) {

    var index = e.hasOwnProperty('itemIndex') ? e.itemIndex : e.index;

    if (true && e.cancel == index) {
      return;
    }

    // show the name of day and save number of day
    Alloy.Models.user.set($.weekPopover.ref, index + 1);

    $.weekPopover.hide();
  };

  var showDatePopover = function (e) {
    return false;
    $.datePopover.show({
      view: $[e.source.ref] });


    $.datePopover.ref = e.source.ref;
  };

  var selectDate = function (e) {
    Alloy.Models.user.set($.datePopover.ref, e.value.getFullYear() + "-" + (e.value.getMonth() + 1) + "-" + e.value.getDate());
    $.datePopover.hide();
  };

  // update model data
  Alloy.Models.user.fetch({
    id: Alloy.Globals.user.get('ldap_user') });


  // Update day strings on update day number
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  Alloy.Models.user.on('change:startOfWeek', function (e) {
    Alloy.Models.user.set('startOfWeekStr', days[Alloy.Models.user.get('startOfWeek') - 1]);
  });

  Alloy.Models.user.on('change:endOfWeek', function (e) {
    Alloy.Models.user.set('endOfWeekStr', days[Alloy.Models.user.get('endOfWeek') - 1]);
  });

  Alloy.Models.user.on('change:EnableSync', function (e) {
    Alloy.Models.user.set('EnableSyncBool', Alloy.Models.user.get('EnableSync') == 1);
  });

  Alloy.Models.user.on('change:ForceSync', function (e) {
    Alloy.Models.user.set('ForceSyncBool', Alloy.Models.user.get('ForceSync') == 1);
  });

  // Show initial values for strings
  Alloy.Models.user.trigger('change:startOfWeek');
  Alloy.Models.user.trigger('change:endOfWeek');
  Alloy.Models.user.trigger('change:EnableSync');
  Alloy.Models.user.trigger('change:ForceSync');

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["weekPopover"]!click!selectWeek'] && $.addListener($.__views["weekPopover"], 'click', selectWeek);__defers['$.__views["__alloyId451"]!itemclick!selectWeek'] && $.addListener($.__views["__alloyId451"], 'itemclick', selectWeek);__defers['$.__views["datePicker"]!change!selectDate'] && $.addListener($.__views["datePicker"], 'change', selectDate);__defers['$.__views["startOfWeek"]!click!showWeekPopover'] && $.addListener($.__views["startOfWeek"], 'click', showWeekPopover);__defers['$.__views["__alloyId473"]!click!showWeekPopover'] && $.addListener($.__views["__alloyId473"], 'click', showWeekPopover);__defers['$.__views["endOfWeek"]!click!showWeekPopover'] && $.addListener($.__views["endOfWeek"], 'click', showWeekPopover);__defers['$.__views["__alloyId475"]!click!showWeekPopover'] && $.addListener($.__views["__alloyId475"], 'click', showWeekPopover);__defers['$.__views["endOfMonth"]!click!showDatePopover'] && $.addListener($.__views["endOfMonth"], 'click', showDatePopover);__defers['$.__views["__alloyId477"]!click!showDatePopover'] && $.addListener($.__views["__alloyId477"], 'click', showDatePopover);__defers['$.__views["endOfQuarter"]!click!showDatePopover'] && $.addListener($.__views["endOfQuarter"], 'click', showDatePopover);__defers['$.__views["__alloyId479"]!click!showDatePopover'] && $.addListener($.__views["__alloyId479"], 'click', showDatePopover);__defers['$.__views["endOfSemester"]!click!showDatePopover'] && $.addListener($.__views["endOfSemester"], 'click', showDatePopover);__defers['$.__views["__alloyId481"]!click!showDatePopover'] && $.addListener($.__views["__alloyId481"], 'click', showDatePopover);__defers['$.__views["endOfYear"]!click!showDatePopover'] && $.addListener($.__views["endOfYear"], 'click', showDatePopover);__defers['$.__views["__alloyId483"]!click!showDatePopover'] && $.addListener($.__views["__alloyId483"], 'click', showDatePopover);__defers['$.__views["__alloyId485"]!click!save'] && $.addListener($.__views["__alloyId485"], 'click', save);__defers['$.__views["__alloyId486"]!click!logOut'] && $.addListener($.__views["__alloyId486"], 'click', logOut);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/profile.js.map