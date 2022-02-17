var onNext = null,
    item = {},
    lastSelectedStore = {};
    var lastSelectedStoreType = {};


var today = new Date();
$.datePicker.setValue(today);
$.date.setValue(today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2));
$.date.saveDate = Alloy.Globals.getFullDate();

$.auditBy.setValue(Alloy.Globals.user.get('Username'));

var storesPickerShow = function() {
    //alert(item.DeptCode);
    if (item.type == 2) {
        $.EmployeePopover.show({
            view : $.store
        });

    } else {
        $.storesPopover.show({
            view : $.store
        });

    }

};

var storesTypePickerShow = function() {
    //Ti.API.Info('####### item: '+JSON.stringify(item));
    //alert(item.DeptCode);
    if (item.type == 2) {
        // $.EmployeePopover.show({
        //     view : $.store
        // });

    } else {
        $.storesTypePopover.show({
            view : $.store
        });

    }

};

var storesTypePickerHide = function() {
    if (item.type == 2) {
        $.EmployeePopover.hide();
    } else {
        $.storesTypePopover.hide();
    }

};


var storesPickerHide = function() {
    if (item.type == 2) {
        $.EmployeePopover.hide();
    } else {
        $.storesPopover.hide();
    }

};

var selectStoreType = function(e) {
    storesTypePickerHide();
    lastSelectedStoreType = e.section.getItemAt(e.itemIndex);

    // mark check
    if (lastSelectedStoreType.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
        lastSelectedStoreType.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
    } else {
        lastSelectedStoreType.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
    }
    e.section.updateItemAt(e.itemIndex, lastSelectedStoreType);

    // un-mark
    if ($.storeType.lastIndex != e.itemIndex) {
        try{
        var lastItem = e.section.getItemAt($.storeType.lastIndex);
        lastItem.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
        e.section.updateItemAt($.storeType.lastIndex, lastItem);
        }
        catch (e)
        {}
    }

    $.storeType.lastIndex = e.itemIndex;
    switch (e.itemIndex) {
    	case 0:

        try {
          Alloy.Collections.stores.fetch({
                query : "SELECT * from stores"
            });
        } catch (e) {
          //Ti.API.Info('error -> '+JSON.stringify(e));
        }
    	break;
    	case 1:
      try {
        Alloy.Collections.stores.fetch({
              query : "SELECT * from stores WHERE CompanyTypeDesc = 'Supermarket'"
          });
      } catch (e) {
        //Ti.API.Info('error -> '+JSON.stringify(e));
      }

    	break;
    	case 2:
      try {
        Alloy.Collections.stores.fetch({
              query : "SELECT * from stores WHERE CompanyTypeDesc = 'Hypermarket'"
          });
      } catch (e) {
        //Ti.API.Info('error -> '+JSON.stringify(e));
      }
    	break;
    }
    $.storeType.setValue(lastSelectedStoreType.properties.title);
};

var selectStore = function(e) {
    storesPickerHide();
    lastSelectedStore = e.section.getItemAt(e.itemIndex);

    // mark check
    if (lastSelectedStore.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
        lastSelectedStore.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
    } else {
        lastSelectedStore.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
    }
    e.section.updateItemAt(e.itemIndex, lastSelectedStore);

    // un-mark
    if ($.store.lastIndex != e.itemIndex) {
        try{
        var lastItem = e.section.getItemAt($.store.lastIndex);
        lastItem.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
        e.section.updateItemAt($.store.lastIndex, lastItem);
        }
        catch (e)
        {}
    }

    $.store.lastIndex = e.itemIndex;
    $.store.setValue(lastSelectedStore.properties.title);
};
var datePickerShow = function(e) {
	return;
    $.datePopover.show({
        view : $[e.source.ref]
    });

    $.datePopover.ref = e.source.ref;
};
var selectDate = function(e) {
    $[$.datePopover.ref].setValue(e.value.getFullYear() + '-' + ("0" + (e.value.getMonth() + 1)).slice(-2) + '-' + ("0" + e.value.getDate()).slice(-2));
    $[$.datePopover.ref].saveDate = Alloy.Globals.getFullDate(e.value);
    $.datePopover.hide();
};


exports.show = function(e) {
    //Ti.API.Info ("Entering Show: " + e.item.title);
    //Ti.API.Info('show test 1');
    onNext = e.onNext || null;
    //Ti.API.Info('show test 2');
    item = e.item || {};
    //Ti.API.Info('show test 3');
    $.titleLbl.setText(e.item.title);
    //Ti.API.Info('show test 4');
    $.tempName.setValue(e.item.title);
    //Ti.API.Info('show test 5');
    $.storeType.setValue("All");
    //Ti.API.Info('show test 6');
    if (item.type == 2) {
      //Ti.API.Info('show test 7');
      try {
        Alloy.Collections.employees.fetch({
            query : "SELECT * from employees WHERE AuditID = " + item.AuditID
        });
      } catch (e) {
        //Ti.API.Info('error -> '+JSON.stringify(e));
      }
        //Ti.API.Info('show test 8');
    } else {
      //Ti.API.Info('show test 9');
        Alloy.Collections.stores.fetch();
    }
    //Ti.API.Info('show test 10');
    if (item.type == 2) {
      //Ti.API.Info('show test 11');
        $.storeinForm.setText("Employee Name");
        //Ti.API.Info('show test 12');
        $.storetypeContainer.visible = false;
        //Ti.API.Info('show test 13');
        $.storetypeContainer.height = 0;
        //Ti.API.Info('show test 14');

    } else {
      //Ti.API.Info('show test 15');
        $.storeinForm.setText("Store");
        $.storetypeContainer.visible = true;
        $.storetypeContainer.height = "42dp";
    }
    //Ti.API.Info('show test 16');
    $.store.setValue('');
    //Ti.API.Info('show test 17');
    $.pre_survey.animate({
        opacity : 1
    });
};

exports.hide = function() {

    $.pre_survey.animate({
        opacity : 0
    }, function() {
        //$.destroy();
    });

    if (!OS_IOS){
    $.pre_survey.getParent().remove($.pre_survey);
    }
};

var startSurvey = function() {

    if (lastSelectedStore == {} || $.date.getValue().length == 0) {
        Ti.UI.createAlertDialog({
            title : 'Error',
            message : 'Fill the form please'
        }).show();
        return;
    }

    if (item.type == 2) {
        var myModel = Alloy.createModel('auditRecord', {
            storeCode : lastSelectedStore.properties.StoreCode,
            auditID : item.AuditID,
            deptCode : item.DeptCode,
            submittedBy : Alloy.Globals.user.get('ldap_user'),
            openDate : $.date.saveDate,
            EmployeeNo : lastSelectedStore.properties.EmployeeNo,
            UserID : lastSelectedStore.properties.UserID,
            PositionID : lastSelectedStore.properties.PositionID,

        });

    } else {

        var myModel = Alloy.createModel('auditRecord', {
            storeCode : lastSelectedStore.properties.StoreCode,
            auditID : item.AuditID,
            deptCode : item.DeptCode,
            submittedBy : Alloy.Globals.user.get('ldap_user'),
            openDate : $.date.saveDate
        });
    }
    myModel.save();

    // copy questions to empty answers
    myModel.createEmptyAnswers(item.type);

    if (onNext) {
        onNext({
            auditRecordID : myModel.get('id'),
            deptCode : myModel.get('deptCode'),
            store : lastSelectedStore.properties,
            date : $.date.getValue()
        });
    }
    exports.hide();
};

var back = function() {
    // rewrite the default Date
    $.datePicker.setValue(today);
    $.date.setValue(today.getFullYear() + "-" + (1 + today.getMonth()) + "-" + today.getDate());

    exports.hide();


};
