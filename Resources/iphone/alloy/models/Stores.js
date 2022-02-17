var Alloy = require('/alloy'),
_ = require("/alloy/underscore")._,
model,collection;

exports.definition = {
  config: {
    columns: {
      "StoreCode": "TEXT PRIMARY KEY",
      "StoreDesc": "TEXT",
      "CountryCode": "TEXT",
      "CountryDesc": "TEXT",
      "ZoneID": "INTEGER",
      "ZoneDesc": "TEXT",
      "CompanyTypeID": "INTEGER",
      "CompanyTypeDesc": "TEXT" },

    adapter: {
      type: "sql",
      collection_name: "stores",
      idAttribute: "StoreCode" } },


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



model = Alloy.M('stores',
exports.definition,
[]);


collection = Alloy.C('stores',
exports.definition,
model);


exports.Model = model;
exports.Collection = collection;