package com.rockbyte.arxiv;

import android.app.Application;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactApplication;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rockbyte.arxiv.file.FilePackage;
import com.rockbyte.arxiv.splash.SplashScreenPackage;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.crash.RNFirebaseCrashPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),

              new SplashScreenPackage(),
              new FilePackage(),
              new InAppBillingBridgePackage(BuildConfig.IAB_LICENSE_KEY),
              new RNFetchBlobPackage(),
              new SnackbarPackage(),
              new VectorIconsPackage(),

              new RNFirebasePackage(),
              new RNFirebaseCrashlyticsPackage(),
              new RNFirebaseAnalyticsPackage(),
              new RNFirebaseCrashPackage()

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
