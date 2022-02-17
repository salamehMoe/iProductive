var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "QuestionID": "INTEGER PRIMARY KEY",
      "AuditID": "INTEGER",
      "SectionID": "INTEGER",
      "QuestionDesc": "TEXT" },

    adapter: {
      type: "sql",
      collection_name: "questions_scorecard",
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



model = Alloy.M('questions_scorecard',
exports.definition,
[]);


collection = Alloy.C('questions_scorecard',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;