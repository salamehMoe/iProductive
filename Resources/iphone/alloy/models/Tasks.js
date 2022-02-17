var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "TaskQuestionID": "INTEGER PRIMARY KEY",
      "DeptCode": "TEXT",
      "TaskID": "INTEGER", // id of the todo list (daily,weekely,monthly .... etc)
      "TaskName": "TEXT", // name of the toDo list
      "SectionID": "INTEGER",
      "SectionDesc": "TEXT",
      "QuestionDesc": "TEXT",
      "PriorityCode": "TEXT",
      "timeFrom": "INTEGER", // From
      "timeTo": "INTEGER", // To
      "TaskOrder": "INTEGER",
      "SectionOrder": "INTEGER",
      "QuestionOrder": "INTEGER" },

    adapter: {
      type: "sql",
      collection_name: "tasks",
      idAttribute: "TaskQuestionID" },

    defaults: {
      QuestionOrder: 0,
      timeFrom: '0',
      timeTo: '24' } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
      getDaily: function (SectionID) {
        var db = Ti.Database.open(this.config.adapter.db_name);
        var sql = "select count (1) as num from tasks  left outer join tasks_completed on tasks.TaskQuestionID = tasks_completed.TaskQuestionID where  PriorityCode ='High' and tasks.TaskName = 'Daily' and SectionID =" + SectionID + " and tasks_completed.id is null group by sectionid, tasks.TaskName, tasks.sectionDesc";
        var rows = db.execute(sql);
        if (!rows.isValidRow())
        return 0;
        var num = rows.fieldByName('num');
        rows.close();
        db.close();
        this.num = num;
        return num || 0;
      },
      getUncompletedTasks: function (TaskID) {
        var db = Ti.Database.open(this.config.adapter.db_name);
        var sql = "select count (1) as num from tasks  left outer join tasks_completed on tasks.TaskQuestionID = tasks_completed.TaskQuestionID where  PriorityCode ='High' and TaskID =" + TaskID + " and tasks_completed.id is null group by sectionid, tasks.TaskName, tasks.sectionDesc";
        var rows = db.execute(sql);
        if (!rows.isValidRow())
        return 0;
        var num = rows.fieldByName('num');
        rows.close();
        db.close();
        this.num = num;
        return num || 0;
      }
      // extended functions and properties go here
    });

    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {
      // extended functions and properties go here
    });

    return Collection;
  } };


model = Alloy.M('tasks',
exports.definition,
[]);


collection = Alloy.C('tasks',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;