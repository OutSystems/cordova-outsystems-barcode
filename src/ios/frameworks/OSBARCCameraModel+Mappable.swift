import OSBarcodeLib

extension OSBARCCameraModel {
    static func map(value: Int) -> Self { value == 1 ? .back : .front }
}
