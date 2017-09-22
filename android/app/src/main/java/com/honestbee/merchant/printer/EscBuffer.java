package com.honestbee.merchant.printer;

import android.graphics.Bitmap;
import android.graphics.Color;

import java.util.ArrayList;
import java.util.Arrays;

class EscBuffer {
    private static final int DOTS = 8;
    private static final int HEADER_SIZE = 8;

    private int width;
    private int bitWidth;
    private ArrayList<Byte> buffer;

    EscBuffer(int width) {
        this.width = width;
        this.bitWidth = (byte) Math.ceil(width / DOTS);
        this.buffer = new ArrayList<>();
    }

    void put(Bitmap image, @Printer.Alignment int alignment) {
        int left = 0;
        switch (alignment) {
            case Printer.ALIGN_CENTER: {
                left = (width - image.getWidth()) / 2;
                break;
            }
            case Printer.ALIGN_RIGHT: {
                left = width - image.getWidth();
                break;
            }
            case Printer.ALIGN_LEFT: {
                left = 0;
                break;
            }
        }
        put(left, 0, image);
    }

    private void put(int x, int y, boolean black) {
        if (x >= width) {
            return;
        }

        int pos = x + y * width;
        int bytePos = pos / DOTS;
        int bitPos = DOTS - (pos % DOTS) - 1; // MSB -> LSB
        expandIfNecessary(bytePos);
        byte value = buffer.get(bytePos);
        if (black) {
            value |= (byte) (1 << bitPos);
        }
        buffer.set(bytePos, value);
    }

    public boolean get(int x, int y) {
        int pos = x + y * width;
        int bytePos = pos / DOTS;
        int bitPos = DOTS - (pos % DOTS) - 1; // MSB -> LSB
        if (bytePos > buffer.size()) {
            return false;
        }

        byte value = buffer.get(bytePos);
        return (value & (1 << bitPos)) != 0;
    }

    private void expandIfNecessary(int size) {
        while (buffer.size() <= size) {
            Byte[] blankLine = new Byte[getBitWidth()];
            Arrays.fill(blankLine, (byte) 0);
            buffer.addAll(Arrays.asList(blankLine));
        }
    }

    private int getBitWidth() {
        return bitWidth;
    }

    private int getBitHeight() {
        return buffer.size() * DOTS / width;
    }

    private void put(int left, int top, Bitmap image) {
        int h = image.getHeight();
        int w = image.getWidth();
        if (w > width) {
            w = width;
        }

        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                put(left + x, top + y, isBlack(image.getPixel(x, y)));
            }
        }
    }

    /**
     * Determine if the color is black or white. This is needed because printer can only print black and white.
     *
     * @param pixel the color to be printed
     * @return true if black, false if white
     */
    private boolean isBlack(int pixel) {
        if (Color.alpha(pixel) < 0xBE) {
            return false;
        }

        int intensity = (Color.red(pixel) + Color.green(pixel) + Color.blue(pixel)) / 3;
        return intensity < 0xBE;
    }

    public void clear() {
        buffer.clear();
    }

    /**
     * Generate header for bit image.
     *
     * @return byte array for the raster bit image's header
     * @see <a href="http://www.zlgmcu.com/ZLG/Print/pdf/ZLG-ESCPOS_en.pdf">ESCPOS Instruction Set</a>
     */
    private byte[] getBitImageHeader() {
        int width = getBitWidth();
        int height = getBitHeight();

        byte[] header = new byte[HEADER_SIZE];
        // Gs v 0 is command to print raster bit image
        header[0] = 0x1D; // Gs
        header[1] = 0x76; // v
        header[2] = 0x30; // 0
        // normal mode (1:1 scale)
        header[3] = 0;
        // xL specifies (xL + xH × 256) bytes in horizontal direction for the bit image.
        header[4] = (byte) (width & 0xff);
        // xH specifies (xL + xH × 256) bytes in horizontal direction for the bit image.
        header[5] = (byte) (width >> 8);
        // yL specifies (yL + yH × 256) dots in vertical direction for the bit image.
        header[6] = (byte) (height & 0xff);
        // yH specifies (yL + yH × 256) dots in vertical direction for the bit image.
        header[7] = (byte) (height >> 8);

        return header;
    }

    private byte[] getBitImage() {
        int size = buffer.size();
        byte[] bytes = new byte[size];
        for (int n = 0; n < size; n++) {
            bytes[n] = buffer.get(n);
        }
        return bytes;
    }

    byte[] getBitImageAndHeader() {
        byte[] header = getBitImageHeader();
        byte[] bitImage = getBitImage();
        byte[] bytes = Arrays.copyOf(header, header.length + bitImage.length);
        System.arraycopy(bitImage, 0, bytes, header.length, bitImage.length);
        return bytes;
    }
}
