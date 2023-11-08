package com.outsystems.plugins.barcode

import android.content.Intent
import com.google.gson.Gson
import com.outsystems.plugins.barcode.controller.OSBARCController
import com.outsystems.plugins.barcode.model.OSBARCError
import com.outsystems.plugins.barcode.model.OSBARCScanParameters
import com.outsystems.plugins.oscordova.CordovaImplementation
import kotlinx.coroutines.runBlocking
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaInterface
import org.apache.cordova.CordovaWebView
import org.json.JSONArray

class OSBarcode : CordovaImplementation() {

    companion object {
        private const val ERROR_FORMAT_PREFIX = "OS-PLUG-BARC-"
    }

    override var callbackContext: CallbackContext? = null
    private lateinit var barcodeController: OSBARCController
    val gson by lazy { Gson() }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        this.callbackContext = callbackContext
        val result = runBlocking {
            when (action) {
                "scanBarcode" -> {
                    scan(args)
                }

                else -> false
            }
            true
        }
        return result
    }

    override fun initialize(cordova: CordovaInterface, webView: CordovaWebView) {
        super.initialize(cordova, webView)
        barcodeController = OSBARCController()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
        super.onActivityResult(requestCode, resultCode, intent)
        barcodeController.handleActivityResult(requestCode, resultCode, intent,
            { result ->
                sendPluginResult(result, null)
            },
            { error ->
                sendPluginResult(null, Pair(formatErrorCode(error.code), error.description))
            })
    }

    override fun onRequestPermissionResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        // do nothing
    }

    override fun areGooglePlayServicesAvailable(): Boolean {
        // do nothing
        return true
    }

    private fun scan(args: JSONArray) {
        setAsActivityResultCallback()
        val parameters = buildScanParameters(args)
        if (parameters != null) {
            barcodeController.scanCode(getActivity(), parameters)
        } else {
            sendPluginResult(
                null,
                Pair(
                    formatErrorCode(OSBARCError.INVALID_PARAMETERS_ERROR.code),
                    OSBARCError.INVALID_PARAMETERS_ERROR.description
                )
            )
        }
    }

    private fun buildScanParameters(args: JSONArray): OSBARCScanParameters? {
        return try {
            gson.fromJson(args.getString(0), OSBARCScanParameters::class.java)
        } catch (e: Exception) {
            null
        }
    }

    private fun formatErrorCode(code: Int): String {
        return ERROR_FORMAT_PREFIX + code.toString().padStart(4, '0')
    }

}