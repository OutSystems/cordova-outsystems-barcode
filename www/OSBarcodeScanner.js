var exec = require('cordova/exec');
var Barcode = require('./OSBarcode');
var BarcodeConstants = require('./OSBarcodeConstants');

exports.scan = function (options, successCallback, errorCallback) {
    options = options || {};

    let args = {
        scanInstructions: options.scan_instructions,
        cameraDirection: Number(options.camera_direction),   // the bridge expects an integer, not a string.
        scanOrientation: options.scan_orientation,
        scanButton: options.scan_button,
        scanText: options.scan_button_text,
        hint: BarcodeConstants.Hint.ALL,
        androidScanningLibrary: null
    };

    Barcode.scanBarcode(args, successCallback, errorCallback);
}