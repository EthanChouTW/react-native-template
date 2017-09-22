package com.honestbee.merchant.printer;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.view.TextureView;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;

import java.util.ArrayList;
import java.util.List;

/**
 * Snapshot utility class allow to screenshot a view.
 */
public class ViewShot implements UIBlock {

    private int tag;
    private OnBitmapReadyListener listener;

    public interface OnBitmapReadyListener {
        void onBitmapReady(Bitmap b);
    }

    public ViewShot(int tag, OnBitmapReadyListener listener) {
        this.tag = tag;
        this.listener = listener;
    }

    @Override
    public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
        View view = nativeViewHierarchyManager.resolveView(tag);
        if (view == null) {
            return;
        }
        captureView(view);
    }

    private List<View> getAllChildren(View v) {

        if (!(v instanceof ViewGroup)) {
            ArrayList<View> viewArrayList = new ArrayList<>();
            viewArrayList.add(v);
            return viewArrayList;
        }

        ArrayList<View> result = new ArrayList<>();

        ViewGroup viewGroup = (ViewGroup) v;
        for (int i = 0; i < viewGroup.getChildCount(); i++) {

            View child = viewGroup.getChildAt(i);

            //Do not add any parents, just add child elements
            result.addAll(getAllChildren(child));
        }
        return result;
    }

    /**
     * Screenshot a view and return the captured bitmap.
     *
     * @param view the view to capture
     */
    private void captureView(View view) {
        int w = view.getWidth();
        int h = view.getHeight();

        if (w <= 0 || h <= 0) {
            throw new RuntimeException("Impossible to snapshot the view: view is invalid");
        }

        Bitmap bitmap = Bitmap.createBitmap(w, h, Bitmap.Config.RGB_565);
        Bitmap childBitmapBuffer;
        Canvas c = new Canvas(bitmap);
        view.draw(c);

        //after view is drawn, go through children
        List<View> childrenList = getAllChildren(view);

        for (View child : childrenList) {
            if (child instanceof TextureView) {
                ((TextureView) child).setOpaque(false);
                childBitmapBuffer = ((TextureView) child).getBitmap(child.getWidth(), child.getHeight());
                c.drawBitmap(childBitmapBuffer, child.getLeft() + ((ViewGroup) child.getParent()).getLeft() + child.getPaddingLeft(), child.getTop() + ((ViewGroup) child.getParent()).getTop() + child.getPaddingTop(), null);
            }
        }

        if (listener != null) {
            listener.onBitmapReady(bitmap);
        }
    }
}
