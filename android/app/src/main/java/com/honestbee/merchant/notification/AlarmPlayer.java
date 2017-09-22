package com.honestbee.merchant.notification;

import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.support.annotation.FloatRange;
import android.util.Log;

import java.io.IOException;

public class AlarmPlayer {
    public static final String TAG = AlarmPlayer.class.getSimpleName();
    private static final AlarmPlayer INSTANCE = new AlarmPlayer();
    private static MediaPlayer m;

    private int streamVolumeMax = 1;
    private int streamVolumeCurrent = 1;

    public static AlarmPlayer getInstance() {
        return INSTANCE;
    }

    private AlarmPlayer() {
        m = new MediaPlayer();
    }

    public void playAlarm(Context context, Settings settings) {
        try {
            if (m.isPlaying()) {
                stopAlarm();
            }

            initStreamVolume(context);
            settings.setSettings(context, m);

            m.prepare();
            m.start();
        } catch (Exception e) {
            Log.e(TAG, e.getMessage(), e);
        }
    }

    private void initStreamVolume(Context context) {
        AudioManager manager = (AudioManager) context.getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        streamVolumeMax = Math.max(1, manager.getStreamMaxVolume(AudioManager.STREAM_MUSIC));
        streamVolumeCurrent = manager.getStreamVolume(AudioManager.STREAM_MUSIC);
    }

    /**
     * @return Stream volume in percentage.
     */
    public float getStreamVolume() {
        return (float) Math.min(1.0, streamVolumeCurrent / streamVolumeMax);
    }

    public void setStreamVolume(Context context, @FloatRange(from=0, to=1) float percent) {
        AudioManager manager = (AudioManager) context.getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        int volume = (int) (streamVolumeMax * percent);
        manager.setStreamVolume(AudioManager.STREAM_MUSIC, volume, 0);

        streamVolumeCurrent = volume;
    }

    public boolean isPlaying() {
        return m.isPlaying();
    }

    public void stopAlarm() {
        try {
            m.stop();
            m.release();
            m.setOnCompletionListener(null);
        } catch (Exception e) {
            Log.d(TAG, e.getMessage(), e);
        }

        m = new MediaPlayer();
    }

    public interface Settings {
        void setSettings(Context context, MediaPlayer m);
    }

    public static class MerchantSetting implements Settings {
        protected static final String PARTNER_ALARM_FILE_NAME = "partner_alarm.mp3";

        private static final float MIN_VOLUME = 0.5f;

        AlarmPlayer alarmPlayer;

        public MerchantSetting(AlarmPlayer alarmPlayer) {
            this.alarmPlayer = alarmPlayer;
        }

        @Override
        public void setSettings(Context context, MediaPlayer m) {

            AssetFileDescriptor descriptor;
            try {
                descriptor = context.getAssets().openFd(getAlarmSoundFile());
                m.setDataSource(descriptor.getFileDescriptor(), descriptor.getStartOffset(), descriptor.getLength());
                descriptor.close();
            } catch (IOException e) {
                Log.e(TAG, e.getMessage(), e);
            }
            adjustVolume(alarmPlayer, context);
            m.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    mp.start();
                }
            });
        }

        private void adjustVolume(AlarmPlayer alarmPlayer, Context context) {
            if (alarmPlayer.getStreamVolume() < getMinVolume()) {
                alarmPlayer.setStreamVolume(context, getMinVolume());
            }
        }

        protected float getMinVolume() {
            return MIN_VOLUME;
        }

        private String getAlarmSoundFile() {
            return PARTNER_ALARM_FILE_NAME;
        }
    }
}
