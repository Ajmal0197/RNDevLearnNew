package com.rndevlearnnew;

import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

// This class is a ViewGroupManager for managing FrameLayout instances in the React Native UI hierarchy
public class MyFragmentManager extends ViewGroupManager<FrameLayout> {

    // Constants and variables declaration
    public static final String REACT_CLASS = "MyViewManager";
    public final int COMMAND_CREATE = 1;
    private int propWidth = 1500; // Default width
    private int propHeight = 1500; // Default height

    ReactApplicationContext reactContext;
    MyFragment myFragment;

    // Constructor
    public MyFragmentManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    // Return the name of the ViewGroupManager
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    // Create a new FrameLayout instance to hold the Fragment
    @Override
    public FrameLayout createViewInstance(ThemedReactContext reactContext) {
        return new FrameLayout(reactContext);
    }

    // Map the "create" command to an integer
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("create", COMMAND_CREATE);
    }

    // Handle commands from JavaScript
    @Override
    public void receiveCommand(
            @NonNull FrameLayout root,
            String commandId,
            @Nullable ReadableArray args
    ) {
        super.receiveCommand(root, commandId, args);
        int reactNativeViewId = args.getInt(0);
        int commandIdInt = Integer.parseInt(commandId);

        // Handle specific commands
        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId); // Handle "create" command
                break;
            default: {}
        }
    }

    // ReactPropGroup annotation to set width and height styles from React Native
    @ReactPropGroup(names = {"width", "height"}, customType = "Style")
    public void setStyle(FrameLayout view, int index, Integer value) {
        if (index == 0) {
            propWidth = value; // Set width
        }

        if (index == 1) {
            propHeight = value; // Set height
        }
    }

    // Replace the React Native view with a custom fragment
    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView); // Set up layout

        myFragment = new MyFragment();
        FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
        // Replace the view with the custom fragment
        activity.getSupportFragmentManager()
                .beginTransaction()
                .replace(reactNativeViewId, myFragment, String.valueOf(reactNativeViewId))
                .commit();
    }

    // Set up layout with a Choreographer callback
    public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren(view); // Layout all children properly
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    // Manually layout all children
    public void manuallyLayoutChildren(View view) {
        // propWidth and propHeight coming from react-native props
        int width = propWidth;
        int height = propHeight;

        view.measure(
                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));

        view.layout(0, 0, width, height);
    }
}
