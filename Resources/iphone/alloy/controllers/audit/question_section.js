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
  this.__controllerPath = 'audit/question_section';
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
  $.__views["headerView"] = Ti.UI.createView(
  { backgroundColor: "#7092BE", height: 60, id: "headerView" });

  $.__views["titleLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, left: 10, color: "#ffffff", id: "titleLbl" });

  $.__views["headerView"].add($.__views["titleLbl"]);
  $.__views["__alloyId154"] = Ti.UI.createView(
  { right: 10, width: Ti.UI.SIZE, height: 40, layout: "horizontal", id: "__alloyId154" });

  $.__views["headerView"].add($.__views["__alloyId154"]);
  $.__views["weightLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, right: 10, height: 40, color: "#ffffff", id: "weightLbl" });

  $.__views["__alloyId154"].add($.__views["weightLbl"]);
  $.__views["weightTotalLbl"] = Ti.UI.createLabel(
  { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT, right: 10, height: 40, color: "#ffffff", id: "weightTotalLbl" });

  $.__views["__alloyId154"].add($.__views["weightTotalLbl"]);
  $.__views["mySec"] = Ti.UI.createListSection(
  { headerView: $.__views["headerView"], id: "mySec" });

  $.__views["mySec"] && $.addTopLevelView($.__views["mySec"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {},
  isScoreCard = args.template.type == 2;

  $.titleLbl.setText(args.title);
  $.weightLbl.setText(args.weight);
  $.weightTotalLbl.setText(' / ' + args.weightTotal);

  //Ti.API.Info('====#########>>>>> args.isIncomplete = ' + args.isIncomplete);



  // if(args.isIncomplete){
  //   loadUserCachedQuestions();
  // } else {
  //   syncData();
  // }

  syncData();

  function loadUserCachedQuestions() {
    var usersData = Ti.App.Properties.getList("CachedDataByUser", []).filter(function (user) {
      return user.user == Ti.App.Properties.getString('lastLoginUser', "noUser");
    });
    var rows = [];
    if (usersData.length) {
      var myData = usersData[0].cachedDraftsQuestions;
      var rows = [];
      myData.forEach(function (model) {
        var myData = model;
        //Ti.API.Info('########### myData: ' + JSON.stringify(myData));
        var PreviousAnswer = '';
        if (args.isIncomplete && myData.Previous_Answer != null) {
          PreviousAnswer = myData.Previous_Answer + ", " + myData.Previous_Comment ? myData.Previous_Comment : "";
          if (myData.Previous_Comment != null) {
            PreviousAnswer = myData.Previous_Answer + ", " + myData.Previous_Comment;
          }
        }
        var PreviousAnswerValue = '';
        if (args.isIncomplete && myData.Previous_AnswerValue != null) {
          PreviousAnswerValue = myData.Previous_AnswerValue;
        }
        //Ti.API.Info("FUCKIT SectionDesc=" + JSON.stringify(myData));
        rows.push({
          properties: _.extend(model, {
            answerID: myData.id,
            searchableText: myData.QuestionDesc
            //defaultItemTemplate: args.deptCode == "SRC" ? "elementFuckedTemplate": "elementTemplate"
          }),


          ResponsibilityDesc: {
            text: myData.ResponsibilityDesc },

          QuestionDesc: {
            text: myData.QuestionDesc },

          PreviousAnswer: {
            value: PreviousAnswer,
            protectedValue: PreviousAnswer },

          PreviousAnswerValue: {
            value: PreviousAnswerValue,
            protectedValue: PreviousAnswerValue },

          yes: {
            backgroundColor: myData.Answerstring == 'Yes' ? "green" : "gray",
            visible: args.deptCode == "SRC" ? false : true
            //zIndex: args.deptCode == "SRC" ? "-1": "1"
          },
          no: {
            backgroundColor: myData.Answerstring == 'No' ? "red" : "gray",
            visible: args.deptCode == "SRC" ? false : true
            //zIndex: args.deptCode == "SRC" ? "-1": "1"
          },
          na: {
            backgroundColor: myData.Answerstring == 'NA' ? "#333333" : "gray",
            visible: args.deptCode == "SRC" ? false : true
            //zIndex: args.deptCode == "SRC" ? "-1": "1"
          },
          pd: {
            backgroundColor: myData.Answerstring == 'PD' ? "#333333" : "gray",
            visible: args.deptCode == "IT" && args.deptCode != "SRC" ? true : false
            // zIndex:  args.deptCode == "IT" && args.deptCode != "SRC" ? "1": "-1"
          },

          fo: {
            backgroundColor: myData.Answerstring == 'FO' ? "#333333" : "gray",
            visible: false },


          zero: {
            backgroundColor: myData.Answerstring == '0' ? "#0BD318" : "#8ebbf7",
            visible: args.deptCode == "SRC" ? true : false
            //zIndex : args.deptCode == "SRC" ? 100 : -1
          },

          one: {
            backgroundColor: myData.Answerstring == '1' ? "#0BD318" : "#77adf5",
            visible: args.deptCode == "SRC" ? true : false },


          two: {
            backgroundColor: myData.Answerstring == '2' ? "#0BD318" : "#609ff3",
            visible: args.deptCode == "SRC" ? true : false },


          three: {
            backgroundColor: myData.Answerstring == '3' ? "#0BD318" : "#4a92f2",
            visible: args.deptCode == "SRC" ? true : false },


          four: {
            backgroundColor: myData.Answerstring == '4' ? "#0BD318" : "#3384f0",
            visible: args.deptCode == "SRC" ? true : false },


          five: {
            backgroundColor: myData.Answerstring == '5' ? "#0BD318" : "#1d77ef",
            visible: args.deptCode == "SRC" ? true : false },


          commentPhotosContainer: {
            height: myData.Image !== null || myData.Image1 !== null ? 155 : 115 },

          commentTxtArea: {
            value: myData.Comment == null ? "" : myData.Comment,
            editable: args.notEditable ? false : true,
            suppressReturn: false,
            returnKeyType: Ti.UI.RETURNKEY_DEFAULT },

          QWeight: myData.QWeight,
          QValue: myData.QValue,
          Image: {
            image: myData.Image },

          Image1: {
            image: myData.Image1 } });


      });
      $.mySec.setItems(rows);
    }
  }

  function syncData() {
    var qCollaction = Alloy.createCollection('questions');
    //Ti.API.Info("args.deptCode= " + args.deptCode);

    qCollaction.on('fetch', function () {
      var rows = [];
      qCollaction.each(function (model) {
        //Ti.API.Info(' trying to fetch qCollection<=============');
        var myData = model.toJSON();
        //Ti.API.Info('########### myData: ' + JSON.stringify(myData));
        var PreviousAnswer = '';
        if (args.isIncomplete && myData.Previous_Answer != null) {
          PreviousAnswer = myData.Previous_Answer + "\n" + myData.Previous_Comment ? myData.Previous_Comment : "";
          if (myData.Previous_Comment != null) {
            PreviousAnswer = myData.Previous_Answer + "\n" + myData.Previous_Comment;
          }
        }
        var PreviousAnswerValue = '';
        if (args.isIncomplete && myData.Previous_AnswerValue != null) {
          PreviousAnswerValue = myData.Previous_AnswerValue;
        }

        //Ti.API.Info("FUCKIT SectionDesc=" + JSON.stringify(myData));
        rows.push({
          properties: _.extend(model.toJSON(), {
            answerID: myData.id,
            searchableText: myData.QuestionDesc
            //defaultItemTemplate: args.deptCode == "SRC" ? "elementFuckedTemplate": "elementTemplate"
          }),


          ResponsibilityDesc: {
            text: myData.ResponsibilityDesc },

          QuestionDesc: {
            text: myData.QuestionDesc },

          PreviousAnswer: {
            value: PreviousAnswer,
            protectedValue: PreviousAnswer },

          PreviousAnswerValue: {
            value: PreviousAnswerValue,
            protectedValue: PreviousAnswerValue },

          yes: {
            backgroundColor: myData.Answerstring == 'Yes' ? "green" : "gray",
            visible: args.deptCode == "SRC" ? false : true
            //zIndex: args.deptCode == "SRC" ? "-1": "1"
          },
          no: {
            backgroundColor: myData.Answerstring == 'No' ? "red" : "gray",
            visible: args.deptCode == "SRC" ? false : true
            //zIndex: args.deptCode == "SRC" ? "-1": "1"
          },
          na: {
            backgroundColor: myData.Answerstring == 'NA' ? "#333333" : "gray",
            visible: args.deptCode == "SRC" ? false : true
            //zIndex: args.deptCode == "SRC" ? "-1": "1"
          },
          pd: {
            backgroundColor: myData.Answerstring == 'PD' ? "#333333" : "gray",
            visible: args.deptCode == "IT" && args.deptCode != "SRC" ? true : false
            // zIndex:  args.deptCode == "IT" && args.deptCode != "SRC" ? "1": "-1"
          },

          fo: {
            backgroundColor: myData.Answerstring == 'FO' ? "#333333" : "gray",
            visible: false },


          zero: {
            backgroundColor: myData.Answerstring == '0' ? "#0BD318" : "#8ebbf7",
            visible: args.deptCode == "SRC" ? true : false
            //zIndex : args.deptCode == "SRC" ? 100 : -1
          },

          one: {
            backgroundColor: myData.Answerstring == '1' ? "#0BD318" : "#77adf5",
            visible: args.deptCode == "SRC" ? true : false },


          two: {
            backgroundColor: myData.Answerstring == '2' ? "#0BD318" : "#609ff3",
            visible: args.deptCode == "SRC" ? true : false },


          three: {
            backgroundColor: myData.Answerstring == '3' ? "#0BD318" : "#4a92f2",
            visible: args.deptCode == "SRC" ? true : false },


          four: {
            backgroundColor: myData.Answerstring == '4' ? "#0BD318" : "#3384f0",
            visible: args.deptCode == "SRC" ? true : false },


          five: {
            backgroundColor: myData.Answerstring == '5' ? "#0BD318" : "#1d77ef",
            visible: args.deptCode == "SRC" ? true : false },


          commentPhotosContainer: {
            height: myData.Image !== null || myData.Image1 !== null ? 155 : 115 },

          commentTxtArea: {
            value: myData.Comment == null ? "" : myData.Comment,
            editable: args.notEditable ? false : true,
            suppressReturn: false,
            returnKeyType: Ti.UI.RETURNKEY_DEFAULT },

          QWeight: myData.QWeight,
          QValue: myData.QValue,
          Image: {
            image: myData.Image },

          Image1: {
            image: myData.Image1 } });


      });
      //$.mySec.defaultItemTemplate = 'elementFuckedTemplate';
      $.mySec.setItems(rows);

    });
    var tableName = isScoreCard ? 'questions_scorecard' : 'questions',
    select = isScoreCard ? "" : " AND q.Show > 0 ORDER BY q.QuestionOrder ASC";
    var query = "SELECT a.*, q.* FROM " + tableName + " q JOIN answers a ON q.QuestionID = a.QuestionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID + select;

    //Ti.API.Info("auditRecordID= " + args.auditRecordID);

    if (args.isIncomplete) {
      if (Alloy.Globals.HasLP) {
        query = "SELECT a.*, q.*, s.*, h.Previous_Answer, h.Previous_Comment FROM " + tableName + " q JOIN answers a ON q.QuestionID = a.QuestionID JOIN sections s ON q.SectionID = s.SectionID LEFT JOIN auditHistory h ON  h.QuestionID = a.QuestionID " + " AND h.AuditRecordID = " + args.auditRecordID + " AND h.AuditID = " + args.AuditID + " WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID + select;
      } else {

      } //query = "SELECT a.*, q.*, s.* FROM " + tableName + " q JOIN answers a ON q.QuestionID = a.QuestionID JOIN sections s ON q.SectionID = s.SectionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID + select;
      //query = "SELECT a.*, q.*, s.*, h.Previous_Answer FROM " + tableName + " q JOIN answers a ON q.QuestionID = a.QuestionID JOIN sections s ON q.SectionID = s.SectionID JOIN auditHistory h ON  h.QuestionID = a.QuestionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID + " AND h.AuditRecordID = " + args.auditRecordID + " AND h.AuditID = " + args.AuditID + select;
    } else {
      if (Alloy.Globals.HasLP) {
        query = "SELECT a.*, q.*, s.* FROM " + tableName + " q JOIN answers a ON q.QuestionID = a.QuestionID JOIN sections s ON q.SectionID = s.SectionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID + select;
      } else {
        //query = "SELECT a.*, q.* FROM " + tableName + " q JOIN answers a ON q.QuestionID = a.QuestionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID + select;
      }

    }
    //Ti.API.Info("FUCKIT Query= " + "SELECT COUNT(*) as mycount, a.*, q.* FROM " + tableName + " q JOIN answers a ON q.QuestionID = a.QuestionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID + select);
    try {
      qCollaction.fetch({
        query: query });

    } catch (e) {
      //Ti.API.Info('error -> ' + JSON.stringify(e));
    }
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/exsalameh/Desktop/iProductive-2/build/map/Resources/iphone/alloy/controllers/audit/question_section.js.map