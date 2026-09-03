// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "com.outsystems.plugins.barcode",
    platforms: [
        .iOS(.v15)
    ],
    products: [
        .library(
            name: "com.outsystems.plugins.barcode",
            targets: ["OSBarcodePlugin"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/apache/cordova-ios.git", from: "8.0.0"),
        .package(url: "https://github.com/OutSystems/OSBarcodeLib-iOS.git", exact: "2.2.1")
    ],
    targets: [
        .target(
            name: "OSBarcodePlugin",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "OSBarcodeLib", package: "OSBarcodeLib-iOS")
            ],
            path: "src/ios"
        )
    ]
)
