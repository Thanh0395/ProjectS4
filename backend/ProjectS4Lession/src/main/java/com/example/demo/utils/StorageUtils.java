package com.example.demo.utils;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class StorageUtils {

	public static byte[] compressImage(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setLevel(Deflater.BEST_COMPRESSION);
		deflater.setInput(data);
		deflater.finish();
		
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] tmp = new byte[4*1024];
		while(!deflater.finished()) {
			int size = deflater.deflate(tmp);
			outputStream.write(tmp, 0, size);
		}
		
		try {
			outputStream.close();
		} catch (Exception e) {
		}
		return outputStream.toByteArray();
	}
	
	public static byte[] deCompressImage(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] tmp = new byte[4*1024];
		try {
			while(!inflater.finished()) {
				int count = inflater.inflate(tmp);
				outputStream.write(tmp, 0, count);
			}
			outputStream.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return outputStream.toByteArray();
	}
	
	public static List<byte[]> compressImageInChunks(byte[] data, int chunkSize) {
	    List<byte[]> compressedChunks = new ArrayList<>();
	    Deflater deflater = new Deflater();
	    deflater.setLevel(Deflater.BEST_COMPRESSION);

	    int offset = 0;
	    while (offset < data.length) {
	        int chunkLength = Math.min(chunkSize, data.length - offset);
	        byte[] chunk = Arrays.copyOfRange(data, offset, offset + chunkLength);

	        deflater.setInput(chunk);
	        deflater.finish();

	        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(chunk.length);
	        byte[] tmp = new byte[4 * 1024];
	        while (!deflater.finished()) {
	            int size = deflater.deflate(tmp);
	            outputStream.write(tmp, 0, size);
	        }

	        compressedChunks.add(outputStream.toByteArray());
	        offset += chunkLength;
	    }

	    return compressedChunks;
	}
	
	public static byte[] decompressImageInChunks(List<byte[]> compressedChunks) {
	    Inflater inflater = new Inflater();
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

	    for (byte[] chunk : compressedChunks) {
	        inflater.setInput(chunk);
	        byte[] buffer = new byte[4 * 1024];

	        try {
	            while (!inflater.finished()) {
	                int count = inflater.inflate(buffer);
	                outputStream.write(buffer, 0, count);
	            }
	        } catch (DataFormatException e) {
	            // Handle the exception if there's an issue with the compressed data
	            e.printStackTrace(); // You can log or handle the exception as needed
	        } finally {
	            inflater.reset(); // Reset the inflater for the next chunk
	        }
	    }

	    return outputStream.toByteArray();
	}

}
