exports.definition = {
    config : {
        columns : {
            "id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
            "storeCode" : "TEXT",
            "deptCode" : "TEXT",
            "auditID" : "INTEGER",
            "openDate" : "TEXT",
            "submisiondDate" : "TEXT",
            "submittedBy" : "TEXT",
            "online_id" : "INTEGER",
            "EmployeeNo" : "INTEGER",
            "PositionID" : "INTEGER",
            "UserID" : "INTEGER",
            "comment" : "TEXT"
        },
        adapter : {
            type : "sql",
            collection_name : "auditRecord",
            idAttribute : "id"
        },
        defaults : {
            online_id : '',
            submisiondDate : ''
        }
    },
    extendModel : function(Model) {
        _.extend(Model.prototype, {
            createEmptyAnswers : function(type) {

                var tableName = type == 1 ? 'questions' : 'questions_scorecard';

                var dbName = this.config.adapter.db_name;

                var db = Ti.Database.open(dbName);
                db.execute("INSERT INTO answers (AuditRecordID, QuestionID) SELECT " + this.get('id') + ", QuestionID FROM " + tableName + " WHERE AuditID = " + this.get('auditID'));
                db.close();
            },
            destroyAllAnswers : function() {

                var dbName = this.config.adapter.db_name;

                var db = Ti.Database.open(dbName);
                db.execute("DELETE FROM answers WHERE AuditRecordID = " + this.get('id'));
                db.close();
            }
        });

        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
            getIncompleteCOunt : function() {
                var auditRecordColl = Alloy.createCollection('auditRecord');
                try {
                  auditRecordColl.fetch({
                      query : "SELECT id FROM auditRecord a WHERE submisiondDate = ''"
                  });
                } catch (e) {
                  //Ti.API.Info('error -> '+JSON.stringify(e));
                }
                return auditRecordColl.length;
            },
            dashBoard : function(callBack) {

                var data = {
                    risk : 0,
                    notRisk : 0,
                    incomplete : this.getIncompleteCOunt(),
                    bars : []
                };

                var url = Alloy.CFG.url + 'SVM_GetDashboard';
                var client = Ti.Network.createHTTPClient({
                    onload : function() {
                        // Data is returned from the blog, start parsing
                        var xml = this.responseXML.documentElement;

                        // blog posts are in nodes named "item"
                        var items = xml.getElementsByTagName("AuditName");
                        for (var i = 0; i < items.length; i++) {
                            var stores = items.item(i).getElementsByTagName("Stores").item(0).getElementsByTagName('Store');
                            for (var s = 0; s < stores.length; s++) {
                                var store = stores.item(s);
                                var audit = store.getElementsByTagName('Audit').item(0);
                                var previousAudit = store.getElementsByTagName('PreviousAudit').item(0);
                                var row = {
                                    StoreCode : store.getAttribute('StoreCode'),
                                    //StoreDesc : items.item(i).getElementsByTagName("StoreDesc").item(0).text,
                                    //CountryCode : items.item(i).getElementsByTagName("CountryCode").item(0).text,
                                    //CountryDesc : items.item(i).getElementsByTagName("CountryDesc").item(0).text,
                                    //ZoneDesc : items.item(i).getElementsByTagName("ZoneDesc").item(0).text,
                                    //CompanyTypeDesc : items.item(i).getElementsByTagName("CompanyTypeDesc").item(0).text,
                                    //DeptName : items.item(i).getElementsByTagName("DeptName").item(0).text,
                                    //AuditName : items.item(i).getElementsByTagName("AuditName").item(0).text,
                                    //AuditNumber : items.item(i).getElementsByTagName("AuditNumber").item(0).text,
                                    date : audit.getElementsByTagName("Year").item(0).text + '-' + audit.getElementsByTagName("Month").item(0).text,
                                    //MonthName : items.item(i).getElementsByTagName("MonthName").item(0).text,
                                    Score : parseFloat(audit.getElementsByTagName("Score").item(0).text) > 0 ? parseInt(parseFloat(audit.getElementsByTagName("Score").item(0).text) * 100) : 0,
                                    //PreviousAuditNumber : items.item(i).getElementsByTagName("PreviousAuditNumber").item(0).text,
                                    //PreviousDate : items.item(i).getElementsByTagName("PreviousYear").item(0).text + '-' + items.item(i).getElementsByTagName("PreviousMonth").item(0).text,
                                    //PreviousMonthName : items.item(i).getElementsByTagName("PreviousMonthName").item(0).text,
                                    PreviousScore : parseFloat(previousAudit.getElementsByTagName("Score").item(0).text) > 0 ? parseInt(parseFloat(previousAudit.getElementsByTagName("Score").item(0).text) * 100) : 0
                                };
                                if (row.Score > 0){
                                data.bars.push(row);}

                                row.Score >= 0.85 ? data.notRisk++ : data.risk++;
                            }
                        };
                        console.log(data);

                        callBack(_.extend(data, {
                            total : data.risk + data.notRisk + data.incomplete
                        }));
                    },
                    onerror : function(e) {
                        alert(e.error);
                    },
                    timeout : 60000, // in milliseconds
                    validatesSecureCertificate : false
                });
                // Prepare the connection.
                client.open("POST", url);
                client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                // add userAccessCode
                prams = {
                    Username : Alloy.Models.user.get('ldap_user'),
                    userAccessCode : Alloy.CFG.userAccessCode
                };

                // mirge params
                var prams_str = [];
                _.each(prams, function(a, b) {
                    prams_str.push(b + '=' + a);
                });

                // Send the request.
                client.send(prams_str.join('&'));
            }
        });

        return Collection;
    }
};
