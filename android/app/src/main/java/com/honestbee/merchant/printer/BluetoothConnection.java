package com.honestbee.merchant.printer;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.os.ParcelUuid;
import android.util.Log;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ConnectException;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Created by susi on 7/25/17.
 */

public class BluetoothConnection implements Runnable {

    private static final String TAG = BluetoothConnection.class.getSimpleName();

    private static final UUID UUID_SPP = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    // Device specific. This can be made configurable when we want to support multiple printers.
    private static final int BAUDRATE = 9600;

    // Divided by 10 because of additional bit start and stop
    // https://learn.sparkfun.com/tutorials/serial-communication/rules-of-serial
    private static final int BYTE_PER_SECOND = BAUDRATE / 10;

    private static final int BUFFER_LEN = BYTE_PER_SECOND;
    private static final long PRINT_DELAY = TimeUnit.MILLISECONDS.toMillis(250);

    private boolean isConnected;
    private BluetoothAdapter adapter;
    private BluetoothSocket socket;
    private OutputStream outputStream;
    private InputStream inputStream;
    private Thread thread;
    private Listener listener;

    public BluetoothConnection() {
        adapter = BluetoothAdapter.getDefaultAdapter();
    }

    public void setListener(Listener listener) {
        this.listener = listener;
    }

    public boolean isConnected() {
        return isConnected;
    }

    public void connect(String address) throws ConnectException, BluetoothDisabledException {
        if (adapter == null || !adapter.isEnabled()) {
            throw new BluetoothDisabledException("Please enable your bluetooth");
        }

        try {
            adapter.cancelDiscovery();
            BluetoothDevice device = adapter.getRemoteDevice(address);

            UUID uuid = UUID_SPP;
            ParcelUuid[] supportedUuids = device.getUuids();
            if (supportedUuids != null && supportedUuids.length > 0) {
                uuid = supportedUuids[0].getUuid();
            }

            socket = device.createRfcommSocketToServiceRecord(uuid);
            socket.connect();
            isConnected = true;

            outputStream = socket.getOutputStream();
            inputStream = socket.getInputStream();

            // start listening to incoming data
            stopThread();
            thread = new Thread(this);
            thread.start();

            if (listener != null) {
                listener.onConnected();
            }
        } catch (Exception e) {
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e1) {
                    // Ignore, this is just to make sure the socket closed
                }
            }
            throw new ConnectException(e.getMessage());
        }
    }

    public void disconnect() {
        stopThread();

        if (outputStream != null) {
            try {
                outputStream.flush();
                TimeUnit.SECONDS.sleep(3); // make sure all data being sent before closing
                outputStream.close();
            } catch (IOException e) {
                Log.d(TAG, "Error closing output stream", e);
            } catch (InterruptedException e) {
                Log.d(TAG, "Output stream wait interrupted", e);
            }
            outputStream = null;
        }

        if (socket != null) {
            try {
                socket.close();
            } catch (IOException e) {
                Log.d(TAG, "Error disconnecting bluetooth socket", e);
            }
            socket = null;
        }

        isConnected = false;
    }

    public void write(byte[] data) throws IOException {
        if (!isConnected) {
            throw new IOException("Not connected");
        }

        if (outputStream == null) {
            throw new IOException("Output stream is null");
        }

        ByteArrayInputStream bais = new ByteArrayInputStream(data);
        byte[] buffer = new byte[BUFFER_LEN];
        int len;
        while ((len = bais.read(buffer)) != -1) {
            outputStream.write(buffer, 0, len);
            try {
                // Device specific, this is to wait for the data to be printed.
                TimeUnit.MILLISECONDS.sleep(PRINT_DELAY);
            } catch (InterruptedException e) {
                // Ignore
            }
        }
    }

    @Override
    public void run() {
        byte[] buffer = new byte[1024];  // buffer store for the stream
        int bytes; // bytes returned from read()

        while (isConnected) {
            try {
                // Read from the InputStream
                bytes = inputStream.read(buffer);

                StringBuilder sb = new StringBuilder();
                for (int n = 0; n < bytes; n++) {
                    sb.append(String.valueOf(buffer[n]));
                    sb.append(" ");
                }
                Log.d(TAG, "printer incoming data: [" + sb.toString() + "]");
            } catch (IOException e) {
                break;
            }
        }
    }

    private void stopThread() {
        if (thread != null) {
            thread.interrupt();
            thread = null;
        }
    }

    public interface Listener {
        void onConnected();
    }
}
