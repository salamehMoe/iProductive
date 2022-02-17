var isdeleting = false;

function confirmDelete(e) {
    //TODO show alerDialog
    isdeleting = true;
    $.confirmDelete.show();
    $.confirmDelete.addEventListener("click",  del);
    function del(ev) {
            if (ev.index == 0) {
               //YES
               //alert("YES");
               deleteMe(e);
            } else if (ev.index == 1) {
               //NO
               //alert("NO");
            }
            $.confirmDelete.removeEventListener("click", del);
            }

}

var openTemplate = function(e) {
	if(isdeleting){
		isdeleting = false;
		return;
	}
    var item = e.section.getItemAt(e.itemIndex);

    Alloy.Globals.pageStack.open(Alloy.createController('audit/sections', {
        item : item.properties,
        formPrams : {
            auditRecordID : item.properties.auditRecordID,
            deptCode : item.properties.deptCode,
            store : item.properties.storeCode,
            date : item.properties.openDate,
            comment : item.properties.comment,
        },
        isEditing : true,
        isIncomplete : refreshCollection
    }).getView());

};

function transformFunction(model) {

    var transform = model.toJSON();
    transform.subTitle = transform.storeCode + " / " + moment(transform.openDate).format('DD-MM-YYYY HH:mm');

    if (transform.WA == null) {

        transform.subTitle = transform.subTitle;

    } else {

        transform.subTitle = transform.subTitle + "    " + (transform.WA / transform.WT * 100).toFixed(3) + "%";

    }

    return transform;
}

function deleteMe(e) {
	isdeleting = true;
    var auditRecordModel = Alloy.Collections.auditRecord.at(e.itemIndex);
    auditRecordModel.destroyAllAnswers();
    auditRecordModel.destroy();
}

 if(OS_IOS){
    $.editBtn.addEventListener('click', function() {
    	$.list.editing = !$.list.editing;
		});
    }


function refreshCollection() {
    try {
      Alloy.Collections.auditRecord.fetch({
          query : "SELECT a.*, t.* ,sum(qu.QWeight) WT, sum((SELECT qu.QWeight  WHERE length(ans.AnswerDate)>0 )) WA FROM auditRecord a  JOIN templates t ON t.AuditID = a.AuditID LEFT JOIN questions qu ON qu.AuditID = a.auditID LEFT JOIN answers ans ON ans.QuestionID = qu.QuestionID  AND ans.AuditRecordID = a.id  WHERE submisiondDate = '' group by a.id"
         // query : "SELECT a.*, t.* ,sum(qu.QWeight) WT, sum((SELECT qu.QWeight  WHERE length(ans.AnswerDate)>0 )) WA FROM auditRecord a  JOIN templates t ON t.AuditID = a.AuditID LEFT JOIN questions qu ON qu.AuditID = a.auditID LEFT JOIN answers ans ON ans.QuestionID = qu.QuestionID  AND ans.AuditRecordID = a.id AND a.submittedBy = \""+Alloy.Globals.user.get('ldap_user')+"\"  WHERE submisiondDate = '' group by a.id"

      });

      //Ti.API.Info('######### REFFFRESHINNNNN');
    } catch (e) {
    	//Ti.API.Info('error -> '+JSON.stringify(e));
    }

}


refreshCollection();

$.inCompleted.addEventListener("close", function() {
    $.destroy();
});

///
// function updateCache() {
//   var qCollaction = Alloy.createCollection('questions');
//
//   qCollaction.on('fetch', function() {
//   	qCollaction.each(function(model) {
//   		var qCollectionJSON = model.toJSON();
//       cacheDraftsQuestions(qCollectionJSON);
//   	});
//   });
// }
//
// function cacheDraftsQuestions(questions) {
//
// 	var usersData = Ti.App.Properties.getList("CachedDataByUser",[]);
// 	if (usersData.filter(function(user){
// 		return user.user == Ti.App.Properties.getString('lastLoginUser',"noUser");
// 	}).length) {
// 		usersData.forEach(function(user, i){
// 			if (user.user == Ti.App.Properties.getString('lastLoginUser',"noUser")) {
// 				usersData[i].cachedDraftsQuestions = questions;
// 			}
// 		});
// 	}
//   Ti.App.Properties.setList("CachedDataByUser",usersData);
// }

///




//Ti.API.Info('<============ in in_complete, list length is:'+$.list.sections.length);
