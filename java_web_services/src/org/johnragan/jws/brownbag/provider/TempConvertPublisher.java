package org.johnragan.jws.brownbag.provider;

import javax.xml.ws.Endpoint;

import org.johnragan.jws.brownbag.provider.TempConvertImpl;

public class TempConvertPublisher {
	public static void main(String[] args) {
		Endpoint.publish("http://127.0.0.1:9876/jws/tempconvert", new TempConvertImpl());
	}
}
