package com.honestbee.merchant.printer;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.text.TextUtils;
import android.util.Log;

import rx.Observable;
import rx.Subscriber;
import rx.functions.Action0;
import rx.functions.Action1;
import rx.functions.Func1;

public class PrinterController {
    private static final String TAG = "PrinterController";

    private static final int DEFAULT_WIDTH = 376; // in pixel
    private static final String PREF_KEY = "PREF_KEY";
    private static final String PRINTER_ADDRESS_KEY = "PRINTER_ADDRESS_KEY";
    private static final String PRINTER_NAME_KEY = "PRINTER_NAME_KEY";

    private Context context;

    private Printer printer;

    public PrinterController(Context context) {
        this.context = context;
        printer = new EscPosPrinter();
    }

    private Observable<Void> connect() {
        return Observable.create(new Observable.OnSubscribe<Void>() {
            @Override
            public void call(final Subscriber<? super Void> subscriber) {
                try {
                    Log.d(TAG, "call: printer address: " + getPrinterAddress());
                    if (!printer.isConnected()) {
                        printer.connect(getPrinterAddress());
                    }

                    subscriber.onNext(null);
                    subscriber.onCompleted();
                } catch (Exception e) {
                    Log.d(TAG, "call: error, " + e.toString());
                    subscriber.onError(e);
                }
            }
        });
    }

    public Observable<Void> print(final Bitmap bitmap) {
        return connect()
                .map(new Func1<Void, Void>() {
                    @Override
                    public Void call(Void aVoid) {
                        int newWidth = DEFAULT_WIDTH;
                        int newHeight = (int) ((float) bitmap.getHeight() * ((float) newWidth / (float) bitmap.getWidth()));
                        Bitmap resized;
                        try {
                            resized = Bitmap.createScaledBitmap(bitmap, newWidth, newHeight, true);
                            printer.print(resized);
                        } catch (Exception e) {
                            e.printStackTrace();
                        } finally {
                            bitmap.recycle();
                        }
                        return null;
                    }
                })
                .doOnError(new Action1<Throwable>() {
                    @Override
                    public void call(Throwable throwable) {
                        printer.disconnect();
                    }
                })
                .doOnCompleted(new Action0() {
                    @Override
                    public void call() {
                        printer.disconnect();
                    }
                });
    }

    public void setPrinter(String printerAddress, String printerName) {
        persist(PRINTER_ADDRESS_KEY, printerAddress);
        persist(PRINTER_NAME_KEY, printerName);
    }

    private String getPrinterAddress() {
        return getPersistedString(PRINTER_ADDRESS_KEY, null);
    }

    private void persist(String key, String value) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_KEY, Context.MODE_PRIVATE);
        SharedPreferences.Editor edit = sharedPreferences.edit();
        if (!TextUtils.isEmpty(value)) {
            edit.putString(key, value);
        } else {
            edit.remove(key);
        }
        edit.apply();
    }

    private String getPersistedString(String key, String defValue) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_KEY, Context.MODE_PRIVATE);
        try {
            return sharedPreferences.getString(key, defValue);
        } catch (Exception e) {
            return defValue;
        }
    }
}
