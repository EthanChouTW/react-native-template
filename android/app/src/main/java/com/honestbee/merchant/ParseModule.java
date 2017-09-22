package com.honestbee.merchant;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.honestbee.merchant.notification.NotificationAlarmHandler;

import static com.honestbee.merchant.notification.ParseNotificationsListener.NOTIFICATION_BROADCAST;
import static com.honestbee.merchant.notification.ParseNotificationsListener.ORDER_NUMBER;
import static com.honestbee.merchant.notification.ParseNotificationsListener.USER_ID;

/**
 * @author susi on 8/15/17.
 */
public class ParseModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "ParseModule";
    private ReactApplicationContext mReactContext;

    public ParseModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
        LocalNotificationBroadcastReceiver mLocalBroadcastReceiver = new LocalNotificationBroadcastReceiver();
        LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(mReactContext);
        localBroadcastManager.registerReceiver(mLocalBroadcastReceiver, new IntentFilter(NOTIFICATION_BROADCAST));
    }

    @ReactMethod
    public void updateParseInstallation(String userId) {
        MainApplication.updateParseInstallationData(userId);
        SharedPreferencesModule.setUserId(getReactApplicationContext().getApplicationContext(), userId);
    }

    @ReactMethod
    public void unSubscribeAllParseChannels() {
        MainApplication.unSubscribeAllParseChannels();
        SharedPreferencesModule.setUserId(getReactApplicationContext().getApplicationContext(), "");
    }

    @ReactMethod
    public void stopAlarm() {
        NotificationAlarmHandler.stopAlarm();
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    public class LocalNotificationBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Log.d(MODULE_NAME, "onReceive: send notification to react");
            WritableMap map = Arguments.createMap();
            map.putString(ORDER_NUMBER, intent.getStringExtra(ORDER_NUMBER));
            map.putString(USER_ID, intent.getStringExtra(USER_ID));
            mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("orderListener", map);
        }
    }
}
