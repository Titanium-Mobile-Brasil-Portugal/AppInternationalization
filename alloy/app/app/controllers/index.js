
// Import i18n module
var L = require('i18nModule').i18n($.__controllerPath).getString;

$.window_title.text = L('window_title');
$.open_button.title = L('button_label');

function openNewWindow() {
	var welcomeWindow = Alloy.createController('welcomeWindow');
	welcomeWindow.getView().open();
}

$.index.open();