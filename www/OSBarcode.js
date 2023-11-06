var exec = require('cordova/exec');

exports.scanBarcode = function (options, successCallback, errorCallback) {
    options = options || {};

    let scanInstructions = options.scanInstructions;
    let cameraDirection = options.cameraDirection;
    let scanOrientation = options.scanOrientation;
    let scanButton = !!options.scanButton;
    let scanText = options.scanText;
    let hint = options.hint;
    let androidScanningLibrary = options.androidScanningLibrary;

    let args = [{scanInstructions, cameraDirection, scanOrientation, scanButton, scanText, hint, androidScanningLibrary}];

    // temporary, while the bridge doesn't implement the native library connection.
    console.log(args);
}