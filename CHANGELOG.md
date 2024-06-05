# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The changes documented here do not include those from the original repository.

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
