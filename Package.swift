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
        .package(url: "https://github.com/apache/cordova-ios.git", branch: "master"),
        .package(url: "https://github.com/OutSystems/OSBarcodeLib-iOS.git", exact: "3.0.0")
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
