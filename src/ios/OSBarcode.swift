import OSBarcodeLib

/// The plugin's main class
@objc(OSBarcode)
class OSBarcode: CDVPlugin {
    /// The native library bridge
    var plugin: OSBARCManagerProtocol?

    override func pluginInitialize() {
        plugin = OSBARCManagerFactory.createManager(with: viewController)
    }

    @objc(scanBarcode:)
    func scanBarcode(command: CDVInvokedUrlCommand) {
        commandDelegate.run { [weak self] in
            guard let self = self else { return }

            guard let argumentsDictionary = command.argument(at: 0) as? [String: Any],
                  let argumentsData = try? JSONSerialization.data(withJSONObject: argumentsDictionary),
                  let argumentsModel = try? JSONDecoder().decode(OSBarcodeScanArgumentsModel.self, from: argumentsData)
            else { return self.send(error: .scanInputArgumentsIssue, for: command.callbackId) }

            Task {
                do {
                    guard let scannedBarcode = try await self.plugin?.scanBarcode(with: argumentsModel.scanInstructions, argumentsModel.scanButtonText, argumentsModel.cameraDirection, and: argumentsModel.scanOrientation) else {
                        return self.send(error: .scanningError, for: command.callbackId)
                    }
                    self.send(successfulResult: scannedBarcode, for: command.callbackId)
                } catch OSBARCManagerError.cameraAccessDenied {
                    self.send(error: .cameraAccessDenied, for: command.callbackId)
                } catch OSBARCManagerError.scanningCancelled {
                    self.send(error: .scanningCancelled, for: command.callbackId)
                }
            }
        }
    }

    // TODO: add things here

    @objc(testMethod:)
    func testMethod(command _: CDVInvokedUrlCommand) {
        print("===============> testMethod was called!")
    }
}

private extension OSBarcode {
    func send(successfulResult: String, for callbackId: String) {
        let pluginResult = CDVPluginResult(status: .ok, messageAs: successfulResult)
        commandDelegate.send(pluginResult, callbackId: callbackId)
    }

    func send(error: OSBarcodeError, for callbackId: String) {
        let pluginResult = CDVPluginResult(status: .error, messageAs: error.errorDictionary)
        commandDelegate.send(pluginResult, callbackId: callbackId)
    }
}
