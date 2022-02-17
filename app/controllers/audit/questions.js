var args = arguments[0] || {},
    ganswerId = null,
    isScoreCard = args.template.type == 2;
if (args.notEditable) {// show search bar when not inComplete
	$.list.defaultItemTemplate = 'disabledElementTemplate';
	$.list.searchView = Ti.UI.createSearchBar({
		hintText : "Search ...",
		barColor : "#115EAC",
		keyboardType : Titanium.UI.RETURNKEY_SEARCH,
		returnKeyType : Titanium.UI.RETURNKEY_SEARCH
	});
	if (OS_IOS) {
		$.list.setTop(62);
	}
	$.questions.autoAdjustScrollViewInsets = false;
}

if (OS_IOS) {
	$.questions.setTitle(args.template.title);
}

function protectPreviousAnswer(e){
  e.source.value = e.source.protectedValue;
}

function protectPreviousAnswerValue(e){
  e.source.value = e.source.protectedValue;
}

// else {
// $.questions.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE;
// }

//$.questions.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN;

var secsCollaction = Alloy.createCollection('sections');

secsCollaction.on('fetch', function() {
	var sections = [];
	if (args.deptCode == 'SRC')
		$.list.defaultItemTemplate = 'elementFuckedTemplate';
	if (secsCollaction.models.length == 0) {

		var model = Alloy.createModel('sections');
		model.fetch({
			id : args.section.SectionID + "-" + args.AuditID
		});

		$.list.setSections([Alloy.createController('audit/question_section', {
			SectionID : model.get('SectionID'),
			AuditID : model.get('AuditID'),
			auditRecordID : args.auditRecordID,
			deptCode : args.deptCode,
			title : model.get('SectionDesc'),
			weightTotal : args.section.weightTotal,
			weight : model.getWeight(args.auditRecordID), // get weight of answered questions
			notEditable : args.notEditable,
			isIncomplete: args.isIncomplete,
			template : args.template
		}).getView()]);
		return;
	}

	secsCollaction.each(function(model) {
		//Ti.API.Info("YooKASSEM SectionDesc=" + JSON.stringify(model.get('SectionDesc')));
		sections.push(Alloy.createController('audit/question_section', {
			SectionID : model.get('SectionID'),
			AuditID : model.get('AuditID'),
			auditRecordID : args.auditRecordID,
			deptCode : args.deptCode,
			title : model.get('SectionDesc'),
			weightTotal : model.getSectionWeight(model.get('AuditID'), model.get('SectionID')),//model.get('weightTotal'),
			weight : model.getWeight(args.auditRecordID), // get weight of answered questions
			notEditable : args.notEditable,
			isIncomplete: args.isIncomplete,
			template : args.template
		}).getView());

		var subSecsCollaction = Alloy.createCollection('sections');
		var query = "SELECT s.*" + " FROM sections s  WHERE  s.ParentID = '" + model.get('SectionID') + "' group by s.SectionID ORDER BY s.SectionOrder";

		subSecsCollaction.on('fetch', function() {
			subSecsCollaction.each(function(model2) {
				//Ti.API.Info("YooSUBSECTION KASSEM SectionDesc=" + JSON.stringify(model2.get('SectionDesc'))+" SECTIONID="+ model2.get("SectionID"));
				//Ti.API.Info("FuckedID= "+model2.get("FuckedID"));
				sections.push(Alloy.createController('audit/section_template', {
					info : model2.get('SectionDesc'),
					es_info : model2.get('SectionDesc'),
					model: model,
					AuditID : args.AuditID,
					auditRecordID : args.auditRecordID,
					deptCode : args.deptCode,
					section : {SectionID: model2.get("SectionID")},
					notEditable : args.notEditable,
					saveCallBack : args.saveCallBack,
					refreshSections : args.refreshSections,
					template: args.template
				}).getView());
			});
		});
		subSecsCollaction.fetch({
			query : query
		});

	});

	$.list.setSections(sections);

});

var tableName = isScoreCard ? 'questions_scorecard' : 'questions',
    select = isScoreCard ? "" : ", IFNULL(sum(q.QWeight), 0) weightTotal ";
query = "SELECT s.*" + select + " FROM sections s JOIN " + tableName + " q ON q.AuditID = s.AuditID AND q.SectionID = s.SectionID WHERE s.AuditID = '" + args.AuditID + "' AND s.ParentID = '" + args.section.SectionID + "' group by s.SectionID ORDER BY s.SectionOrder";
if (Alloy.Globals.HasLP) {
	//select = isScoreCard ? "" : ", IFNULL(sum(q.QWeight), 0) weightTotal ";
	query = "SELECT s.*" + select + " FROM sections s JOIN " + tableName + " q ON q.AuditID = s.AuditID  WHERE s.AuditID = '" + args.AuditID + "' AND s.ParentID = '" + args.section.SectionID + "' group by s.SectionID ORDER BY s.SectionOrder";
}
//Ti.API.Info("Yoo Query is: " + query);
try {
  secsCollaction.fetch({
  	query : query
  });
} catch (e) {
  //Ti.API.Info('error -> '+JSON.stringify(e));
}


function listClicked(e) {

	if (args.notEditable) {

		return false;
	}

	var item = e.section.getItemAt(e.itemIndex),
	    Answerstring = null,
	    Answervalue = null,
	    QuestionValue = null,
	    Qweight = null,
	    AnswerDate = null,
	    updateRecord = false;
	//Ti.API.Info("the list item:" + JSON.stringify(item));

	if (e.bindId == "yes") {
		if (item.yes.backgroundColor == "green") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "Yes";
			Answervalue = item.QWeight;
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.yes.backgroundColor = "green";
			item.no.backgroundColor = "gray";
			item.na.backgroundColor = "gray";
			item.pd.backgroundColor = "gray";

			e.section.updateItemAt(e.itemIndex, item);
		}
	} else if (e.bindId == "no") {
		if (item.no.backgroundColor == "red") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "No";
			Answervalue = 0;
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.no.backgroundColor = "red";
			item.yes.backgroundColor = "gray";
			item.na.backgroundColor = "gray";
			item.pd.backgroundColor = "gray";

			e.section.updateItemAt(e.itemIndex, item);
		}
	} else if (e.bindId == "na") {
		if (item.na.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "NA";
			Answervalue = 0;
			QuestionValue = 0;
			Qweight = item.QWeight;
			item.na.backgroundColor = "#333333";
			item.yes.backgroundColor = "gray";
			item.no.backgroundColor = "gray";
			item.pd.backgroundColor = "gray";

			e.section.updateItemAt(e.itemIndex, item);
		}
	} else if (e.bindId == "pd") {
		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "PD";
			Answervalue = (item.QWeight * 0.5);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.pd.backgroundColor = "#333333";
			item.yes.backgroundColor = "gray";
			item.no.backgroundColor = "gray";
			item.na.backgroundColor = "gray";

			e.section.updateItemAt(e.itemIndex, item);

		}

		// Add New Answer by Hassan Abouzeid

	} else if (e.bindId == "fo") {
		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "FO";
			Answervalue = (item.QWeight * 0.5);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.pd.backgroundColor = "#333333";
			item.yes.backgroundColor = "gray";
			item.no.backgroundColor = "gray";
			item.na.backgroundColor = "gray";

			e.section.updateItemAt(e.itemIndex, item);

		}

	} else if (e.bindId == "zero") {
		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "0";
			Answervalue = (item.QWeight * 1);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.zero.backgroundColor = "#0BD318";
			item.one.backgroundColor = "#77adf5";
			item.two.backgroundColor = "#609ff3";
			item.three.backgroundColor = "#4a92f2";
			item.four.backgroundColor = "#3384f0";
			item.five.backgroundColor = "#1d77ef";

			e.section.updateItemAt(e.itemIndex, item);

		}

	} else if (e.bindId == "one") {

		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "1";
			Answervalue = (item.QWeight * 1);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.zero.backgroundColor = "#8ebbf7";
			item.one.backgroundColor = "#0BD318";
			item.two.backgroundColor = "#609ff3";
			item.three.backgroundColor = "#4a92f2";
			item.four.backgroundColor = "#3384f0";
			item.five.backgroundColor = "#1d77ef";

			e.section.updateItemAt(e.itemIndex, item);

		}

	} else if (e.bindId == "two") {
		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "2";
			Answervalue = (item.QWeight * 1);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.zero.backgroundColor = "#8ebbf7";
			item.one.backgroundColor = "#77adf5";
			item.two.backgroundColor = "#0BD318";
			item.three.backgroundColor = "#4a92f2";
			item.four.backgroundColor = "#3384f0";
			item.five.backgroundColor = "#1d77ef";

			e.section.updateItemAt(e.itemIndex, item);

		}

	} else if (e.bindId == "three") {
		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "3";
			Answervalue = (item.QWeight * 1);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.zero.backgroundColor = "#8ebbf7";
			item.one.backgroundColor = "#77adf5";
			item.two.backgroundColor = "#609ff3";
			item.three.backgroundColor = "#0BD318";
			item.four.backgroundColor = "#3384f0";
			item.five.backgroundColor = "#1d77ef";

			e.section.updateItemAt(e.itemIndex, item);

		}

	} else if (e.bindId == "four") {
		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "4";
			Answervalue = (item.QWeight * 1);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.zero.backgroundColor = "#8ebbf7";
			item.one.backgroundColor = "#77adf5";
			item.two.backgroundColor = "#609ff3";
			item.three.backgroundColor = "#4a92f2";
			item.four.backgroundColor = "#0BD318";
			item.five.backgroundColor = "#1d77ef";

			e.section.updateItemAt(e.itemIndex, item);

		}

	} else if (e.bindId == "five") {
		if (item.pd.backgroundColor == "#333333") {
			deleteRecord();
		} else {
			updateRecord = true;
			AnswerDate = Alloy.Globals.getFullDate();
			Answerstring = "5";
			Answervalue = (item.QWeight * 1);
			QuestionValue = item.QValue;
			Qweight = item.QWeight;
			item.zero.backgroundColor = "#8ebbf7";
			item.one.backgroundColor = "#77adf5";
			item.two.backgroundColor = "#609ff3";
			item.three.backgroundColor = "#4a92f2";
			item.four.backgroundColor = "#3384f0";
			item.five.backgroundColor = "#0BD318";

			e.section.updateItemAt(e.itemIndex, item);

		}

	} else if (e.bindId == "camera") {
		ganswerId = item.properties.id;

		// assign the question ID to a golbal var ganswerId
		$.confirmAlert.addEventListener("click", imageSource);

		function imageSource(ev) {
			if (ev.index == 0) {
				camera({
					section : e.section,
					itemIndex : e.itemIndex,
					item : item,
					answerID : item.properties.answerID

				});
			} else if (ev.index == 1) {
				photoGallery({
					section : e.section,
					itemIndex : e.itemIndex,
					item : item,
					answerID : item.properties.answerID

				});
			}
			$.confirmAlert.removeEventListener("click", imageSource);
		}


		$.confirmAlert.show();

	} else if (e.bindId == "Image" && item.Image.image !== null) {// the first Image

		$.deleteImage.addEventListener("click", deleteImage);

		function deleteImage(ev) {
			if (ev.index == 0) {

				deleteFileSystem(item.Image.image);
				item.Image.image = null;

				var answerModel = Alloy.createModel('answers');

				answerModel.fetch({
					id : item.properties.answerID
				});

				answerModel.save({
					//Comment : answerModel.get("Comment"),
					Image : null
				});
				if (item.Image1.image == null) {
					item.commentPhotosContainer.height = 115;
				}
				e.section.updateItemAt(e.itemIndex, item);

			}
			$.deleteImage.removeEventListener("click", deleteImage);
		}


		$.deleteImage.show();

	} else if (e.bindId == "Image1" && item.Image1.image !== null) {

		$.deleteImage.addEventListener("click", deleteImage1);

		function deleteImage1(ev) {
			if (ev.index == 0) {

				deleteFileSystem(item.Image1.image);
				item.Image1.image = null;

				var answerModel = Alloy.createModel('answers');

				answerModel.fetch({
					id : item.properties.answerID
				});

				answerModel.save({
					//Comment : answerModel.get("Comment"),
					Image1 : null
				});
				if (item.Image.image == null) {
					item.commentPhotosContainer.height = 115;
				}

				e.section.updateItemAt(e.itemIndex, item);

			}
			$.deleteImage.removeEventListener("click", deleteImage1);
		}


		$.deleteImage.show();

	} else if (e.bindId == "delete") {
		deleteRecord();
	}

	function deleteRecord() {
		updateRecord = true,
		AnswerDate = null, item.na.backgroundColor = "gray", item.yes.backgroundColor = "gray", item.no.backgroundColor = "gray", item.pd.backgroundColor = "gray",
		Answerstring = null,
		Qweight = null,
		Answervalue = null, item.commentTxtArea.value = "", item.commentPhotosContainer.height = 115, deleteFileSystem(item.Image.image), item.Image.image = null, deleteFileSystem(item.Image1.image), item.Image1.image = null, e.section.updateItemAt(e.itemIndex, item);
		/*if (e.bindId == "pd") {
		 var weight = 0.5 * parseFloat(item.properties.QWeight);

		 } else {
		 var weight = parseFloat(item.properties.QWeight);

		 }

		 var sectionNum = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText());
		 var total = sectionNum - weight;
		 alert(parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - weight);

		 if (total == 0) {
		 e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(0);
		 } else {
		 e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(total);
		 }

		 value = null;*/

	}

	if (updateRecord) {// make Sure that (yes,no,na,delete) is pressed to save this record
		var answerModel = Alloy.createModel('answers');

		answerModel.fetch({
			id : item.properties.answerID
		});

		if (Answerstring == null) {// preform delete
			if (e.bindId == "pd") {
				var weight = 0.5 * parseFloat(item.properties.QWeight);

			} else {
				var weight = parseFloat(item.properties.QWeight);
			}

			total = e.section.getHeaderView().getChildren()[1].getChildren()[0].getText() - weight;
			e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(total);

		} else if (answerModel.get('AnswerDate') == null) {// so the question didnt answered yet, now we can add it to the score

			var weight = e.bindId == "pd" ? item.properties.QWeight * 0.5 : item.properties.QWeight;

			var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) + weight;

			e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);

			// Add new answer by Hassan Abouzeid

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 0.5 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "FO") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			}

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 1 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "0") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			}

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 1 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "1") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			}

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 1 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "2") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			}

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 1 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "3") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			}

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 1 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "4") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			}

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 1 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "5") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			}

		} else if (answerModel.get('AnswerDate') !== null && answerModel.get('Answerstring') !== Answerstring) {

			var weight = 0.5 * item.properties.QWeight;
			// user was pressed on another btn (y,n,na)
			if (Answerstring == "PD") {// minus the Qweight first then add 0.5 * Qweight

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - item.properties.QWeight;

				value = value + weight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
				// user was pressed on PD
			} else if (answerModel.get('Answerstring') !== "Yes" && answerModel.get('Answerstring') !== "No" && answerModel.get('Answerstring') !== "NA") {

				var value = parseFloat(e.section.getHeaderView().getChildren()[1].getChildren()[0].getText()) - weight;

				value = value + item.properties.QWeight;
				e.section.getHeaderView().getChildren()[1].getChildren()[0].setText(value);
			}

			value = null,
			weight = null;

		}

		answerModel.save({
			Answerstring : Answerstring,
			Answervalue : Answervalue,
			QuestionValue : QuestionValue,
			Qweight : Qweight,
			//Comment : item.comment.value == "" ? "" : answerModel.get("Comment"),
			AnswerDate : AnswerDate,
			Image : item.Image.image,
			Image1 : item.Image1.image
		});
		args.refreshSections();

	}
}

function saveComment(e) {

	item = e.section.getItemAt(e.itemIndex);

	var answerModel = Alloy.createModel('answers');
	answerModel.fetch({
		id : item.properties.answerID
	});
	answerModel.save({
		Comment : e.value
	});

	item.commentTxtArea.value = e.value;
	e.section.updateItemAt(e.itemIndex, item);
}

function photoGallery(e) {

	var currentTime = new Date();
	Titanium.Media.openPhotoGallery({
		allowEditing : true,
		//arrowDirection : Titanium.UI.iPad.POPOVER_ARROW_DIRECTION_RIGHT,
		autohide : true,
		mediaTypes : Titanium.Media.MEDIA_TYPE_PHOTO,
		success : function(event) {
			//Ti.API.Info(JSON.stringify(event));

			var image = event.media;

			var imageAsTaken = Ti.UI.createImageView({
				image : image
			});

			//Ti.API.Info('image size before imgaeresize :' + image.size);
			var newBlob;

			// imageFile = imageAsTaken.toImage();
			// Turn blob into a square thumbnail, only iphone :(
			//imageFile = imageFile.imageAsThumbnail(120);
			//Save local

			//  image = ImageFactory.imageAsResized(image, { width: 640, height: 640 });
			if (OS_IOS) {
				newBlob = image.imageAsResized(640, 640);
			} else {
				var ImageFactory = require('ti.imagefactory');
				newBlob = ImageFactory.imageAsResized(image, {
					width : 640,
					height : 640
				});
			}

			//Ti.API.Info('image size after imgaeresize :' + newBlob.size);

			var fileName = Ti.Filesystem.applicationDataDirectory + '/images' + currentTime.getTime() + ganswerId + '.jpg';
			var f = Ti.Filesystem.getFile(fileName);
			f.write(newBlob);

			var answerModel = Alloy.createModel('answers');

			answerModel.fetch({
				id : e.answerID
			});

			if (e.item.Image.image == null) {// this means that the first image is empty
				e.item.Image.image = f.nativePath;

				answerModel.save({
					Image : newBlob
				});

			} else {
				e.item.Image1.image = f.nativePath;
				answerModel.save({
					Image1 : newBlob
				});

			}

			e.item.commentPhotosContainer.height = 145;
			e.section.updateItemAt(e.itemIndex, e.item);

			ganswerId = null;
			// null the global var ganswerId
		}
	});
}

function camera(e) {

	var currentTime = new Date();
	Titanium.Media.showCamera({
		success : function(event) {

			// called when media returned from the camera
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var image = event.media;

				var imageAsTaken = Ti.UI.createImageView({
					image : image
				});

				//Ti.API.Info('image size before imgaeresize :' + image.size);
				var newBlob;

				// imageFile = imageAsTaken.toImage();
				// Turn blob into a square thumbnail, only iphone :(
				//imageFile = imageFile.imageAsThumbnail(120);
				//Save local

				//  image = ImageFactory.imageAsResized(image, { width: 640, height: 640 });
				if (OS_IOS) {
					newBlob = image.imageAsResized(640, 640);
				} else {
					var ImageFactory = require('fh.imagefactory');
					ImageFactory.rotateResizeImage(image.nativePath, 300, 70);
					newBlob = image;
				}

				//Ti.API.Info('image size after imgaeresize :' + newBlob.size);

				var fileName = Ti.Filesystem.applicationDataDirectory + '/images' + currentTime.getTime() + ganswerId + '.jpg';
				var f = Ti.Filesystem.getFile(fileName);
				f.write(newBlob);

				var answerModel = Alloy.createModel('answers');

				answerModel.fetch({
					id : e.answerID
				});

				if (e.item.Image.image == null) {// this means that the first image is empty
					e.item.Image.image = f.nativePath;

					answerModel.save({
						Image : newBlob
					});

				} else {
					e.item.Image1.image = f.nativePath;
					answerModel.save({
						Image1 : newBlob
					});

				}

				e.item.commentPhotosContainer.height = 145;
				e.section.updateItemAt(e.itemIndex, e.item);

				ganswerId = null;

				// null the global var ganswerId
			} else {

				alert("thats not an image");

			}

			ganswerId = null;
		},
		cancel : function() {
			// called when user cancels taking a picture
			ganswerId = null;
		},
		error : function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
			ganswerId = null;
		},
		saveToPhotoGallery : true,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});

}

if (!args.notEditable) {

	if (OS_ANDROID) {
		Alloy.Globals.activeView = 2;
		Alloy.Globals.saveQuestions = function() {
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

	if (OS_IOS) {
		var saveBtn = Ti.UI.createButton({
			image : '/images/icons/save.png'
		});
		saveBtn.addEventListener('click', function() {
			Alloy.Globals.pageStack.close($.questions);
			args.saveCallBack();
		});
		$.questions.setRightNavButton(saveBtn);

		var closeBtn = Ti.UI.createButton({
			image : '/images/icons/back.png'
		});
		closeBtn.addEventListener('click', function() {
			Alloy.Globals.pageStack.close($.questions);
		});
		$.questions.setLeftNavButton(closeBtn);
	}
	// else {
	//
	// var activity = Ti.Android.currentActivity;
	// // need to explicitly use getXYZ methods
	// var actionBar = activity.getActionBar();
	//
	// if (actionBar) {
	// // Now we can do stuff to the actionbar
	// actionBar.setTitle(args.template.title);
	//
	// actionBar.setIcon('/images/appicon.png');
	//
	// activity.onCreateOptionsMenu = function(e) {
	// var menuItem2 = e.menu.add({
	// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	// icon : "/images/icons/back.png"
	// });
	// menuItem2.addEventListener("click", function() {
	// Alloy.Globals.pageStack.close($.questions);
	// resetNavBar();
	// });
	//
	// var menuItem = e.menu.add({
	// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	// icon : "/images/icons/save.png"
	// });
	// menuItem.addEventListener("click", function() {
	// Alloy.Globals.pageStack.close($.questions);
	// args.saveCallBack();
	// resetNavBar();
	// });
	//
	//
	// };
	// activity.invalidateOptionsMenu();
	//
	// // show an angle bracket next to the home icon,
	// // indicating to users that the home icon is tappable
	// //actionBar.setDisplayHomeAsUp(true);
	//
	// // toggle the left window when the home icon is selected
	// // actionBar.onHomeIconItemSelected = function() {
	// // Ti.API.log('home button clicked');
	// // $.drawer.toggleLeftWindow();
	// // };
	// }

	//}
}
// else{
//
// //Ti.API.Info ("before creating Activity");
// var activity = Ti.Android.currentActivity;
// activity.onCreateOptionsMenu = function(e){
// //Ti.API.Info ("before var menu");
// var menu = e.menu;
// //Ti.API.Info ("after var menu");
// var menuItem = menu.add({ title: 'Save'});
// menuItem.setIcon('/images/icons/save.png');
// menuItem.addEventListener('click', save);
// ////Ti.API.Info ("before back");
// var menuItemBack = menu.add({ title: 'Back'});
// menuItemBack.setIcon('/images/icons/back.png');
// menuItemBack.addEventListener('click', close);
// };
//
//
// }

// var saveBtn = Ti.UI.createButton({
// image:'/images/icons/save.png'
// });
// saveBtn.addEventListener('click', function() {
// Alloy.Globals.pageStack.close($.questions);
// args.saveCallBack();
// });
// $.questions.setRightNavButton(saveBtn);
//
// var closeBtn = Ti.UI.createButton({
//
// image:'/images/icons/back.png'
// });
// closeBtn.addEventListener('click', function() {
// Alloy.Globals.pageStack.close($.questions);
// });
// $.questions.setLeftNavButton(closeBtn);
//}

function deleteFileSystem(name) {

	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, name);

	if (f.exists()) {

		f.deleteFile();

	}

}

$.questions.addEventListener("close", function() {
	$.destroy();
});

function showAlertdialog(e) {
	if (OS_IOS || args.notEditable) {
		// var item = e.section.getItemAt(e.itemIndex);
		// item.commentTxtArea.enabled = false;
		return;
	}
	$.commentAlert.show();
	var item = e.section.getItemAt(e.itemIndex);

	//
	//Ti.API.Info("the e is " + JSON.stringify(item.commentTxtArea));
	$.editText.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
	$.editText.focus();
	$.editText.value = item.commentTxtArea.value;
	$.commentAlert.addEventListener("click", imageSource);

	function imageSource(ev) {
		if (ev.index == 0) {
			var answerModel = Alloy.createModel('answers');
			answerModel.fetch({
				id : item.properties.answerID
			});
			answerModel.save({
				Comment : $.editText.value
			});

			item.commentTxtArea.value = $.editText.value;
			e.section.updateItemAt(e.itemIndex, item);
		} else if (ev.index == 1) {
		}
		$.commentAlert.removeEventListener("click", imageSource);
	}

}

function resetNavBar() {

	//Ti.API.Info("reseting nav bar");
	if (OS_ANDROID) {
		Alloy.Globals.activeView = 1;
		Alloy.Globals.activity.invalidateOptionsMenu();
	}
	// if(OS_IOS)
	// return;
	// var activity = Ti.Android.currentActivity;
	// // need to explicitly use getXYZ methods
	// var actionBar = activity.getActionBar();
	//
	// if (actionBar) {
	// // Now we can do stuff to the actionbar
	// actionBar.setTitle('iProductive');
	//
	// actionBar.setIcon('/images/appicon.png');
	//
	// activity.onCreateOptionsMenu = function(e) {
	// var menuItem = e.menu.add({
	// showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	// icon : "/images/user.png"
	// });
	// menuItem.addEventListener("click", function(e) {
	// Ti.API.log('right button clicked');
	// var win = Ti.UI.createWindow({
	// title : 'Profile'
	// });
	// var profile = Alloy.createController('profile');
	// profile.on('logout', function() {
	// win.close();
	// });
	// win.add(profile.getView());
	// win.open();
	// });
	// };
	// activity.invalidateOptionsMenu();
	//
	// // show an angle bracket next to the home icon,
	// // indicating to users that the home icon is tappable
	// //actionBar.setDisplayHomeAsUp(true);
	//
	// // toggle the left window when the home icon is selected
	// // actionBar.onHomeIconItemSelected = function() {
	// // Ti.API.log('home button clicked');
	// // $.drawer.toggleLeftWindow();
	// // };
	// }
}
