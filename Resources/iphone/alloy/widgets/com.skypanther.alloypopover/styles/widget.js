module.exports = [{ "isApi": true, "priority": 1000.0001, "key": "TabGroup", "style": { tintColor: Alloy.CFG.tintColor } }, { "isApi": true, "priority": 1000.0003, "key": "Window", "style": { backgroundColor: "#ffffff" } }, { "isApi": true, "priority": 1000.0004, "key": "TextField", "style": { leftButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS, rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS } }, { "isApi": true, "priority": 1000.0005, "key": "ListView", "style": { defaultItemTemplate: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE } }, { "isApi": true, "priority": 1000.0006, "key": "ListItem", "style": { height: 70 } }, { "isApi": true, "priority": 1000.0007, "key": "ActivityIndicator", "style": { message: "Loading ...", color: "black" } }, { "isApi": true, "priority": 1000.001, "key": "AlertDialog", "style": { buttonNames: ["OK"] } }, { "isApi": true, "priority": 1000.0012, "key": "TextArea", "style": { color: Alloy.CFG.borderColor } }, { "isApi": true, "priority": 1000.0013, "key": "SearchBar", "style": { hintText: "Search ...", barColor: "#115EAC", tintColor: "#ffffff", keyboardType: Titanium.UI.RETURNKEY_SEARCH, returnKeyType: Titanium.UI.RETURNKEY_SEARCH } }, { "isApi": true, "priority": 1000.0014, "key": "SearchView", "style": { hintText: "Search ..." } }, { "isApi": true, "priority": 1000.0019, "key": "Label", "style": { textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT } }, { "isApi": true, "priority": 1101.0002, "key": "Window", "style": { translucent: true, tintColor: Alloy.CFG.tintColor, navTintColor: "#ffffff", barColor: Alloy.CFG.borderColor, includeOpaqueBars: true, autoAdjustScrollViewInsets: true, statusBarStyle: Ti.UI.iOS.StatusBar.LIGHT_CONTENT, extendEdges: [Ti.UI.EXTEND_EDGE_TOP, Ti.UI.EXTEND_EDGE_BOTTOM] } }, { "isApi": true, "priority": 1101.0009, "key": "ActivityIndicator", "style": { style: Titanium.UI.ActivityIndicatorStyle.DARK } }, { "isApi": true, "priority": 1101.002, "key": "RefreshControl", "style": { tintColor: "#165d9c" } }, { "isClass": true, "priority": 10000.0015, "key": "fieldContainner", "style": { width: "80%", height: 42, top: 20 } }, { "isClass": true, "priority": 10000.0016, "key": "txtFieldContainner", "style": { backgroundColor: "silver", width: "80%", height: 42, top: 20 } }, { "isClass": true, "priority": 10000.0017, "key": "txtField", "style": { backgroundColor: "#ffffff", left: 1, bottom: 1, width: Ti.UI.FILL, height: Ti.UI.FILL, padding: { right: 10 } } }, { "isClass": true, "priority": 10000.0018, "key": "textBtn", "style": { width: 25, height: 25, right: 10 } }, { "isClass": true, "priority": 10000.0021, "key": "splitter", "style": { height: 1, backgroundColor: "gray" } }, { "isClass": true, "priority": 10000.0022, "key": "bg", "style": { width: Ti.UI.FILL, height: Ti.UI.FILL, top: 0 } }, { "isClass": true, "priority": 10000.0025, "key": "darkBtn", "style": { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.borderColor, borderRadius: 2, font: { fontSize: 22 } } }, { "isClass": true, "priority": 10000.0026, "key": "backBtn", "style": { color: "#ffffff", tintColor: "#ffffff", backgroundColor: Alloy.CFG.tintColor, borderRadius: 2, font: { fontSize: 22 } } }, { "isClass": true, "priority": 10000.0027, "key": "overlay", "style": { backgroundColor: "#000000", opacity: 0.7 } }, { "isClass": true, "priority": 10000.0039, "key": "popover", "style": { navBarHidden: true, zIndex: 2, backgroundColor: "transparent" } }, { "isClass": true, "priority": 10000.004, "key": "backshade", "style": { backgroundColor: "#2a2a2a", opacity: 0.6, top: 0, left: 0, right: 0, bottom: 0 } }, { "isClass": true, "priority": 10000.0042, "key": "wrapper", "style": { backgroundColor: "white", width: "75%", height: "80%", borderColor: "#777", borderWidth: 3 } }, { "isClass": true, "priority": 10000.0044, "key": "titlebar", "style": { backgroundColor: "#777", height: 40, top: 0, width: Ti.UI.FILL } }, { "isClass": true, "priority": 10000.0046, "key": "title", "style": { font: { fontSize: 16 }, fontWeight: "bold", color: "white", textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, text: "Title", width: Ti.UI.SIZE, zIndex: 1 } }, { "isClass": true, "priority": 10000.0047, "key": "leftnavbutton", "style": { backgroundColor: "#1a48a4", left: 5, bottom: 5, top: 5, width: 50, height: 30, font: { fontSize: 12, fontWeight: "bold" }, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, backgroundImage: "none", borderColor: "#444444", borderWidth: 1, color: "#fff", text: "Left", visible: false } }, { "isClass": true, "priority": 10000.0049, "key": "rightnavbutton", "style": { backgroundColor: "#1a48a4", right: 5, bottom: 5, top: 5, width: 50, height: 30, font: { fontSize: 12, fontWeight: "bold" }, textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, backgroundImage: "none", borderColor: "#444", borderWidth: 1, color: "#fff", text: "Right", visible: false } }, { "isClass": true, "priority": 10000.0051, "key": "contents", "style": { backgroundColor: "white", top: 40, left: 2, right: 2, bottom: 2 } }, { "isClass": true, "priority": 10101.0023, "key": "bg", "style": { image: "/images/Carrefour-Logo.jpg", backgroundRepeat: true, blur: { type: Alloy.Globals.blur.IOS_BLUR, radiusInPixels: 4 } } }, { "isClass": true, "priority": 10101.0041, "key": "shadow", "style": { backgroundColor: "#333", width: "75%", height: "80%", opacity: 0.6 } }, { "isClass": true, "priority": 10101.0043, "key": "wrapper", "style": { borderRadius: 4 } }, { "isClass": true, "priority": 10101.0045, "key": "titlebar", "style": { backgroundGradient: { type: "linear", startPoint: { x: "100%", y: "100%" }, endPoint: { x: "100%", y: "0" }, colors: [{ color: "#666", offset: 0 }, { color: "#555", offset: 0.5 }, { color: "#777", offset: 1 }] } } }, { "isClass": true, "priority": 10101.0048, "key": "leftnavbutton", "style": { backgroundColor: "transparent", backgroundGradient: { type: "linear", colors: [{ color: "#aaa" }, { color: "#1a48a4" }] }, style: Titanium.UI.iOS.SystemButtonStyle.PLAIN, borderRadius: 2 } }, { "isClass": true, "priority": 10101.005, "key": "rightnavbutton", "style": { backgroundColor: "transparent", backgroundGradient: { type: "linear", colors: [{ color: "#aaa" }, { color: "#1a48a4" }] }, style: Titanium.UI.iOS.SystemButtonStyle.PLAIN, borderRadius: 2 } }];function WPATH(s) {
  var index = s.lastIndexOf('/');
  var path = index === -1 ?
  'com.skypanther.alloypopover/' + s :
  s.substring(0, index) + '/com.skypanther.alloypopover/' + s.substring(index + 1);

  return path.indexOf('/') !== 0 ? '/' + path : path;
}