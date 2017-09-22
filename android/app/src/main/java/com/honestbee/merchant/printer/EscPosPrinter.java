package com.honestbee.merchant.printer;

import android.graphics.Bitmap;
import android.util.Log;

import java.io.IOException;
import java.net.ConnectException;

class EscPosPrinter extends Printer {

    private static final String TAG = EscPosPrinter.class.getSimpleName();

    private static final String NEW_LINE = "\n";
    private static final int MEDIA_WIDTH = 376; // paper width for image in pixel

    // ESC @ - Initialize the printer
    private static final byte[] CMD_INITIALIZE = new byte[]{0x1B, 0x40};

    // DLE DC4 - Clear the printer buffer (real time)
    private static final byte[] CMD_CLEAR_BUFFER = new byte[]{0x10, 0x14, 0x08, 1, 3, 20, 1, 6, 2, 8};

    private BluetoothConnection connection;

    EscPosPrinter() {
        super();
        connection = new BluetoothConnection();
        BluetoothConnection.Listener connectionListener = new BluetoothConnection.Listener() {
            @Override
            public void onConnected() {
                try {
                    print(CMD_INITIALIZE);
                    print(CMD_CLEAR_BUFFER);
                } catch (IOException e) {
                    Log.d(TAG, "onConnected", e);
                }
            }
        };
        connection.setListener(connectionListener);
    }

    @Override
    public void connect(String address) throws ConnectException, BluetoothDisabledException {
        connection.connect(address);
    }

    @Override
    public void disconnect() {
        if (!isConnected()) {
            return;
        }

        if (connection != null) {
            connection.disconnect();
        }
    }

    @Override
    public boolean isConnected() {
        return connection != null && connection.isConnected();
    }

    @Override
    public void print(byte[] data) throws IOException {
        connection.write(data);
    }

    @Override
    public void print(String text) throws IOException {
        Log.d(TAG, "Printing text: " + text);
        print(text.getBytes());
    }

    public void println(String text) throws IOException {
        print(text + NEW_LINE);
    }

    @Override
    public void print(Bitmap bitmap) throws IOException {
        print(bitmap, MEDIA_WIDTH);
    }

    @Override
    public void print(Bitmap bitmap, int mediaWidth) throws IOException {
        EscBuffer escBuffer = new EscBuffer(mediaWidth);
        escBuffer.put(bitmap, ALIGN_CENTER);
        print(escBuffer.getBitImageAndHeader());
    }
}
