private struct OSBarcodeErrorLabels {
    static let code = "code"
    static let codeFormat = "OS-PLUG-BARC-"
    static let message = "message"
}

enum OSBarcodeError: Int, CustomNSError, LocalizedError {
    case scanningError = 4
    case scanningCancelled = 6
    
    // MARK: - This errors are pending a final valid error code.
    case cameraAccessDenied = 9998
    case scanInputArgumentsIssue = 9997
    
    var errorDescription: String? {
        switch self {
        case .scanningError: return "Error while trying to scan code."
        case .scanningCancelled: return "Scanning cancelled."
            
        case .cameraAccessDenied: return "Camera access has not been enabled."
        case .scanInputArgumentsIssue: return "Couldn't retrieve the 'scanBarcode' input parameters."
        }
    }
    
    var errorDictionary: [String: String] {
        [
            OSBarcodeErrorLabels.code: "\(OSBarcodeErrorLabels.codeFormat)\(String(format: "%04d", self.rawValue))",
            OSBarcodeErrorLabels.message: self.errorDescription ?? ""
        ]
    }
}
