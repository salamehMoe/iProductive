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
  this.__controllerPath = 'audit/scoreCardQuestions';
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
  Alloy.Collections.instance('questions_answers_scorecard');

  // Generated UI code
  $.__views["questions"] = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { backgroundColor: "#ffffff", translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM], id: "questions" });

  $.__views["questions"] && $.addTopLevelView($.__views["questions"]);
  var __alloyId279 = {};var __alloyId282 = [];var __alloyId284 = { type: 'Ti.UI.View', childTemplates: function () {var __alloyId285 = [];var __alloyId287 = { type: 'Ti.UI.Label', bindId: 'QuestionDesc', properties: { textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, left: 22, top: 10, verticalAlign: "top", color: "black", font: { fontSize: 20, fontWeight: "bold" }, bindId: "QuestionDesc" } };__alloyId285.push(__alloyId287);var __alloyId289 = { type: 'Ti.UI.View', bindId: 'answerContainer', childTemplates: function () {var __alloyId290 = [];var __alloyId292 = { type: 'Ti.UI.Label', properties: { textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, text: "Answer: ", left: 22, color: "black", font: { fontSize: 20 } } };__alloyId290.push(__alloyId292);var __alloyId294 = { type: 'Ti.UI.Label', bindId: 'answer', properties: { textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, left: 105, color: Alloy.CFG.borderColor, font: { fontSize: 20 }, bindId: "answer" } };__alloyId290.push(__alloyId294);return __alloyId290;}(), properties: { top: 10, left: 0, right: 0, bottom: 8, height: Ti.UI.SIZE, bindId: "answerContainer" } };__alloyId285.push(__alloyId289);return __alloyId285;}(), properties: { left: 0, right: 0, layout: "vertical", height: Ti.UI.SIZE, bottom: 0 } };__alloyId282.push(__alloyId284);var __alloyId281 = { properties: { width: "100%", height: Ti.UI.SIZE, selectionStyle: Titanium.UI.iOS.ListViewCellSelectionStyle.NONE, name: "elementTemplate" }, childTemplates: __alloyId282 };__alloyId279["elementTemplate"] = __alloyId281;$.__views["list"] = Ti.UI.createListView(
  { defaultItemTemplate: "elementTemplate", templates: __alloyId279, id: "list" });

  $.__views["questions"].add($.__views["list"]);
  listClicked ? $.addListener($.__views["list"], 'itemclick', listClicked) : __defers['$.__views["list"]!itemclick!listClicked'] = true;var __alloyId296 = [];__alloyId296.push("Yes");__alloyId296.push("No");$.__views["deleteImage"] = Ti.UI.createAlertDialog(
  { buttonNames: __alloyId296, message: "Are you sure you want to delete this image?", id: "deleteImage" });

  $.__views["answersLayer"] = Ti.UI.createView(
  { opacity: 1, id: "answersLayer" });

  $.__views["answersLayer"] && $.addTopLevelView($.__views["answersLayer"]);
  hideanswerLayer ? $.addListener($.__views["answersLayer"], 'click', hideanswerLayer) : __defers['$.__views["answersLayer"]!click!hideanswerLayer'] = true;$.__views["__alloyId299"] = Ti.UI.createView(
  { backgroundColor: "#000000", opacity: 0.7, id: "__alloyId299" });

  $.__views["answersLayer"].add($.__views["__alloyId299"]);
  $.__views["__alloyId300"] = Ti.UI.createView(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, backgroundColor: "white", id: "__alloyId300" });

  $.__views["answersLayer"].add($.__views["__alloyId300"]);
  $.__views["answersSection"] = Ti.UI.createListSection(
  { id: "answersSection" });

  var __alloyId303 = Alloy.Collections['questions_answers_scorecard'] || questions_answers_scorecard;function __alloyId304(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId304.opts || {};var models = __alloyId303.models;var len = models.length;var __alloyId301 = [];for (var i = 0; i < len; i++) {var __alloyId302 = models[i];__alloyId302.__transform = _.isFunction(__alloyId302.transform) ? __alloyId302.transform() : __alloyId302.toJSON();}opts.animation ? $.__views["answersSection"].setItems(__alloyId301, opts.animation) : $.__views["answersSection"].items = __alloyId301;};__alloyId303.on('fetch destroy change add remove reset', __alloyId304);var __alloyId305 = [];__alloyId305.push($.__views["answersSection"]);$.__views["answerList"] = Ti.UI.createListView(
  { defaultItemTemplate: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE, sections: __alloyId305, borderRadius: 6, borderColor: "#115EAC", borderWidth: 3, separatorColor: "#115EAC", id: "answerList", height: Ti.UI.SIZE, width: 300, bubbleParent: false });

  $.__views["__alloyId300"].add($.__views["answerList"]);
  selectAnswer ? $.addListener($.__views["answerList"], 'itemclick', selectAnswer) : __defers['$.__views["answerList"]!itemclick!selectAnswer'] = true;exports.destroy = function () {__alloyId303 && __alloyId303.off('fetch destroy change add remove reset', __alloyId304);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {},
  ganswerObj = null;
  if (args.notEditable) {// show search bar when not inComplete
    $.list.searchView = Ti.UI.createSearchBar({
      hintText: "Search ...",
      barColor: "#115EAC",
      keyboardType: Titanium.UI.RETURNKEY_SEARCH,
      returnKeyType: Titanium.UI.RETURNKEY_SEARCH });

    $.list.setTop(62);
    $.questions.autoAdjustScrollViewInsets = false;
  }
  if (true) {
    $.questions.setTitle(args.template.title);
  }

  var secsCollaction = Alloy.createCollection('sections');

  secsCollaction.on('fetch', function () {
    var sections = [];

    if (secsCollaction.models.length == 0) {

      var model = Alloy.createModel('sections');
      model.fetch({
        id: args.section.SectionID + "-" + args.AuditID });


      $.list.setSections([Alloy.createController('audit/scoreCard_question_section', {
        SectionID: model.get('SectionID'),
        AuditID: model.get('AuditID'),
        auditRecordID: args.auditRecordID,
        deptCode: args.deptCode,
        title: model.get('SectionDesc'),
        weightTotal: args.section.weightTotal,
        weight: model.getWeight(args.auditRecordID), // get weight of answered questions
        notEditable: args.notEditable,
        template: args.template }).
      getView()]);

      return;
    }

    secsCollaction.each(function (model) {

      sections.push(Alloy.createController('audit/scoreCard_question_section', {
        SectionID: model.get('SectionID'),
        AuditID: model.get('AuditID'),
        auditRecordID: args.auditRecordID,
        deptCode: args.deptCode,
        title: model.get('SectionDesc'),
        weightTotal: model.get('weightTotal'),
        weight: model.getWeight(args.auditRecordID), // get weight of answered questions
        notEditable: args.notEditable,
        template: args.template }).
      getView());

    });

    $.list.setSections(sections);

  });

  //Ti.API.Info ("SELECT s.* FROM sections s JOIN questions_scorecard q ON q.AuditID = s.AuditID AND q.SectionID = s.SectionID WHERE s.AuditID = '" + args.AuditID + "' AND s.ParentID = '" + args.section.SectionID + "' group by s.SectionID ORDER BY s.SectionOrder");
  try {
    secsCollaction.fetch({
      query: "SELECT s.* FROM sections s JOIN questions_scorecard q ON q.AuditID = s.AuditID AND q.SectionID = s.SectionID WHERE s.AuditID = '" + args.AuditID + "' AND s.ParentID = '" + args.section.SectionID + "' group by s.SectionID ORDER BY s.SectionOrder" });

  } catch (e) {
    //Ti.API.Info('error -> '+JSON.stringify(e));
  }


  function hideanswerLayer(e) {
    //$.answersLayer.setOpacity(0);
    ganswerObj = null;
    $.questions.remove($.answersLayer);
  }

  function selectAnswer(e) {

    var item = e.section.getItemAt(e.itemIndex);
    // answer text UI
    ganswerObj.item.answer.text = item.properties.title;
    // model answer string
    ganswerObj.item.properties.Answerstring = item.properties.title;
    ganswerObj.item.properties.AnswerID = item.properties.AnswerID;

    ganswerObj.item.properties.Answervalue = item.properties.Value;
    ganswerObj.item.properties.QuestionValue = item.properties.Weight;

    ganswerObj.section.updateItemAt(ganswerObj.itemIndex, ganswerObj.item);

    var answerModel = Alloy.createModel('answers');

    answerModel.fetch({
      id: ganswerObj.item.properties.answerID });


    answerModel.save({
      Answerstring: item.properties.title,
      AnswerID: item.properties.AnswerID,
      Answervalue: item.properties.Value,
      QuestionValue: item.properties.Weight,
      AnswerDate: Alloy.Globals.getFullDate() });


    ganswerObj = null;
    hideanswerLayer();

  }

  function listClicked(e) {

    if (args.notEditable) {
      return false;
    }

    var item = e.section.getItemAt(e.itemIndex);

    Ti.API.debug("!!" + JSON.stringify(item));

    /*  (e.bindId == "delete") {    //  ebrahim left this code if they change thier mind to need delete
                                                                                           item.answer.text = "";
                                                                                           item.properties.Answervalue = null;
                                                                                           item.properties.Answerstring = null;
                                                                                           item.Answerstring = null;
                                                                                            e.section.updateItemAt(e.itemIndex, item);
                                                                                            var answerModel = Alloy.createModel('answers');
                                                                                           answerModel.fetch({
                                                                                           id : item.properties.answerID,
                                                                                           });
                                                                                           answerModel.save({
                                                                                           Answerstring : null,
                                                                                           Answervalue : null,
                                                                                           QuestionValue : null,
                                                                                           AnswerDate : null,
                                                                                           });
                                                                                            */



    Alloy.Collections.questions_answers_scorecard.on('fetch', function () {

      var rows = [];
      Alloy.Collections.questions_answers_scorecard.each(function (model) {

        rows.push({
          properties: _.extend(model.toJSON(), {
            AnswerID: model.get('AnswerID'),
            Value: model.get('Value'),
            Weight: model.get('Weight'),
            title: model.get('Answer'),
            color: item.properties.Answerstring == model.get("Answer") ? Alloy.CFG.borderColor : "black",
            font: {
              fontWeight: item.properties.Answerstring == model.get("Answer") ? "bold" : null,
              fontSize: item.properties.Answerstring == model.get("Answer") ? 25 : 22 },

            height: 70 }) });




      });

      $.answersSection.setItems(rows);
    });

    ganswerObj = {
      item: item,
      section: e.section,
      itemIndex: e.itemIndex };

    try {
      Alloy.Collections.questions_answers_scorecard.fetch({
        query: "select * from questions_answers_scorecard where QuestionID=" + item.properties.QuestionID });

    } catch (e) {
      //Ti.API.Info('error -> '+JSON.stringify(e));
    }

    Alloy.Collections.questions_answers_scorecard.off("fetch");
    //$.answersLayer.animate({
    //   opacity : 1,
    // duration : 600
    //});
    $.questions.add($.answersLayer);

  }

  if (!args.notEditable) {

    if (false) {
      Alloy.Globals.activeView = 2;
      Alloy.Globals.saveQuestions = function () {
        Alloy.Globals.pageStack.close($.questions);
        args.saveCallBack();
        resetNavBar();
      };
      Alloy.Globals.backQuestions = function () {
        Alloy.Globals.pageStack.close($.questions);
        resetNavBar();
      };
      Alloy.Globals.activity.invalidateOptionsMenu();
    }


    if (true) {

      var saveBtn = Ti.UI.createButton({
        image: '/images/icons/save.png' });

      saveBtn.addEventListener('click', function () {
        Alloy.Globals.pageStack.close($.questions);
        args.saveCallBack();
      });
      $.questions.setRightNavButton(saveBtn);

      var closeBtn = Ti.UI.createButton({
        image: '/images/icons/back.png' });

      closeBtn.addEventListener('click', function () {
        Alloy.Globals.pageStack.close($.questions);
      });
      $.questions.setLeftNavButton(closeBtn);
    }
  }

  $.questions.addEventListener("close", function () {
    $.destroy();
    ganswerObj = null;
  });

  function resetNavBar() {

    //Ti.API.Info("reseting nav bar");
    if (false) {
      Alloy.Globals.activeView = 1;
      Alloy.Globals.activity.invalidateOptionsMenu();
    }
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["list"]!itemclick!listClicked'] && $.addListener($.__views["list"], 'itemclick', listClicked);__defers['$.__views["answersLayer"]!click!hideanswerLayer'] && $.addListener($.__views["answersLayer"], 'click', hideanswerLayer);__defers['$.__views["answerList"]!itemclick!selectAnswer'] && $.addListener($.__views["answerList"], 'itemclick', selectAnswer);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/scoreCardQuestions.js.map