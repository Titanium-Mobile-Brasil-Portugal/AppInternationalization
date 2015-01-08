
// TODO: A widget instead of a module

var L = Alloy.Globals.i18n.controller($).getStrings;

$.window_title.text = L('window_title');
$.open_button.title = L('button_label');

function openNewWindow() {
	var welcomeWindow = Alloy.createController('welcomeWindow');
	welcomeWindow.getView().open();
}

$.index.open();