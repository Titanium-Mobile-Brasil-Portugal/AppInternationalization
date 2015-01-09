// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

/*
 * The app will try to load the device language
 * If it fails, it will load the developer's selected language
 */
Alloy.Globals.i18n = Alloy.createWidget('com.xdpeople.i18nWidget').default('pt');