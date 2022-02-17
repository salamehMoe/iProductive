var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "QuestionID": "INTEGER PRIMARY KEY",
      "AuditID": "INTEGER",
      "SectionID": "INTEGER",
      "ResponsibilityDesc": "TEXT",
      "QuestionDesc": "TEXT",
      "QValue": "INTEGER",
      "QWeight": "INTEGER",
      "QuestionOrder": "INTEGER",
      "CSA": "INTEGER", //boolean
      "Show": "INTEGER" },

    adapter: {
      type: "sql",
      collection_name: "questions",
      idAttribute: "QuestionID" } },


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



model = Alloy.M('questions',
exports.definition,
[]);


collection = Alloy.C('questions',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;