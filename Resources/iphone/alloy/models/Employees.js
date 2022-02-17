var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "EmployeeNo": "INTEGER PRIMARY KEY",
      "StoreCode": "TEXT",
      "DeptCode": "TEXT",
      "PositionID": "INTEGER",
      "AuditID": "INTEGER",
      "UserID": "INTEGER",
      "Name": "TEXT" },

    adapter: {
      type: "sql",
      collection_name: "employees",
      idAttribute: "EmployeeNo" } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
      // extended functions and properties go here
    });

    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {
      // extended functions and properties go here
      deleteAllRecords: function () {
        var collection = this;
        var dbName = collection.config.adapter.db_name;
        var table = collection.config.adapter.collection_name;
        var sql = "DELETE FROM " + collection.config.adapter.collection_name;

        db = Ti.Database.open(collection.config.adapter.db_name);
        db.execute(sql);
        db.close();
        collection.trigger('sync');
      } });



    return Collection;
  } };



model = Alloy.M('employees',
exports.definition,
[]);


collection = Alloy.C('employees',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;