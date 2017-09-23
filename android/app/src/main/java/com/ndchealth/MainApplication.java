package com.ndchealth;

import android.app.Application;
import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.keychain.KeychainPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.parse.GetCallback;
import com.parse.Parse;
import com.parse.ParseException;
import com.parse.ParseInstallation;
import com.parse.ParseObject;
import com.parse.ParsePush;
import com.parse.SaveCallback;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import io.fabric.sdk.android.Fabric;

public class MainApplication extends Application implements ReactApplication {

    private static final String USER_ID = "{UserId}";
    private static final String PARSE_CHANNEL = "s3cr3t-users-" + USER_ID;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new LinearGradientPackage(),
            BugsnagReactNative.getPackage(),
                    new RNI18nPackage(),
                    new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
                    new ReactNativeConfigPackage(),
                    new VectorIconsPackage(),
                    new KeychainPackage(),
                    new ParseReactPackage(),
                    new HBBluetoothPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        BugsnagReactNative.start(this);
        SoLoader.init(this, /* native exopackage */ false);

        Fabric.with(this, new Crashlytics());
        initParse(this);
    }

    private void initParse(Context context) {
        Parse.setLogLevel(Parse.LOG_LEVEL_VERBOSE);
        Parse.initialize(new Parse.Configuration.Builder(context)
                .applicationId(getString(R.string.parse_app_id))
                .clientKey(getString(R.string.parse_client_key))
                .server(getString(R.string.parse_end_point))
                .build());
        updateParseInstallationData(getUserId(context));
    }

    public static void updateParseInstallationData(String userId) {
        final ParseInstallation install = ParseInstallation.getCurrentInstallation();
        install.put("app_type", Collections.singletonList("bee"));
        install.put("receiving", Collections.singletonList(true));
        install.saveInBackground();

        install.fetchInBackground(new GetCallback<ParseObject>() {
            @Override
            public void done(ParseObject parseObject, ParseException e) {
            }
        });

        if (!TextUtils.isEmpty(userId)) {
            registerParseChannel(userId);
        }
    }

    public static String getUserId(Context context) {
        return SharedPreferencesModule.getUserId(context);
    }

    private static void registerParseChannel(String userId) {
        if (TextUtils.isEmpty(userId)) {
            return;
        }

        final String channel = getPushNotificationsChannel(userId);
        ParsePush.subscribeInBackground(channel, new SaveCallback() {
            @Override
            public void done(ParseException e) {
                Log.d("TAG", "push received from channel: " + channel);
            }
        });
    }

    public static void unSubscribeAllParseChannels() {
        List<String> subscribedChannels = ParseInstallation.getCurrentInstallation().getList("channels");
        if (subscribedChannels != null) {
            for (String channel : subscribedChannels) {
                ParsePush.unsubscribeInBackground(channel);
            }
        }
    }

    public static String getPushNotificationsChannel(String userId) {
        return PARSE_CHANNEL.replace(USER_ID, userId);
    }
}
