var args = arguments[0] || {};

var L = require('i18nModule').i18n($.__controllerPath).getString;

$.windowTitle.text = L('window_title');
$.close_button.title = L('close_button_label');

function closeWindow(e){
	$.win.close();
}
