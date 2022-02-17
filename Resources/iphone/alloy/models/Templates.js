var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "AuditID": "INTEGER PRIMARY KEY",
      "CompanyTypeID": "INTEGER",
      "DeptCode": "TEXT",
      "AuditName": "TEXT",
      "AuditDesc": "TEXT",
      "Show": "INTEGER", //boolean
      "Target": "REAL",
      "type": "INTEGER", //boolean 1: SVM 2: ScoreCard
      "deleted": "INTEGER" //boolean 1: deleted 0: not deleted
    },
    adapter: {
      type: "sql",
      collection_name: "templates",
      idAttribute: "AuditID" },

    defaults: {
      deleted: 0 } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
      // extended functions and properties go here
    });

    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {
      markAsDeleted: function (type) {

        var dbName = this.config.adapter.db_name;

        var db = Ti.Database.open(dbName);
        db.execute("UPDATE templates SET deleted = 1 WHERE type = " + type);
        db.close();
      } });


    return Collection;
  } };



model = Alloy.M('templates',
exports.definition,
[]);


collection = Alloy.C('templates',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;