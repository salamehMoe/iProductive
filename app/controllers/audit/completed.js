var openTemplate = function(e) {

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
		notEditable : true
	}).getView());

};

function transformFunction(model) {
	var transform = model.toJSON();
	transform.subTitle = transform.storeCode + " / " + transform.openDate;
	return transform;
}
try {
	Alloy.Collections.auditRecord.fetch({
		query : "SELECT a.*, t.* FROM auditRecord a JOIN templates t ON t.AuditID = a.AuditID WHERE length(a.submisiondDate) > 3 AND a.online_id = ''"
	});
} catch (e) {
	//Ti.API.Info('error -> '+JSON.stringify(e));
}


$.completed.addEventListener("close", function() {
	$.destroy();
});
