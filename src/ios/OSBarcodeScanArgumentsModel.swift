import Foundation

struct OSBarcodeScanArgumentsModel: Decodable {
    let scanInstructions: String
    let scanButtonText: String?
    
    enum CodingKeys: CodingKey {
        case scanButton
        case scanInstructions
        case scanText
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let scanInstructions = try container.decode(String.self, forKey: .scanInstructions)
        var scanButtonText: String? // property is set based on `scanButton` and `scanText`.
        let scanButton = try container.decode(Bool.self, forKey: .scanButton)
        if scanButton { // only set `scanButtonText` if `scanButton` is enabled
            scanButtonText = try container.decode(String.self, forKey: .scanText)
        }
        self.init(scanInstructions, scanButtonText)
    }
    
    private init(_ scanInstructions: String, _ scanButtonText: String?) {
        self.scanInstructions = scanInstructions
        self.scanButtonText = scanButtonText
    }
}
