var pre = Alloy.createController('audit/pre_survey');
var startSurvey = function(e) {

  var item = e.section.getItemAt(e.itemIndex);

  //if (!$.confirmAlert.eventAssaignedBefore) {
  $.confirmAlert.eventAssaignedBefore = true;
  $.confirmAlert.addEventListener('click', function(alertE) {

    if (alertE.index == 0) {

      if (OS_IOS) {

        $.preSurveyView.show({
          item: item.properties,
          onNext: function(formPrams) {
            //Ti.API.Info('>>> test onNext');
            Alloy.Globals.pageStack.open(Alloy.createController('audit/sections', {
              item: item.properties,
              formPrams: formPrams,
              isEditing: true
            }).getView());
          }
        });
      } else {
        pre.titleLbl.setText("");
        pre.tempName.setValue("");
        //Ti.API.Info("Calling Show: " + item.title);
        pre.show({
          item: item.properties,
          onNext: function(formPrams) {
            $.index.remove(pre.getView());
            Alloy.Globals.pageStack.open(Alloy.createController('audit/sections', {
              item: item.properties,
              formPrams: formPrams,
              isEditing: true
            }).getView());
          }
        });
        $.index.add(pre.getView());
      }
    }
    $.confirmAlert.removeEventListener('click', arguments.callee);
  });
  //}
  $.confirmAlert.show();
};

try {
  Alloy.Collections.templates.fetch({
    query: "SELECT * FROM templates WHERE Show > 0 AND deleted = 0"
  });
} catch (e) {
  //Ti.API.Info('error -> '+JSON.stringify(e));
}

function transformFunction(model) {

  m = model.toJSON();

  if (m.AuditDesc == null) {
    m.AuditDesc = "";
  }
  return m;
}




$.index.addEventListener("close", function() {
  $.destroy();
});
