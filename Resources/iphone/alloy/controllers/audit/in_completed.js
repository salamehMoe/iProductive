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
  this.__controllerPath = 'audit/in_completed';
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
  Alloy.Collections.instance('auditRecord');

  // Generated UI code
  $.__views["inCompleted"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: false, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], title: "In Progress", id: "inCompleted" });

  $.__views["inCompleted"] && $.addTopLevelView($.__views["inCompleted"]);
  $.__views["__alloyId45"] = Alloy.createController('centerNavBtns', { id: "__alloyId45", __parentSymbol: $.__views["inCompleted"] });
  $.__views["__alloyId45"].setParent($.__views["inCompleted"]);
  if (true) {
    $.__views["__alloyId46"] = Ti.UI.createSearchBar(
    { hintText: "Search ...", barColor: "#115EAC", tintColor: "#ffffff", keyboardType: Titanium.UI.RETURNKEY_SEARCH, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, id: "__alloyId46" });

  }
  var __alloyId47 = {};var __alloyId50 = [];var __alloyId51 = { type: 'Ti.UI.Label', bindId: 'info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, color: "black", left: "10dp", top: "15dp", bindId: "info" } };__alloyId50.push(__alloyId51);var __alloyId52 = { type: 'Ti.UI.Label', bindId: 'es_info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, font: { fontSize: "10dp" }, left: "10dp", top: "40dp", color: "black", bindId: "es_info" } };__alloyId50.push(__alloyId52);var __alloyId49 = { properties: { name: "template" }, childTemplates: __alloyId50 };__alloyId47["template"] = __alloyId49;$.__views["headerView"] = Ti.UI.createView(
  { backgroundColor: "#efefef", height: 60, id: "headerView" });

  $.__views["__alloyId56"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: 'Audits started but not yet completed', id: "__alloyId56" });

  $.__views["headerView"].add($.__views["__alloyId56"]);
  if (true) {
    $.__views["editBtn"] = Ti.UI.createButton(
    { right: 20, title: 'Edit', id: "editBtn" });

    $.__views["headerView"].add($.__views["editBtn"]);
  }
  $.__views["__alloyId53"] = Ti.UI.createListSection(
  { headerView: $.__views["headerView"], id: "__alloyId53" });

  var __alloyId60 = Alloy.Collections['auditRecord'] || auditRecord;function __alloyId61(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId61.opts || {};var models = __alloyId60.models;var len = models.length;var __alloyId54 = [];for (var i = 0; i < len; i++) {var __alloyId57 = models[i];__alloyId57.__transform = transformFunction(__alloyId57);var __alloyId59 = { properties: { height: 70, accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE, canEdit: true, title: __alloyId57.__transform.AuditName, searchableText: __alloyId57.__transform.AuditName, auditRecordID: __alloyId57.__transform.id, storeCode: __alloyId57.__transform.storeCode, deptCode: __alloyId57.__transform.deptCode, AuditID: __alloyId57.__transform.AuditID, openDate: __alloyId57.__transform.openDate, submisiondDate: __alloyId57.__transform.submisiondDate, submittedBy: __alloyId57.__transform.submittedBy, online_id: __alloyId57.__transform.online_id, CompanyTypeID: __alloyId57.__transform.CompanyTypeID, DeptCode: __alloyId57.__transform.DeptCode, AuditDesc: __alloyId57.__transform.AuditDesc, Target: __alloyId57.__transform.Target, type: __alloyId57.__transform.type, comment: __alloyId57.__transform.comment }, image: { text: "delete" }, info: { text: __alloyId57.__transform.AuditName }, es_info: { text: __alloyId57.__transform.subTitle } };__alloyId54.push(__alloyId59);}opts.animation ? $.__views["__alloyId53"].setItems(__alloyId54, opts.animation) : $.__views["__alloyId53"].items = __alloyId54;};__alloyId60.on('fetch destroy change add remove reset', __alloyId61);var __alloyId62 = [];__alloyId62.push($.__views["__alloyId53"]);$.__views["list"] = Ti.UI.createListView(
  { defaultItemTemplate: "template", top: 62, sections: __alloyId62, templates: __alloyId47, searchView: $.__views["__alloyId46"], id: "list" });

  $.__views["inCompleted"].add($.__views["list"]);
  openTemplate ? $.addListener($.__views["list"], 'itemclick', openTemplate) : __defers['$.__views["list"]!itemclick!openTemplate'] = true;deleteMe ? $.addListener($.__views["list"], 'delete', deleteMe) : __defers['$.__views["list"]!delete!deleteMe'] = true;var __alloyId64 = [];__alloyId64.push("Yes");__alloyId64.push("No");$.__views["confirmDelete"] = Ti.UI.createAlertDialog(
  { buttonNames: __alloyId64, message: "Are you sure you want to delete?", id: "confirmDelete" });

  exports.destroy = function () {__alloyId60 && __alloyId60.off('fetch destroy change add remove reset', __alloyId61);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var isdeleting = false;

  function confirmDelete(e) {
    //TODO show alerDialog
    isdeleting = true;
    $.confirmDelete.show();
    $.confirmDelete.addEventListener("click", del);
    function del(ev) {
      if (ev.index == 0) {
        //YES
        //alert("YES");
        deleteMe(e);
      } else if (ev.index == 1) {
        //NO
        //alert("NO");
      }
      $.confirmDelete.removeEventListener("click", del);
    }

  }

  var openTemplate = function (e) {
    if (isdeleting) {
      isdeleting = false;
      return;
    }
    var item = e.section.getItemAt(e.itemIndex);

    Alloy.Globals.pageStack.open(Alloy.createController('audit/sections', {
      item: item.properties,
      formPrams: {
        auditRecordID: item.properties.auditRecordID,
        deptCode: item.properties.deptCode,
        store: item.properties.storeCode,
        date: item.properties.openDate,
        comment: item.properties.comment },

      isEditing: true,
      isIncomplete: refreshCollection }).
    getView());

  };

  function transformFunction(model) {

    var transform = model.toJSON();
    transform.subTitle = transform.storeCode + " / " + moment(transform.openDate).format('DD-MM-YYYY HH:mm');

    if (transform.WA == null) {

      transform.subTitle = transform.subTitle;

    } else {

      transform.subTitle = transform.subTitle + "    " + (transform.WA / transform.WT * 100).toFixed(3) + "%";

    }

    return transform;
  }

  function deleteMe(e) {
    isdeleting = true;
    var auditRecordModel = Alloy.Collections.auditRecord.at(e.itemIndex);
    auditRecordModel.destroyAllAnswers();
    auditRecordModel.destroy();
  }

  if (true) {
    $.editBtn.addEventListener('click', function () {
      $.list.editing = !$.list.editing;
    });
  }


  function refreshCollection() {
    try {
      Alloy.Collections.auditRecord.fetch({
        query: "SELECT a.*, t.* ,sum(qu.QWeight) WT, sum((SELECT qu.QWeight  WHERE length(ans.AnswerDate)>0 )) WA FROM auditRecord a  JOIN templates t ON t.AuditID = a.AuditID LEFT JOIN questions qu ON qu.AuditID = a.auditID LEFT JOIN answers ans ON ans.QuestionID = qu.QuestionID  AND ans.AuditRecordID = a.id  WHERE submisiondDate = '' group by a.id"
        // query : "SELECT a.*, t.* ,sum(qu.QWeight) WT, sum((SELECT qu.QWeight  WHERE length(ans.AnswerDate)>0 )) WA FROM auditRecord a  JOIN templates t ON t.AuditID = a.AuditID LEFT JOIN questions qu ON qu.AuditID = a.auditID LEFT JOIN answers ans ON ans.QuestionID = qu.QuestionID  AND ans.AuditRecordID = a.id AND a.submittedBy = \""+Alloy.Globals.user.get('ldap_user')+"\"  WHERE submisiondDate = '' group by a.id"
      });


      //Ti.API.Info('######### REFFFRESHINNNNN');
    } catch (e) {
      //Ti.API.Info('error -> '+JSON.stringify(e));
    }

  }


  refreshCollection();

  $.inCompleted.addEventListener("close", function () {
    $.destroy();
  });

  ///
  // function updateCache() {
  //   var qCollaction = Alloy.createCollection('questions');
  //
  //   qCollaction.on('fetch', function() {
  //   	qCollaction.each(function(model) {
  //   		var qCollectionJSON = model.toJSON();
  //       cacheDraftsQuestions(qCollectionJSON);
  //   	});
  //   });
  // }
  //
  // function cacheDraftsQuestions(questions) {
  //
  // 	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
  // 	if (usersData.filter(function(user){
  // 		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
  // 	}).length) {
  // 		usersData.forEach(function(user, i){
  // 			if (user.user == Ti.App.Properties.getString('lastLoginUser',"noUser")) {
  // 				usersData[i].cachedDraftsQuestions = questions;
  // 			}
  // 		});
  // 	}
  //   Ti.App.Properties.setList("CachedDataByUser",usersData);
  // }

  ///




  //Ti.API.Info('<============ in in_complete, list length is:'+$.list.sections.length);

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["list"]!itemclick!openTemplate'] && $.addListener($.__views["list"], 'itemclick', openTemplate);__defers['$.__views["list"]!delete!deleteMe'] && $.addListener($.__views["list"], 'delete', deleteMe);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/in_completed.js.map