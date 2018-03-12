package com.rockbyte.arxiv.splash;

import android.app.Activity;
import android.support.v4.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.rockbyte.arxiv.R;


public class SplashScreenModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public SplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SplashScreenModule";
    }

    @ReactMethod
    public void hide() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                int backgroundColor = ContextCompat.getColor(getReactApplicationContext(), R.color.colorBackground);
                Activity currentActivity = getReactApplicationContext().getCurrentActivity();
                if (currentActivity != null)
                    currentActivity.getWindow().getDecorView().setBackgroundColor(backgroundColor);
            }
        });
    }
}
