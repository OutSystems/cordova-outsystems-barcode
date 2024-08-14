import OSBarcodeLib

protocol OSBARCArgumentMappable {
    init(value: Int)
}

extension OSBARCCameraModel: OSBARCArgumentMappable {
    init(value: Int) { self = value == 2 ? .front : .back }
}

extension OSBARCOrientationModel: OSBARCArgumentMappable {
    init(value: Int) {
        switch value {
        case 1: self = .portrait
        case 2: self = .landscape
        default: self = .adaptive
        }
    }
}
