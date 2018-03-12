package com.rockbyte.arxiv.file;

import android.content.Intent;
import android.net.Uri;
import android.support.v4.content.FileProvider;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rockbyte.arxiv.BuildConfig;

import java.io.File;


public class FileShareModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public FileShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FileShareModule";
    }

    @ReactMethod
    public void openFileIntent(String filepath, String mimeType, Promise promise) {
        try {
            File file = new File(filepath);
            if (file.exists()) {
                promise.resolve(sendIntent(mimeType, file).toString());
            } else {
                promise.reject(null, "File does not exist");
            }
        } catch (Exception ex) {
            promise.reject(null, ex.getMessage());
        }
    }

    private Uri sendIntent(String mimeType, File file) {
        Uri uri = FileProvider.getUriForFile(
                reactContext,
                BuildConfig.APPLICATION_ID + ".provider",
                file);
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_VIEW);
        intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setDataAndType(uri, mimeType);
        this.getReactApplicationContext().startActivity(intent);
        return uri;
    }

}
