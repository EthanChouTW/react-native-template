package com.honestbee.merchant;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * @author susi on 8/15/17.
 */

public class SharedPreferencesModule {

    private static final String SHARED_PREFERENCES_KEY = "PREF_KEY";
    private static final String USER_ID = "USER_ID";

    public static String getUserId(Context context) {
        SharedPreferences pref = context.getSharedPreferences(SHARED_PREFERENCES_KEY, Context.MODE_PRIVATE);
        return pref.getString(USER_ID, "");
    }

    public static void setUserId(Context context, String userId) {
        SharedPreferences pref = context.getSharedPreferences(SHARED_PREFERENCES_KEY, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString(USER_ID, userId);
        editor.apply();
    }
}
