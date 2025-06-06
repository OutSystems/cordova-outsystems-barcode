//
//  OSBarcodeTestError.swift
//  BarcodeSampleApp - Rui
//
//  Created by Rui Mendes on 06/06/2025.
//

enum OSBarcodeTestError {
    case invalidData = 0

    var errorDictionary: [String: String] {
        switch self {
        case .invalidData:
            return ["code": "1001", "message": "Invalid data"]
        }
    }
}
