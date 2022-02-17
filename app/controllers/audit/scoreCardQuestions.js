var args = arguments[0] || {},
    ganswerObj = null;
if (args.notEditable) {// show search bar when not inComplete
    $.list.searchView = Ti.UI.createSearchBar({
        hintText : "Search ...",
        barColor : "#115EAC",
        keyboardType : Titanium.UI.RETURNKEY_SEARCH,
        returnKeyType : Titanium.UI.RETURNKEY_SEARCH
    });
    $.list.setTop(62);
    $.questions.autoAdjustScrollViewInsets = false;
}
if(OS_IOS){
$.questions.setTitle(args.template.title);
}

var secsCollaction = Alloy.createCollection('sections');

secsCollaction.on('fetch', function() {
    var sections = [];

    if (secsCollaction.models.length == 0) {

        var model = Alloy.createModel('sections');
        model.fetch({
            id : args.section.SectionID+"-"+args.AuditID
        });

        $.list.setSections([Alloy.createController('audit/scoreCard_question_section', {
            SectionID : model.get('SectionID'),
            AuditID : model.get('AuditID'),
            auditRecordID : args.auditRecordID,
            deptCode : args.deptCode,
            title : model.get('SectionDesc'),
            weightTotal : args.section.weightTotal,
            weight : model.getWeight(args.auditRecordID), // get weight of answered questions
            notEditable : args.notEditable,
            template : args.template
        }).getView()]);

        return;
    }

    secsCollaction.each(function(model) {

        sections.push(Alloy.createController('audit/scoreCard_question_section', {
            SectionID : model.get('SectionID'),
            AuditID : model.get('AuditID'),
            auditRecordID : args.auditRecordID,
            deptCode : args.deptCode,
            title : model.get('SectionDesc'),
            weightTotal : model.get('weightTotal'),
            weight : model.getWeight(args.auditRecordID), // get weight of answered questions
            notEditable : args.notEditable,
            template : args.template
        }).getView());

    });

    $.list.setSections(sections);

});

//Ti.API.Info ("SELECT s.* FROM sections s JOIN questions_scorecard q ON q.AuditID = s.AuditID AND q.SectionID = s.SectionID WHERE s.AuditID = '" + args.AuditID + "' AND s.ParentID = '" + args.section.SectionID + "' group by s.SectionID ORDER BY s.SectionOrder");
try {
  secsCollaction.fetch({
     query : "SELECT s.* FROM sections s JOIN questions_scorecard q ON q.AuditID = s.AuditID AND q.SectionID = s.SectionID WHERE s.AuditID = '" + args.AuditID + "' AND s.ParentID = '" + args.section.SectionID + "' group by s.SectionID ORDER BY s.SectionOrder"
  });
} catch (e) {
  //Ti.API.Info('error -> '+JSON.stringify(e));
}


function hideanswerLayer(e) {
    //$.answersLayer.setOpacity(0);
    ganswerObj = null;
    $.questions.remove($.answersLayer);
}

function selectAnswer(e) {

    var item = e.section.getItemAt(e.itemIndex);
    // answer text UI
    ganswerObj.item.answer.text = item.properties.title;
    // model answer string
    ganswerObj.item.properties.Answerstring = item.properties.title;
    ganswerObj.item.properties.AnswerID = item.properties.AnswerID;

    ganswerObj.item.properties.Answervalue = item.properties.Value;
    ganswerObj.item.properties.QuestionValue = item.properties.Weight;

    ganswerObj.section.updateItemAt(ganswerObj.itemIndex, ganswerObj.item);

    var answerModel = Alloy.createModel('answers');

    answerModel.fetch({
        id : ganswerObj.item.properties.answerID,
    });

    answerModel.save({
        Answerstring : item.properties.title,
        AnswerID : item.properties.AnswerID,
        Answervalue : item.properties.Value,
        QuestionValue : item.properties.Weight,
        AnswerDate : Alloy.Globals.getFullDate()
    });

    ganswerObj = null;
    hideanswerLayer();

}

function listClicked(e) {

    if (args.notEditable) {
        return false;
    }

    var item = e.section.getItemAt(e.itemIndex);

    Ti.API.debug("!!" + JSON.stringify(item));

    /*  (e.bindId == "delete") {    //  ebrahim left this code if they change thier mind to need delete
     item.answer.text = "";
     item.properties.Answervalue = null;
     item.properties.Answerstring = null;
     item.Answerstring = null;

     e.section.updateItemAt(e.itemIndex, item);

     var answerModel = Alloy.createModel('answers');
     answerModel.fetch({
     id : item.properties.answerID,
     });
     answerModel.save({
     Answerstring : null,
     Answervalue : null,
     QuestionValue : null,
     AnswerDate : null,
     });

     */
    Alloy.Collections.questions_answers_scorecard.on('fetch', function() {

        var rows = [];
        Alloy.Collections.questions_answers_scorecard.each(function(model) {

            rows.push({
                properties : _.extend(model.toJSON(), {
                    AnswerID : model.get('AnswerID'),
                    Value : model.get('Value'),
                    Weight : model.get('Weight'),
                    title : model.get('Answer'),
                    color : item.properties.Answerstring == model.get("Answer") ? Alloy.CFG.borderColor : "black",
                    font : {
                        fontWeight : item.properties.Answerstring == model.get("Answer") ? "bold" : null,
                        fontSize : item.properties.Answerstring == model.get("Answer") ? 25 : 22
                    },
                    height : 70

                }),
            });

        });

        $.answersSection.setItems(rows);
    });

    ganswerObj = {
        item : item,
        section : e.section,
        itemIndex : e.itemIndex
    };
    try {
      Alloy.Collections.questions_answers_scorecard.fetch({
          query : "select * from questions_answers_scorecard where QuestionID=" + item.properties.QuestionID,
      });
    } catch (e) {
      //Ti.API.Info('error -> '+JSON.stringify(e));
    }

    Alloy.Collections.questions_answers_scorecard.off("fetch");
    //$.answersLayer.animate({
     //   opacity : 1,
       // duration : 600
    //});
    $.questions.add($.answersLayer);

}

if (!args.notEditable) {

    if (OS_ANDROID) {
    Alloy.Globals.activeView = 2;
    Alloy.Globals.saveQuestions =  function() {
            Alloy.Globals.pageStack.close($.questions);
            args.saveCallBack();
            resetNavBar();
        };
    Alloy.Globals.backQuestions = function() {
            Alloy.Globals.pageStack.close($.questions);
            resetNavBar();
        };
    Alloy.Globals.activity.invalidateOptionsMenu();
}


    if (OS_IOS){

        var saveBtn = Ti.UI.createButton({
        image:'/images/icons/save.png'
    });
    saveBtn.addEventListener('click', function() {
        Alloy.Globals.pageStack.close($.questions);
        args.saveCallBack();
    });
    $.questions.setRightNavButton(saveBtn);

    var closeBtn = Ti.UI.createButton({
         image:'/images/icons/back.png'
    });
    closeBtn.addEventListener('click', function() {
        Alloy.Globals.pageStack.close($.questions);
    });
    $.questions.setLeftNavButton(closeBtn);
    }
}

$.questions.addEventListener("close", function() {
    $.destroy();
    ganswerObj = null;
});

function resetNavBar(){

    //Ti.API.Info("reseting nav bar");
    if (OS_ANDROID) {
    Alloy.Globals.activeView = 1;
    Alloy.Globals.activity.invalidateOptionsMenu();
}
}
