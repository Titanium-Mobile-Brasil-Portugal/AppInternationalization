//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color : '#000000',
		text : String.format(language.i18n('welcome'), 'Titanium'),
		height : 'auto',
		width : 'auto'
	});
	Ti.App.addEventListener('atualizar_benvindo', function(data) {
		label.text = String.format(language.i18n('welcome'), 'Titanium');
	});
	self.add(label);
	var bb1 = Titanium.UI.createButtonBar({
		labels : ['Português', 'Inglês', 'Arabe'],
		bottom : 10,
		height : 25,
		width : 300,
		color : '#000',
		tintColor : '#000',
		font : {
			fontSize : 20,
			color : '#000',
		},
	});
	self.add(bb1);
	bb1.addEventListener('click', function(e) {
		Ti.App.languageXML = null;
		if (e.index == 0) {
			Ti.App.Properties.setString('SETTING_LANGUAGE', "pt");
		}
		if (e.index == 1) {
			Ti.App.Properties.setString('SETTING_LANGUAGE', "en");
		}
		if (e.index == 2) {
			Ti.App.Properties.setString('SETTING_LANGUAGE', "ar");
		}
		Ti.App.fireEvent('atualizar_benvindo');

	});

	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});

	return self;
}

module.exports = FirstView;
