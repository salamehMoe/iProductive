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
  this.__controllerPath = 'audit/sections';
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
  Alloy.Collections.instance('sections');

  // Generated UI code
  $.__views["sections"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: false, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], id: "sections", title: "Template Sections" });

  $.__views["sections"] && $.addTopLevelView($.__views["sections"]);
  if (true) {
    $.__views["__alloyId313"] = Ti.UI.createSearchBar(
    { hintText: "Search ...", barColor: "#115EAC", tintColor: "#ffffff", keyboardType: Titanium.UI.RETURNKEY_SEARCH, returnKeyType: Titanium.UI.RETURNKEY_SEARCH, id: "__alloyId313" });

  }
  var __alloyId314 = {};var __alloyId317 = [];var __alloyId318 = { type: 'Ti.UI.Label', bindId: 'info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, color: "black", left: "10dp", top: 0, bindId: "info" } };__alloyId317.push(__alloyId318);var __alloyId319 = { type: 'Ti.UI.Label', bindId: 'es_info', properties: { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, font: { fontSize: "14dp" }, left: "10dp", top: "25dp", color: "blue", bindId: "es_info" } };__alloyId317.push(__alloyId319);var __alloyId316 = { properties: { name: "template" }, childTemplates: __alloyId317 };__alloyId314["template"] = __alloyId316;$.__views["headerView"] = Ti.UI.createView(
  { backgroundColor: "#efefef", height: 60, id: "headerView" });

  $.__views["sectionHeaderLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, id: "sectionHeaderLbl" });

  $.__views["headerView"].add($.__views["sectionHeaderLbl"]);
  $.__views["commentBtn"] = Ti.UI.createButton(
  { right: 20, color: "white", backgroundColor: "#115EAC", width: 105, borderRadius: 3, title: 'Comment', id: "commentBtn" });

  $.__views["headerView"].add($.__views["commentBtn"]);
  openComment ? $.addListener($.__views["commentBtn"], 'click', openComment) : __defers['$.__views["commentBtn"]!click!openComment'] = true;$.__views["__alloyId320"] = Ti.UI.createListSection(
  { headerView: $.__views["headerView"], id: "__alloyId320" });

  var __alloyId326 = Alloy.Collections['sections'] || sections;function __alloyId327(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId327.opts || {};var models = __alloyId326.models;var len = models.length;var __alloyId321 = [];for (var i = 0; i < len; i++) {var __alloyId323 = models[i];__alloyId323.__transform = transformFunction(__alloyId323);var __alloyId325 = { properties: { height: 60, accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE, SectionID: __alloyId323.__transform.SectionID, searchableText: __alloyId323.__transform.SectionDesc, weightTotal: __alloyId323.__transform.weightTotal }, info: { text: __alloyId323.__transform.SectionDesc }, es_info: { text: __alloyId323.__transform.subTitle } };__alloyId321.push(__alloyId325);}opts.animation ? $.__views["__alloyId320"].setItems(__alloyId321, opts.animation) : $.__views["__alloyId320"].items = __alloyId321;};__alloyId326.on('fetch destroy change add remove reset', __alloyId327);var __alloyId328 = [];__alloyId328.push($.__views["__alloyId320"]);$.__views["list"] = Ti.UI.createListView(
  { defaultItemTemplate: "template", top: 62, sections: __alloyId328, templates: __alloyId314, searchView: $.__views["__alloyId313"], id: "list" });

  $.__views["sections"].add($.__views["list"]);
  clickSection ? $.addListener($.__views["list"], 'itemclick', clickSection) : __defers['$.__views["list"]!itemclick!clickSection'] = true;$.__views["answersLayer"] = Ti.UI.createView(
  { opacity: 0, id: "answersLayer", title: "Completed Audits" });

  $.__views["answersLayer"] && $.addTopLevelView($.__views["answersLayer"]);
  $.__views["__alloyId329"] = Ti.UI.createView(
  { backgroundColor: "#000000", opacity: 0.7, id: "__alloyId329" });

  $.__views["answersLayer"].add($.__views["__alloyId329"]);
  $.__views["containner"] = Ti.UI.createView(
  { layout: "vertical", height: Ti.UI.SIZE, backgroundColor: "#ffffff", width: "80%", borderRadius: 2, id: "containner" });

  $.__views["answersLayer"].add($.__views["containner"]);
  $.__views["__alloyId330"] = Ti.UI.createView(
  { height: 60, id: "__alloyId330" });

  $.__views["containner"].add($.__views["__alloyId330"]);
  $.__views["__alloyId331"] = Ti.UI.createImageView(
  { width: 50, height: 50, image: "/appicon.png", left: 10, id: "__alloyId331" });

  $.__views["__alloyId330"].add($.__views["__alloyId331"]);
  $.__views["titleLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, text: "Add comment to the Template", left: 73, font: { fontSize: 22 }, id: "titleLbl" });

  $.__views["__alloyId330"].add($.__views["titleLbl"]);
  $.__views["__alloyId332"] = Ti.UI.createView(
  { height: 1, backgroundColor: "gray", id: "__alloyId332" });

  $.__views["containner"].add($.__views["__alloyId332"]);
  $.__views["__alloyId333"] = Ti.UI.createView(
  { backgroundColor: "silver", layout: "horizontal", width: "80%", height: 200, top: 20, id: "__alloyId333" });

  $.__views["containner"].add($.__views["__alloyId333"]);
  $.__views["__alloyId334"] = Ti.UI.createLabel(
  { textAlign: "center", backgroundColor: "#ffffff", font: { fontSize: 19 }, left: 1, bottom: 2, height: Ti.UI.FILL, width: 110, color: "silver", text: 'Comment', id: "__alloyId334" });

  $.__views["__alloyId333"].add($.__views["__alloyId334"]);
  $.__views["Comment"] = Ti.UI.createTextArea(
  { color: Alloy.CFG.borderColor, top: 0, left: 0, right: 0, bottom: 2, hintText: "comment....", padding: { right: 3 }, font: { fontSize: 19 }, keyboardType: Ti.UI.KEYBOARD_DEFAULT, returnKeyType: Ti.UI.RETURNKEY_DONE, bubbleParent: false, id: "Comment" });

  $.__views["__alloyId333"].add($.__views["Comment"]);
  $.__views["__alloyId335"] = Ti.UI.createView(
  { backgroundColor: "white", layout: "horizontal", width: "90%", height: 40, top: 60, id: "__alloyId335" });

  $.__views["containner"].add($.__views["__alloyId335"]);
  $.__views["Score"] = Ti.UI.createLabel(
  { textAlign: "center", backgroundColor: "#ffffff", font: { fontSize: 16 }, left: 1, bottom: 2, height: Ti.UI.FILL, width: 300, color: "blue", text: 'Hello world', id: "Score" });

  $.__views["__alloyId335"].add($.__views["Score"]);
  $.__views["__alloyId336"] = Ti.UI.createView(
  { layout: "horizontal", right: "10%", top: 70, width: Ti.UI.SIZE, height: 40, id: "__alloyId336" });

  $.__views["containner"].add($.__views["__alloyId336"]);
  $.__views["cancelBtn"] = Ti.UI.createButton(
  { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.tintColor, borderRadius: 2, font: { fontSize: 22 }, width: 100, right: 20, title: 'Cancel', id: "cancelBtn" });

  $.__views["__alloyId336"].add($.__views["cancelBtn"]);
  hideanswerLayer ? $.addListener($.__views["cancelBtn"], 'click', hideanswerLayer) : __defers['$.__views["cancelBtn"]!click!hideanswerLayer'] = true;$.__views["saveBtn"] = Ti.UI.createButton(
  { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.borderColor, borderRadius: 2, font: { fontSize: 22 }, width: 180, title: 'Save Comment', id: "saveBtn" });

  $.__views["__alloyId336"].add($.__views["saveBtn"]);
  saveComment ? $.addListener($.__views["saveBtn"], 'click', saveComment) : __defers['$.__views["saveBtn"]!click!saveComment'] = true;$.__views["__alloyId337"] = Ti.UI.createView(
  { height: 20, id: "__alloyId337" });

  $.__views["containner"].add($.__views["__alloyId337"]);
  exports.destroy = function () {__alloyId326 && __alloyId326.off('fetch destroy change add remove reset', __alloyId327);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  //Ti.API.Info("hi from sections");
  args.notEditable = args.notEditable || false;
  var isScoreCard = args.item.type == 2;
  var totalScore = "";
  var totalWeight = "";
  var totalWeightTotal = 0;
  var win = Ti.UI.currentWindow;

  //Ti.API.Info('>>>>>>>> in sections');

  Alloy.Globals.Penalities = 0;

  // $.sections.addEventListener("open", function(e) {
  //
  // $.index.activity.addEventListener("resume", function() {
  //
  // alert("resume");
  //
  // });
  // $.index.activity.addEventListener("pause", function() {
  //
  // alert("pause");
  //
  // });
  //
  // });

  var clickSection = function (e) {

    var item = e.section.getItemAt(e.itemIndex);
    if (isScoreCard) {
      Alloy.Globals.pageStack.open(Alloy.createController('audit/scoreCardQuestions', {
        AuditID: args.item.AuditID,
        auditRecordID: args.formPrams.auditRecordID,
        deptCode: args.formPrams.deptCode,
        section: item.properties,
        template: args.item,
        notEditable: args.notEditable,
        saveCallBack: save,
        refreshSections: refreshSections }).
      getView());

    } else {

      Alloy.Globals.pageStack.open(Alloy.createController('audit/questions', {
        AuditID: args.item.AuditID,
        auditRecordID: args.formPrams.auditRecordID,
        deptCode: args.formPrams.deptCode,
        section: item.properties,
        template: args.item,
        notEditable: args.notEditable,
        saveCallBack: save,
        isIncomplete: args.isIncomplete,
        refreshSections: refreshSections }).
      getView());
    }
  };

  $.sectionHeaderLbl.setText(args.item.title);
  //$.Comment.setValue(args.formPrams.comment);

  function refreshSections() {

    var tableName = isScoreCard ? 'questions_scorecard' : 'questions',
    select = isScoreCard ? "" : ", IFNULL(sum(q.QWeight), 0) weightTotal ";

    var query = "select dt_sections.FuckedID FuckedID, dt_sections.SectionID SectionID, dt_sections.AuditID AuditID, dt_sections.sectionDesc SectionDesc, dt_sections.SectionOrder SectionOrder, dt_sections.ParentID ParentID, dt_sections.RootID RootID";
    query += select + " from " + tableName + " q inner join ";
    query += " (select s1.FuckedID, s1.SectionID, s1.AuditID, s1.sectionDesc, s1.SectionOrder, s1.ParentID, s1.RootID, s.sectionid fuck, s.AuditID";
    if (isScoreCard) {
      query += " from sections s inner join sections  s1 on s.rootid = s1.sectionid where s1.AuditID = " + args.item.AuditID + " ) dt_sections";

    } else {
      query += " from sections s inner join sections  s1 on s.rootid = s1.sectionid where s1.AuditID = " + args.item.AuditID + " and s.AuditID = " + args.item.AuditID + " ) dt_sections";

    }
    if (isScoreCard) {
      query += " on q.sectionid = dt_sections.fuck ";
    } else {
      query += " on q.sectionid = dt_sections.fuck and q.AuditID = " + args.item.AuditID;
    }
    query += " group by dt_sections.sectionid  ";

    if (isScoreCard) {
      query = "SELECT s1.* " + select + "FROM sections s1 " + "JOIN " + tableName + " q ON q.AuditID = s1.AuditID AND (q.SectionID = s.SectionID or q.SectionID = s1.SectionID) " + "LEFT JOIN sections s ON s.AuditID = s1.AuditID AND s1.SectionID = s.ParentID " + "WHERE s1.AuditID = " + args.item.AuditID + " AND s1.ParentID = 0 " + "group by s1.SectionID " + "ORDER BY s1.SectionOrder";

    }
    //Ti.API.Info(query);

    try {
      Alloy.Collections.sections.fetch({
        query: query //"SELECT s1.* " + select + "FROM sections s1 " + "JOIN " + tableName + " q ON q.AuditID = s1.AuditID AND (q.SectionID = s.SectionID or q.SectionID = s1.SectionID) " + "LEFT JOIN sections s ON s.AuditID = s1.AuditID AND (s1.SectionID = s.ParentID or s1.ParentID = s.SectionID) " + "WHERE s1.AuditID = " + args.item.AuditID + " AND s1.ParentID = 0 " + "group by s1.SectionID " + "ORDER BY s1.SectionOrder"
      });
    } catch (e) {

    } //Ti.API.Info('error -> '+JSON.stringify(e));


    ////Ti.API.Info("SELECT s1.* " + select + "FROM sections s1 " + "JOIN " + tableName + " q ON q.AuditID = s1.AuditID AND (q.SectionID = s.SectionID or q.SectionID = s1.SectionID) " + "LEFT JOIN sections s ON s.AuditID = s1.AuditID AND (s1.SectionID = s.ParentID or s1.ParentID = s.SectionID) " + "WHERE s1.AuditID = " + args.item.AuditID + " AND s1.ParentID = 0 " + "group by s1.SectionID " + "ORDER BY s1.SectionOrder");

  }

  refreshSections();

  function transformFunction(model) {
    var transform = model.toJSON();
    if (isScoreCard) {
      return _.extend(transform, {
        subTitle: '' });

    }

    totalScore = model.getTotalScore(args.formPrams.auditRecordID);
    //Ti.API.Info('Total Score = ' + totalScore);
    totalWeight = model.getTotalWeight(args.formPrams.auditRecordID);
    //Ti.API.Info('Total Weight = ' + totalWeight);
    totalWeightTotal = model.getTotalWeightTotal(args.formPrams.auditRecordID);

    transform.weight = model.getWeight(args.formPrams.auditRecordID, true);

    //Ti.API.Info(' transform.weightTotal = ' + transform.weightTotal);

    //Ti.API.Info(' transform.weight = ' + transform.weight);

    transform.scorePercent = model.getScore(args.formPrams.auditRecordID, true, transform.weight == transform.weightTotal);
    //Ti.API.Info('Total Weight total = ' + totalWeightTotal);
    totalScore = transform.scorePercent;

    transform.subTitle = transform.weight + ' / ' + transform.weightTotal + "        Finished: " + ((transform.weight / transform.weightTotal || 0) * 100).toFixed(3) + " %       Score: " + totalScore + " %";
    return transform;
  }

  function resetNavBar() {
    // if(OS_IOS)
    // return;
    // var activity = Ti.Android.currentActivity;
    // // need to explicitly use getXYZ methods
    // var actionBar = activity.getActionBar();
    //
    // if (actionBar) {
    // // Now we can do stuff to the actionbar
    // actionBar.setTitle('iProductive');
    //
    // actionBar.setIcon('/images/appicon.png');
    //
    // activity.onCreateOptionsMenu = function(e) {
    // var menuItem = e.menu.add({
    // showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
    // icon : "/images/user.png"
    // });
    // menuItem.addEventListener("click", function(e) {
    // Ti.API.log('right button clicked');
    // var win = Ti.UI.createWindow({
    // title : 'Profile'
    // });
    // var profile = Alloy.createController('profile');
    // profile.on('logout', function() {
    // win.close();
    // });
    // win.add(profile.getView());
    // win.open();
    // });
    // };
    // activity.invalidateOptionsMenu();
    //
    // // show an angle bracket next to the home icon,
    // // indicating to users that the home icon is tappable
    // //actionBar.setDisplayHomeAsUp(true);
    //
    // // toggle the left window when the home icon is selected
    // // actionBar.onHomeIconItemSelected = function() {
    // // Ti.API.log('home button clicked');
    // // $.drawer.toggleLeftWindow();
    // // };
    // }
  }

  function reset() {
    var confirm = Ti.UI.createAlertDialog({
      title: 'Are you sure?',
      message: 'Reset auditing?',
      buttonNames: ['Reset', 'Cancel'] });


    confirm.addEventListener('click', function (e) {
      switch (e.index) {
        case 0:
          var answersCollaction = Alloy.createCollection('answers');

          answersCollaction.on('fetch', function () {
            var model = answersCollaction.models[0];
            //Ti.API.Info("here loop count:" + model.get('count'));

            var myModel = Alloy.createModel('auditRecord');

            myModel.fetch({
              id: args.formPrams.auditRecordID });


            myModel.save({
              online_id: '' });

            Alloy.Collections.auditRecord.remove(myModel);

            Alloy.Globals.pageStack.close($.sections);

          });
          try {
            answersCollaction.fetch({
              query: "SELECT count(a.id) count, (SELECT count(at.id) FROM answers at WHERE at.AuditRecordID = a.AuditRecordID) total FROM answers a WHERE AuditRecordID = " + args.formPrams.auditRecordID + " AND length(AnswerDate) > 0" });

          } catch (e) {
            //Ti.API.Info('error -> '+JSON.stringify(e));
          }

          resetNavBar();

          //alert("Reset Clicked");
          break;
        case 1:

          // alert("Cancel Clicked");
          Alloy.Globals.pageStack.close($.sections);
          resetNavBar();
          // var answersCollaction = Alloy.createCollection('answers');
          //
          // answersCollaction.on('fetch', function() {
          // var model = answersCollaction.models[0];
          // //Ti.API.Info("here loop count:" + model.get('count'));
          //
          // if (model.get('count') < model.get('total') || model.get('count') == 0) {
          //
          // Ti.UI.createAlertDialog({
          // title : 'This Audit form NOT completed',
          // message : 'you have to complete the audit form to submit it.'
          // }).show();
          //
          // answersCollaction = null;
          // } else {
          // var myModel = Alloy.createModel('auditRecord');
          //
          // myModel.fetch({
          // id : args.formPrams.auditRecordID
          // });
          //
          // myModel.save({
          // submisiondDate : Alloy.Globals.getFullDate(),
          // submittedBy : Alloy.Globals.user.get('ldap_user')
          // });
          // Alloy.Collections.auditRecord.remove(myModel);
          //
          // Alloy.Globals.pageStack.close($.sections);
          // }
          //
          // });
          // answersCollaction.fetch({
          // query : "SELECT count(a.id) count, (SELECT count(at.id) FROM answers at WHERE at.AuditRecordID = a.AuditRecordID) total FROM answers a WHERE AuditRecordID = " + args.formPrams.auditRecordID + " AND length(AnswerDate) > 0"
          // });
          // resetNavBar();
          break;}

    });

    confirm.show();
  }

  function save() {
    var confirm = Ti.UI.createAlertDialog({
      title: 'Are you sure?',
      message: 'Do you want to exit this audit? You may continue later.',
      buttonNames: ['Save as a draft', 'Submit to server', 'Cancel'] });


    confirm.addEventListener('click', function (e) {
      switch (e.index) {
        case 0:
          //Ti.API.Info('case 0 <============================');
          Alloy.Globals.pageStack.close($.sections);
          resetNavBar();
          break;
        case 1:
          //Ti.API.Info('case 1 <============================');
          var answersCollaction = Alloy.createCollection('answers');

          answersCollaction.on('fetch', function () {
            var model = answersCollaction.models[0];
            //Ti.API.Info("here loop count:" + model.get('count'));
            //Ti.API.Info("count = " + model.get('count') + " total= " + model.get('total'));
            //Ti.API.Info("the audit is " + args.item.AuditID);

            if (model.get('count') < model.get('total') || model.get('count') == 0) {

              Ti.UI.createAlertDialog({
                title: 'This audit has not yet been completed',
                message: 'Please answer all questions before submitting it to the server.' }).
              show();

              answersCollaction = null;
            } else {
              var myModel = Alloy.createModel('auditRecord');

              myModel.fetch({
                id: args.formPrams.auditRecordID });


              myModel.save({
                submisiondDate: Alloy.Globals.getFullDate(),
                submittedBy: Alloy.Globals.user.get('ldap_user') });

              Alloy.Collections.auditRecord.remove(myModel);

              Alloy.Globals.pageStack.close($.sections);

            }

          });
          try {
            answersCollaction.fetch({
              query: "SELECT count(a.id) count, (SELECT count(at.id) FROM answers at WHERE at.AuditRecordID = a.AuditRecordID) total FROM answers a WHERE AuditRecordID = " + args.formPrams.auditRecordID + " AND length(AnswerDate) > 0" });

          } catch (e) {
            //Ti.API.Info('error -> '+JSON.stringify(e));
          }
          updateCache();
          resetNavBar();
          break;}

    });

    confirm.show();
  }

  function close() {

    var confirm = Ti.UI.createAlertDialog({
      title: 'Are you sure?',
      message: 'Do you want to exit this audit? You may continue later.',
      buttonNames: ['No', 'Yes'] });


    confirm.addEventListener('click', function (e) {
      if (e.index == 1) {
        //Ti.API.Info('case 1 <============================');
        updateCache();
        Alloy.Globals.pageStack.close($.sections);
        resetNavBar();
      }
    });

    confirm.show();
  }

  function updateCache() {
    cacheQuestions();
  }


  function cacheQuestions() {
    //Ti.API.Info('>>> in updateCache');
    var qCollaction = Alloy.createCollection('questions');
    //Ti.API.Info('>>> in updateCache 2');

    // qCollaction.on('fetch', function() {
    // 	//Ti.API.Info('>>> in updateCache 3');
    // 	var totalQuestions = []
    // 	qCollaction.each(function(model) {
    // 		totalQuestions.push(model.toJSON());
    //
    //
    // 	});
    // 	//Ti.API.Info('/////////////qCollection to backup////////\n\n '+JSON.stringify(totalQuestions)+'\n\n////////////////////////');
    // 	cacheDraftsQuestions(totalQuestions);
    // });
    qCollaction.fetch({
      success: function () {
        //Ti.API.Info('>>> in updateCache 3');
        cacheDraftsQuestions(JSON.stringify(qCollaction.models));
        cacheSections();
        // var totalQuestions = [];
        // _.each(qCollaction.models, function(element, index, list){
        //     totalQuestions.push(element.toJSON());
        // });
        // //Ti.API.Info('/////////////qCollection to backup////////\n\n '+JSON.stringify(totalQuestions)+'\n\n////////////////////////');
        // cacheDraftsQuestions(totalQuestions);
      },
      error: function () {
        // something is wrong..
      } });

  }

  function cacheSections() {
    // cacheDraftsAudits(JSON.stringify(Alloy.Collections.auditRecord));
    // //Ti.API.Info('trying to cache: ---> '+ JSON.stringify(Alloy.Collections.auditRecord));
    var sCollaction = Alloy.createCollection('sections');
    sCollaction.fetch({
      success: function () {
        //Ti.API.Info('>>> in updateCache audits !!!!!!!<<<<<<<<<');
        cacheDraftsSections(JSON.stringify(sCollaction.models));
        cacheAnswers();
      },
      error: function () {
        // something is wrong..
      } });

  }

  function cacheAnswers() {
    var sCollaction = Alloy.createCollection('answers');
    sCollaction.fetch({
      success: function () {
        cacheDraftsAnswers(JSON.stringify(sCollaction.models));
        cachAuditRecord();
      },
      error: function () {
        // something is wrong..
      } });

  }

  function cachAuditRecord() {
    var sCollaction = Alloy.createCollection('auditRecord');
    sCollaction.fetch({
      success: function () {
        cacheAuditRecord(JSON.stringify(sCollaction.models));
        cachAuditHistory();
      },
      error: function () {
        // something is wrong..
      } });

  }

  function cacheAuditRecord(auditRecords) {
    var usersData = Ti.App.Properties.getList("CachedDataByUser", []);
    if (usersData.filter(function (user) {
      return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
    }).length) {
      usersData.forEach(function (user, i) {
        if (user.user == Ti.App.Properties.getString('lastLoginUser', "noUser")) {
          usersData[i].auditRecords = auditRecords;
        }
      });
    }
    Ti.App.Properties.setList("CachedDataByUser", usersData);
  }

  function cachAuditHistory() {
    var sCollaction = Alloy.createCollection('auditHistory');
    sCollaction.fetch({
      success: function () {
        cacheDraftAuditHistory(JSON.stringify(sCollaction.models));
      },
      error: function () {
        // something is wrong..
      } });

  }

  function cacheDraftAuditHistory(auditHistory) {
    var usersData = Ti.App.Properties.getList("CachedDataByUser", []);
    if (usersData.filter(function (user) {
      return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
    }).length) {
      usersData.forEach(function (user, i) {
        if (user.user == Ti.App.Properties.getString('lastLoginUser', "noUser")) {
          usersData[i].auditHistory = auditHistory;
        }
      });
    }
    Ti.App.Properties.setList("CachedDataByUser", usersData);
  }

  //auditHistory
  //auditRecord


  function cacheDraftsAnswers(answers) {
    var usersData = Ti.App.Properties.getList("CachedDataByUser", []);
    if (usersData.filter(function (user) {
      return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
    }).length) {
      usersData.forEach(function (user, i) {
        if (user.user == Ti.App.Properties.getString('lastLoginUser', "noUser")) {
          usersData[i].cachedAnswers = answers;
        }
      });
    }
    Ti.App.Properties.setList("CachedDataByUser", usersData);
  }

  function cacheDraftsSections(sections) {

    var usersData = Ti.App.Properties.getList("CachedDataByUser", []);
    if (usersData.filter(function (user) {
      return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
    }).length) {
      usersData.forEach(function (user, i) {
        if (user.user == Ti.App.Properties.getString('lastLoginUser', "noUser")) {
          usersData[i].cachedSections = sections;
        }
      });
    }
    Ti.App.Properties.setList("CachedDataByUser", usersData);
  }


  function cacheDraftsQuestions(questions) {

    var usersData = Ti.App.Properties.getList("CachedDataByUser", []);
    if (usersData.filter(function (user) {
      return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
    }).length) {
      usersData.forEach(function (user, i) {
        if (user.user == Ti.App.Properties.getString('lastLoginUser', "noUser")) {
          usersData[i].cachedDraftsQuestions = questions;
        }
      });
    }
    Ti.App.Properties.setList("CachedDataByUser", usersData);


    // var usersData = Ti.App.Properties.getList("CachedDataByUser",[]).filter(function(user){
    // 	return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
    // });
    //
    // if (usersData.length) {
    //   usersData[0].cachedDraftsQuestions = questions
    // }

  }

  if (!args.notEditable) {

    if (false) {
      Alloy.Globals.activeView = 1;
      Alloy.Globals.saveSections = save;
      Alloy.Globals.backSections = close;
      Alloy.Globals.activity.invalidateOptionsMenu();
    }

    if (true) {
      var saveBtn = Ti.UI.createButton({
        image: '/images/icons/save.png' });

      saveBtn.addEventListener('click', save);
      $.sections.setRightNavButton(saveBtn);

      var closeBtn = Ti.UI.createButton({
        image: '/images/icons/back.png' });

      closeBtn.addEventListener('click', close);
      $.sections.setLeftNavButton(closeBtn);
    } else {

      setAndroidNav();
    }
  } else {

    if (args.isHistory) {
      if (false) {
        Alloy.Globals.activeView = 1;
        Alloy.Globals.saveSections = reset;
        Alloy.Globals.activity.invalidateOptionsMenu();
      }

      if (true) {
        var saveBtn = Ti.UI.createButton({
          image: '/images/icons/save.png' });

        saveBtn.addEventListener('click', reset);
        $.sections.setRightNavButton(saveBtn);

        // var closeBtn = Ti.UI.createButton({
        // image:'/images/icons/back.png'
        // });
        // closeBtn.addEventListener('click', close);
        // $.sections.setLeftNavButton(closeBtn);
      }
    }

    $.Comment.setEditable(false);

  }

  $.sections.addEventListener("close", function () {
    if (args.isIncomplete) {
      args.isIncomplete();
    }
    $.destroy();

    if (false) {
      Alloy.Globals.activeView = 0;
      Alloy.Globals.saveButton = undefined;
      Alloy.Globals.activity.invalidateOptionsMenu();
    }
  });

  function setAndroidNav() {






































  } // var activity = Ti.Android.currentActivity;
  // // need to explicitly use getXYZ methods
  // var actionBar = activity.getActionBar();
  //
  // if (actionBar) {
  // // Now we can do stuff to the actionbar
  // actionBar.setTitle('iProductive');
  //
  // actionBar.setIcon('/images/appicon.png');
  //
  // activity.onCreateOptionsMenu = function(e) {
  // var menuItem2 = e.menu.add({
  // showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
  // icon : "/images/icons/back.png"
  // });
  // menuItem2.addEventListener("click", close);
  //
  // var menuItem = e.menu.add({
  // showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
  // icon : "/images/icons/save.png"
  // });
  // menuItem.addEventListener("click", save);
  //
  //
  // };
  // activity.invalidateOptionsMenu();
  //
  // // show an angle bracket next to the home icon,
  // // indicating to users that the home icon is tappable
  // //actionBar.setDisplayHomeAsUp(true);
  //
  // // toggle the left window when the home icon is selected
  // // actionBar.onHomeIconItemSelected = function() {
  // // Ti.API.log('home button clicked');
  // // $.drawer.toggleLeftWindow();
  // // };
  // }
  //Ti.API.Info('\n\n\n\n>>>>>>>>>>>>>>>>> is In sections <<<<<<<<<<<<<<< \n\n\n\n');
  function openComment(e) {//$.Score.text = totalScore;
    if (true) {$.Comment.setSuppressReturn(false);$.Comment.setReturnKeyType(Ti.UI.RETURNKEY_DEFAULT);$.sections.add($.answersLayer);$.answersLayer.animate({ opacity: 1 });} else {$.sections.add($.answersLayer);$.answersLayer.animate({ opacity: 1 });}$.Score.text = totalWeight + ' / ' + totalWeightTotal + "        Finished: " + ((totalWeight / totalWeightTotal || 0) * 100).toFixed(3) + " %       Score: " + totalScore + " %"; //$.Comment.setValue(args.formPrams.comment);
    //alert(args.formPrams.comment);
    var auditRecordModel = Alloy.createModel('auditRecord');auditRecordModel.fetch({ id: args.formPrams.auditRecordID });$.Comment.setValue(auditRecordModel.get("comment"));}function hideanswerLayer(e) {$.answersLayer.setOpacity(0); // TO DO Remove view form window
    var auditRecordModel = Alloy.createModel('auditRecord');
    auditRecordModel.fetch({
      id: args.formPrams.auditRecordID });


    $.Comment.setValue(auditRecordModel.get("comment"));

    $.sections.remove($.answersLayer);

  }

  function saveComment(e) {

    var auditRecordModel = Alloy.createModel('auditRecord');

    auditRecordModel.fetch({
      id: args.formPrams.auditRecordID });

    //Ti.API.error(args.formPrams.auditRecordID + $.Comment.getValue() + auditRecordModel.length);
    auditRecordModel.save({
      comment: $.Comment.getValue() });

    hideanswerLayer();

  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["commentBtn"]!click!openComment'] && $.addListener($.__views["commentBtn"], 'click', openComment);__defers['$.__views["list"]!itemclick!clickSection'] && $.addListener($.__views["list"], 'itemclick', clickSection);__defers['$.__views["cancelBtn"]!click!hideanswerLayer'] && $.addListener($.__views["cancelBtn"], 'click', hideanswerLayer);__defers['$.__views["saveBtn"]!click!saveComment'] && $.addListener($.__views["saveBtn"], 'click', saveComment);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/sections.js.map