var args = arguments[0] || {};


//var L = require('i18nModule').i18n($.__controllerPath).getString;

var L = Alloy.Globals.i18n.controller($).getStrings;

$.window_title.text = L('window_title1');
$.close_button.title = L('close_button_label');

function closeWindow(e){
	$.win.close();
}
