package com.honestbee.merchant.notification;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;
import android.util.Log;

import com.honestbee.merchant.R;
import com.honestbee.merchant.SharedPreferencesModule;
import com.parse.ParsePushBroadcastReceiver;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author susi on 8/14/17.
 */
public class ParseNotificationsListener extends ParsePushBroadcastReceiver {

    private static final String TAG = ParseNotificationsListener.class.getSimpleName();
    public static final String NOTIFICATION_BROADCAST = "NOTIFICATION_BROADCAST";
    public static final String ORDER_NUMBER = "order_number";
    public static final String USER_ID = "user_id";

    private NotificationAlarmHandler alarmHandler;

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
    }

    @Override
    protected void onPushReceive(Context context, Intent intent) {
        if (alarmHandler == null) {
            alarmHandler = new NotificationAlarmHandler();
        }

        JSONObject data = getDataFromIntent(intent);
        Notification notification = new Notification(data);

        String currentUserId = getCurrentUserId(context);
        if (currentUserId == null || !currentUserId.equals(notification.getUserId())) {
            return;
        }

        switch (notification.getType()) {
            case NEW_ORDER:
                handleNewOrder(notification, context);
                break;
            case AUTO_CANCELLED:
                handleAutoCancellation(notification, context);
                break;
            case CANCELLED:
                handleCancellation(notification, context);
                break;
            default:
                // do nothing for the other cases
                break;
        }

    }

    private void handleAutoCancellation(final Notification noti, final Context context) {
        // handle alarm
        alarmHandler.handleCancelledNotification(context);
        String msg = noti.getAlert();
        if (noti.getOrderNumber() != null && noti.getStoreId() != null && noti.getMinsBuffer() != null) {
            msg = String.format(context.getString(R.string.notification_merchant_auto_cancelled),
                    noti.getOrderNumber().toString(), noti.getStoreId().toString(), noti.getMinsBuffer().toString());
        }
        showNotification(context, context.getString(R.string.app_name), msg);
        sendBroadcast(context, noti);
    }

    private void handleCancellation(final Notification noti, final Context context) {
        // handle alarm
        alarmHandler.handleCancelledNotification(context);
        String msg = noti.getAlert();
        if (!TextUtils.isEmpty(noti.getID())) {
            msg = String.format(context.getString(R.string.notification_merchant_cancelled_order), noti.getID());
        }
        showNotification(context, context.getString(R.string.app_name), msg);
        sendBroadcast(context, noti);
    }

    private void handleNewOrder(final Notification noti, final Context context) {
        // handle alarm
        alarmHandler.handleNewNotification(context);
        String msg = noti.getAlert();
        if (noti.getOrderNumber() != null && noti.getStoreId() != null ) {
            msg = String.format(context.getString(R.string.notification_merchant_new_order),
                    noti.getOrderNumber().toString(), noti.getStoreId().toString());
        }
        showNotification(context, context.getString(R.string.app_name), msg);
        sendBroadcast(context, noti);
    }

    private void showNotification(Context context, String title, String messageBody) {
        PendingIntent onOpenIntent = alarmHandler.getNotificationOpenIntent(context);

        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(context)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(title)
                .setContentText(messageBody)
                .setAutoCancel(true)
                .setSound(defaultSoundUri)
                .setContentIntent(onOpenIntent);

        NotificationManager notificationManager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.notify(messageBody.hashCode(), notificationBuilder.build());
    }

    private void sendBroadcast(Context context, Notification noti) {
        Log.d(TAG, "sendBroadcast: send broadcast of notification: " + noti.toString());
        LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(context);
        Intent intent = new Intent(NOTIFICATION_BROADCAST);
        intent.putExtra(ORDER_NUMBER, noti.getOrderNumber());
        intent.putExtra(USER_ID, noti.getUserId());
        localBroadcastManager.sendBroadcast(intent);
    }

    @Override
    protected void onPushDismiss(Context context, Intent intent) {
        super.onPushDismiss(context, intent);
    }

    @Override
    protected void onPushOpen(Context context, Intent intent) {
        super.onPushOpen(context, intent);
    }

    private JSONObject getDataFromIntent(Intent intent) {
        JSONObject data = null;
        try {
            data = new JSONObject(intent.getExtras().getString(ParsePushBroadcastReceiver.KEY_PUSH_DATA));
        } catch (JSONException e) {
            Log.d(TAG, "getDataFromIntent: parse JSONObject failed");
        }
        return data;
    }

    private String getCurrentUserId(Context context) {
        return SharedPreferencesModule.getUserId(context);
    }
}
