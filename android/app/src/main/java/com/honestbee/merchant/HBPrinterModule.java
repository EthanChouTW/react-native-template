package com.honestbee.merchant;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.UIManagerModule;
import com.honestbee.merchant.bluetooth.BluetoothSPP;
import com.honestbee.merchant.bluetooth.BluetoothState;
import com.honestbee.merchant.printer.PrinterController;
import com.honestbee.merchant.printer.ViewShot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class HBPrinterModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private static final String TAG = "HBPrinter";

    private BluetoothSPP bt;
    private PrinterController printerController;
    private List<Map<String, String>> devices = new ArrayList<>();

    public HBPrinterModule(final ReactApplicationContext reactContext) {
        super(reactContext);

        bt = new BluetoothSPP(reactContext.getApplicationContext());
        printerController = new PrinterController(reactContext);
    }

    @Override
    public String getName() {
        return TAG;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void handleSearch() {
        // Register for broadcasts when a device is discovered or discovery has finished
        IntentFilter filter = new IntentFilter();
        filter.addAction(BluetoothDevice.ACTION_FOUND);
        filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        getReactApplicationContext().registerReceiver(mBluetoothReceiver, filter);

        devices.clear();
        if (bt.isBluetoothEnabled()) {
            if (!bt.isServiceAvailable()) {
                bt.setupService();
                bt.startService(BluetoothState.DEVICE_OTHER);
            }

            String[] pairedAddress = bt.getPairedDeviceAddress();
            String[] pairedName = bt.getPairedDeviceName();
            if (pairedAddress != null) {
                for (int i = 0; i < pairedAddress.length; i++) {
                    Map<String, String> map = new HashMap<>();
                    map.put("name", pairedName[i]);
                    map.put("address", pairedAddress[i]);
                    devices.add(map);
                }
                sendDevicesToReact(devices);
            }
            if (bt.isDiscovery()) {
                bt.cancelDiscovery();
            }
            bt.startDiscovery();
            Log.d(TAG, "handleSearch: Start discovery");
        } else {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            getReactApplicationContext().startActivity(enableBtIntent);

            Toast.makeText(getReactApplicationContext(), getReactApplicationContext().getString(R.string.msg_enable_bluetooth),
                    Toast.LENGTH_LONG).show();
        }
    }

    @ReactMethod
    public void captureRef(int tag, final String macAddress) {
        // get bitmap from tag
        try {
            UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
            uiManager.addUIBlock(new ViewShot(tag, new ViewShot.OnBitmapReadyListener() {
                @Override
                public void onBitmapReady(Bitmap bitmap) {
                    // print receipt by mac address
                    print(macAddress, "name", bitmap);
                }
            }));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void print(String address, String name, Bitmap bitmap) {
        Toast.makeText(getReactApplicationContext(), "start printing", Toast.LENGTH_SHORT).show();

        printerController.setPrinter(address, name);
        printerController
                .print(bitmap)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Subscriber<Void>() {
                    @Override
                    public void onCompleted() {
                        Toast.makeText(getReactApplicationContext(), "printing complete", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onError(Throwable e) {
                    }

                    @Override
                    public void onNext(Void aVoid) {
                    }
                });
    }

    // Send bluetooth devices information to react
    private void sendDevicesToReact(List<Map<String, String>> devices) {
        WritableArray devicesArray = Arguments.makeNativeArray(devices);
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("devicesListener", devicesArray);
    }

    // The BroadcastReceiver that listens for discovered devices
    private final BroadcastReceiver mBluetoothReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                // Get the BluetoothDevice object from the Intent
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                Map<String, String> map = new HashMap<>();
                map.put("name", device.getName());
                map.put("address", device.getAddress());
                devices.add(map);
                sendDevicesToReact(devices);
            } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
                try {
                    getReactApplicationContext().unregisterReceiver(this);
                } catch (Exception e) {
                    Log.d(TAG, "onReceive: Cannot unregister receiver");
                }
            }
        }
    };
}
