import OSBarcodeLib

/// The plugin's main class
@objc(OSBarcode)
class OSBarcode: CDVPlugin {
    /// The native library bridge
    var plugin: OSBARCManagerProtocol?
    
    override func pluginInitialize() {
        self.plugin = OSBARCManagerFactory.createManager(with: self.viewController)
    }
    
    @objc(scanBarcode:)
    func scanBarcode(command: CDVInvokedUrlCommand) {
        self.commandDelegate.run { [weak self] in
            guard let self = self else { return }
            
            guard let argumentsDictionary = command.argument(at: 0) as? [String: Any],
                  let argumentsData = try? JSONSerialization.data(withJSONObject: argumentsDictionary),
                  let parameters = try? JSONDecoder().decode(OSBARCScanParameters.self, from: argumentsData)
            else { return self.send(error: .scanInputArgumentsIssue, for: command.callbackId) }
            
            Task {
                do {
                    guard let scanResult = try await self.plugin?.scanBarcode(with: parameters) else {
                        return self.send(error: .scanningError, for: command.callbackId)
                    }
                    self.send(successfulResult: scanResult, for: command.callbackId)
                } catch OSBARCManagerError.cameraAccessDenied {
                    self.send(error: .cameraAccessDenied, for: command.callbackId)
                } catch OSBARCManagerError.scanningCancelled {
                    self.send(error: .scanningCancelled, for: command.callbackId)
                }
            }
        }
    }
}

private extension OSBarcode {
    func send(successfulResult: OSBARCScanResult, for callbackId: String) {
        let resultDict: [String : Any] = ["ScanResult": successfulResult.text, "format": successfulResult.format.rawValue]
        let pluginResult = CDVPluginResult(status: .ok, messageAs: resultDict)
        self.commandDelegate.send(pluginResult, callbackId: callbackId)
    }
    
    func send(error: OSBarcodeError, for callbackId: String) {
        let pluginResult = CDVPluginResult(status: .error, messageAs: error.errorDictionary)
        self.commandDelegate.send(pluginResult, callbackId: callbackId)
    }
}
