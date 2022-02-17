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
  this.__controllerPath = 'audit/pre_survey';
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
  Alloy.Collections.instance('stores');Alloy.Collections.instance('employees');Alloy.Collections.instance('answers');

  // Generated UI code
  $.__views["pre_survey"] = Ti.UI.createView(
  { opacity: 0, id: "pre_survey", title: "Completed Audits" });

  $.__views["pre_survey"] && $.addTopLevelView($.__views["pre_survey"]);
  $.__views["__alloyId97"] = Ti.UI.createView(
  { backgroundColor: "#000000", opacity: 0.7, id: "__alloyId97" });

  $.__views["pre_survey"].add($.__views["__alloyId97"]);
  if (true && Alloy.isTablet) {
    $.__views["storesTypePopover"] = Ti.UI.iPad.createPopover(
    { id: "storesTypePopover" });

    $.__views["pre_survey"].add($.__views["storesTypePopover"]);
    $.__views["storesList"] = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "Select store Type", id: "storesList" });

    var __alloyId103 = [];$.__views["__alloyId104"] = { properties: { height: 50, title: "All", id: "__alloyId104" } };__alloyId103.push($.__views["__alloyId104"]);$.__views["__alloyId105"] = { properties: { height: 50, title: "Supermarket", id: "__alloyId105" } };__alloyId103.push($.__views["__alloyId105"]);$.__views["__alloyId106"] = { properties: { height: 50, title: "Hypermarket", id: "__alloyId106" } };__alloyId103.push($.__views["__alloyId106"]);$.__views["__alloyId101"] = Ti.UI.createListSection(
    { name: "type", id: "__alloyId101" });

    $.__views["__alloyId101"].items = __alloyId103;var __alloyId107 = [];__alloyId107.push($.__views["__alloyId101"]);$.__views["__alloyId100"] = Ti.UI.createListView(
    { defaultItemTemplate: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE, sections: __alloyId107, id: "__alloyId100" });

    $.__views["storesList"].add($.__views["__alloyId100"]);
    selectStoreType ? $.addListener($.__views["__alloyId100"], 'itemclick', selectStoreType) : __defers['$.__views["__alloyId100"]!itemclick!selectStoreType'] = true;$.__views["__alloyId99"] = Ti.UI.createNavigationWindow(
    { window: $.__views["storesList"], height: 300, width: 250, id: "__alloyId99" });

    $.__views["storesTypePopover"].contentView = $.__views["__alloyId99"];}
  if (true && Alloy.isTablet) {
    $.__views["storesPopover"] = Ti.UI.iPad.createPopover(
    { id: "storesPopover" });

    $.__views["pre_survey"].add($.__views["storesPopover"]);
    $.__views["storesList"] = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "Select store", id: "storesList" });

    $.__views["__alloyId111"] = Ti.UI.createListSection(
    { id: "__alloyId111" });

    var __alloyId116 = Alloy.Collections['stores'] || stores;function __alloyId117(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId117.opts || {};var models = __alloyId116.models;var len = models.length;var __alloyId112 = [];for (var i = 0; i < len; i++) {var __alloyId113 = models[i];__alloyId113.__transform = _.isFunction(__alloyId113.transform) ? __alloyId113.transform() : __alloyId113.toJSON();var __alloyId115 = { properties: { height: 50, title: __alloyId113.__transform.StoreDesc, subtitle: __alloyId113.__transform.CountryDesc, StoreCode: __alloyId113.__transform.StoreCode, CountryCode: __alloyId113.__transform.CountryCode, ZoneID: __alloyId113.__transform.ZoneID, ZoneDesc: __alloyId113.__transform.ZoneDesc, CompanyTypeID: __alloyId113.__transform.CompanyTypeID, CompanyTypeDesc: __alloyId113.__transform.CompanyTypeDesc } };__alloyId112.push(__alloyId115);}opts.animation ? $.__views["__alloyId111"].setItems(__alloyId112, opts.animation) : $.__views["__alloyId111"].items = __alloyId112;};__alloyId116.on('fetch destroy change add remove reset', __alloyId117);var __alloyId118 = [];__alloyId118.push($.__views["__alloyId111"]);$.__views["__alloyId110"] = Ti.UI.createListView(
    { defaultItemTemplate: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE, sections: __alloyId118, id: "__alloyId110" });

    $.__views["storesList"].add($.__views["__alloyId110"]);
    selectStore ? $.addListener($.__views["__alloyId110"], 'itemclick', selectStore) : __defers['$.__views["__alloyId110"]!itemclick!selectStore'] = true;$.__views["__alloyId109"] = Ti.UI.createNavigationWindow(
    { window: $.__views["storesList"], height: 300, width: 250, id: "__alloyId109" });

    $.__views["storesPopover"].contentView = $.__views["__alloyId109"];}
  if (true && Alloy.isTablet) {
    $.__views["EmployeePopover"] = Ti.UI.iPad.createPopover(
    { id: "EmployeePopover" });

    $.__views["pre_survey"].add($.__views["EmployeePopover"]);
    $.__views["employeeList"] = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: false, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "Select Employee", id: "employeeList" });

    if (true) {
      $.__views["__alloyId122"] = Ti.UI.createSearchBar(
      { hintText: "Search ...", barColor: "#115EAC", tintColor: "#ffffff", keyboardType: Titanium.UI.RETURNKEY_SEARCH, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, id: "__alloyId122" });

    }
    $.__views["__alloyId123"] = Ti.UI.createListSection(
    { id: "__alloyId123" });

    var __alloyId128 = Alloy.Collections['employees'] || employees;function __alloyId129(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId129.opts || {};var models = __alloyId128.models;var len = models.length;var __alloyId124 = [];for (var i = 0; i < len; i++) {var __alloyId125 = models[i];__alloyId125.__transform = _.isFunction(__alloyId125.transform) ? __alloyId125.transform() : __alloyId125.toJSON();var __alloyId127 = { properties: { height: 50, title: __alloyId125.__transform.Name, EmployeeNo: __alloyId125.__transform.EmployeeNo, StoreCode: __alloyId125.__transform.StoreCode, PositionID: __alloyId125.__transform.PositionID, UserID: __alloyId125.__transform.UserID, searchableText: __alloyId125.__transform.Name } };__alloyId124.push(__alloyId127);}opts.animation ? $.__views["__alloyId123"].setItems(__alloyId124, opts.animation) : $.__views["__alloyId123"].items = __alloyId124;};__alloyId128.on('fetch destroy change add remove reset', __alloyId129);var __alloyId130 = [];__alloyId130.push($.__views["__alloyId123"]);$.__views["__alloyId121"] = Ti.UI.createListView(
    { defaultItemTemplate: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE, sections: __alloyId130, searchView: $.__views["__alloyId122"], top: 43, id: "__alloyId121" });

    $.__views["employeeList"].add($.__views["__alloyId121"]);
    selectStore ? $.addListener($.__views["__alloyId121"], 'itemclick', selectStore) : __defers['$.__views["__alloyId121"]!itemclick!selectStore'] = true;$.__views["__alloyId120"] = Ti.UI.createNavigationWindow(
    { window: $.__views["employeeList"], height: 300, width: 250, id: "__alloyId120" });

    $.__views["EmployeePopover"].contentView = $.__views["__alloyId120"];}
  if (true && Alloy.isTablet) {
    $.__views["datePopover"] = Ti.UI.iPad.createPopover(
    { id: "datePopover", selectionIndicator: true });

    $.__views["pre_survey"].add($.__views["datePopover"]);
    $.__views["__alloyId133"] = Ti.UI.createWindow(
    { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "Start date", id: "__alloyId133" });

    $.__views["datePicker"] = Ti.UI.createPicker(
    { format24: false, calendarViewShown: false, id: "datePicker", enabled: false, type: Ti.UI.PICKER_TYPE_DATE });

    $.__views["__alloyId133"].add($.__views["datePicker"]);
    selectDate ? $.addListener($.__views["datePicker"], 'change', selectDate) : __defers['$.__views["datePicker"]!change!selectDate'] = true;$.__views["__alloyId132"] = Ti.UI.createNavigationWindow(
    { window: $.__views["__alloyId133"], height: 200, width: 250, id: "__alloyId132" });

    $.__views["datePopover"].contentView = $.__views["__alloyId132"];}
  $.__views["containner"] = Ti.UI.createView(
  { layout: "vertical", height: Ti.UI.SIZE, backgroundColor: "#ffffff", width: "80%", borderRadius: 2, id: "containner" });

  $.__views["pre_survey"].add($.__views["containner"]);
  $.__views["__alloyId134"] = Ti.UI.createView(
  { height: 60, id: "__alloyId134" });

  $.__views["containner"].add($.__views["__alloyId134"]);
  $.__views["__alloyId135"] = Ti.UI.createImageView(
  { width: 50, height: 50, image: "/appicon.png", left: 10, id: "__alloyId135" });

  $.__views["__alloyId134"].add($.__views["__alloyId135"]);
  $.__views["titleLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, left: 70, font: { fontSize: 22 }, id: "titleLbl" });

  $.__views["__alloyId134"].add($.__views["titleLbl"]);
  $.__views["__alloyId136"] = Ti.UI.createView(
  { height: 1, backgroundColor: "gray", id: "__alloyId136" });

  $.__views["containner"].add($.__views["__alloyId136"]);
  $.__views["__alloyId137"] = Ti.UI.createView(
  { backgroundColor: "silver", layout: "horizontal", width: "80%", height: 42, top: 20, id: "__alloyId137" });

  $.__views["containner"].add($.__views["__alloyId137"]);
  $.__views["__alloyId138"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT, backgroundColor: "#ffffff", left: 1, bottom: 1, height: Ti.UI.FILL, width: 150, color: "silver", text: 'Audit Template', id: "__alloyId138" });

  $.__views["__alloyId137"].add($.__views["__alloyId138"]);
  $.__views["tempName"] = Ti.UI.createTextField(
  { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, backgroundColor: "#ffffff", left: 0, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, id: "tempName", next: "password" });

  $.__views["__alloyId137"].add($.__views["tempName"]);
  $.__views["storetypeContainer"] = Ti.UI.createView(
  { backgroundColor: "silver", layout: "horizontal", width: "80%", height: 42, top: 20, id: "storetypeContainer" });

  $.__views["containner"].add($.__views["storetypeContainer"]);
  $.__views["storeTypeinForm"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT, backgroundColor: "#ffffff", left: 1, bottom: 1, height: Ti.UI.FILL, width: 150, color: "silver", text: 'Store Type', id: "storeTypeinForm" });

  $.__views["storetypeContainer"].add($.__views["storeTypeinForm"]);
  $.__views["__alloyId140"] = Ti.UI.createButton(
  { image: "/images/icons/user.png", id: "__alloyId140" });

  $.__views["storeType"] = Ti.UI.createTextField(
  { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, backgroundColor: "#ffffff", left: 0, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, rightButton: $.__views["__alloyId140"], id: "storeType" });

  $.__views["storetypeContainer"].add($.__views["storeType"]);
  storesTypePickerShow ? $.addListener($.__views["storeType"], 'click', storesTypePickerShow) : __defers['$.__views["storeType"]!click!storesTypePickerShow'] = true;$.__views["__alloyId140"] = Ti.UI.createButton(
  { rightButton: $.__views["__alloyId140"], id: "storeType", left: 0, image: "/images/icons/user.png" });

  $.__views["__alloyId141"] = Ti.UI.createView(
  { backgroundColor: "silver", layout: "horizontal", width: "80%", height: 42, top: 20, id: "__alloyId141" });

  $.__views["containner"].add($.__views["__alloyId141"]);
  $.__views["storeinForm"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT, backgroundColor: "#ffffff", left: 1, bottom: 1, height: Ti.UI.FILL, width: 150, color: "silver", editable: false, text: 'Store', id: "storeinForm" });

  $.__views["__alloyId141"].add($.__views["storeinForm"]);
  $.__views["__alloyId143"] = Ti.UI.createButton(
  { image: "/images/icons/user.png", id: "__alloyId143" });

  $.__views["store"] = Ti.UI.createTextField(
  { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, backgroundColor: "#ffffff", left: 0, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, rightButton: $.__views["__alloyId143"], id: "store" });

  $.__views["__alloyId141"].add($.__views["store"]);
  storesPickerShow ? $.addListener($.__views["store"], 'click', storesPickerShow) : __defers['$.__views["store"]!click!storesPickerShow'] = true;$.__views["__alloyId143"] = Ti.UI.createButton(
  { rightButton: $.__views["__alloyId143"], id: "store", left: 0, image: "/images/icons/user.png" });

  $.__views["__alloyId144"] = Ti.UI.createView(
  { backgroundColor: "silver", layout: "horizontal", width: "80%", height: 42, top: 20, id: "__alloyId144" });

  $.__views["containner"].add($.__views["__alloyId144"]);
  $.__views["__alloyId145"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT, backgroundColor: "#ffffff", left: 1, bottom: 1, height: Ti.UI.FILL, width: 150, color: "silver", text: 'Start date', id: "__alloyId145" });

  $.__views["__alloyId144"].add($.__views["__alloyId145"]);
  $.__views["__alloyId147"] = Ti.UI.createButton(
  { image: "/images/icons/calendar.png", id: "__alloyId147" });

  $.__views["date"] = Ti.UI.createTextField(
  { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, backgroundColor: "#ffffff", left: 0, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, rightButton: $.__views["__alloyId147"], id: "date", ref: "date" });

  $.__views["__alloyId144"].add($.__views["date"]);
  datePickerShow ? $.addListener($.__views["date"], 'click', datePickerShow) : __defers['$.__views["date"]!click!datePickerShow'] = true;$.__views["__alloyId147"] = Ti.UI.createButton(
  { rightButton: $.__views["__alloyId147"], id: "date", ref: "date", left: 0, image: "/images/icons/calendar.png" });

  $.__views["__alloyId148"] = Ti.UI.createView(
  { backgroundColor: "silver", layout: "horizontal", width: "80%", height: 42, top: 20, id: "__alloyId148" });

  $.__views["containner"].add($.__views["__alloyId148"]);
  $.__views["__alloyId149"] = Ti.UI.createLabel(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT, backgroundColor: "#ffffff", left: 1, bottom: 1, height: Ti.UI.FILL, width: 150, color: "silver", text: 'Audit by', id: "__alloyId149" });

  $.__views["__alloyId148"].add($.__views["__alloyId149"]);
  $.__views["auditBy"] = Ti.UI.createTextField(
  { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, backgroundColor: "#ffffff", left: 0, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 }, editable: false, id: "auditBy" });

  $.__views["__alloyId148"].add($.__views["auditBy"]);
  $.__views["__alloyId150"] = Ti.UI.createView(
  { layout: "horizontal", right: "10%", top: 20, width: Ti.UI.SIZE, height: 40, id: "__alloyId150" });

  $.__views["containner"].add($.__views["__alloyId150"]);
  $.__views["backBtn"] = Ti.UI.createButton(
  { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.tintColor, borderRadius: 2, font: { fontSize: 22 }, width: 100, right: 20, title: 'Cancel', id: "backBtn" });

  $.__views["__alloyId150"].add($.__views["backBtn"]);
  back ? $.addListener($.__views["backBtn"], 'click', back) : __defers['$.__views["backBtn"]!click!back'] = true;$.__views["startBtn"] = Ti.UI.createButton(
  { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.borderColor, borderRadius: 2, font: { fontSize: 22 }, width: 180, title: 'Start Audit', id: "startBtn" });

  $.__views["__alloyId150"].add($.__views["startBtn"]);
  startSurvey ? $.addListener($.__views["startBtn"], 'click', startSurvey) : __defers['$.__views["startBtn"]!click!startSurvey'] = true;$.__views["__alloyId151"] = Ti.UI.createView(
  { height: 20, id: "__alloyId151" });

  $.__views["containner"].add($.__views["__alloyId151"]);
  exports.destroy = function () {__alloyId116 && __alloyId116.off('fetch destroy change add remove reset', __alloyId117);__alloyId128 && __alloyId128.off('fetch destroy change add remove reset', __alloyId129);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var onNext = null,
  item = {},
  lastSelectedStore = {};
  var lastSelectedStoreType = {};


  var today = new Date();
  $.datePicker.setValue(today);
  $.date.setValue(today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2));
  $.date.saveDate = Alloy.Globals.getFullDate();

  $.auditBy.setValue(Alloy.Globals.user.get('Username'));

  var storesPickerShow = function () {
    //alert(item.DeptCode);
    if (item.type == 2) {
      $.EmployeePopover.show({
        view: $.store });


    } else {
      $.storesPopover.show({
        view: $.store });


    }

  };

  var storesTypePickerShow = function () {
    //Ti.API.Info('####### item: '+JSON.stringify(item));
    //alert(item.DeptCode);
    if (item.type == 2) {
      // $.EmployeePopover.show({
      //     view : $.store
      // });

    } else {
      $.storesTypePopover.show({
        view: $.store });


    }

  };

  var storesTypePickerHide = function () {
    if (item.type == 2) {
      $.EmployeePopover.hide();
    } else {
      $.storesTypePopover.hide();
    }

  };


  var storesPickerHide = function () {
    if (item.type == 2) {
      $.EmployeePopover.hide();
    } else {
      $.storesPopover.hide();
    }

  };

  var selectStoreType = function (e) {
    storesTypePickerHide();
    lastSelectedStoreType = e.section.getItemAt(e.itemIndex);

    // mark check
    if (lastSelectedStoreType.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
      lastSelectedStoreType.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
    } else {
      lastSelectedStoreType.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
    }
    e.section.updateItemAt(e.itemIndex, lastSelectedStoreType);

    // un-mark
    if ($.storeType.lastIndex != e.itemIndex) {
      try {
        var lastItem = e.section.getItemAt($.storeType.lastIndex);
        lastItem.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
        e.section.updateItemAt($.storeType.lastIndex, lastItem);
      }
      catch (e)
      {}
    }

    $.storeType.lastIndex = e.itemIndex;
    switch (e.itemIndex) {
      case 0:

        try {
          Alloy.Collections.stores.fetch({
            query: "SELECT * from stores" });

        } catch (e) {
          //Ti.API.Info('error -> '+JSON.stringify(e));
        }
        break;
      case 1:
        try {
          Alloy.Collections.stores.fetch({
            query: "SELECT * from stores WHERE CompanyTypeDesc = 'Supermarket'" });

        } catch (e) {
          //Ti.API.Info('error -> '+JSON.stringify(e));
        }

        break;
      case 2:
        try {
          Alloy.Collections.stores.fetch({
            query: "SELECT * from stores WHERE CompanyTypeDesc = 'Hypermarket'" });

        } catch (e) {
          //Ti.API.Info('error -> '+JSON.stringify(e));
        }
        break;}

    $.storeType.setValue(lastSelectedStoreType.properties.title);
  };

  var selectStore = function (e) {
    storesPickerHide();
    lastSelectedStore = e.section.getItemAt(e.itemIndex);

    // mark check
    if (lastSelectedStore.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
      lastSelectedStore.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
    } else {
      lastSelectedStore.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
    }
    e.section.updateItemAt(e.itemIndex, lastSelectedStore);

    // un-mark
    if ($.store.lastIndex != e.itemIndex) {
      try {
        var lastItem = e.section.getItemAt($.store.lastIndex);
        lastItem.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
        e.section.updateItemAt($.store.lastIndex, lastItem);
      }
      catch (e)
      {}
    }

    $.store.lastIndex = e.itemIndex;
    $.store.setValue(lastSelectedStore.properties.title);
  };
  var datePickerShow = function (e) {
    return;
    $.datePopover.show({
      view: $[e.source.ref] });


    $.datePopover.ref = e.source.ref;
  };
  var selectDate = function (e) {
    $[$.datePopover.ref].setValue(e.value.getFullYear() + '-' + ("0" + (e.value.getMonth() + 1)).slice(-2) + '-' + ("0" + e.value.getDate()).slice(-2));
    $[$.datePopover.ref].saveDate = Alloy.Globals.getFullDate(e.value);
    $.datePopover.hide();
  };


  exports.show = function (e) {
    //Ti.API.Info ("Entering Show: " + e.item.title);
    //Ti.API.Info('show test 1');
    onNext = e.onNext || null;
    //Ti.API.Info('show test 2');
    item = e.item || {};
    //Ti.API.Info('show test 3');
    $.titleLbl.setText(e.item.title);
    //Ti.API.Info('show test 4');
    $.tempName.setValue(e.item.title);
    //Ti.API.Info('show test 5');
    $.storeType.setValue("All");
    //Ti.API.Info('show test 6');
    if (item.type == 2) {
      //Ti.API.Info('show test 7');
      try {
        Alloy.Collections.employees.fetch({
          query: "SELECT * from employees WHERE AuditID = " + item.AuditID });

      } catch (e) {

      } //Ti.API.Info('error -> '+JSON.stringify(e));
      //Ti.API.Info('show test 8');
    } else {
      //Ti.API.Info('show test 9');
      Alloy.Collections.stores.fetch();
    }
    //Ti.API.Info('show test 10');
    if (item.type == 2) {
      //Ti.API.Info('show test 11');
      $.storeinForm.setText("Employee Name");
      //Ti.API.Info('show test 12');
      $.storetypeContainer.visible = false;
      //Ti.API.Info('show test 13');
      $.storetypeContainer.height = 0;
      //Ti.API.Info('show test 14');

    } else {
      //Ti.API.Info('show test 15');
      $.storeinForm.setText("Store");
      $.storetypeContainer.visible = true;
      $.storetypeContainer.height = "42dp";
    }
    //Ti.API.Info('show test 16');
    $.store.setValue('');
    //Ti.API.Info('show test 17');
    $.pre_survey.animate({
      opacity: 1 });

  };

  exports.hide = function () {

    $.pre_survey.animate({
      opacity: 0 },
    function () {
      //$.destroy();
    });

    if (!true) {
      $.pre_survey.getParent().remove($.pre_survey);
    }
  };

  var startSurvey = function () {

    if (lastSelectedStore == {} || $.date.getValue().length == 0) {
      Ti.UI.createAlertDialog({
        title: 'Error',
        message: 'Fill the form please' }).
      show();
      return;
    }

    if (item.type == 2) {
      var myModel = Alloy.createModel('auditRecord', {
        storeCode: lastSelectedStore.properties.StoreCode,
        auditID: item.AuditID,
        deptCode: item.DeptCode,
        submittedBy: Alloy.Globals.user.get('ldap_user'),
        openDate: $.date.saveDate,
        EmployeeNo: lastSelectedStore.properties.EmployeeNo,
        UserID: lastSelectedStore.properties.UserID,
        PositionID: lastSelectedStore.properties.PositionID });



    } else {

      var myModel = Alloy.createModel('auditRecord', {
        storeCode: lastSelectedStore.properties.StoreCode,
        auditID: item.AuditID,
        deptCode: item.DeptCode,
        submittedBy: Alloy.Globals.user.get('ldap_user'),
        openDate: $.date.saveDate });

    }
    myModel.save();

    // copy questions to empty answers
    myModel.createEmptyAnswers(item.type);

    if (onNext) {
      onNext({
        auditRecordID: myModel.get('id'),
        deptCode: myModel.get('deptCode'),
        store: lastSelectedStore.properties,
        date: $.date.getValue() });

    }
    exports.hide();
  };

  var back = function () {
    // rewrite the default Date
    $.datePicker.setValue(today);
    $.date.setValue(today.getFullYear() + "-" + (1 + today.getMonth()) + "-" + today.getDate());

    exports.hide();


  };

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId100"]!itemclick!selectStoreType'] && $.addListener($.__views["__alloyId100"], 'itemclick', selectStoreType);__defers['$.__views["__alloyId110"]!itemclick!selectStore'] && $.addListener($.__views["__alloyId110"], 'itemclick', selectStore);__defers['$.__views["__alloyId121"]!itemclick!selectStore'] && $.addListener($.__views["__alloyId121"], 'itemclick', selectStore);__defers['$.__views["datePicker"]!change!selectDate'] && $.addListener($.__views["datePicker"], 'change', selectDate);__defers['$.__views["storeType"]!click!storesTypePickerShow'] && $.addListener($.__views["storeType"], 'click', storesTypePickerShow);__defers['$.__views["store"]!click!storesPickerShow'] && $.addListener($.__views["store"], 'click', storesPickerShow);__defers['$.__views["date"]!click!datePickerShow'] && $.addListener($.__views["date"], 'click', datePickerShow);__defers['$.__views["backBtn"]!click!back'] && $.addListener($.__views["backBtn"], 'click', back);__defers['$.__views["startBtn"]!click!startSurvey'] && $.addListener($.__views["startBtn"], 'click', startSurvey);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/pre_survey.js.map