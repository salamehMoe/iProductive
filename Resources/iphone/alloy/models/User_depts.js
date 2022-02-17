var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "DeptCode": "TEXT PRIMARY KEY",
      "DeptName": "TEXT" },

    adapter: {
      type: "sql",
      collection_name: "user_depts",
      idAttribute: "DeptCode" } },


  extendModel: function (Model) {
    _.extend(Model.prototype, {
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



model = Alloy.M('user_depts',
exports.definition,
[]);


collection = Alloy.C('user_depts',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;