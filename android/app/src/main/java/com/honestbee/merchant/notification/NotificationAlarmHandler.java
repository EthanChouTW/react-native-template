package com.honestbee.merchant.notification;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.honestbee.merchant.MainActivity;

public class NotificationAlarmHandler {
    private static AlarmPlayer alarmPlayer = AlarmPlayer.getInstance();

    public NotificationAlarmHandler() {
    }

    public void handleCancelledNotification(Context context) {
        alarmPlayer.stopAlarm();
    }

    public void handleNewNotification(Context context) {
        AlarmPlayer.Settings settings = new AlarmPlayer.MerchantSetting(alarmPlayer);
        alarmPlayer.playAlarm(context, settings);
    }

    public static void stopAlarm() {
        alarmPlayer.stopAlarm();
    }

    public PendingIntent getNotificationOpenIntent(Context context) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        return PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_ONE_SHOT);
    }
}
