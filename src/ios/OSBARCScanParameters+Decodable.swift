import OSBarcodeLib

struct OSBarcodeScanArgumentsModel: Decodable {
    let scanInstructions: String
    let scanButtonText: String?
    let cameraDirection: OSBARCCameraModel
    let scanOrientation: OSBARCOrientationModel
    let hint: OSBARCScannerHint?
    
    enum CodingKeys: CodingKey {
        case scanButton
        case scanInstructions
        case scanText
        case cameraDirection
        case scanOrientation
        case hint
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        let scanInstructions = try container.decode(String.self, forKey: .scanInstructions)
        
        var scanButtonText: String? // property is set based on `scanButton` and `scanText`.
        let scanButton = try container.decode(Bool.self, forKey: .scanButton)
        if scanButton { // only set `scanButtonText` if `scanButton` is enabled
            scanButtonText = try container.decode(String.self, forKey: .scanText)
        }
        
        let cameraDirectionInt = try container.decode(Int.self, forKey: .cameraDirection)
        let cameraDirection = OSBARCCameraModel(value: cameraDirectionInt)
        
        let scanOrientationInt = try container.decode(Int.self, forKey: .scanOrientation)
        let scanOrientation = OSBARCOrientationModel(value: scanOrientationInt)
        
        let hintInt = try container.decode(Int.self, forKey: .hint)
        let hint = OSBARCScannerHint(rawValue: hintInt)
        
        self.init(scanInstructions, scanButtonText, cameraDirection, scanOrientation, hint)
    }
    
    private init(_ scanInstructions: String, _ scanButtonText: String?, _ cameraDirection: OSBARCCameraModel, _ scanOrientation: OSBARCOrientationModel, _ hint: OSBARCScannerHint?) {
        self.scanInstructions = scanInstructions
        self.scanButtonText = scanButtonText
        self.cameraDirection = cameraDirection
        self.scanOrientation = scanOrientation
        self.hint = hint
    }
}
