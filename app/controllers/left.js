var openScreen = function(e) {
  //Ti.API.Info('>>>>>>> CHECK 1 on openScreen');
    Alloy.Globals.drawerToggleLeftWindow();
//Ti.API.Info('>>>>>>> CHECK 2 on openScreen');
    Alloy.Globals.pageStack.open(Alloy.createController(e.section.getItemAt(e.itemIndex).properties.ref, {
        res : e.section.getItemAt(e.itemIndex).properties.res || false,
        windowTitle : e.section.getItemAt(e.itemIndex).properties.title
    }).getView(), true);

};

//TODO clean this image after logout
function changeUserImage(e) {

    Titanium.Media.openPhotoGallery({
        allowEditing : true,
        popoverView : OS_IOS ? e.source : null,
        arrowDirection : OS_IOS ? Titanium.UI.iPad.POPOVER_ARROW_DIRECTION_UP : null,
        autohide : OS_IOS ? true : null,
        mediaTypes : OS_IOS ? Titanium.Media.MEDIA_TYPE_PHOTO : null,
        success : function(event) {
            Ti.API.error(JSON.stringify(event));

            if (OS_IOS) {
                var imageAsTaken = Ti.UI.createImageView({
                    image : event.media,
                });

                imageAsTaken = (imageAsTaken.toImage()).imageAsThumbnail(80);
            }
            //Save local

            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userImage");

            if (OS_IOS) {
                f.write(imageAsTaken);
            } else {
                f.write(event.media);
            }
            $.avatar.setImage("ayKalam");
            $.avatar.setImage(f.getNativePath());

        }
    });

}

if (Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userImage").exists()) {
    $.avatar.setImage(Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "userImage"));
}

// remove Tasks section if not allowed for logged in user
try {
  if (Alloy.Globals.user.get('HasTaskList') == 1) {
    try {
      Alloy.Collections.tasks.fetch({
          query : "SELECT TaskName, TaskID FROM tasks GROUP BY TaskID ORDER BY TaskOrder"
      });
    } catch (e) {
      //Ti.API.Info('error -> '+JSON.stringify(e));
    }

  }
} catch (e) {
  //Ti.API.Info('error --> '+JSON.stringify(e));
} 



// set sections
var sectionsArr = [];

// Dashboard only if has tasks
if (Alloy.Globals.user.get('HasTaskList') == 1 || true) {
    sectionsArr.push($.dashboardSec);
}

// Audit only if iPad
//By Hassanisipad
//if (Alloy.Globals.isiPad){
if (Alloy.Globals.isiPad||Alloy.Globals.isTablet){
    sectionsArr.push($.auditSec);
}

// Tasks only if has tasks
if (Alloy.Globals.user.get('HasTaskList') == 1) {
    sectionsArr.push($.tasksSec);
}

// sync for everyone
sectionsArr.push($.syncSec);
$.list.sections = sectionsArr;
sectionsArr = null;
