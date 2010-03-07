package org.johnragan.jws.brownbaglive.provider;

import javax.xml.ws.Endpoint;

public class TempConvertPublisher {
	public static void main(String[] args) {
		Endpoint.publish("http://127.0.0.1:9876/jws/tempconvert", new TempConvertImpl());
	}
}
