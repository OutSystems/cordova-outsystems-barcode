//
//  OSBarcodeTestError.swift
//  BarcodeSampleApp - Rui
//
//  Created by Rui Mendes on 06/06/2025.
//

enum OSBarcodeTestError {
    case invalidData
    case encodingError

    var errorDictionary: [String: String] {
        switch self {
        case .invalidData:
            return ["code": "1001", "message": "Invalid data"]
        case .encodingError:
            return ["code": "1002", "message": "Fail encoding"]
        }
    }
}
