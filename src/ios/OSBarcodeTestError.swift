//
//  OSBarcodeTestError.swift
//  BarcodeSampleApp - Rui
//
//  Created by Rui Mendes on 06/06/2025.
//

import Foundation

enum OSBarcodeTestError {
    case invalidData

    var errorDictionary: [String: String] {
        switch self {
        case .invalidData:
            return ["code": "1001", "message": "Invalid data"]
        }
    }
}
