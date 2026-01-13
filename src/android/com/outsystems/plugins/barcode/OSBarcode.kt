package com.outsystems.plugins.barcode

import android.content.Intent
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.outsystems.plugins.barcode.controller.OSBARCController
import com.outsystems.plugins.barcode.model.OSBARCError
import com.outsystems.plugins.barcode.model.OSBARCScanParameters
import com.outsystems.plugins.barcode.model.OSBARCScanResult
import com.outsystems.plugins.barcode.model.OSBARCScannerHint
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaInterface
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.CordovaWebView
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject
import java.lang.reflect.Type

class OSBarcode : CordovaPlugin() {
    companion object {
        private const val ERROR_FORMAT_PREFIX = "OS-PLUG-BARC-"
    }

    var callbackContext: CallbackContext? = null
    private lateinit var barcodeController: OSBARCController
    val gson: Gson by lazy {
        GsonBuilder()
            .registerTypeAdapter(OSBARCScannerHint::class.java, OSBARCScannerHintAdapter())
            .create()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        this.callbackContext = callbackContext
        when (action) {
            "scanBarcode" -> {
                scan(args)
                return true
            }
            else -> return false
        }
    }

    override fun initialize(cordova: CordovaInterface, webView: CordovaWebView) {
        super.initialize(cordova, webView)
        barcodeController = OSBARCController()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
        super.onActivityResult(requestCode, resultCode, intent)
        barcodeController.handleActivityResult(requestCode, resultCode, intent,
            { result: OSBARCScanResult ->
                val jsonObject = JSONObject().apply {
                    put("ScanResult", result.text)
                    put("format", result.format.ordinal)
                }
                sendPluginResult(jsonObject, null)
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

    override fun onResume(multitasking: Boolean) {
        // Not used in this project.
    }

    private fun scan(args: JSONArray) {
        cordova.setActivityResultCallback(this)
        val parameters = buildScanParameters(args)
        if (parameters != null) {
            barcodeController.scanCode(cordova.activity, parameters)
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
        } catch (_: Exception) {
            null
        }
    }

    private fun formatErrorCode(code: Int): String {
        return ERROR_FORMAT_PREFIX + code.toString().padStart(4, '0')
    }

    private class OSBARCScannerHintAdapter : JsonDeserializer<OSBARCScannerHint> {
        override fun deserialize(
            json: JsonElement?,
            typeOfT: Type?,
            context: JsonDeserializationContext?
        ): OSBARCScannerHint {
            return json?.asInt?.let {
                OSBARCScannerHint.entries.getOrNull(it)
            } ?: OSBARCScannerHint.UNKNOWN
        }
    }

    private fun sendPluginResult(jsonObject: JSONObject?, error: Pair<String, String>?) {
        var pluginResult: PluginResult?
        jsonObject?.let {
            pluginResult = PluginResult(PluginResult.Status.OK, jsonObject.toString())
            this.callbackContext?.sendPluginResult(pluginResult)
            return
        }
        val jsonResult = JSONObject()
        jsonResult.put("code", error?.first)
        jsonResult.put("message", error?.second ?: "No Results")
        pluginResult = PluginResult(PluginResult.Status.ERROR, jsonResult)
        this.callbackContext?.sendPluginResult(pluginResult)
    }

}
