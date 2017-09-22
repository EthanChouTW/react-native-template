package com.honestbee.merchant.printer;

import android.graphics.Bitmap;
import android.support.annotation.IntDef;

import java.io.IOException;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.util.Arrays;

/**
 * Created by susi on 7/25/17.
 */

public abstract class Printer {

    private static final String DEFAULT_NEW_LINE = "\r\n";
    private static final int DEFAULT_COLS = 32;

    static final int ALIGN_LEFT = 0;
    static final int ALIGN_CENTER = 1;
    static final int ALIGN_RIGHT = 2;

    @Retention(RetentionPolicy.SOURCE)
    @IntDef({ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT})
    @interface Alignment {}

    Printer() {
    }

    public abstract void connect(String address) throws Exception;

    public abstract void disconnect();

    public abstract boolean isConnected();

    /**
     * Send raw data to printer.
     *
     * @param data raw data to be printed
     */
    public abstract void print(byte[] data) throws IOException;

    /**
     * Send text data to printer. This can be formatted depends on the printer type.
     *
     * @param text text to be printed
     */
    public abstract void print(String text) throws IOException;

    /**
     * Print image.
     *
     * @param bitmap image to be printed
     */
    public abstract void print(Bitmap bitmap) throws IOException;

    /**
     * Print image.
     *
     * @param bitmap     image to be printed
     * @param mediaWidth width of the media (paper) in pixel
     * @throws IOException
     */
    public abstract void print(Bitmap bitmap, int mediaWidth) throws IOException;
}
