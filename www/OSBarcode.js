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
    let cancelButtonAccessibilityLabel = options.cancelButtonAccessibilityLabel;
    let torchButtonOnAccessibilityLabel = options.torchButtonOnAccessibilityLabel;
    let torchButtonOffAccessibilityLabel = options.torchButtonOffAccessibilityLabel;

    let args = [{scanInstructions, cameraDirection, scanOrientation, scanButton, scanText, hint, androidScanningLibrary, cancelButtonAccessibilityLabel, torchButtonOnAccessibilityLabel, torchButtonOffAccessibilityLabel}];

    exec(successCallback, errorCallback, 'OSBarcode', 'scanBarcode', args);
}