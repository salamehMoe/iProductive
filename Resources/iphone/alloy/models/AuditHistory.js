var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
      "AuditRecordID": "INTEGER",
      "StoreCode": "TEXT",
      "AuditID": "TEXT",
      "QuestionID": "TEXT",
      "Previous_AuditDate": "TEXT",
      "Previous_Answer": "TEXT",
      "Previous_AnswerValue": "TEXT",
      "Previous_AnswerDate": "TEXT",
      "Previous_Comment": "TEXT" },

    adapter: {
      type: "sql",
      collection_name: "auditHistory",
      idAttribute: "id" } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
      // extended functions and properties go here
    });

    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {
      // extended functions and properties go here

      // For Backbone v1.1.2, uncomment the following to override the
      // fetch method to account for a breaking change in Backbone.
      /*
       fetch: function(options) {
       options = options ? _.clone(options) : {};
       options.reset = true;
       return Backbone.Collection.prototype.fetch.call(this, options);
       }
       */

      deleteAllRecords: function () {
        var collection = this;
        var dbName = collection.config.adapter.db_name;
        var table = collection.config.adapter.collection_name;
        var sql = "DELETE FROM " + collection.config.adapter.collection_name;

        db = Ti.Database.open(collection.config.adapter.db_name);
        db.execute(sql);
        db.close();
        collection.trigger('sync');
      },
      delete: function (StoreCode, AuditID) {
        var collection = this;
        var dbName = collection.config.adapter.db_name;
        var table = collection.config.adapter.collection_name;
        var sql = "DELETE FROM " + collection.config.adapter.collection_name + " WHERE AuditID == '" + AuditID + "' AND StoreCode == '" + StoreCode + "'";
        //Ti.API.Info("the SQL statment is "+sql);
        db = Ti.Database.open(collection.config.adapter.db_name);
        db.execute(sql);
        db.close();
        collection.trigger('sync');
      } });


    return Collection;
  } };


model = Alloy.M('auditHistory',
exports.definition,
[]);


collection = Alloy.C('auditHistory',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;