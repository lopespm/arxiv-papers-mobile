package com.rockbyte.arxiv.file;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;


public class FileManipulationModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public FileManipulationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FileManipulationModule";
    }

    @ReactMethod
    public void delete(String filepath, Promise promise) {
        try {
            File file = new File(filepath);
            if (!file.exists()) {
                promise.resolve(filepath);
            } else if(file.delete()){
                promise.resolve(filepath);
            } else {
                promise.reject(null, "Could not delete file");
            }
        } catch (Exception ex) {
            promise.reject(null, ex.getMessage());
        }
    }

}
