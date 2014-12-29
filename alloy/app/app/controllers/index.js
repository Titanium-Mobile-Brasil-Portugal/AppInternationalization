
// Import i18n module
var L = require('i18nModule').i18n($.__controllerPath).getString;

$.label.text = L('label_title');

function doClick(e) {
    alert($.label.text);
}

$.index.open();