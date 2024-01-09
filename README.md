# cordova-outsystems-barcode

*This plugin is SUPPORTED by OutSystems. Customers entitled to Support Services may obtain assistance through Support.*

A barcode scanner for your mobile application. Supports many popular encoding types of 1D and 2D barcodes, presented in the following table.

**1D Barcodes**

|Code|iOS|Android's ML Kit|Android's ZXing|
|:-|:-:|:-:|:-:|
|Codabar|:warning:<br>(Available from 15.0)|:white_check_mark:|:white_check_mark:|
|Code 39|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|Code 93|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|Code 128|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|Databar (GS1)|:warning:<br>(Available from 15.0)|:x:|:white_check_mark:|
|EAN-8|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|EAN-13|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|ITF|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|ITF-14|:white_check_mark:|:x:|:x:|
|ISBN-10|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|ISBN-13|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|ISBN-13 Dual Barcode|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|RSSExpanded|:warning:<br>(Available from 15.0)|:x:|:white_check_mark:|
|UPC-A|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|UPC-E|:white_check_mark:|:white_check_mark:|:white_check_mark:|

**2D Barcodes**

|Code|iOS|Android's ML Kit|Android's ZXing|
|:-|:-:|:-:|:-:|
|Aztec Code|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|Data Matrix|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|MaxiCode|:x:|:x:|:white_check_mark:|
|Micro PDF 417|:warning:<br>(Available from 15.0)|:x:|:x:|
|Micro QR|:warning:<br>(Available from 15.0)|:x:|:x:|
|PDF 417|:white_check_mark:|:white_check_mark:|:white_check_mark:|
|QR Code|:white_check_mark:|:white_check_mark:|:white_check_mark:|

## Installation

```console
cordova plugin add <path-to-repo-local-clone>
```

It's also possible to install via the repo's URL directly.

```console
cordova plugin add https://github.com/OutSystems/cordova-outsystems-barcode
```

## Supported Platforms

- iOS
- Android

## Methods

* OSBarcode
	* [scanBarcode](#scan-barcode)

* OSBarcodeScanner
	* [scan](#scan)

### Scan Barcode

```js
cordova.plugins.OSBarcode.scanBarcode(options, successCallback, errorCallback);
```

An action that triggers the barcode reader. If successful, it returns the text associated with the scanned barcode as a String. In case of an error, it returns the associated error code and message (TODO: link to the table).

The action is composed of the following parameters:

- **options**: A structure containing some configurations to apply to the barcode reader. It's composed of the following properties:
	- **scanInstructions**: A text containing the scanning instructions.
	- **cameraDirection**: An integer that indicates if the back (1) or front (2) camera will be used when triggering a new scan action.
	- **scanOrientation**: An integer that indicates which orientation will the scanner assume: Portrait (1), Landscape (2) or Adaptive (3). "Adaptive" uses the device's current orientation.
	- **scanButton**: A boolean that will display a scan button on the barcode reader. With the button, scanning will only be triggered when pressing the button instead of automatically when framing the barcode. A second click on the button disables scannning.
	- **scanText**: A text to be displayed on the scan button. It will only be shown if **scanButton** is set to true.
	- **androidScanningLibrary**: A text equivalent to the **OSBarcodeConstants.AndroidScanningLibrary** structure. It indicates which library will be used to perform the scan: MLKit or ZXing. As the name indicates, it's only applicable to "Android".
- **successCallback**: A structure indicating that the action was successful. It returns a **ScanResult**: a text containing the value associated with the scanned barcode.
- **errorCallback**: A structure indicating that the action was not successful. It returns an "error" structure, composed of:
	- **code**: A text containing the error code.
	- **message**: A text containing the error message.

### Scan

```js
cordova.plugins.OSBarcodeScanner.scan(options, successCallback, errorCallback);
```

Being the older way to trigger the barcode reader, this was kept to keep retro compatibility. This action calls the [Scan Barcode](#scan-barcode) action, with the possible outputs being the same.

The action is composed of the following parameters:

- **options**: A structure containing some configurations to apply to the barcode reader. It's composed of the following properties:
	- **scanInstructions**: A text containing the scanning instructions.
	- **cameraDirection**: An integer that indicates if the back (1) or front (2) camera will be used when triggering a new scan action.
	- **scanOrientation**: An integer that indicates which orientation will the scanner assume: Portrait (1), Landscape (2) or Adaptive (3). "Adaptive" uses the device's current orientation.
	- **scanButton**: A boolean that will display a scan button on the barcode reader. With the button, scanning will only be triggered when pressing the button instead of automatically when framing the barcode. A second click on the button disables scannning.
	- **scanText**: A text to be displayed on the scan button. It will only be shown if **scanButton** is set to true.
- **successCallback**: A structure indicating that the action was successful. It returns a **ScanResult**: a text containing the value associated with the scanned barcode.
- **errorCallback**: A structure indicating that the action was not successful. It returns an "error" structure, composed of:
	- **code**: A text containing the error code.
	- **message**: A text containing the error message.

## Errors

|Code|Message|iOS|Android|
|:-|:-|:-:|:-:|
|OS-PLUG-BARC-0004|Error while trying to scan code.|:white_check_mark:|:white_check_mark:|
|OS-PLUG-BARC-0006|Couldn't scan because the process was cancelled.|:white_check_mark:|:white_check_mark:|
|OS-PLUG-BARC-0007|Couldn't scan because camera access wasn’t provided. Check your camera permissions and try again.|:white_check_mark:|:white_check_mark:|
|OS-PLUG-BARC-0008|Scanning parameters are invalid.|:white_check_mark:|:white_check_mark:|
|OS-PLUG-BARC-0009|There was an error scanning the barcode with ZXing.|:x:|:white_check_mark:|
|OS-PLUG-BARC-0010|There was an error scanning the barcode with ML Kit.|:x:|:white_check_mark:|