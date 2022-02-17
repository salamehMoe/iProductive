var args = arguments[0] || {};



var clickSection = function(e) {

    var item = e.section.getItemAt(e.itemIndex);
    if (isScoreCard) {
        Alloy.Globals.pageStack.open(Alloy.createController('audit/scoreCardQuestions', {
            AuditID : args.item.AuditID,
            auditRecordID : args.formPrams.auditRecordID,
            deptCode : args.formPrams.deptCode,
            section : item.properties,
            template : args.item,
            notEditable : args.notEditable,
            saveCallBack : save,
            refreshSections : refreshSections
        }).getView());

    } else {

        Alloy.Globals.pageStack.open(Alloy.createController('audit/questions', {
            AuditID : args.item.AuditID,
            auditRecordID : args.formPrams.auditRecordID,
            deptCode : args.formPrams.deptCode,
            section : item.properties,
            template : args.item,
            notEditable : args.notEditable,
            saveCallBack : save,
            refreshSections : refreshSections
        }).getView());
    }
};

function openComment(e) {


     //$.Score.text = totalScore;
     if (OS_IOS){

         $.Comment.setSuppressReturn(false);
         $.Comment.setReturnKeyType(Ti.UI.RETURNKEY_DEFAULT);
         $.sections.add($.answersLayer);
         $.answersLayer.animate({
        opacity : 1
        });
     }
     else{
         $.sections.add($.answersLayer);
           $.answersLayer.animate({
            opacity : 1
            });
     }

     //totalScore = (totalScore >= 84.99 && totalScore != 100) ? 84.99 : totalScore;

$.Score.text = totalWeight+ ' / ' + totalWeightTotal + "        Finished: " + (((totalWeight / totalWeightTotal) || 0) * 100).toFixed(3) + " %       Score: " + totalScore + " %";
//$.Comment.setValue(args.formPrams.comment);
//alert(args.formPrams.comment);

    var auditRecordModel = Alloy.createModel('auditRecord');

    auditRecordModel.fetch({
        id : args.formPrams.auditRecordID
    });

    $.Comment.setValue(auditRecordModel.get("comment"));

}


$.titleLbl.setText(args.info);


var clickSection = function(e) {

    //var item = e.section.getItemAt(e.itemIndex);
    var item = args.model;
    // if (isScoreCard) {
        // Alloy.Globals.pageStack.open(Alloy.createController('audit/scoreCardQuestions', {
            // AuditID : args.item.AuditID,
            // auditRecordID : args.formPrams.auditRecordID,
            // deptCode : args.formPrams.deptCode,
            // section : item.properties,
            // template : args.item,
            // notEditable : args.notEditable,
            // saveCallBack : save,
            // refreshSections : refreshSections
        // }).getView());
//
    // } else
     {

        Alloy.Globals.pageStack.open(Alloy.createController('audit/questions', {
            AuditID : args.AuditID,
            auditRecordID : args.auditRecordID,
            deptCode : args.deptCode,
            section : args.section,
            template : args.template,
            notEditable : args.notEditable,
            saveCallBack : args.saveCallBack,
            refreshSections : args.refreshSections
        }).getView());
    }
};
