// 
//  i18n.js
//  app
//  
//  Created by Luis Pedro Ferreira on 2014-12-29.
//  Copyright 2014 Luis Pedro Ferreira. All rights reserved.
// 

var i18nModule = function(_controller) {
	
	var deviceLocale = Titanium.Platform.locale,
	localeArray = deviceLocale.split('-'),
	checkingDefaultLocale = false,
	controller = _controller,
	stringsCollection,
	loadedLocale,
	error;
	

	function loadLocalefile(_locale) {
		
		Titanium.API.log("LOCALE: Checking locale: '" + _locale + "'");
		
		var filePath = 'i18n/' + _locale + '.json';
		var file = Titanium.Filesystem.getFile( Titanium.Filesystem.resourcesDirectory, filePath );
		
		if(!file.exists()){
			
			if(!checkingDefaultLocale) {
				if(localeArray.length > 1) {
					localeArray.pop();
					loadLocalefile( localeArray[0] );
				} else {
					checkingDefaultLocale = true;
					loadLocalefile( Alloy.CFG.defaultLocale );
				}
			} else {
				error = new Error("LOCALE: Default '" + loadedLocale + "' file not present.");
				alert(error);
				return;
			}
			
		} else {
			
			stringsCollection = JSON.parse(file.read()).strings[controller];
			if(!stringsCollection){
				error = new Error("LOCALE: Controller '" + controller + "' not defined.");
				alert(error.message);
				return;
			}
			
			loadedLocale = _locale;
			
		}
		
	}
	
	loadLocalefile( deviceLocale );

	return { 
		getString: function(_key){
			
			var returnString = _key;
			
			try {
				if(typeof(stringsCollection) === 'string') {
					returnString = 'no_key';
				} else {
					returnString = stringsCollection[_key];
					if(!returnString) {
						throw "LOCALE: Key '" + _key + "' doesn't exist.";
					}
				}
			} catch(e) {
				returnString = loadedLocale + '_' + controller + '_' + _key;
				Titanium.API.error(e);
			}
			
			return returnString;
		} 
	};

};

exports.i18n = i18nModule;
