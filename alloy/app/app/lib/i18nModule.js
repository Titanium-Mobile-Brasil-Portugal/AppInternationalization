// 
//  i18n.js
//  app
//  
//  Created by Luis Pedro Ferreira on 2014-12-29.
//  Copyright 2014 Luis Pedro Ferreira. All rights reserved.
// 

var i18nModule = function(_controller) {
	
	var deviceLocale 			= Titanium.Platform.locale,
		localeArray 			= deviceLocale.split('-'),
		checkingDefaultLocale 	= false,
		controller 				= _controller;
		
	var	stringsCollection,
		loadedLocale,
		error;
	

	function loadLocalefile(_locale) {
		
		//Titanium.API.log("LOCALE: Checking locale: '" + _locale + "'");
		
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
				throw "default '" + loadedLocale + "' file not present :: i18nModule";
				return;
			}
			
		} else {
			
			stringsCollection = JSON.parse(file.read()).strings[controller];
			
			if(_.isNaN(stringsCollection)) {
				throw "controller '" + controller + "' not defined :: i18nModule";
			}
			
			if(_.isString(stringsCollection)) {
				alert("i18n file for '" + loadedLocale + "' is empty.");
			}
			
			loadedLocale = _locale;
			
		}
		
	}
	
	loadLocalefile( deviceLocale );

	return { 
		getString: function(_key){
			
			var returnString = _key;
			
			if(_.isString(stringsCollection)) {
				returnString = 'i18n_empty';
			} else {
				if(_.has(stringsCollection, _key)){
					returnString = stringsCollection[_key];
				} else {
					Titanium.API.error("LOCALE: Key '" + _key + "' doesn't exist.");
					returnString = loadedLocale + '_' + controller + '_' + _key;					
				}
			}
			
			return returnString;
		} 
	};

};

exports.i18n = i18nModule;
