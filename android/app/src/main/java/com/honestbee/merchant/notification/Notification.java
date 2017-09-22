package com.honestbee.merchant.notification;

import org.json.JSONObject;

public class Notification {
    private static final String TAG = Notification.class.getSimpleName();

    private static final Integer UNKNOWN = 0;
    private static final Integer CODE_NEW_ORDER = 600;
    private static final Integer CODE_CANCELLED = 700;
    private static final Integer CODE_AUTO_CANCELLED = 701;

    private static final String ALERT = "alert";
    private static final String USER_ID = "user_id";
    private static final String CODE = "code";
    private static final String ALERT_PARAMS_VERSION = "alert_params_version";
    private static final String ALERT_PARAMS = "alert_params";
    private static final String ID = "id";
    private static final String ORDER_NUMBER = "order_number";
    private static final String STORE_ID = "store_id";
    private static final String MINS_BUFFER = "mins_buffer";

    private Type type = Type.DEFAULT;
    private String userId;
    private String alert;
    private Integer code = UNKNOWN;
    private Integer alertParamsVersion = 1;
    private String id;
    private Integer orderNumber;
    private Integer storeId;
    private Integer minsBuffer;

    private JSONObject jsonNotification;

    public Notification(JSONObject jsonObject) {
        if (jsonObject == null) return;
        this.jsonNotification = jsonObject;

        setAlert(jsonObject.optString(ALERT, ""));
        if (jsonObject.has(USER_ID)) {
            setUserId(jsonObject.optString(USER_ID, ""));
        }
        if (jsonObject.has(CODE)) {
            setCode(jsonObject.optInt(CODE));
            Type type = Type.fromCode(getCode());
            setType(type);
        }
        if (jsonObject.has(ALERT_PARAMS_VERSION)) {
            setAlertParamsVersion(jsonObject.optInt(ALERT_PARAMS_VERSION));
        }
        if (jsonObject.has(ALERT_PARAMS)) {
            setAlertParams(jsonObject.optJSONObject(ALERT_PARAMS));
        }
    }

    @Override
    public String toString() {
        if (jsonNotification != null) {
            return jsonNotification.toString();
        }
        return super.toString();
    }

    public Type getType() {
        return type;
    }

    private void setType(Type type) {
        this.type = type;
    }

    public String getUserId() {
        return userId;
    }

    private void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAlert() {
        return alert;
    }

    private void setAlert(String alert) {
        this.alert = alert;
    }

    public Integer getCode() {
        if (code == null) return UNKNOWN;
        return code;
    }

    private void setCode(Integer code) {
        this.code = code;
    }

    private Integer getAlertParamsVersion() {
        return alertParamsVersion;
    }

    private void setAlertParamsVersion(Integer version) {
        this.alertParamsVersion = version;
    }

    private void setAlertParams(JSONObject obj) {
        if (obj != null) {
            this.id = obj.optString(id, "");
            this.orderNumber = obj.optInt(ORDER_NUMBER, 0);
            this.storeId = obj.optInt(STORE_ID, 0);
            this.minsBuffer = obj.optInt(MINS_BUFFER, 0);
        }
    }

    public String getID() {
        return id;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public Integer getMinsBuffer() {
        return minsBuffer;
    }

    public enum Type {

        NEW_ORDER("new_order"),
        CANCELLED("cancelled"),
        AUTO_CANCELLED("auto_cancelled"),
        DEFAULT("default");

        private final String title;

        Type(String title) {
            this.title = title;
        }

        public String getTitle() {
            return title;
        }

        public static Type fromCode(Integer code) {
            if (CODE_AUTO_CANCELLED.equals(code)) {
                return AUTO_CANCELLED;
            } else if (CODE_CANCELLED.equals(code)) {
                return CANCELLED;
            } else if (CODE_NEW_ORDER.equals(code)) {
                return NEW_ORDER;
            }
            return DEFAULT;
        }
    }
}
