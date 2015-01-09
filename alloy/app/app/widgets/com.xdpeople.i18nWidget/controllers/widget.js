// 
//  widget.js
//  app
//  
//  Created by Luis Pedro Ferreira on 2015-01-07.
//  Copyright 2015 Luis Pedro Ferreira. All rights reserved.
// 

var languageFileLoaded = null;

function loadLanguageFile(_language) {
	var fileName = _language + '.xml',
		languageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, WPATH(fileName));
	
		languageFileLoaded = _language;
	
	return (languageFile.exists()) ? languageFile : false;
}

exports.default = function(_defaultLanguage){
	
	if(!_defaultLanguage) throw 'default locale. You must specify a default locale';
	
	var deviceLocale = Titanium.Locale.getCurrentLocale(),
		deviceLanguage = Titanium.Locale.getCurrentLanguage();
		
	Titanium.API.log('Country: ' + deviceLocale);
	Titanium.API.log('Language: ' + deviceLanguage);
		
	languageFile = loadLanguageFile(deviceLocale);
	
	if(!languageFile) {
		if(deviceLocale !== deviceLanguage){
			languageFile = loadLanguageFile(deviceLanguage);
			if(!languageFile) loadDefaultLocaleFile();
		} else {
			loadDefaultLocaleFile();
		}
	}
	
	Titanium.API.log('Loaded: ' + languageFileLoaded);
	
	function loadDefaultLocaleFile() {
		languageFile = loadLanguageFile(_defaultLanguage);
		if(!languageFile) throw "'" + _defaultLanguage + ".xml' file in the assets folder."; 
	}
	
	function decodeXMLFile(_controller) {
		
		var controllerStrings = {};
		var xmldata = Titanium.XML.parseString(languageFile.read().text);
		var elements = xmldata.documentElement.getElementsByTagName('string');
		
		for(var i = 0; i < elements.length; i++) {
			if(elements.item(i).getAttribute('controller') === _controller) {
				controllerStrings[elements.item(i).getAttribute('name')] = elements.item(i).text;
			}
		}
		
		return 	controllerStrings;
	}

	return {
		controller: 
			function(_controller) {
				var controllerId = _controller.__controllerPath,
				controllerStrings = decodeXMLFile(controllerId);
				
				return {
					getStrings: function(_key) {
						var string = controllerStrings[_key];
						if(!string) string = _key;
						return string;
					}
				};
				
			}
	};
	
};
