package com.rndevlearnnew;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

// This class implements the ReactPackage interface, which is responsible for providing NativeModules and ViewManagers to React Native
// It acts as a package manager for bridging native code with React Native
public class TestControllerPackage implements ReactPackage {

    // Method to create and return NativeModules to be used by React Native
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();

        // Add your custom NativeModule implementations to the list
        modules.add(new TestController(reactApplicationContext)); // Add TestController as a NativeModule
        return modules;
    }

    // Method to create and return ViewManagers to be used by React Native
    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
            return Arrays.<ViewManager>asList(
            new MyFragmentManager(reactApplicationContext)
       );
    }
}
