package com.honestbee.merchant.printer;

/**
 * Created by susi on 7/25/17.
 */

public class BluetoothDisabledException extends Exception {

    /**
     * Constructs a new instance.
     */
    public BluetoothDisabledException() {
    }

    /**
     * Constructs a new instance with the given detail message.
     */
    public BluetoothDisabledException(String detailMessage) {
        super(detailMessage);
    }

    /**
     * Constructs a new instance with the given detail message and cause.
     *
     * @hide
     */
    public BluetoothDisabledException(String detailMessage, Throwable cause) {
        super(detailMessage, cause);
    }
}
