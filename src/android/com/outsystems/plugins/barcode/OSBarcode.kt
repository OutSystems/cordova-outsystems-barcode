package com.outsystems.plugins.barcode

import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray
import org.json.JSONException

class OSBarcode : CordovaPlugin() {
    @Throws(JSONException::class)
    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        if (action == "coolMethod") {
            val message = args.getString(0)
            coolMethod(message, callbackContext)
            return true
        }
        return false
    }

    private fun coolMethod(message: String?, callbackContext: CallbackContext) {
        if (message != null && message.length > 0) {
            callbackContext.success(message)
        } else {
            callbackContext.error("Expected one non-empty string argument.")
        }
    }

    protected fun privateHelloWorldString(): String {
        return "Hello World"
    }

    fun publicHelloWorld(): String {
        return privateHelloWorldString()
    }
}