var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      //"alloy_id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
      "FuckedID": "TEXT PRIMARY KEY",
      "SectionID": "INTEGER",
      "AuditID": "INTEGER",
      "SectionDesc": "TEXT",
      "SectionOrder": "INTEGER",
      "ParentID": "INTEGER",
      "RootID": "INTEGER" },

    adapter: {
      type: "sql",
      collection_name: "sections",
      idAttribute: "FuckedID" } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
      scorePercent: 0,
      getSectionWeight: function (AuditRecordID, SectionID) {

        var db = Ti.Database.open(this.config.adapter.db_name);

        // var Sections = "SELECT SectionID FROM sections WHERE ParentID = " + this.get('SectionID') + " or SectionID = " + this.get('SectionID') + " or RootID = " + this.get('SectionID');

        var sql = "SELECT sum(q.QWeight) weight FROM  questions q WHERE  q.SectionID = " + SectionID + " AND AuditID = " + AuditRecordID;
        var rows = db.execute(sql);
        rows.isValidRow();
        var weight = rows.fieldByName('weight');
        rows.close();
        db.close();
        this.weight = weight;

        return weight || 0;
      },
      getWeight: function (AuditRecordID, ParentID) {

        var db = Ti.Database.open(this.config.adapter.db_name);

        var Sections = "SELECT SectionID FROM sections WHERE ParentID = " + this.get('SectionID') + " or SectionID = " + this.get('SectionID') + " or RootID = " + this.get('SectionID');

        var sql = "SELECT sum(q.QWeight) weight FROM answers a JOIN questions q ON q.QuestionID = a.QuestionID WHERE a.AuditRecordID = " + AuditRecordID + " AND length(a.AnswerDate) > 0 AND q.SectionID in (" + Sections + ")";
        var rows = db.execute(sql);
        rows.isValidRow();
        var weight = rows.fieldByName('weight');
        rows.close();
        db.close();
        this.weight = weight;
        return weight || 0;
      },
      getScore: function (AuditRecordID, ParentID, addPenality) {

        var db = Ti.Database.open(this.config.adapter.db_name);

        var Sections = ParentID ? "SELECT SectionID FROM sections WHERE ParentID = " + this.get('SectionID') + " or SectionID = " + this.get('SectionID') : this.get('SectionID');

        var sql = "SELECT sum(q.QValue * q.QWeight) score, sum(q.QValue * q.QWeight) questionvalue,q.QValue QValue,q.QWeight QWeight, IFNULL(a.Answerstring, 'noanswer') Answerstring FROM answers a JOIN questions q ON q.QuestionID = a.QuestionID WHERE a.AuditRecordID = " + AuditRecordID + " AND q.SectionID in (" + Sections + ") " + "GROUP BY CASE WHEN a.Answerstring = 'Yes' THEN 0 " + "WHEN a.Answerstring = '' THEN 1 " + "WHEN a.Answerstring = 'No' THEN 2 " + "WHEN a.Answerstring = 'PD' THEN 3 " + "WHEN a.Answerstring = 'NA' THEN 4 " + "WHEN a.Answerstring = 'FO' THEN 6 " + "WHEN a.Answerstring = '0' THEN 7 " + "WHEN a.Answerstring = '1' THEN 8 " + "WHEN a.Answerstring = '2' THEN 9 " + "WHEN a.Answerstring = '3' THEN 10 " + "WHEN a.Answerstring = '4' THEN 11 " + "WHEN a.Answerstring = '5' THEN 12 " + "ELSE 5 END ";

        var rows = db.execute(sql);

        var data = {
          yes: 0,
          no: 0,
          na: 0,
          pd: 0,
          fo: 0,
          zero: 0,
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          noanswer: 0 };

        var userPoints = 0;
        var questionPoints = 0;
        while (rows.isValidRow()) {
          //Ti.API.Info(rows.fieldByName('Answerstring').toLowerCase() + " =k= " + rows.fieldByName('score'));
          //Ti.API.Info("questionValue" + " == " + rows.fieldByName('questionvalue'));
          ////Ti.API.Info("QValue" + " == " + rows.fieldByName('QValue'));
          ////Ti.API.Info("QWeight" + " == " + rows.fieldByName('QWeight'));
          //data[rows.fieldByName('Answerstring').toLowerCase()] = rows.fieldByName('score');
          if (rows.fieldByName('Answerstring').toLowerCase() == 'yes') {
            userPoints += parseFloat(rows.fieldByName('score'));
            questionPoints += parseFloat(rows.fieldByName('questionvalue'));
          } else if (rows.fieldByName('Answerstring').toLowerCase() == 'no') {
            ////Ti.API.Info("no is asnwered")
            // userPoints += parseFloat(rows.fieldByName('score'));
            questionPoints += parseFloat(rows.fieldByName('questionvalue'));
          }
          if (rows.fieldByName('Answerstring').toLowerCase() == 'na') {
            //userPoints += parseFloat(rows.fieldByName('score'));
            //questionPoints += parseFloat(rows.fieldByName('questionvalue'));
          }
          rows.next();
        }
        rows.close();

        data.yesScore = data.yes + data.pd / 2;
        data.totalScore = data.yes + data.no + data.pd;
        // var TotalEarned = data.yes;
        // var TotalPoints = data.yes + data.no;
        // var Result = (TotalEarned / TotalPoints) * 100;
        //Ti.API.Info("userPoints = " + userPoints);
        //Ti.API.Info("questionPoints = " + questionPoints);
        var Result = 0;
        if (userPoints != 0 && questionPoints != 0) {
          Result = (userPoints / questionPoints * 100).toFixed(3);
          //Ti.API.Info("Result = " + Result);
        }

        var Penalty = 0;
        // if (Result < 80 && addPenality == true) {
        // 	Penalty = 50;
        // }

        if (Result < 80) {
          Penalty = 50;
        }

        //Ti.API.Info("addPenality="+addPenality);
        //Ti.API.Info("-=Alloy.Globals.Penalities ="+Alloy.Globals.Penalities );
        if (Alloy.Globals.Penalities != 150) {
          Alloy.Globals.Penalities += Penalty;
        }
        //Ti.API.Info("+=Alloy.Globals.Penalities ="+Alloy.Globals.Penalities );

        //Ti.API.Info("Alloy.Globals.Penalities=" + Alloy.Globals.Penalities);
        //Ti.API.Info("data.yes=" + data.yes + " data.no=" + data.no);
        this.scorePercent = Result;
        // this.scorePercent = ((TotalEarned / TotalPoints) * 100).toFixed(2);
        //((data.yesScore / data.totalScore) * 100).toFixed(2);

        // make sure it's not NaN
        // this.scorePercent = isNaN(this.scorePercent) ? 0 : this.scorePercent;

        return Result;
        //this.scorePercent;
      },

      getTotalScore: function (AuditRecordID) {

        var db = Ti.Database.open(this.config.adapter.db_name);

        //var Sections = ParentID ? "SELECT SectionID FROM sections WHERE ParentID = " + this.get('SectionID') + " or SectionID = " + this.get('SectionID') : this.get('SectionID');

        var sql = "SELECT sum(q.QValue * q.QWeight) score, sum(q.QValue * q.QWeight) questionvalue, IFNULL(a.Answerstring, 'noanswer') Answerstring FROM answers a JOIN questions q ON q.QuestionID = a.QuestionID WHERE a.AuditRecordID = " + AuditRecordID + " GROUP BY CASE WHEN a.Answerstring = 'Yes' THEN 0 " + "WHEN a.Answerstring = '' THEN 1 " + "WHEN a.Answerstring = 'No' THEN 2 " + "WHEN a.Answerstring = 'PD' THEN 3 " + "WHEN a.Answerstring = 'NA' THEN 4 " + "WHEN a.Answerstring = 'FO' THEN 6 " + "WHEN a.Answerstring = '0' THEN 7 " + "WHEN a.Answerstring = '1' THEN 8 " + "WHEN a.Answerstring = '2' THEN 9 " + "WHEN a.Answerstring = '3' THEN 10 " + "WHEN a.Answerstring = '4' THEN 11 " + "WHEN a.Answerstring = '5' THEN 12 " + "ELSE 5 END ";

        var rows = db.execute(sql);

        var data = {
          yes: 0,
          no: 0,
          na: 0,
          pd: 0,
          fo: 0,
          zero: 0,
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          noanswer: 0 };

        var userPoints = 0;
        var questionPoints = 0;
        while (rows.isValidRow()) {
          ////Ti.API.Info(rows.fieldByName('Answerstring').toLowerCase()+" == "+rows.fieldByName('score'));
          data[rows.fieldByName('Answerstring').toLowerCase()] = rows.fieldByName('score');
          if (rows.fieldByName('Answerstring').toLowerCase() == 'yes') {
            userPoints += parseFloat(rows.fieldByName('score'));
            questionPoints += parseFloat(rows.fieldByName('questionvalue'));
          } else if (rows.fieldByName('Answerstring').toLowerCase() == 'no') {
            ////Ti.API.Info("no is asnwered")
            // userPoints += parseFloat(rows.fieldByName('score'));
            questionPoints += parseFloat(rows.fieldByName('questionvalue'));
          }
          if (rows.fieldByName('Answerstring').toLowerCase() == 'na') {
            //userPoints += parseFloat(rows.fieldByName('score'));
            //questionPoints += parseFloat(rows.fieldByName('questionvalue'));
          }
          rows.next();
        }

        rows.close();
        data.yesScore = data.yes + data.pd / 2;
        data.totalScore = data.yes + data.no + data.pd;
        //var TotalEarned = data.yes;
        //var TotalPoints = data.yes + data.no;
        ////Ti.API.Info("data.yes="+data.yes+" data.no="+data.no);
        var TotalEarned = data.yes;
        var TotalPoints = data.yes + data.no;
        var Result = 0;
        if (userPoints != 0 && questionPoints != 0) {
          Result = ((userPoints - Alloy.Globals.Penalities) / questionPoints * 100).toFixed(3);
          //Ti.API.Info("total Result = " + Result);
        }
        // var Result = (((TotalEarned - Alloy.Globals.Penalities) / TotalPoints) * 100).toFixed(2);

        this.scorePercent = Result;
        //((data.yesScore / data.totalScore) * 100).toFixed(2);

        // make sure it's not NaN
        this.scorePercent = isNaN(this.scorePercent) ? 0 : this.scorePercent;
        return Alloy.Globals.Penalities > 0 && this.scorePercent >= 84.99 && this.scorePercent != 100 ? 84.99 : this.scorePercent;
        //return this.scorePercent;
      },

      getTotalWeight: function (AuditRecordID) {

        var db = Ti.Database.open(this.config.adapter.db_name);

        //var Sections = ParentID ? "SELECT SectionID FROM sections WHERE ParentID = " + this.get('SectionID') + " or SectionID = " + this.get('SectionID') : this.get('SectionID');

        var sql = "SELECT sum(q.QWeight) weight FROM answers a JOIN questions q ON q.QuestionID = a.QuestionID WHERE a.AuditRecordID = " + AuditRecordID + " AND length(a.AnswerDate) > 0 ";
        var rows = db.execute(sql);
        rows.isValidRow();
        var weight = rows.fieldByName('weight');
        rows.close();
        db.close();
        this.weight = weight;
        return weight || 0;
      },

      getTotalWeightTotal: function (AuditRecordID) {

        var db = Ti.Database.open(this.config.adapter.db_name);

        //var Sections = ParentID ? "SELECT SectionID FROM sections WHERE ParentID = " + this.get('SectionID') + " or SectionID = " + this.get('SectionID') : this.get('SectionID');

        var sql = "SELECT sum(q.QWeight) weightTotal FROM answers a JOIN questions q ON q.QuestionID = a.QuestionID WHERE a.AuditRecordID = " + AuditRecordID;
        var rows = db.execute(sql);
        rows.isValidRow();
        var weight = rows.fieldByName('weightTotal');
        rows.close();
        db.close();
        this.weight = weight;
        return weight || 0;
      } });


    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {
      // extended functions and properties go here
    });

    return Collection;
  } };



model = Alloy.M('sections',
exports.definition,
[]);


collection = Alloy.C('sections',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;