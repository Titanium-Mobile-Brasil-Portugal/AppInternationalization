exports.i18n = function (text) {
	if (Ti.App.languageXML === undefined || Ti.App.languageXML === null) {
		var langFile = Ti.App.Properties.getString('SETTING_LANGUAGE');
		// We should store user's language setting in SETTING_LANGUAGE
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '.xml');
		// Get the corresponding file from i18n
		if (!file.exists()) {
			var langFile = "en";
			// Fall back to english as the default language
			file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '.xml');
		}
		var xmltext = file.read().text;
		var xmldata = Titanium.XML.parseString(xmltext);
		// Parse the xml
		Ti.App.languageXML = xmldata;
		// Store the parsed xml so that we don't parse everytime L() is called
	}
	// Get the localised string from xml file
	var xpath = "/resources/string[@name='" + text + "']/text()";
	var result = Ti.App.languageXML.evaluate(xpath).item(0);
	if (result) {
		return result.text;
	} else {
		return text;
		// Return the text if localised version not found
	}
}; 