// 
//  i18n.js
//  app
//  
//  Created by Luis Pedro Ferreira on 2014-12-29.
//  Copyright 2014 Luis Pedro Ferreira. All rights reserved.
// 

var i18nModule = function(_controller) {
	
	var _deviceLocale = Titanium.Platform.locale,
		_localeArray = _deviceLocale.split('-'),
		_checkingDefaultLocale = false,
		_controller = _controller,
		_stringsObject,
		_locale;

	function loadLocalefile(locale) {
				
		_locale = locale;
		
		Titanium.API.log("LOCALE: Checking locale: '" + _locale + "'");
		
		var _filePath = 'i18n/' + _locale + '.json';
		var _file = Titanium.Filesystem.getFile( Titanium.Filesystem.resourcesDirectory, _filePath );

		if(!_file.exists()){
						
			if(_checkingDefaultLocale) {
				Titanium.API.error("LOCALE: Default i18n file not present.");
				return;
			}
			
			if(_localeArray.length > 1) {
				// Check global locale
				_localeArray.pop();
				loadLocalefile( _localeArray[0] );
			} else {
				// Check default locale
				_checkingDefaultLocale = true;
				Titanium.API.log("LOCALE: Loading default locale.-> '" + Alloy.CFG.defaultLocale + "'");
				loadLocalefile( Alloy.CFG.defaultLocale );
			}
			
		} else {
			
			// Load locale strings to object
			try {
				Titanium.API.log("LOCALE: Checking strings for controller: '" + _controller + "'");
				_stringsObject = JSON.parse(_file.read()).strings[_controller];
				if(!_stringsObject) {
					_stringsObject = "Controller '" + _controller + "' not defined.";
					throw _stringsObject;
				} else {
					Titanium.API.log(_stringsObject);
				}
			} catch(e) {
				Titanium.API.error(e);
			}
			
		}
		
	}
	
	loadLocalefile( _deviceLocale );

	return { 
		getString: function(_key){
			
			var _returnString = _key;
			
			try {
				if(typeof(_localeArray) === 'string'){
					_returnString = 'no_key';
				} else {
					_returnString = _stringsObject[_key];
					if(!_returnString) {
						throw "LOCALE: Key '" + _key + "' doesn't exist.";
					}
				}
			} catch(e) {
				_returnString = _locale + '_' + _controller + '_' + _key;
				Titanium.API.error(e);
			}
			
			return _returnString;
		} 
	};

};

exports.i18n = i18nModule;
