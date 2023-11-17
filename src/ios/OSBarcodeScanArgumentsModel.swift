import Foundation
import OSBarcodeLib

struct OSBarcodeScanArgumentsModel: Decodable {
    let scanInstructions: String
    let scanButtonText: String?
    let cameraDirection: OSBARCCameraModel
    
    enum CodingKeys: CodingKey {
        case scanButton
        case scanInstructions
        case scanText
        case cameraDirection
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
        let cameraDirection = OSBARCCameraModel.map(value: cameraDirectionInt)
        
        self.init(scanInstructions, scanButtonText, cameraDirection)
    }
    
    private init(_ scanInstructions: String, _ scanButtonText: String?, _ cameraDirection: OSBARCCameraModel) {
        self.scanInstructions = scanInstructions
        self.scanButtonText = scanButtonText
        self.cameraDirection = cameraDirection
    }
}
