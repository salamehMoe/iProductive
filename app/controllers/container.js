Alloy.Globals.drawer = $.drawer;

Alloy.Globals.drawerToggleLeftWindow = function() {
    $.drawer.toggleLeftWindow();
};
Alloy.Globals.drawerToggleRighttWindow = function() {
    $.drawer.toggleRightWindow();
};

if (OS_ANDROID) {
    $.drawer.addEventListener('open', onNavDrawerWinOpen);

    function onNavDrawerWinOpen(evt) {
        this.removeEventListener('open', onNavDrawerWinOpen);

        // set center area
        Alloy.Globals.pageStack.open(Alloy.createController('home').getView());

        var activity = evt.source.getActivity();
        Alloy.Globals.activity = evt.source.getActivity();
        Alloy.Globals.activeView = 0;

        activity.onCreateOptionsMenu = function(e) {
            //Ti.API.Info("calling onCreateOptionsMenu with activeview = "+Alloy.Globals.activeView);
            var item,
                menu;
            menu = e.menu;
            menu.clear();

            switch(Alloy.Globals.activeView) {
            case 0:
            //Ti.API.Info ("Entering Case 0");
                var menuItem = e.menu.add({
                    showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon : "/images/user.png"
                });
      
                menuItem.addEventListener("click", function(e) {
                    Ti.API.log('right button clicked');
                    var win = Ti.UI.createWindow({
                        title : 'Profile'
                    });
                    var profile = Alloy.createController('profile');
                    profile.on('logout', function() {
                        win.close();
                    });
                    win.add(profile.getView());
                    win.open();
                });

                break;
            case 1:
                    var menuItem2 = e.menu.add({
                        showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
                        icon : "/images/icons/back.png"
                    });
                    menuItem2.addEventListener("click", Alloy.Globals.backSections);
                    
                    var menuItem = e.menu.add({
                        showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
                        icon : "/images/icons/save.png"
                    });
                    menuItem.addEventListener("click", Alloy.Globals.saveSections);
                    
                // var item = e.menu.add({
                    // title : "Share",
                    // showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    // icon : Ti.Android.R.drawable.ic_menu_send
                // });
                // item.addEventListener("click", Alloy.Globals.saveButton);

                break;
                
            case 2:
            
                 var menuItem2 = e.menu.add({
                        showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
                        icon : "/images/icons/back.png"
                    });
                    menuItem2.addEventListener("click", Alloy.Globals.backQuestions);
                    
                    var menuItem = e.menu.add({
                        showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
                        icon : "/images/icons/save.png"
                    });
                    menuItem.addEventListener("click", Alloy.Globals.saveQuestions);
                    
                // var item = e.menu.add({
                    // title : "Share",
                    // showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    // icon : Ti.Android.R.drawable.ic_menu_send
                // });
                // item.addEventListener("click", Alloy.Globals.saveButton);

                break;
            
            }
            
          
            
        };
        
          Alloy.Globals.activity.invalidateOptionsMenu();

    // show an angle bracket next to the home icon,
    // indicating to users that the home icon is tappable
    //actionBar.setDisplayHomeAsUp(true);

    // toggle the left window when the home icon is selected
    Alloy.Globals.activity.getActionBar().onHomeIconItemSelected = function() {
     Ti.API.log('home button clicked');
     $.drawer.toggleLeftWindow();
    };
    }

}

if (OS_ANDROID) {
    $.drawer.addEventListener("open", function() {
        $.drawer.addEventListener("androidback", function() {

            if ($.drawer.isLeftWindowOpen()) {
                $.drawer.toggleLeftWindow();
                return;
            }
            
            if(Alloy.Globals.activeView == 1 || Alloy.Globals.activeView == 2 )
                {
                    //Ti.API.Info("pressing back in navbar");
                    return;
                }  
    
            if (Alloy.Globals.pageStack.pages.length > 1) {
                Alloy.Globals.pageStack.close();
                return;
            }
            
            var alertDialog = Ti.UI.createAlertDialog({
                title : 'Logout',
                message : 'Are you sure?',
                buttonNames : ['OK', 'Cancel']
            });

            alertDialog.addEventListener('click', function(e) {

                if (e.index == 0) {
                    $.drawer.close();
                }
            });

            alertDialog.show();
        });
    });
}

$.drawer.addEventListener("close", function() {
    $.destroy();
    Alloy.Globals.drawerToggleLeftWindow = null;
    Alloy.Globals.drawerToggleRighttWindow = null;
    Alloy.Globals.drawer = null;
});

$.drawer.open();
