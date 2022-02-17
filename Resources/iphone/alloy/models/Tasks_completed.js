var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
      "TaskQuestionID": "INTEGER",
      "CompletedDate": "TEXT",
      "taskRecord": "INTEGER" },

    adapter: {
      type: "sql",
      collection_name: "tasks_completed",
      idAttribute: "id" },

    defaults: {
      QuestionOrder: 0,
      timeFrom: '',
      timeTo: '' } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
      // extended functions and properties go here
    });

    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {
      markCompleted: function (ids, online_id) {

        var dbName = this.config.adapter.db_name;

        var db = Ti.Database.open(dbName);
        db.execute("UPDATE tasks_completed SET taskRecord = '" + online_id + "' WHERE id in (" + ids.join(',') + ")");
        db.close();
      },
      dashBoard: function () {

        var dbName = this.config.adapter.db_name;

        var db = Ti.Database.open(dbName);
        var sql = "SELECT t.TaskID, t.TaskName, count(tc.id) done, count(t.TaskQuestionID) - count(tc.id) notDone " +
        "FROM tasks t " +
        "LEFT JOIN tasks_completed tc ON CASE WHEN TaskID = 1 THEN t.TaskQuestionID = tc.TaskQuestionID AND date(tc.CompletedDate) = date() " +
        "WHEN TaskID = 2 THEN t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-w%W', tc.CompletedDate) = strftime('%Y-w%W', date()) " +
        "WHEN TaskID = 3 THEN t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-m%m', tc.CompletedDate) = strftime('%Y-m%m', date()) " +
        "WHEN TaskID = 4 THEN t.TaskQuestionID = tc.TaskQuestionID AND ((((cast(strftime('%Y-m%m', tc.CompletedDate) as integer) + 2) / 3) > 2) + 1) = 2 " +
        "WHEN TaskID = 5 THEN t.TaskQuestionID = tc.TaskQuestionID AND strftime('%Y-m%m', tc.CompletedDate) = strftime('%Y-m%m', date()) " +
        "END = 1 " +
        "GROUP BY t.TaskID";

        var rows = db.execute(sql);

        var data = {};
        while (rows.isValidRow()) {

          data[rows.fieldByName('TaskName').toLowerCase()] = [{
            value: rows.fieldByName('notDone') },
          {
            value: rows.fieldByName('done') }];


          rows.next();
        }
        rows.close();
        db.close();

        return data;

      } });


    return Collection;
  } };



model = Alloy.M('tasks_completed',
exports.definition,
[]);


collection = Alloy.C('tasks_completed',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;