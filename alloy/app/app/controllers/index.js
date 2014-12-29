
// Import i18n module
var L = require('i18nModule').i18n($.__controllerPath).getString;

$.label.text = L('label_title');
$.button.title = L('button_label');

function doClick(e) {
	alert($.label.text);
}

function openNewWindow() {
	alert('Open window');
}

$.index.open();