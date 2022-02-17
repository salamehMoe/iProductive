var args = arguments[0] || {};

$.titleLbl.setText(args.title);
//$.weightLbl.setText(args.weight);
//$.weightTotalLbl.setText(' / ' + args.weightTotal);

var qCollaction = Alloy.createCollection('questions_scorecard');

qCollaction.on('fetch', function() {
    var rows = [];
    qCollaction.each(function(model) {

        rows.push({
            properties : _.extend(model.toJSON(), {
                answerID : model.get('id'),
                searchableText : model.get('QuestionDesc')
            }),
            id : model.get('id'),
            AuditRecordID : model.get('AuditRecordID'),
            QuestionID : model.get('QuestionID'),
            AnswerID : model.get('AnswerID'),
            Answerstring : model.get('Answerstring'),
            Answervalue : model.get('Answervalue'),
            QuestionValue : model.get('QuestionValue'),
            AnswerDate : model.get('AnswerDate'),
            uploaded_date : model.get('uploaded_date'),
            AuditID : model.get('uploaded_date'),
            SectionID : model.get('SectionID'),
            QuestionDesc : model.get('QuestionDesc'),
            QuestionDesc : {
                text : model.get('QuestionDesc')
            },
            answer : {
                text : model.get('Answerstring')
            }
        });
    });

    $.mySec.setItems(rows);

});
try {
  qCollaction.fetch({
      query : "SELECT a.*, q.* FROM  questions_scorecard q JOIN answers a ON q.QuestionID = a.QuestionID WHERE q.AuditID = " + args.AuditID + " AND q.SectionID = " + args.SectionID + " AND a.AuditRecordID = " + args.auditRecordID
  });
} catch (e) {
  //Ti.API.Info('error -> '+JSON.stringify(e));
}
