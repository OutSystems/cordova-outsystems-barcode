# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The changes documented here do not include those from the original repository.

## [2.0.1]

### 02-10-2025

- Fix: Android - Crash due to `kotlin.UninitializedPropertyAccessException`.

## [2.0.0]

### 01-09-2025

- Feature: Android - provide `hint` and return `format`.

**BREAKING CHANGES**: The `scanBarcode` now returns an object instead of a string.

## [1.2.1]

### 20-08-2025
- Chore: Android - Update barcode library to fix MLKit memory consumption bug

## [1.2.0]

### 03-12-2024
- Chore: Android - Bump Kotlin and Gradle versions (https://outsystemsrd.atlassian.net/browse/RMET-3887)

### 26-11-2024
- Feature: Android - Support Edge-to-Edge on all Android versions.

## [1.1.7]

### 11-11-2024
- Chore: Android - Remove unneeded `kotlin-kapt` plugin (https://outsystemsrd.atlassian.net/browse/RMET-3803).

### 08-11-2024
- Fix: Android - Update libraries for supporting 16KB page size (https://outsystemsrd.atlassian.net/browse/RMET-3602)

### 05-11-2024
- Fix: Android - Edge-to-edge support on Android 15 (https://outsystemsrd.atlassian.net/browse/RMET-3597)

## [1.1.6]

### 22-10-2024
- Fix: iOS - Make scanner view wider (https://outsystemsrd.atlassian.net/browse/RMET-3683).
- Fix: Android - Make scanner view wider (https://outsystemsrd.atlassian.net/browse/RMET-3682).

## [1.1.5]

### 27-08-2024
- Fix: iOS - Use confidence level for code readings (https://outsystemsrd.atlassian.net/browse/RMET-3374).

### 23-08-2024
- Fix: Android - Stop using runBlocking when scanning a code (https://outsystemsrd.atlassian.net/browse/RMET-3379).

### 22-08-2024
- Fix: Android - Avoid UI bug on background when layout is portrait (https://outsystemsrd.atlassian.net/browse/RMET-3379).

## [1.1.4]

### iOS

#### Chores
- Replace `xcframework` by `pod` (https://outsystemsrd.atlassian.net/browse/RMET-3587).
- Remove `add-swift-support` dependency and use the `SwiftVersion` preference.

## [1.1.3]

### 16-06-2024
- Fix: [Android] Update dependency to `oscordova`, to fix incompatibility with other plugins (https://outsystemsrd.atlassian.net/browse/RMET-3540)

## [1.1.2]

### 21-05-2024
- Fix: Updates dependency to `OSBarcodeLib-Android`, adding serializable annotation to avoid problems with code obfuscation (https://outsystemsrd.atlassian.net/browse/RMET-3394).

## [1.1.1]

### 30-04-2024
- Fix: Improve scanning on Android by updating dependency to OSBarcodeLib-Android higher resolution frames (https://outsystemsrd.atlassian.net/browse/RMET-3399).

## [1.1.0]

### Android

#### Chores
- Update library to include the zoom feature (https://outsystemsrd.atlassian.net/browse/RMET-2987).

### iOS

#### Chores
- Update library to include the zoom feature (https://outsystemsrd.atlassian.net/browse/RMET-2986).

#### Refactors
- Replace `OSBARCArgumentMappable` static method with an initialiser.

## [1.0.0]

### iOS

#### Features
- Add `scanOrientation` argument to `scanBarcode` (https://outsystemsrd.atlassian.net/browse/RMET-2753).
- Add `cameraDirection` argument to `scanBarcode` (https://outsystemsrd.atlassian.net/browse/RMET-2754).
- Add `scanButtonText` argument to `scanBarcode` (https://outsystemsrd.atlassian.net/browse/RMET-2752).
- Add `scanInstructions` argument to `scanBarcode` (https://outsystemsrd.atlassian.net/browse/RMET-2751).
- Implement `scanBarcode` (https://outsystemsrd.atlassian.net/browse/RMET-2748).

#### Fixes
- Fix error codes and messages (https://outsystemsrd.atlassian.net/browse/RMET-3038).

### Android

#### 09-01-2024
- Update error codes and messages (https://outsystemsrd.atlassian.net/browse/RMET-3037).

#### 08-11-2023
Android - Scan barcode feature (https://outsystemsrd.atlassian.net/browse/RMET-2758)

### Cordova Wrapper

- Add support for plugin's old version of the `scanBarcode` method (https://outsystemsrd.atlassian.net/browse/RMET-2916).
- Add `scanBarcode` method (https://outsystemsrd.atlassian.net/browse/RMET-2916).
