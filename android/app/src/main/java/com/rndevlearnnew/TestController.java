package com.rndevlearnnew;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

// This class serves as a bridge between the native Android code and the React Native JavaScript code
// It extends ReactContextBaseJavaModule, which is a base class for native modules in React Native
public class TestController extends ReactContextBaseJavaModule {

    // Define the module name that will be used to reference this module in React Native
    private static final String MODULE_NAME ="MyModule";

    // Constructor
    public TestController(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // Return the name of the module
    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    // Define native methods that can be called from React Native using @ReactMethod annotation

    // Method to log a message received from React Native
    @ReactMethod
    public void myMethod(String param){
        System.out.println("GET DATA FROM RN <--- "+param);
    }

    // Method to send data back to React Native with a promise
    @ReactMethod
    public void myMethodWithPromise(String param, Promise promise){
        // Check if the parameter is not null
        if (param != null) {
            // Resolve the promise with a success message
            promise.resolve("SEND DATA TO RN ---> " + param);
        } else {
            // Reject the promise with an error code and message
            promise.reject("ERROR_CODE", "Error message explaining failure");
        }
    }

    // You can define more native methods here to be called from React Native
    // For example, adding and removing event listeners
}
