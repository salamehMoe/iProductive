var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "AnswerID": "INTEGER PRIMARY KEY",
      "QuestionID": "INTEGER",
      "Answer": "TEXT",
      "Value": "INTEGER",
      "Weight": "INTEGER" },

    adapter: {
      type: "sql",
      collection_name: "questions_answers_scorecard",
      idAttribute: "AnswerID" } },


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



model = Alloy.M('questions_answers_scorecard',
exports.definition,
[]);


collection = Alloy.C('questions_answers_scorecard',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;